import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from lib import config

HTML = """
<!DOCTYPE html>
<html>
  <body style="background:#f7f7f7; padding:20px;">
    <div style="background:#fff; padding:20px; border-radius:6px;">
      <h3 style="margin:0 0 15px;">
        From <a href="https://www.cloudjex.com" style="color:#8eb8eb; text-decoration:none;">cloudjex.com</a>
      </h3>

      <p style="margin:0 0 20px; color:#555; font-size:15px;">
        {title}
      </p>

      <div style="padding:10px; background:#f7f7f7; border-left:4px solid #8eb8eb; margin-bottom:20px;">
        <p style="margin:0; color:#555;">{body}</p>
      </div>

      <p style="margin:0; color:#999; font-size:10px;">
        本メールは送信専用となります。
      </p>
    </div>
  </body>
</html>
"""


def send_mail(recipient: str, subject: str, body: str) -> None:
    SMTP_HOST = config.SMTP_HOST
    SMTP_PORT = config.SMTP_PORT
    SMTP_USER = config.SMTP_USER
    SMTP_PASS = config.SMTP_PASSWORD

    if not (SMTP_USER and SMTP_PASS and SMTP_HOST and SMTP_PORT):
        print(f"Warning: SMTP is not configured. Cannot send email to {recipient}.")
        return

    html = HTML.format(title=subject, body=body)

    msg = MIMEMultipart("alternative")
    msg["Subject"] = subject
    msg["From"] = "cloudjex.com<noreply@cloudjex.com>"
    msg["To"] = recipient

    text_part = MIMEText(body, "plain", "utf-8")
    html_part = MIMEText(html, "html", "utf-8")
    msg.attach(text_part)
    msg.attach(html_part)

    with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
        server.starttls()
        server.login(SMTP_USER, SMTP_PASS)
        server.sendmail("cloudjex.com<noreply@cloudjex.com>", recipient, msg.as_string())
