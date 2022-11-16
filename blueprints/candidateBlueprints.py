from flask import Blueprint
from flask import request

from controllers.candidateController import CandidateController

candidate_blueprints = Blueprint('candidate_blueprints', __name__)
candidate_controller = CandidateController()


@candidate_blueprints.route("/candidate/all", methods=['GET'])
def get_all_candidate():
    response = candidate_controller.get_all_candidate()
    return response, 200


@candidate_blueprints.route("/candidate/<string:id_>", methods=['GET'])
def get_candidate_by_id(id_):
    response = candidate_controller.get_candidate_by_id(id_)
    return response, 200


@candidate_blueprints.route("/candidate/insert", methods=['POST'])
def insert_candidate():
    candidate = request.get_json()
    response = candidate_controller.insert_candidate(candidate)
    return response, 201


@candidate_blueprints.route("/candidate/update/<string:id_>", methods=['PATCH'])
def update_candidate(id_):
    candidate = request.get_json()
    response = candidate_controller.update_candidate(id_, candidate)
    return response, 201


@candidate_blueprints.route("/candidate/delete/<string:id_>", methods=['DELETE'])
def delete_candidate(id_):
    response = candidate_controller.delete_candidate(id_)
    return response, 204
