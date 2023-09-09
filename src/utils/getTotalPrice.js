export default function getTotalPrice(productsDetail) {
    return productsDetail.reduce((totalValue, details) => {
        const price = details.price ? details.price : details.originalPrice;

        const total = Number((totalValue + price * details.count).toFixed(2));
        return total;
    }, 0);
}
