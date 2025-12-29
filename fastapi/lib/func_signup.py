import hashlib
import random

from lib.utilities import dynamodbs, response


def main(params: dict) -> dict:
    try:
        body: dict = params["body"]
        email: str = body.get("email")
        password: str = body.get("password")

        if not email or not password:
            raise Exception({
                "status_code": 400,
                "exception": "Bad Request",
                "error_code": "func_signup.missing_parameters",
            })

        hashed_password = hashlib.sha256(password.encode()).hexdigest()

        otp = str(random.randint(100000, 999999))
        options = {
            "otp": otp,
            "enabled": False,
        }

        dynamodbs.put_user(email, hashed_password, options)

        res = {"email": email}
        return response.response_handler(body=res, status_code=200)

    except Exception as e:
        return response.error_handler(e)
