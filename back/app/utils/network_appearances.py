from pydantic import BaseModel
from typing import List
from collections import defaultdict
from urllib.parse import urlparse
import re
from app.schemas import NetworkAppearances, EngineResult

def extract_domain(url: str) -> str:
    # match = re.search(r"(?:https?://)?(?:www\.)?([^/.]+)", url)
    # if match:
    #     domain = match.group(1)
    #     return domain
    # else:
    #     return ""
    
    domain = url.replace("https://", "")
    domain = domain.replace(".com", "")
    domain = domain.replace("www.", "")
    domain = domain.replace(".fr", "")
    domain = domain.replace("fr.", "")
    domain = domain.replace(".net", "")
    domain = domain.replace(".int", "")
    domain = domain.replace(".org", "")
    
    return domain

def calculate_network_appearances(engine_results: List[EngineResult]) -> List[NetworkAppearances]:
    domain_counts = defaultdict(int)
    
    for result in engine_results:
        domain = extract_domain(result.reduced_url)
        domain_counts[domain] += 1
    
    network_appearances = []
    
    for domain, count in domain_counts.items():
        network_appearances.append(NetworkAppearances(type=domain, appearances=count))

    return network_appearances
        