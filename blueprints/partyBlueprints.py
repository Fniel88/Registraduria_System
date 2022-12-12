from flask import Blueprint
from flask import request

from controllers.partyController import PartyController

party_blueprints = Blueprint('party_blueprints', __name__)
party_controller = PartyController()

# Endpoint that gives whole tables


@party_blueprints.route("/party/all", methods=['GET'])
def get_all_party():
    response = party_controller.get_all_party()
    return response, 200

# Endpoint that gives a party by it is id


@party_blueprints.route("/party/<string:id_>", methods=['GET'])
def get_party_by_id(id_):
    response = party_controller.get_party_by_id(id_)
    return response, 200

# Endpoint that inserts a party calling the controller


@party_blueprints.route("/party/insert", methods=['POST'])
def insert_party():
    party = request.get_json()
    response = party_controller.insert_party(party)
    return response, 201

# Endpoint that updates a party calling the controller


@party_blueprints.route("/party/update/<string:id_>", methods=['PATCH'])
def update_party(id_):
    party = request.get_json()
    response = party_controller.update_party(id_, party)
    return response, 201

# Endpoint that deletes a party calling the controller


@party_blueprints.route("/party/delete/<string:id_>", methods=['DELETE'])
def delete_party(id_):
    response = party_controller.delete_party(id_)
    return response, 204
