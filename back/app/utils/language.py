from textblob import TextBlob
from langdetect import detect
import requests
from bs4 import BeautifulSoup

def get_language(url: str, title: str):
    if url.find("lang=") is not -1:
        tmp = url.split("lang=")

        return tmp[1]
    
    response = requests.get(url)
    
    if response.status_code is not 200:
        b = TextBlob(title)
    else:
        content = response.text
        soup = BeautifulSoup(content, 'html.parser')
        text = soup.get_text()
        b = TextBlob(text)
    
    text = str(b)
    
    return detect(text)