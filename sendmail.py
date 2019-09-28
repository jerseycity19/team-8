import smtplib


def sendMail():
    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.ehlo()
    server.starttls()
    server.ehlo()

    server.login('codeforgoodteam8@gmail.com', 'codeforgood')

    subject = 'Zoom Invitation Link'
    body = 'Click on the following link to join ' + 'https://google.com'

    msg = f"Subject: {subject}\n\n{body}"

    server.sendmail('codeforgoodteam8',
                    'damianjachyra@gmail.com',
                    msg
                    )

    server.quit()


sendMail()
