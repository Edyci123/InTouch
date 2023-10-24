FROM openjdk:20
COPY ./src/server/target/InTouch-0.0.1-SNAPSHOT.jar in-touch.jar
ENTRYPOINT [ "java", "-jar", "/in-touch.jar" ]