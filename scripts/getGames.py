import json
import os
import time

import requests
from bs4 import BeautifulSoup
output_file = "src/xbox_games2.json"
print(os.getcwd())
previous = set()
try:
    with open(output_file, 'r') as open_file:
        games = json.load(open_file)
        for game in games:
            previous.add(game['title'])
except:
    games = []

# Function to get game description and download the image
def get_game_description_and_image(game_url, image_folder='public/images'):
    # Make sure the image folder exists
    if not os.path.exists(image_folder):
        os.makedirs(image_folder)

    response = rate_limited_request(game_url)
    soup = BeautifulSoup(response.text, 'lxml')

    # Get the game description from the infobox
    infobox = soup.find('table', class_='infobox')
    description = "Description not found"
    if infobox:
        # Get the next <p> tag immediately after the infobox table
        next_paragraph = infobox.find_next('p')
        if next_paragraph:
            description = next_paragraph.get_text()
        else:
            print("No <p> found after infobox.")
    else:
        print("Infobox not found.")

    # Try to find the image in the infobox-image div
    image_url = None
    info_table = soup.find('table', class_='infobox')
    if info_table:
        img_tag = info_table.find('img')
        if img_tag and img_tag.get('src'):
            image_url = "https:" + img_tag['src']
    image_path = None
    if image_url:
        retries = 3
        while retries:
            # Download the image
            img_response = rate_limited_request(image_url)
            image_path = os.path.join(image_folder, os.path.basename(image_url))
            with open(image_path, 'wb') as f:
                f.write(img_response.content)
            image_size = os.path.getsize(image_path)
            print(f"Image written to {image_path} with size {image_size}")
            if image_size < 10000:
                retries -= 1
                print("Image too small. Retrying.")
            else:
                return description, image_path
    return description, image_path


# Don't spam wikipedia.
def rate_limited_request(url):
    retries = max_retries = 5
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
        "Referer": "https://en.wikipedia.org/",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,image/jpeg, image/png, image/*;q=0.8, */*;q=0.5"
    }
    wait_time = 2 * (2 ** (max_retries - retries))
    # Sleep upfront.
    time.sleep(wait_time)
    while retries:
        try:
            print(f"Fetching url: {url}")
            return requests.get(url, headers=headers)
        except Exception as e:
            print(f"Failed to make request {url}:  {e}")
            retries -= 1
            if retries:
                print(f"Waiting {wait_time} seconds before retrying...")
                time.sleep(wait_time)

# Main function to scrape the list of games
def scrape_xbox_games():
    url = "https://en.wikipedia.org/wiki/List_of_Xbox_Series_X_and_Series_S_games"
    response = rate_limited_request(url)
    soup = BeautifulSoup(response.text, 'lxml')

    # Find the tables containing game titles
    game_table = soup.find_all('table', class_='wikitable')[1]

    # Loop through each row in the table
    for row in game_table.find_all('tr')[2:]:  # Skip the header row
        cols = row.find_all('td')

        if len(cols) > 1:
            title_row = row.find('th')
            if not title_row:
                continue
            game_title = title_row.get_text(strip=True)
            if game_title in previous:
                continue
            category = row.find_all('td')[0].get_text(strip=True)
            print(f"{game_title}: {category}")
            game_link = title_row.find('a')  # Check if the title is a link

            if game_link:
                # If it's a link, follow the link to get more information
                game_url = 'https://en.wikipedia.org' + game_link['href']
                description, image_path = get_game_description_and_image(game_url)
            else:
                description = "No description available"
                image_path = None

            games.append({
                'title': game_title,
                'category': category,
                'description': description,
                'image_path': image_path
            })

    return


# Function to save the data to a JSON file
def save_to_json(data, filename=output_file):
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=4)


# Scrape the games and save to a JSON file
try:
    scrape_xbox_games()
finally:    # Save the data to a JSON file
    save_to_json(games)


print(f"Data saved to xbox_games.json")
