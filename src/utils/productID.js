export const saveProductID = (id) => {
    localStorage.setItem("productID", id);
};

export const getProductID = () => {
    return localStorage.getItem("productID");
};

export const removeProductID = () => {
    localStorage.removeItem("productID");
};
