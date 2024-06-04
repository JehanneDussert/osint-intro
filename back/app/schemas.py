from pydantic import BaseModel
from typing import List, Dict

class EngineResult(BaseModel):
    url: str
    reduced_url: str
    title: str
    sentiment: float
    average_sentiment: float
    language: str
    
class NetworkAppearances(BaseModel):
    type: str
    appearances: int
    
class PersonalData(BaseModel):
    addresses: List[str]
    phone_numbers: List[str]
    dates: List[str]
    emails: List[str]