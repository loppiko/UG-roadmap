FROM node:16-alpine as build

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

ENV REACT_APP_KEYCLOAK_URL=http://keycloak:8080/
ENV FLASK_APP=http://flask-app:5000/

COPY . .

EXPOSE 3000

RUN npm run build

CMD [ "npm", "start" ]