from pydantic import BaseModel
from typing import List
from collections import defaultdict
from urllib.parse import urlparse
import re
from schemas import NetworkAppearances, EngineResult

def extract_domain(url: str) -> str:
    match = re.search(r"(?:https?://)?(?:www\.)?([^/.]+)", url)
    if match:
        domain = match.group(1)
        return domain
    else:
        return ""

def calculate_network_appearances(engine_results: List[EngineResult]) -> List[NetworkAppearances]:
    domain_counts = defaultdict(int)
    print('ici: ', engine_results)
    
    for result in engine_results:
        print('ici for: ', result)
        domain = extract_domain(result.reduced_url)
        domain_counts[domain] += 1
    
    network_appearances = []
    
    for domain, count in domain_counts.items():
        network_appearances.append(NetworkAppearances(type=domain, appearances=count))
    print('app: ', network_appearances)
    return network_appearances
        