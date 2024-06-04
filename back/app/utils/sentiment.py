import requests
from bs4 import BeautifulSoup
from textblob import TextBlob
from typing import List
from schemas import EngineResult

def get_sentiment(url: str) -> float:
    response = requests.get(url)
    content = response.text
    
    soup = BeautifulSoup(content, 'html.parser')
    text = soup.get_text()
    print('url: ', url)
    
    blob = TextBlob(text)
    print('ici blob: ', blob.sentiment)
    sentiment_score = blob.sentiment.polarity
    
    return sentiment_score

def calculate_average_sentiment(results: List[EngineResult]) -> List[EngineResult]:
    if not results:
        return results

    sentiments = [item.sentiment for item in results]
    total_sentiments = sum(sentiments)
    average_sentiment = total_sentiments / len(results)
    
    res = []
    for item in results:
        new_item = EngineResult(
            url=item.url,
            reduced_url=item.reduced_url,
            title=item.title,
            sentiment=item.sentiment,
            average_sentiment=average_sentiment,
            language=item.language,
            personal_data=item.personal_data
        )
        res.append(new_item)
    
    return res