package goodfood.products.Entities;

public class User {
    String name;
    Integer age;

    public User(String nameParam, Integer ageParam) {
        name = nameParam;
        age = ageParam;
    }

    public String getName() {
        return this.name;
    }

    public Integer getAge() {
        return this.age;
    }
}
