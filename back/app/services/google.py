from bs4 import BeautifulSoup
from urllib.parse import urlparse, urljoin
import urllib.request
from app.schemas import EngineResult
from typing import List
from fastapi import HTTPException
from app.utils.sentiment import get_sentiment, calculate_average_sentiment
from app.utils.language import get_language
from app.utils.personal_data import extract_personal_data

def format_google_result(results, url, links) -> EngineResult:
    title = results[0].get_text()
    relative_url = links[0]['href']
    print('rel: ', relative_url)
    absolute_url = urljoin(url, relative_url)
    print('abs: ', absolute_url)
    parsed_url = urlparse(absolute_url)
    reduced_url = f"{parsed_url.scheme}://{parsed_url.netloc}"
    sentiment = get_sentiment(absolute_url)
    language = get_language(absolute_url, title)
    print('bef personal data')
    personal_data = extract_personal_data(url)
    print('after personal data')
    return EngineResult(url=absolute_url, reduced_url=reduced_url, title=title, sentiment=sentiment, average_sentiment=0, language=language, personal_data=personal_data)

def google_search(query: str, num_results: int = 10) -> List[EngineResult]:
    url = f'https://www.google.com/search?q={query}&num={num_results}'
    request = urllib.request.Request(url)
    request.add_header('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36')
    print('google search')
    try:
        raw_response = urllib.request.urlopen(request).read()
        html = raw_response.decode("utf-8")

        soup = BeautifulSoup(html, 'html.parser')
        results_list = []
        res = []

        divs = soup.select("#search div.g")
        print('before for')
        for div in divs:
            results = div.select("h3")
            links = div.select("a")
            print('before if')
            if results and links:
                print('in if')
                item = format_google_result(results, url, links)
                print('item done')
                results_list.append(item)
        print('going to cal')
        res = calculate_average_sentiment(results_list)

        return res

    except Exception as e:
        raise HTTPException(status_code=500, detail="Erreur lors de la récupération des résultats de recherche sur Google.")