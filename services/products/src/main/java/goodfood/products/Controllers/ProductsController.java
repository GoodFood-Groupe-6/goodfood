package goodfood.products.Controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import goodfood.products.Entities.User;

@RestController
public class ProductsController {

  @ResponseStatus(HttpStatus.OK)
  @GetMapping("/api/products")
  public ResponseEntity<User> index() {
    try {
      User newUser = new User("Grégory", 27);
      return ResponseEntity.ok(newUser);
    } catch (Exception e) {
      System.out.println(e);
      return ResponseEntity.notFound().build();
    }
  }
}
