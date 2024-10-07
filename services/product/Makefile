run:
	./mvnw spring-boot:run
clean:
	docker stop javadev postgresdb && docker rm javadev postgresdb && docker volume rm product_devcontainer_postgres-data vscode
build:
	docker build -t gregcesimaalsi23/goodfood-products:latest .

push:
	docker push gregcesimaalsi23/goodfood-products:latest