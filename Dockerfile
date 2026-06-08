FROM node:20-alpine

WORKDIR /home/www/

RUN npm install -g npm && npm install -g live-server

COPY . .

WORKDIR ./srcs

CMD ["live-server","--port=8080","--host=0.0.0.0"]
