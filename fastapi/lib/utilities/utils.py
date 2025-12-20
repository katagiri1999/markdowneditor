import time
import traceback

import jwt

from lib import config


def error_handler(e: Exception) -> dict:
    try:
        args = e.args[0]

        status_code = None
        params = {}

        if type(args) is dict and args.get("status_code"):
            # Expected Errors
            status_code = args["status_code"]
            params.update({
                "exception": args.get("exception"),
                "error_code": args.get("error_code"),
            })

        else:
            # Unexpected error (internal error)
            status_code = 500
            traceback_str = traceback.format_exc()
            params.update({"exception": traceback_str})

        return response_handler(body=params, status_code=status_code)

    except Exception as e:
        raise e


def response_handler(body: dict, status_code: int = 200) -> dict:
    try:
        return {
            "headers": {"Content-Type": "application/json"},
            "status_code": status_code,
            "body": body,
        }

    except Exception as e:
        raise e


def generate_jwt(email: str) -> str:
    try:
        claim = {
            "email": email,
            "iss": config.APP_URL,
            "aud": config.APP_URL,
            "iat": int(time.time()),
            "exp": int(time.time()) + 3600,
        }

        str_jwt = jwt.encode(
            payload=claim,
            key=config.JWT_KEY,
            algorithm="HS256",
        )
        return str_jwt

    except Exception as e:
        raise e


def verify_id_token(id_token: str) -> dict:
    try:
        try:
            id_token = id_token.replace("Bearer ", "")

            json_payload: dict = jwt.decode(
                jwt=id_token,
                key=config.JWT_KEY,
                algorithms="HS256",
                audience=config.APP_URL,
                issuer=config.APP_URL,
                verify=True,
            )

            return json_payload

        except Exception:
            raise Exception({
                "exception": "Unauthorized",
                "error_code": "verify_id_token.001",
                "status_code": 401,
            })

    except Exception as e:
        raise e
