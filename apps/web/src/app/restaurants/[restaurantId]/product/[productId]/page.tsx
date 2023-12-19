const ProductPage = ({
    params
}: {
    params: {
        restaurantId: number,
        productId: number
    }
}) => {
    console.log(params);

    return (
        <div>
            test
            {/* <h1>Restaurant ID: {restaurantId}</h1>
            <h2>Product ID: {productId}</h2> */}
            {/* Contenu de la page du produit */}
        </div>
    );
};

export default ProductPage;
