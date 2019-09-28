# script to log into a website

import requests
from bs4 import BeautifulSoup

headers = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.1 Safari/605.1.15'

POST_LOGIN_URL = "https://zoom.us/signin"

REQUEST_URL = "https://zoom.us/profile"

payload = {
    'email': 'damianjachyra@gmail.com',
    'password': 'Test123!'
}

with requests.Session() as session:
    post = session.post(POST_LOGIN_URL, data=payload)
    r = session.get(REQUEST_URL)
    soup = BeautifulSoup(r.content, 'html.parser')
    print(soup)
