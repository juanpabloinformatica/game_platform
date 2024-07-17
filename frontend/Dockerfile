FROM node:16.13.1

WORKDIR /usr/src/app
COPY ./website_frontend/package*.json ./
# COPY nodemon.json ./
COPY ./website_frontend/tsconfig.json ./

RUN npm i

COPY ./website_frontend/ .
CMD npm run dev
