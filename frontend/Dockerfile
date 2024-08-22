FROM node:20-bookworm AS builder
WORKDIR /home/app
# EXPOSE 4500
COPY ./frontend/package.json ./frontend/package-lock.json ./
RUN npm i
COPY ./frontend ./
RUN sed -i 's/false/true/g' ./src/variables.ts

RUN npm run build
RUN ls /home/app/dist

FROM nginx
EXPOSE 4500
COPY ./frontend/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /home/app/dist /usr/share/nginx/html

