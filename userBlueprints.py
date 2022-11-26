from flask import Blueprint, request
import requests
from utils import load_file_config, HEADERS

user_blueprints = Blueprint("user_blueprints", __name__)
data_config = load_file_config()
url_base = data_config.get('url-backend-security') + "/user"
# Endpoint where can find all users calling the backend java


@user_blueprints.route('/users', methods=['GET'])
def get_all_users() -> dict:
    url = url_base + "/all"
    response = requests.get(url, headers=HEADERS)
    return response.json()
# Endpoint where find a user by id_ calling the backend java


@user_blueprints.route("/user/<string:id_>", methods=['GET'])
def get_user_by_id(id_: int) -> dict:
    url = url_base + f"/{id_}"
    response = requests.get(url, headers=HEADERS)
    return response.json()
# Endpoint where create a user calling the backend java


@user_blueprints.route("/user/insert", methods=['POST'])
def insert_user() -> dict:
    user = request.get_json()
    url = url_base + "/insert"
    response = requests.post(url, headers=HEADERS, json=user)
    return response.json()
# Endpoint where update a user calling the backend java


@user_blueprints.route("/user/update/<string:id_>", methods=['PUT'])
def update_user(id_: int) -> dict:
    user = request.get_json()
    url = url_base + f"/update/{id_}"
    response = requests.patch(url, headers=HEADERS, json=user)
    return response.json()
# Endpoint where delete a user calling the backend java


@user_blueprints.route("/user/delete/<string:id_>", methods=['DELETE'])
def delete_user(id_: int) -> tuple:
    url = url_base + f"/delete/{id_}"
    response = requests.delete(url, headers=HEADERS)
    return {"message": "processed"}, response.status_code
