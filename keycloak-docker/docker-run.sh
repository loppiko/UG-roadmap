# docker network create my-network
# docker volume create keycloak_data

docker run -p 8080:8080 -e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=admin \
--name keycloak \
--network my-network \
--ip 172.27.0.2 \
-v keycloak_data:/opt/jboss/keycloak/standalone/data \
quay.io/keycloak/keycloak:21.0.2 start-dev
