from lib import func_logout

from .conftest import logger


class TestSuccessPost:
    def test_func_logout_normal(self, id_token):
        params = {
            "method": "POST",
            "headers": {
                "content-type": "application/json",
                "authorization": f"Bearer {id_token}"
            },
            "body": {},
            "query_params": {},
        }
        response = func_logout.main(params)
        logger(response)
        assert response["status_code"] == 200

        body: dict = response["body"]
        assert body.get("result") == "success"


class TestFailPost:
    def test_func_logout_no_token(self):
        params = {
            "method": "POST",
            "headers": {
                "content-type": "application/json",
                "authorization": ""
            },
            "body": {},
            "query_params": {},
        }
        response = func_logout.main(params)
        logger(response)
        assert response["status_code"] == 400
