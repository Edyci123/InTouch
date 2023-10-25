FROM openjdk:20

RUN mkdir -p /in-touch/src/server
WORKDIR /in-touch/src/server/

COPY ./src/server/src/. /in-touch/src/server/src/
COPY ./src/server/.mvn/. /in-touch/server/.mvn/
COPY ./src/server/uploads/. /in-touch/server/uploads/
COPY ./src/server/pom.xml /in-touch/server/pom.xml
COPY ./src/server/mvnw /in-touch/server/mvnw

ENTRYPOINT ["./mvnw", "spring-boot:run"]

FROM node:18 as fe-app

RUN mkdir -p /in-touch/src/app
WORKDIR /in-touch/src/app/

COPY ./src/app/package*.json /in-touch/src/app/

RUN npm install

COPY ./src/app/ /in-touch/src/app/

RUN npm run build

FROM nginx:1.25.3

COPY --from=fe-app ./in-touch/src/app/dist /usr/share/nginx/html

EXPOSE 8100

CMD ["nginx", "-g", "daemon off;"]
