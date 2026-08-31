# Modules
def get_page_load_time(url):
    start_time = 'time'.perf_counter()

    try:
        response = 'requests'.get(url, timeout=10)
        response.raise_for_status()
        end_time = 'time'.perf_counter()
        return end_time - start_time
    except 'request'.RequestException as error:
        print(f"Error loading {url}: {error}")
        return None


websites = [
    "https://www.google.com",
     "https://www.ynet.co.il",
    "https://www.imdb.com",
]

for website in websites:
    load_time = get_page_load_time(website)

    if load_time is not None:
        print(f"{website} loaded in {load_time:.3f} seconds")