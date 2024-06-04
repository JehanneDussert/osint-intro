from pydantic import BaseModel
from typing import List
    
class PersonalData(BaseModel):
    addresses: List[str]
    phone_numbers: List[str]
    dates: List[str]
    emails: List[str]

class EngineResult(BaseModel):
    url: str
    reduced_url: str
    title: str
    sentiment: float
    average_sentiment: float
    language: str
    personal_data: PersonalData
    
class NetworkAppearances(BaseModel):
    type: str
    appearances: int