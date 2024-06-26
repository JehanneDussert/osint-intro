from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Optional, Union
from app.schemas import EngineResult, PersonalData, NetworkAppearances
from app.services.google import google_search
from app.utils.sentiment import get_sentiment
from app.utils.network_appearances import calculate_network_appearances
from app.utils.holehe_data import extract_holehe_data
from app.services.duckduckgo import duckduckgo_search

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:5173",
    "http://localhost:3000",
    "http://localhost:4173"
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
) -> Dict[str, Union[List[EngineResult], List[NetworkAppearances]]]:
    
    query = query.replace(' ', '+')
    
    print('query: ', query)
    
    engine_results = google_search(query, num_results)
    network_appearances = calculate_network_appearances(engine_results)

    return {"EngineResults": engine_results, "NetworkAppearances": network_appearances}

@app.get("/get_duckduckgo_infos")
async def get_duckduckgo_infos(query: str, num_results: int = 10) -> Dict[str, Union[List[EngineResult], List[NetworkAppearances]]]:
    engine_results = duckduckgo_search(query, num_results)
    network_appearances = calculate_network_appearances(engine_results)
    
    return {"EngineResults": engine_results, "NetworkAppearances": network_appearances}

# @app.get("/get_combined_infos", response_model=Dict[str, Union[List[EngineResult], List[NetworkAppearances]]])
# async def get_combined_infos(
#     query: str, 
#     num_results: int = 10, 
#     sources: Optional[List[str]] = Query(None)
# ):
#     engine_results = []
#     network_appearances = []

#     if not sources or "google" in sources:
#         engine_results.extend(google_search(query, num_results))
#         network_appearances.extend(calculate_network_appearances(engine_results))
#     if not sources or "duckduckgo" in sources:
#         engine_results.extend(duckduckgo_search(query, num_results))
#         network_appearances.extend(calculate_network_appearances(engine_results))

#     return {"EngineResults": engine_results, "NetworkAppearances": network_appearances}

@app.get("/get_sentiment_by_url")
def get_sentiment_by_url(url: str) -> float:
    return get_sentiment(url)

# @app.get("/get_holehe_infos")
# async def get_holehe_infos() -> List[str]:
#     return extract_holehe_data()