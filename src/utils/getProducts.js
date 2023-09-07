export default function getProducts(cartProducts, productsDetail) {
    return cartProducts.map((prod) => {
        const details = productsDetail.find((details) => details.id === prod.productID);

        return {
            count: prod.count,
            instanceID: prod.instanceID,
            colorTheme: prod.properties.colorThemes,
            ...details,
        };
    });
}
