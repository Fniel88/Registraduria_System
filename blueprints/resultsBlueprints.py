from flask import Blueprint
from flask import request

from controllers.resultsController import ResultController

result_blueprints = Blueprint('result_blueprints', __name__)
result_controller = ResultController()

# Endpoint that gives all results calling the controller


@result_blueprints.route("/result/all", methods=['GET'])
def get_all_result():
    response = result_controller.get_all_result()
    return response, 200

# Endpoint that give a result by it is id calling the controller


@result_blueprints.route("/result/<string:id_>", methods=['GET'])
def get_result_by_id(id_):
    response = result_controller.get_result_by_id(id_)
    return response, 200

# Endpoint that create a reference between table and candidate in result calling the controller


@result_blueprints.route("/result/insert/table/<string:table_id>/candidate/<string:candidate_id>", methods=['POST'])
def insert_result(table_id, candidate_id):
    result = request.get_json()
    response = result_controller.insert_result(result, table_id, candidate_id)
    return response, 201

# Endpoint that update a result calling the controller


@result_blueprints.route("/result/update/<string:id_>", methods=['PATCH'])
def update_result(id_):
    result = request.get_json()
    response = result_controller.update_result(id_, result)
    return response, 201

# Endpoint that delete a result calling the controller


@result_blueprints.route("/result/delete/<string:id_>", methods=['DELETE'])
def delete_result(id_):
    response = result_controller.delete_result(id_)
    return response, 204
