from bs4 import BeautifulSoup
from urllib.parse import urlparse, urljoin
import urllib.request
from schemas import EngineResult
from typing import List
from fastapi import HTTPException
from utils.sentiment import get_sentiment, calculate_average_sentiment
from utils.language import get_language

def format_google_result(results, url, links) -> EngineResult:
    title = results[0].get_text()
    relative_url = links[0]['href']
    absolute_url = urljoin(url, relative_url)
    parsed_url = urlparse(absolute_url)
    reduced_url = f"{parsed_url.scheme}://{parsed_url.netloc}"
    sentiment = get_sentiment(url)
    language = get_language(title)
    
    return EngineResult(url=absolute_url, reduced_url=reduced_url, title=title, sentiment=sentiment, average_sentiment=0, language=language)

def google_search(query: str, num_results: int = 20) -> List[EngineResult]:
    query = query.replace(' ', '+')
    url = f'https://www.google.com/search?q={query}&num={num_results}'
    request = urllib.request.Request(url)
    request.add_header('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36')
    
    try:
        raw_response = urllib.request.urlopen(request).read()
        html = raw_response.decode("utf-8")

        soup = BeautifulSoup(html, 'html.parser')
        results_list = []
        res = []

        divs = soup.select("#search div.g")
        for div in divs:
            results = div.select("h3")
            links = div.select("a")

            if results and links:
                item = format_google_result(results, url, links)
                results_list.append(item)
        
        res = calculate_average_sentiment(results_list)

        return res

    except Exception as e:
        raise HTTPException(status_code=500, detail="Erreur lors de la récupération des résultats de recherche sur Google.")