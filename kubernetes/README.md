# goodfood

## Prérequis

- [OpenLens](https://github.com/MuhammedKalkan/OpenLens)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Activer l'extension Kubernetes dans Docker Desktop](https://docs.docker.com/desktop/kubernetes/#install-and-turn-on-kubernetes)

## Port Mapping
| PORT  | SERVICE  |
|-------|----------|
| 30000 | USER     |
| 30001 | ORDER    |
| 30002 | PRODUCT  |
| 30003 | RABBITMQ |
| 30004 | ADMIN    |

## Créer le namespace Goodfood

```sh
kubectl create ns goodfood
```

## Lancer les différents fichiers Kubernetes

```sh
kubectl apply -R -f ./kubernetes -n goodfood
```

## Récupérer les logs d'un pod

Récupérer l'ensemble des informations du namespace

```sh
kubectl get all -o wide -n goodfood
```

Récupérer les logs pour un pod spécifique

```sh
kubectl get logs admin-deployment-6d886bbd7c-q54lw -n goodfood
```

## Faire communiquer le microservice user avec le microservice admin

Faire une requête POST sur http://localhost:30001/
ou via curl depuis un terminal.

```sh
curl -X POST http://localhost:30001/
```

PS : On peut communiquer directement avec le service car j'ai mis le type nodePort.

## Exemple de deplyment pour Terraform 
````yaml
apiVersion: v1
kind: Service
metadata:
  name: product-service
  namespace: goodfood
spec:
  type: LoadBalancer
  selector:
    app: product
  ports:
    - name: "http"
      port: 80
      targetPort: 8080
````
