# We strongly recommend using the required_providers block to set the
# Azure Provider source and version being used
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
  }
}

# Configure the Microsoft Azure Provider
provider "azurerm" {
  features {
    resource_group {
      prevent_deletion_if_contains_resources = false
    }
  }
  subscription_id = "45d7da20-4245-402a-9624-ee07e1a43d2e"
  tenant_id = "190ce420-b157-44ae-bc2f-69563baa5a3b"
}

provider "docker" {
  registry_auth {
    address  = azurerm_container_registry.acr.login_server
    username = azurerm_container_registry.acr.admin_username
    password = azurerm_container_registry.acr.admin_password
  }
}

# Création du groupe de ressources
resource "azurerm_resource_group" "rg-goodfood" {
  name     = "rg-goodfood"
  location = "westeurope"
}

# Création du cluster AKS
resource "azurerm_kubernetes_cluster" "aks-goodfood" {
  name                = "aks-goodfood"
  location            = azurerm_resource_group.rg-goodfood.location
  resource_group_name = azurerm_resource_group.rg-goodfood.name
  dns_prefix          = "aks-goodfood-dns"
  sku_tier            = "Standard"

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

# Configuration du service Azure Container Registry (ACR) pour stocker les images Docker
resource "azurerm_container_registry" "acr-goodfood" {
  name                = "acrgoodfood"
  resource_group_name = azurerm_resource_group.rg-goodfood.name
  location            = azurerm_resource_group.rg-goodfood.location
  sku                 = "Basic"
  admin_enabled       = true
}

# Attribution d'un rôle au cluster AKS pour qu'il puisse tirer des images du registre ACR
resource "azurerm_role_assignment" "aks_acr_pull" {
  principal_id                   = azurerm_kubernetes_cluster.aks-goodfood.identity[0].principal_id
  role_definition_name           = "AcrPull"
  scope                          = azurerm_container_registry.acr-goodfood.id
}

# Déploiement de l'application sur AKS