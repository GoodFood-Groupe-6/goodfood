FROM openjdk:23-slim-bullseye
WORKDIR /app
COPY build/libs/products-0.0.1-SNAPSHOT.jar goodfood-products.jar
EXPOSE 8080:8080
CMD ["java", "-jar", "goodfood-products.jar"]
