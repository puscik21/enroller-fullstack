FROM node:22-alpine AS frontend
WORKDIR /app/frontend

COPY src/frontend/package*.json ./
RUN npm install

COPY src/frontend/ ./
RUN npm run build


FROM maven:3.9-amazoncorretto-17 AS build
WORKDIR /app

COPY pom.xml .
COPY src ./src
COPY --from=frontend /app/frontend/build ./src/main/resources/public

RUN mvn clean package

FROM amazoncorretto:17-alpine
COPY --from=build /app/target/enroller-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]
