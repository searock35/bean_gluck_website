from bs4 import BeautifulSoup as bs


import requests

site = "https://www.amazon.com/s?k=microelectronics+circuit+analysis+and+design&i=stripbooks&crid=14I8KZHOAG6V9&sprefix=Microelectronics+Cir%2Cstripbooks%2C248&ref=nb_sb_ss_ts-a-p_1_20"

response = requests.request("GET", site)

soup = bs(response.text, 'html.parser')

print(soup.prettify())