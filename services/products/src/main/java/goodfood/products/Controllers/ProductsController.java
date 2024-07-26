package goodfood.products.Controllers;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProductsController {
  @GetMapping("/api/products")
  @ResponseStatus(HttpStatus.OK)
  public String index() {
    return "OK";
  }
}
