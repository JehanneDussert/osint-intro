import subprocess
from typing import List
from fastapi import HTTPException

def run_holehe_email(email_address: str) -> List[str]:
    process = subprocess.Popen(['holehe', email_address], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    stdout, stderr = process.communicate()
    sites = stdout.decode()
    
    sites_with_plus = [site.strip() for site in sites.split('\n') if site.startswith("[+]")]
    parsed_sites = [site.replace("[+] ", "") for site in sites_with_plus]
    parsed_sites = parsed_sites[:-3]
    
    return parsed_sites

def extract_holehe_data() -> List[str]:
    email_addresses = ["test@mail.com"]
    email_info = []

    for email in email_addresses:
        email_info.extend(run_holehe_email(email))

    if len(email_info) == 0:
        raise HTTPException(status_code=404, detail="Aucune information trouvée.")
    
    return email_info