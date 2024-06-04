import requests
import re
from bs4 import BeautifulSoup
from schemas import PersonalData

def extract_personal_data(url: str, query: str) -> PersonalData:
    response = requests.get(url)
    content = response.text

    phone_number_pattern = r"\b0[6-7] \d{2} \d{2} \d{2} \d{2}\b"
    date_pattern = r"\b\d{1,2}[/\-]\d{1,2}[/\-]\d{4}\b"
    postal_address_pattern = r'\b\d{1,5}\s\w+\s\w+,\s\w+,\s\w+\b'
    email_pattern = r'[\w.+-]+@[\w-]+\.[\w.-]+'
    
    soup = BeautifulSoup(content, "html.parser")
    text = soup.get_text()

    phone_numbers = re.findall(phone_number_pattern, text)
    dates = re.findall(date_pattern, text)
    addresses = re.findall(postal_address_pattern, text)
    emails = re.findall(email_pattern, text)

    personal_data = PersonalData(addresses=addresses, phone_numbers=phone_numbers, dates=dates, emails=emails)

    return personal_data
