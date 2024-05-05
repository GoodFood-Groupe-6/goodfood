terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "3.95.0"
    }
  }
  backend "azurerm" {}
}

resource "azurerm_resource_group" "goodfood_rg" {
  name     = "goodfoodterraform"
  location = "West Europe"
}
