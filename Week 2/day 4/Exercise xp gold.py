# Exercise 2
from urllib import request


query = "hilarious"
rating = "g"
api_key = "hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My"
limit = 10

url = (
    f"https://api.giphy.com/v1/gifs/search?"
    f"q={query}&rating={rating}&api_key={api_key}&limit={limit}"
)

response = request.get(url)

if response.status_code == 200:
    gifs_data = response.json()

    filtered_gifs = [
        gif
        for gif in gifs_data["data"]
        if int(gif["images"]["original"]["height"]) > 100
    ][:10]

    print(f"Number of gifs: {len(filtered_gifs)}")
    print(filtered_gifs)
else:
    print(f"Request failed with status code: {response.status_code}")

# Exercise 3
API_KEY = "hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My"
SEARCH_URL = "https://api.giphy.com/v1/gifs/search"
TRENDING_URL = "https://api.giphy.com/v1/gifs/trending"


def get_gifs(search_term):
    response = request.s.get(
        SEARCH_URL,
        params={
            "api_key": API_KEY,
            "q": search_term,
            "rating": "g",
            "limit": 50,
        },
    )

    if response.status_code == 200:
        return response.json().get("data", [])

    return []


def get_trending_gifs():
    response = requests.get(
        TRENDING_URL,
        params={
            "api_key": API_KEY,
            "rating": "g",
            "limit": 50,
        },
    )

    if response.status_code == 200:
        return response.json().get("data", [])

    return []


search_term = input("Enter a search term or phrase: ").strip()

gifs = get_gifs(search_term) if search_term else []

if not gifs:
    print("Couldn't find the requested term or phrase.")
    print("Showing today's trending GIFs instead.")
    gifs = get_trending_gifs()

for gif in gifs:
    print(gif["images"]["original"]["url"])
