FLASK_IMAGE_NAME="demo-flask-react-app-image"
FLASK_CONTAINER_NAME="demo-flask-react-app"

docker build -t ${FLASK_IMAGE_NAME} .
docker run -p 5000:5000 --rm --name ${FLASK_CONTAINER_NAME} --ip 172.27.0.4 --network my-network ${FLASK_IMAGE_NAME}