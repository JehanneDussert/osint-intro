import requests
from schemas import EngineResult
from typing import List
from utils.sentiment import get_sentiment, calculate_average_sentiment
from utils.language import get_language
from fastapi import HTTPException

def duckduckgo_search(query: str, num_results: int = 20) -> List[EngineResult]:
    url = f"https://api.duckduckgo.com/?q=jehanne+dussert&format=json"
    print('query: ', query)
    try:
        response = requests.get(url)
        print('res: ', response)
        data = response.json()
        print('data: ', data)

        results_list = []
        for result in data.get('RelatedTopics', [])[:num_results]:
            title = result.get('Text', 'No title')
            url = result.get('FirstURL', '')
            print('url: ', url)
            sentiment = get_sentiment(url)
            language = get_language(title)
            reduced_url = url

            google_result = EngineResult(
                url=url,
                reduced_url=reduced_url,
                title=title,
                sentiment=sentiment,
                average_sentiment=0,
                language=language
            )
            results_list.append(google_result)

        res = calculate_average_sentiment(results_list)
        
        return res
    except Exception as e:
        raise HTTPException(status_code=500, detail="Erreur lors de la récupération des résultats de recherche sur DuckDuckGo.")
