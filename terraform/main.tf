terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "4.1.0"
    }
    docker = {
      source  = "kreuzwerker/docker"
      version = "2.16.0"
    }
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "2.13.1"
    }
  }
}

provider "azurerm" {
  features {}
  subscription_id = "45d7da20-4245-402a-9624-ee07e1a43d2e"
  tenant_id = "190ce420-b157-44ae-bc2f-69563baa5a3b"
}

provider "kubernetes" {
  host                   = azurerm_kubernetes_cluster.aks-goodfood.kube_config.0.host
  client_certificate     = base64decode(azurerm_kubernetes_cluster.aks-goodfood.kube_config.0.client_certificate)
  client_key             = base64decode(azurerm_kubernetes_cluster.aks-goodfood.kube_config.0.client_key)
  cluster_ca_certificate = base64decode(azurerm_kubernetes_cluster.aks-goodfood.kube_config.0.cluster_ca_certificate)
}

resource "azurerm_resource_group" "rg-goodfood" {
  name     = "rg-goodfood"
  location = "westeurope"
}

resource "azurerm_mssql_server" "mssql-srv" {
  name                         = "goodfood-db-srv"
  resource_group_name          = azurerm_resource_group.rg-goodfood.name
  location                     = "francecentral"
  version                      = "12.0"
  administrator_login          = "4dm1n157r470r"
  administrator_login_password = "4-v3ry-53cr37-p455w0rd"
}

resource "azurerm_mssql_database" "db-user" {
  name                 = "user"
  server_id            = azurerm_mssql_server.mssql-srv.id
  collation            = "SQL_Latin1_General_CP1_CI_AS"
  license_type         = "LicenseIncluded"
  max_size_gb          = 2
  sku_name             = "S0"
  enclave_type         = "VBS"
}

resource "azurerm_kubernetes_cluster" "aks-goodfood" {
  name                = "aks-goodfood"
  location            = azurerm_resource_group.rg-goodfood.location
  resource_group_name = azurerm_resource_group.rg-goodfood.name
  dns_prefix          = "aks-goodfood-dns"

  default_node_pool {
    name       = "default"
    node_count = 1
    vm_size    = "Standard_D2_v2"
  }

  identity {
    type = "SystemAssigned"
  }

  network_profile {
    network_plugin = "azure"
  }
}

resource "kubernetes_namespace" "goodfood_namespace" {
  metadata {
    name = "goodfood"
  }
}

resource "kubernetes_deployment" "deployment-user" {
  metadata {
    name = "user-deployment"
    namespace = "goodfood"
  }

  spec {
    replicas = 1

    selector {
      match_labels = {
        app = "user"
      }
    }

    template {
      metadata {
        labels = {
          app = "user"
        }
      }

      spec {
        container {
          image = "gregcesimaalsi23/goodfood-user:amd64"
          name  = "user"

          env {
            name  = "DATABASE_URL"
            value = "sqlserver://${azurerm_mssql_server.mssql-srv.name}.database.windows.net:1433;database=${azurerm_mssql_database.db-user.name};user=${azurerm_mssql_server.mssql-srv.administrator_login};password={${azurerm_mssql_server.mssql-srv.administrator_login_password};encrypt=true;trustServerCertificate=false;hostNameInCertificate=*.database.windows.net;loginTimeout=30;"
          }

          port {
            container_port = 3000
          }

          resources {
            limits = {
              cpu    = "0.5"
              memory = "512Mi"
            }
            requests = {
              cpu    = "250m"
              memory = "50Mi"
            }
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "user-service" {
  metadata {
    name = "user-service"
  }

  spec {
    selector = {
      app = kubernetes_deployment.deployment-user.spec.0.selector.0.match_labels.app
    }

    port {
      port        = 3000
      target_port = 80
    }

    type = "LoadBalancer"
  }
}