package goodfood.product.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import goodfood.product.Entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
    /**
     * @param userId id of the user
     * @return
     */
    List<Product> getProductByUserId(String userId);
}
