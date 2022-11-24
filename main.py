from flask import Flask, request
from flask_cors import CORS
from flask_jwt_extended import (JWTManager, create_access_token, verify_jwt_in_request, get_jwt_identity,
                                )
from waitress import serve

from datetime import timedelta
import requests

import utils
from candidateBlueprints import candidate_blueprints
from partyBlueprints import party_blueprints
from tableBlueprints import table_blueprints
from resultsBlueprints import result_blueprints
from userBlueprints import user_blueprints
from permissionBlueprints import permission_blueprints

app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = "hello"
cors = CORS(app)
jwt = JWTManager(app)
app.register_blueprint(candidate_blueprints)
app.register_blueprint(party_blueprints)
app.register_blueprint(table_blueprints)
app.register_blueprint(result_blueprints)
app.register_blueprint(user_blueprints)
app.register_blueprint(permission_blueprints)


@app.before_request
def before_request_callback():
    endpoint = utils.clean_url(request.path)
    exclude_routes = ['/login', '/']
    if endpoint in exclude_routes:
        pass
    elif verify_jwt_in_request():
        user = get_jwt_identity()
        if user.get('rol'):
            has_grant = utils.validate_grant(endpoint, request.method, user['rol'].get('idRol'))
            if not has_grant:
                return {"message": "Permission denied"}, 401
        else:
            return {"message": "Permission denied"}, 401


@app.route("/", methods=['GET'])
def home():
    response = {"message": "Welcome to API"}
    return response


@app.route("/login", methods=['POST'])
def login() -> tuple:
    user = request.get_json()
    url = data_config.get("url-backend-security") + "/user/login"
    response = requests.post(url, headers=utils.HEADERS, json=user)
    if response.status_code == 200:
        user_logged = response.json()
        del user_logged['rol']['permissions']
        expires = timedelta(days=1)
        access_token = create_access_token(identity=user_logged, expires_delta=expires)
        return {"token": access_token, "user_id": user_logged.get('id')}, 200
    else:
        return {"message": "Access denied"}, 401


if __name__ == "__main__":
    data_config = utils.load_file_config()
    print("API is running http://" + data_config.get("url-api-gateway") + ":" + str(data_config.get("port")))
    serve(app, host=data_config.get("url-api-gateway"), port=data_config.get("port"))
