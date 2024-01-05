# goodfood

## Minikube

Installer minikube

https://minikube.sigs.k8s.io/docs/start/

Je me suis basé sur ce tuto

https://kubernetes.io/docs/tutorials/hello-minikube/

### Créer un namespace goodfood

```sh
 kubectl create namespace goodfood
```

### Lancer admin

```sh
 cd ./kubernetes/admin && kubectl apply -f . -n goodfood
```

### Lancer rabbitmq

```sh
 cd ./kubernetes/rabbitmq && kubectl apply -f . -n goodfood
```

### Lancer user-management

```sh
 cd ./kubernetes/user-management && kubectl apply -f . -n goodfood
```

### Expose admin

```sh
kubectl expose deployment admin-deployment --namespace=goodfood --type=LoadBalancer --port=3000
```

### Lancer le service avec minikube

```sh
minikube service admin-deployment -n goodfood
```

### Tester

Appeler l'url en POST depuis Postman ou autre.
