from funcs.utilities import errors
from funcs.utilities.dynamodb_client import DynamoDBClient
from funcs.utilities.jwt_client import JwtClient
from funcs.utilities.response_handler import ResponseHandler


def main(params: dict) -> dict:
    try:
        headers: dict = params["headers"]
        id_token: str = headers.get("authorization")

        decoded = JwtClient().verify_id_token(id_token)
        params.update({"email": decoded["email"]})

        method: str = params["method"]
        if method == "GET":
            res = get(params)

        return ResponseHandler().response(body=res, status_code=200)

    except Exception as e:
        return ResponseHandler().error_response(e)


def get(params) -> dict:
    email: str = params["email"]

    db_client = DynamoDBClient()
    tree = db_client.get_tree(email=email)
    if not tree:
        raise errors.NotFoundError("func_trees.not_found")

    res = {
        "node_tree": tree.node_tree.to_dict(),
    }

    return res
