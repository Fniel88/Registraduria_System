import json

from flask import Flask
from flask import jsonify
from flask_cors import CORS
from waitress import serve

from blueprints.candidateBlueprints import candidate_blueprint


app = Flask(__name__)
cors = CORS(app)
app.register_blueprint(candidate_blueprint)


@app.route("/", methods=['GET'])
def home():
    response = {"Welcome to services of votes"}
    return jsonify(response)


# ===========================config execution code==============================================

def load_config_file():
    with open("config.json", "r") as config:
        data = json.load(config)
    return data


if __name__ == '__main__':
    data_config = load_config_file()
    print("Server is running http://" + data_config.get('url-backend') + ":" + str(data_config.get('port')))
    serve(app, host=data_config.get('url-backend'), port=data_config.get('port'))
