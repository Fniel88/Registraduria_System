from flask import Blueprint
from controllers.reportsController import ReportsController


report_blueprints = Blueprint('report_blueprints', __name__)
report_controller = ReportsController()

# Endpoint that gives whole reports by candidate


@report_blueprints.route("/reports/results_by_candidate", methods=['GET'])
def get_votes_by_candidates():
    response = report_controller.get_votes_by_candidate()
    return response, 200
# Endpoint that gives whole endpoints by table


@report_blueprints.route("/reports/results_by_table", methods=['GET'])
def get_votes_by_tables():
    response = report_controller.get_votes_by_table()
    return response, 200
# Endpoint that gives whole endpoints by party


@report_blueprints.route("/reports/results_by_party", methods=['GET'])
def get_votes_by_parties():
    response = report_controller.get_votes_by_party()
    return response, 200


# Endpoint that gives a distribution per party
@report_blueprints.route("/reports/percentage_by_party", methods=['GET'])
def get_percentage_votes_by_party():
    response = report_controller.get_percentage_by_party()
    return response, 200
