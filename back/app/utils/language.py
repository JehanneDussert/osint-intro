from textblob import TextBlob
from langdetect import detect

def get_language(text: str) -> str:
    b = TextBlob(text)
    
    return detect(str(b))