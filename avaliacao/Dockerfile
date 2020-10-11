FROM node:10-alpine as angular
WORKDIR /app
COPY package.json /app
RUN npm install --silent
COPY . .
RUN npm run build

FROM nginx
COPY --from=angular dist/avaliacao /usr/share/nginx/html
RUN chmod -R 777 /usr/share/nginx/html/