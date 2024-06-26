docker build -t react-app-image .
docker run --name react-app --rm --network my-network -p 3000:3000 react-app-image