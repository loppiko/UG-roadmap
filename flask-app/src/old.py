from flask import Flask, jsonify, request, redirect
from flask_cors import CORS
from keycloak import KeycloakOpenID
from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity, create_access_token
from utils import readJson
import socket

# APP

app = Flask(__name__)
CORS(app)


# KEYCLOAK

keyclockSettings: dict = readJson("keycloak-config.json")
keycloakServer: str = f"http://{socket.gethostbyname("keycloak")}:{keyclockSettings['server_url']}"
flaskSettings: dict = readJson("flask-config.json")

keycloak_openid = KeycloakOpenID(
    server_url=keycloakServer,
    client_id=keyclockSettings["client_id"],
    realm_name=keyclockSettings["realm_name"]
)

# Konfiguracja JWT
app.config["JWT_SECRET_KEY"] = keyclockSettings["secret_key"] 
jwt = JWTManager(app)


# React config
reactRedirect = f"http://{socket.gethostbyname("react-app")}:{flaskSettings["redirect_react_app"]}"


@app.route('/login', methods=['GET'])
def login():
    auth_url = keycloak_openid.auth_url(reactRedirect)
    return redirect(auth_url)


@app.route('/callback', methods=['GET'])
def callback():
    code = request.args.get('code')

    # Wymiana kodu na token
    token = keycloak_openid.token(code=code, redirect_uri=reactRedirect)

    return jsonify(token)


@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200


if __name__ == "__main__":
    app.run(host=flaskSettings["host"], port=5000)
