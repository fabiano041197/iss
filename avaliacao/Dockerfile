FROM node:10-alpine as angular
WORKDIR /app
COPY . /app
RUN npm install
RUN npm install -g @angular/cli 
RUN ng build --prod

FROM nginx
COPY --from=angular app/dist/avaliacao /usr/share/nginx/html
RUN chmod -R 777 /usr/share/nginx/html/