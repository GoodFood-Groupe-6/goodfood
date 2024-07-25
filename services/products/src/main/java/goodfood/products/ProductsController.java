package goodfood.products;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProductsController {
  @GetMapping("/")
  public String index() {
    return "Greetings from Spring Boot!";
  }
}
