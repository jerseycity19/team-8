import smtplib
import requests
import yaml
import sys
import re
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# test


def sendMail(meeting_url, usersList):
    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.ehlo()
    server.starttls()
    server.ehlo()

    email_address = ''
    password = ''
    with open('creds.txt') as f:
        data = yaml.load(f, Loader=yaml.FullLoader)
        email_address = data['email_address']
        password = data['password']

    server.login(email_address, password)

    # subject = 'Zoom Invitation Link'
    # body = 'Click on the following link to join the meeting: ' + meeting_url

    # msg = f"Subject: {subject}\n\n{body}"

    text = """\
    Hi,
    How are you?
    Here is your Zoom meeting link: """ + meeting_url

    html = """\
    <html><center>
    <div>
    <img src="https://pbs.twimg.com/profile_images/2027772417/gng_texture_blue_180x180_400x400.gif" style="width:250px;height:250px;"
    <br>
    </div>
    <head><strong>Zoom Meeting Invitation</strong></head>
    <body>
        <p>Thank you for signing up for a Zoom meeting!<br>
        Please join the meeting at the link below.
        <br><br><h1>{meeting_url}</h1><br>
        </p>
    </body>
    </html>
    """.format(meeting_url=meeting_url)

    message = MIMEMultipart("alternative")
    message["Subject"] = "Zoom Invitation Link"
    message["From"] = email_address

    part1 = MIMEText(text, "plain")
    part2 = MIMEText(html, "html")

    message.attach(part1)
    message.attach(part2)

    regex = '^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$'

    for user in usersList:
        message["To"] = user
        if(re.search(regex, user)):
            server.sendmail(email_address, user, message.as_string())
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
