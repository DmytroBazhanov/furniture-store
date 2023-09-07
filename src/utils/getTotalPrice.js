export default function getTotalPrice(productsDetail) {
    return productsDetail.reduce((totalValue, details) => {
        const price = details.price ? details.price : details.originalPrice;

        return totalValue + price * details.count;
    }, 0);
}
