import time

import jwt

import config
from funcs.utilities import errors


class Jwt:
    def __init__(self, payload: dict):
        self.email = payload["email"]
        self.user_group = payload["user_group"]
        self.iss = payload["iss"]
        self.aud = payload["aud"]
        self.iat = payload["iat"]
        self.exp = payload["exp"]

    def to_dict(self) -> dict:
        return {
            "email": self.email,
            "user_group": self.user_group,
            "iss": self.iss,
            "aud": self.aud,
            "iat": self.iat,
            "exp": self.exp,
        }


class JwtClient:
    def encode(self, email: str, user_group: str) -> str:
        claim = {
            "email": email,
            "user_group": user_group,
            "iss": config.APP_URL,
            "aud": config.APP_URL,
            "iat": int(time.time()),
            "exp": int(time.time()) + 3600,
        }

        return jwt.encode(
            payload=claim,
            key=config.JWT_KEY,
            algorithm="HS256",
        )

    def verify(self, id_token: str) -> Jwt:
        try:
            decoded = jwt.decode(
                jwt=id_token.removeprefix("Bearer "),
                key=config.JWT_KEY,
                algorithms="HS256",
                audience=config.APP_URL,
                issuer=config.APP_URL,
                verify=True,
            )

            if "email" not in decoded or "user_group" not in decoded:
                raise errors.UnauthorizedError

            return Jwt(decoded)

        except Exception as e:
            raise errors.UnauthorizedError from e
