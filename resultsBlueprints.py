from flask import Blueprint, request
import requests
from utils import load_file_config, HEADERS

result_blueprints = Blueprint("result_blueprints", __name__)
data_config = load_file_config()
url_base = data_config.get('url-backend-register') + "/result"


@result_blueprints.route('/results', methods=['GET'])
def get_all_results() -> dict:
    url = url_base + "/all"
    response = requests.get(url, headers=HEADERS)
    return response.json()


@result_blueprints.route("/result/<string:id_>", methods=['GET'])
def get_result_by_id(id_: str) -> dict:
    url = url_base + f"/{id_}"
    response = requests.get(url, headers=HEADERS)
    return response.json()


@result_blueprints.route("/result/insert", methods=['POST'])
def insert_result() -> dict:
    result = request.get_json()
    url = url_base + "/insert"
    response = requests.post(url, headers=HEADERS, json=result)
    return response.json()


@result_blueprints.route("/result/update/<string:id_>", methods=['PUT'])
def update_result(id_: str) -> dict:
    result = request.get_json()
    url = url_base + f"/update/{id_}"
    response = requests.patch(url, headers=HEADERS, json=result)
    return response.json()


@result_blueprints.route("/result/delete/<string:id_>", methods=['DELETE'])
def delete_result(id_: str) -> dict:
    url = url_base + f"/delete/{id_}"
    response = requests.delete(url, headers=HEADERS)
    return response.json()
