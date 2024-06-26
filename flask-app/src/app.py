from flask import Flask, jsonify, request
from flask_oidc import OpenIDConnect
from keycloak import KeycloakOpenID

app = Flask(__name__)

# Konfiguracja OIDC
app.config.update({
    'SECRET_KEY': 'SuperSecretKey',
    'OIDC_CLIENT_SECRETS': 'client_secrets.json',
    'OIDC_SCOPES': ['openid', 'email', 'profile'],
    'OIDC_INTROSPECTION_AUTH_METHOD': 'client_secret_post'
})

oidc = OpenIDConnect(app)

@app.route('/hello')
@oidc.require_login
def hello():
    return jsonify(message="Hello, World!")

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)