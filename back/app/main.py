from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Optional, Union
from schemas import EngineResult, PersonalData, NetworkAppearances
from services.google import google_search
from utils.sentiment import get_sentiment
from network_appearances import calculate_network_appearances
from utils.holehe_data import extract_holehe_data
from services.duckduckgo import duckduckgo_search

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:5173",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/get_google_infos")
async def get_google_infos(
    query: str, 
    num_results: int = 10,
    networks: Optional[List[str]] = Query(None)
) -> Dict[str, Union[List[EngineResult], List[NetworkAppearances]]]:
    
    print('qu: ', query)
    query = query.replace(' ', '+')
    
    # for network in networks:
    #     if query.find("site") != -1:
    #         query = query + " OR"
    #     else:
    #         query = query + " AND"
    #     query = query + " site:" + network
    print('qu af: ', query)
    
    engine_results = google_search(query, num_results)
    network_appearances = calculate_network_appearances(engine_results)

    return {"EngineResults": engine_results, "NetworkAppearances": network_appearances}

@app.get("/get_duckduckgo_infos")
async def get_duckduckgo_infos(query: str, num_results: int = 10) -> Dict[str, Union[List[EngineResult], List[NetworkAppearances]]]:
    engine_results = duckduckgo_search(query, num_results)
    network_appearances = calculate_network_appearances(engine_results)
    
    return {"EngineResults": engine_results, "NetworkAppearances": network_appearances}

@app.get("/get_combined_infos", response_model=Dict[str, Union[List[EngineResult], List[NetworkAppearances]]])
async def get_combined_infos(
    query: str, 
    num_results: int = 10, 
    sources: Optional[List[str]] = Query(None)
):
    engine_results = []
    network_appearances = []

    if not sources or "google" in sources:
        engine_results.extend(google_search(query, num_results))
        network_appearances.extend(calculate_network_appearances(engine_results))
    if not sources or "duckduckgo" in sources:
        engine_results.extend(duckduckgo_search(query, num_results))
        network_appearances.extend(calculate_network_appearances(engine_results))

    return {"EngineResults": engine_results, "NetworkAppearances": network_appearances}

@app.get("/get_sentiment_by_url")
def get_sentiment_by_url(url: str) -> float:
    return get_sentiment(url)

@app.get("/get_sentiments_by_urls")
def get_sentiments_by_urls(urls: List[str]) -> Dict[str, float]:
    sentiment_scores = {}

    for url in urls:
        sentiment_score = get_sentiment(url)
        sentiment_scores[url] = sentiment_score

    return sentiment_scores

@app.get("/get_sentiments_by_query")
async def get_sentiments_by_query(query: str) -> Dict[str, float]:
    sentiment_scores = {}
    items = await get_google_infos(query)

    for item in items:
        sentiment_score = get_sentiment(item.url)
        sentiment_scores[item.url] = sentiment_score

    return sentiment_scores

# @app.get("/get_personal_data")
# async def get_personal_data(query: str) -> List[PersonalData]:
#     items = await get_google_infos(query)
#     personal_data = []

#     for item in items:
#         personal_data.append(extract_personal_data(item.url, query))

#     return personal_data

@app.get("/get_holehe_infos")
async def get_holehe_infos() -> List[str]:
    return extract_holehe_data()