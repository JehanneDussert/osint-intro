## OSINT

Open Source Intelligence: method of collecting, analyzing, exploiting data from open and publicky accessible sources to obtain relevant information about a specific subject.<br/>
Created in 1942 by the Office of Strategic Services.

### Open Sources
Can include websites, social media, public databases, online forums, public documents, academic publications etc.

### Fields
Security, legal research, investigative journalism etc.

### Techniques
Internet research, geospatial analysis, NLP, mapping etc.

### Goals
Identify potential threats, detect trends, assess risks, support strategic decisions, confirm reports, locate missing persons etc.

### Main concepts
- [x] data collection
- [x] data processing: for instance w/ Pandas, NumPy, Scikit-learn
- [x] data analysis: for instance w/ Matplotlib, Seaborn, TensorFlow
- [x] data sources
- [x] ethics & compliance

## Project

Create an application that allows me to perform advanced Google searches.
Features:
- Settings menu: Google dorks (filetype, social networks), choice of search engine
- Summary of results: graph showing the distribution on social networks and average sentiment extracted from the results (positive content > 0 or negative < 0)
- Details of results: page title, source, language, sentiment, potentially found personal data

Project breakdown:
- [x] Back-end: FastAPI
- [x] Front-end: React + TypeScript + Tailwind + Mui
- [x] Dockerized app
- [ ] Tests

### Usage

To set up the project, run:
```
source setup.sh
```

To start the back-end:
```
uvicorn main:app --reload
```

To start the front-end:
```
npm run dev
```

### Demo

#### Basic search

<p align="center">
	<img src="./demo/basic.png" >
</p>

#### Dorks

##### Social networks

- Basic

<p align="center">
	<img src="./demo/Dorks-social-networks.png" >
</p>

- Details

<p align="center">
	<img src="./demo/Dorks-social-networks-details.png" >
</p>

##### Filetype

- Basic

<p align="center">
	<img src="./demo/Dorks-filetype.png" >
</p>

- Details

<p align="center">
	<img src="./demo/Dorks-filetype-details.png" >
</p>

### Back-end

#### FastAPI: 
- [x] web framework created in 2018
- [x] enables to create RESTful API in Python

#### Endpoints
- [x] Informations: 
    - /get_google_infos
    - /get_duckduckgo_infos
    - /get_combined_infos
- [x] Sentiments: 
    - by url: /get_sentiments_by_urls or /get_sentiment
    - by query: /get_sentiment_by_query
- [x] Use holehe: /get_holehe_infos

#### Web scraping with Beautiful Soup

Beautiful Soup is used to scrape data from web pages. It allows you to parse HTML and extract the information you need.

#### Sentiment analysis and language detection with TextBlob

TextBlob is used to perform sentiment analysis and detect the language of the text.

#### TODO
- [x] multi-sources research
- [x] social media integration
- [ ] actuality
- [ ] search by language
- [ ] tests

#### About RESTful API

Architectural style for designing networked applications.
Key characteristics:
- [x] resource-based, e.g. resources are identified by unique URIs -> `/users/{user_id}`
- [x] CRUD Operations: Create (POST), Read (GET), Update (PUT/PATCH), Delete (DELETE)
- [x] Stateless: server does not maintain any client state between requests
- [x] Uniform Interface: w/ standard HTTP methods, status codes, media types for representing data (JSON or XML)
- [x] Hypermedia as the Engine of Application State (HATEOAS)
- [x] Cacheable


<!-- 
#### Concepts

- [x] décorateurs -->