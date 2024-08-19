package goodfood.product.Controllers;

import java.util.UUID;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import goodfood.product.Entity.Product;

@RestController
@RequestMapping("/api/products")
class ProductController {
    @GetMapping("")
    Product[] getAllProducts() {
        Product[] products = new Product[10];

        for (int i = 0; i < 10; i++) {
            Product product = new Product();
            product.setName("Mon produit " + i);
            UUID id = UUID.randomUUID();
            product.setId(id);
            products[i] = product;
        }

        return products;
    }
}