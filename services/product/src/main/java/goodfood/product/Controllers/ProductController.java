package goodfood.product.Controllers;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import goodfood.product.Entity.Product;
import goodfood.product.Repository.ProductRepository;

@RestController
@RequestMapping("/api/products")
class ProductController {

    @Autowired
    private ProductRepository repository;

    @GetMapping("")
    List<Product> getProducts(@RequestParam(required = false) String userId) {
        if (userId != null) {
            List<Product> productsList = repository.getProductByUserId(userId);
            return productsList;
        } else {
            List<Product> productsList = repository.findAll();
            return productsList;
        }
    }

    @PostMapping("/create")
    Product createProduct(@RequestBody Product product) {
        UUID id = UUID.randomUUID();

        product.setId(id);
        repository.save(product);

        return product;
    }
}