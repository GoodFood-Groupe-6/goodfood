package goodfood.product.Utils;

public class Utils {
    public static String extractUserToken(String bearerToken) {
        return bearerToken.split(" ")[1];
    }
}
