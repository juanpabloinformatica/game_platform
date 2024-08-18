FROM node:16.13.1

WORKDIR /usr/src/app

COPY ./frontend/package*.json ./
# COPY nodemon.json ./
COPY ./frontend/tsconfig.json ./

RUN npm i

COPY ./frontend/ .
RUN sed -i 's/false/true/g' ./src/variables.ts

CMD npm run dev
