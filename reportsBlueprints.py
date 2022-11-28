from flask import Blueprint
import requests
from utils import load_file_config, HEADERS

report_blueprints = Blueprint('report_blueprints', __name__)
data_config = load_file_config()
url_base = data_config.get('url-backend-register') + "/reports"

# Endpoint where can find all reports per votes of candidates calling the backend python


@report_blueprints.route("/reports/results_by_candidate", methods=['GET'])
def report_results_by_candidate() -> dict:
    url = f'{url_base}/results_by_candidate'
    response = requests.get(url, headers=HEADERS)
    return response.json()

# Endpoint where can find all reports per votes of tables calling the backend python


@report_blueprints.route("/reports/results_by_table", methods=['GET'])
def report_results_by_table() -> dict:
    url = f'{url_base}/results_by_table'
    response = requests.get(url, headers=HEADERS)
    return response.json()

# Endpoint where can find all reports per votes of parties calling the backend python


@report_blueprints.route("/reports/results_by_party", methods=['GET'])
def report_results_by_party() -> dict:
    url = f'{url_base}/results_by_party'
    response = requests.get(url, headers=HEADERS)
    return response.json()

# Endpoint where can find all reports with a percentage per votes of parties calling the backend python


@report_blueprints.route("/reports/percentage_by_party", methods=['GET'])
def report_percentage_by_party() -> dict:
    url = f'{url_base}/percentage_by_party'
    response = requests.get(url, headers=HEADERS)
    return response.json()
