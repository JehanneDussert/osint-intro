import re
from urllib.parse import urlparse
import requests
from bs4 import BeautifulSoup
from textblob import TextBlob
from typing import List
from schemas import EngineResult

# def extract_domain(url: str) -> str:
#     match = url.replace("https://", "")
#     test = url
#     new = test.split("lang=")
#     # print('nex: ', test.find("lang="))
#     if test.find("lang="):
#         print('trouvé: ', new)
#     # test = url[test:]
#     # print('test: ', new[1])
#     match = match.replace(".com", "")
#     match = match.replace("www.", "")
#     match = match.replace(".fr", "")
#     match = match.replace("fr.", "")
#     match = match.replace(".net", "")
#     match = match.replace(".int", "")
#     match = match.replace(".org", "")
        
#     return match
#     # if match:
#     #     domain = match.group(1)
#     #     return domain
#     # else:
#     #     return ""

# print(extract_domain('https://fr.linkedin.com?lang=fr'))
# print(extract_domain('https://www.eig.numerique.gouv.fr'))
# print(extract_domain('https://twitter.com'))
# print(extract_domain('https://www.malt.fr'))
# print(extract_domain('https://gen.grandestnumerique.org'))
# print(extract_domain('https://medium.com'))
# print(extract_domain('https://github.com'))

# print(extract_domain('https://fr.linkedin.com'))
# print(extract_domain('https://www.youtube.com'))
# print(extract_domain('https://www.verif.com'))
# print(extract_domain('https://targeting-ai.com'))
# print(extract_domain('https://www.vuibert.fr'))
# print(extract_domain('https://radio.amicus-curiae.net'))

# print(extract_domain('https://mathinfo.unistra.fr'))
# print(extract_domain('https://www.coe.int'))

# print(extract_domain('https://www.facebook.com'))

# def get_sentiment(url: str) -> float:
#     response = requests.get(url)
#     content = response.text
#     # print(content)
#     soup = BeautifulSoup(content, 'html.parser')
#     text = soup.get_text()
#     # print('text: ', text)
    
#     blob = TextBlob(text)
#     print(blob.sentiment)
#     sentiment_score = blob.sentiment.polarity
    
#     return sentiment_score

# get_sentiment('https://clay.earth/profile/jehanne-dussert')

def change_query(query: str, sites: [str]):
    # print('query: ', query)
    query = "\"" + query + "\""
    for site in sites:
        if query.find("site") != -1:
            query = query + " OR"
        else:
            query = query + " AND"
        query = query + " site:" + site
    # print(query)
    
change_query("ceci est un test", ["instagram.com", "facebook.com"])