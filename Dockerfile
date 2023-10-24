FROM openjdk:20

RUN mkdir -p /in-touch
WORKDIR /in-touch

COPY ./src/server/src/. /in-touch/src/
COPY ./src/server/.mvn/. /in-touch/.mvn/
COPY ./src/server/uploads/. /in-touch/uploads/
COPY ./src/server/pom.xml /in-touch/pom.xml
COPY ./src/server/mvnw /in-touch/mvnw

ENTRYPOINT ["./mvnw", "spring-boot:run"]