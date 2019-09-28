import requests
import yaml

#stream = file('cred.txt', 'r')
auth_token = ''
with open('creds.txt' ) as f:
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

print(join_url)
