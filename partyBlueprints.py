from flask import Blueprint, request
import requests
from utils import load_file_config, HEADERS

party_blueprints = Blueprint("party_blueprints", __name__)
data_config = load_file_config()
url_base = data_config.get('url-backend-register') + "/party"


@party_blueprints.route('/partys', methods=['GET'])
def get_all_parties() -> dict:
    url = url_base + "/all"
    response = requests.get(url, headers=HEADERS)
    return response.json()


@party_blueprints.route("/party/<string:id_>", methods=['GET'])
def get_party_by_id(id_: str) -> dict:
    url = url_base + f"/{id_}"
    response = requests.get(url, headers=HEADERS)
    return response.json()


@party_blueprints.route("/party/insert", methods=['POST'])
def insert_party() -> dict:
    party = request.get_json()
    url = url_base + "/insert"
    response = requests.post(url, headers=HEADERS, json=party)
    return response.json()


@party_blueprints.route("/party/update/<string:id_>", methods=['PUT'])
def update_party(id_: str) -> dict:
    party = request.get_json()
    url = url_base + f"/update/{id_}"
    response = requests.patch(url, headers=HEADERS, json=party)
    return response.json()


@party_blueprints.route("/party/delete/<string:id_>", methods=['DELETE'])
def delete_party(id_: str) -> dict:
    url = url_base + f"/delete/{id_}"
    response = requests.delete(url, headers=HEADERS)
    return response.json()
