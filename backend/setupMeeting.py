import smtplib
import requests
import yaml
import sys
import re

# test


def sendMail(meeting_url, usersList):
    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.ehlo()
    server.starttls()
    server.ehlo()

    email = ''
    password = ''
    with open('creds.txt') as f:
        data = yaml.load(f, Loader=yaml.FullLoader)
        email = data['email']
        password = data['password']

    server.login(email, password)

    subject = 'Zoom Invitation Link'
    body = 'Click on the following link to join ' + meeting_url

    msg = f"Subject: {subject}\n\n{body}"

    regex = '^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$'

    for user in usersList:
        if(re.search(regex, user)):
            server.sendmail(email, user, msg)
        else:
            raise Exception("Invalid email address.")

    server.quit()


def createMeeting():
    auth_token = ''
    with open('creds.txt') as f:
        data = yaml.load(f, Loader=yaml.FullLoader)
        auth_token = data['auth_token']

    hed = {'Authorization': 'Bearer ' + auth_token}
    userId = "r7INH_CWTimJmjFRUxQLog"
    data = {
        "topic": "topic",
        "type": 2,
        "start_time": "2018-10-30T22:00:00Z",
        "duration": 60,
        "timezone": "America/New_York",
        "settings": {
            "host_video": True,
            "participant_video": True,
            "join_before_host": True
        }
    }

    url = 'https://api.zoom.us/v2/users/{}/meetings'.format(userId)
    response = requests.post(url, json=data, headers=hed)

    join_url = response.json()["join_url"]

    return join_url


if __name__ == "__main__":
    emails = sys.argv[1].split(",")
    sendMail(createMeeting(), emails)
