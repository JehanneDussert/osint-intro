import requests
from app.schemas import EngineResult
from typing import List
from app.utils.sentiment import get_sentiment, calculate_average_sentiment
from app.utils.language import get_language
from fastapi import HTTPException
from app.utils.personal_data import extract_personal_data

def duckduckgo_search(query: str, num_results: int = 10) -> List[EngineResult]:
    url = f"https://api.duckduckgo.com/?q=jehanne+dussert&format=json"

    try:
        response = requests.get(url)
        data = response.json()
        results_list = []
        
        for result in data.get('RelatedTopics', [])[:num_results]:
            title = result.get('Text', 'No title')
            url = result.get('FirstURL', '')
            sentiment = get_sentiment(url)
            language = get_language(url, title)
            personal_data = extract_personal_data(url)
            reduced_url = url

            google_result = EngineResult(
                url=url,
                reduced_url=reduced_url,
                title=title,
                sentiment=sentiment,
                average_sentiment=0,
                language=language,
                personal_data=personal_data
            )
            results_list.append(google_result)

        res = calculate_average_sentiment(results_list)
        
        return res
    except Exception as e:
        raise HTTPException(status_code=500, detail="Erreur lors de la récupération des résultats de recherche sur DuckDuckGo.")
