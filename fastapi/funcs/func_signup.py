import secrets

from funcs.entities.user import User
from funcs.utilities import errors
from funcs.utilities.bcrypt_hash import BcryptHash
from funcs.utilities.dynamodb_client import DynamoDBClient
from funcs.utilities.response_handler import ResponseHandler
from funcs.utilities.smtp_client import SmtpClient


def main(params: dict) -> dict:
    try:
        body: dict = params["body"]
        email: str = body.get("email")
        password: str = body.get("password")

        if not email or not password:
            raise errors.BadRequestError("func_signup.missing_params")

        db_client = DynamoDBClient()
        user = db_client.get_user(email)
        if user and user.options.enabled:
            raise errors.ConflictError("func_signup.conflict_user")

        password = BcryptHash().bcrypt_hash(password)
        options = {
            "otp": f"{secrets.randbelow(1000000):06d}",
            "enabled": False,
        }

        new_user = User(email, password, options)

        db_client.put_user(new_user)
        SmtpClient().send_mail(
            email,
            "ユーザ仮登録完了のお知らせ",
            f"ユーザ仮登録が完了しました。認証画面で以下の認証コードを入力してください。<br><br>認証コード: {new_user.options.otp}"
        )

        res = {"email": new_user.email}
        return ResponseHandler().response(body=res, status_code=200)

    except Exception as e:
        return ResponseHandler().error_response(e)
