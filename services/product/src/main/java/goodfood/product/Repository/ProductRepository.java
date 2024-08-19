package goodfood.product.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import goodfood.product.Entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {

}
