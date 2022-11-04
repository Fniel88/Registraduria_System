from flask import Blueprint
from flask import request

from controllers.candidateController import CandidateController

candidate_blueprint = Blueprint('candidate_blueprint', __name__)
candidate_controller = CandidateController


@candidate_blueprint.route("/candidate/all", methods=['GET'])
def get_all_candidates():
    response = candidate_controller.index()
    return response, 200


@candidate_blueprint.route("/candidate/<string:id_>", methods=['GET'])
def get_student_by_id(id_):
    response = candidate_controller.show(id_)
    return response, 200


@candidate_blueprint.route("/candidate/insert", methods=['POST'])
def insert_student():
    student = request.get_json()
    response = candidate_controller.create(student)
    return response, 201


@candidate_blueprint.route("/candidate/update/<string:id_>", methods=['PATCH'])
def update_student(id_):
    student = request.get_json()
    response = candidate_controller.update(id_, student)
    return response, 201


@candidate_blueprint.route("/candidate/delete/<string:id_>", methods=['DELETE'])
def delete_student(id_):
    response = candidate_controller.delete(id_)
    return response, 204
