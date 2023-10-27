FROM openjdk:20

RUN mkdir -p /server
WORKDIR /server

COPY ./src/. /server/
COPY ./.mvn/. /server/
COPY ./uploads/. /server/
COPY ./pom.xml /server/
COPY ./mvnw /server/
w
ENTRYPOINT ["./mvnw", "spring-boot:run"]