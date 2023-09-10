import { nanoid } from "nanoid";

function getCartFromLocalStorage() {
    const cart = localStorage.getItem("cart");

    if (!cart) localStorage.setItem("cart", JSON.stringify({}));

    const cartObj = cart ? JSON.parse(cart) : {};
    return cartObj;
}

export function findProduct(productID, productProps) {
    const cart = getCartFromLocalStorage();
    const cartKeys = Object.keys(cart);

    const productInstanceID = cartKeys.findIndex((id) => {
        if (cart[id].productID === productID) {
            if (isObjectsEqual(cart[id].properties, productProps)) return true;
        }
    });

    if (productInstanceID !== -1) return cartKeys[productInstanceID];
    return -1;
}

export function isObjectsEqual(obj1, obj2) {
    const firstObjectKeys = Object.keys(obj1);
    const secondObjectKeys = Object.keys(obj2);

    if (firstObjectKeys.length !== secondObjectKeys.length) return false;

    for (let i = 0; i < firstObjectKeys.length; i++) {
        if (firstObjectKeys[i] !== secondObjectKeys[i]) return false;
        if (obj1[firstObjectKeys[i]] !== obj2[secondObjectKeys[i]]) return false;
    }

    return true;
}

export function addToCart(productID, selectedProperties = {}) {
    const cartObj = getCartFromLocalStorage();
    const productInstanceID = findProduct(productID, selectedProperties);

    if (productInstanceID === -1) {
        const newCart = {
            ...cartObj,
            [nanoid()]: { productID: productID, count: 1, properties: selectedProperties },
        };
        localStorage.setItem("cart", JSON.stringify(newCart));
    } else {
        const currentProduct = cartObj[productInstanceID];
        const newCart = {
            ...cartObj,
            [productInstanceID]: {
                ...currentProduct,
                count: Number(currentProduct.count) + 1,
            },
        };
        localStorage.setItem("cart", JSON.stringify(newCart));
    }
}

export function reduceProductCount(productID, selectedProperties = {}) {
    const cartObj = getCartFromLocalStorage();
    const productInstanceID = findProduct(productID, selectedProperties);

    if (productInstanceID === -1) return;

    const currentCount = cartObj[productInstanceID].count;

    if (currentCount <= 1) {
        removeProductInstanceByID(productInstanceID);
        return;
    }

    const newCart = {
        ...cartObj,
        [productInstanceID]: {
            ...cartObj[productInstanceID],
            count: currentCount - 1,
        },
    };
    localStorage.setItem("cart", JSON.stringify(newCart));
}

function removeProductInstanceByID(instanceID) {
    const cartObj = getCartFromLocalStorage();
    delete cartObj[instanceID];

    localStorage.setItem("cart", JSON.stringify(cartObj));
}

export function removeProductFromCart(productID, productProps = {}) {
    const cartObj = getCartFromLocalStorage();
    const productInstanceID = findProduct(productID, productProps);

    if (productInstanceID === -1) return;

    delete cartObj[productInstanceID];
    localStorage.setItem("cart", JSON.stringify(cartObj));
}

export function updateProductInstanceProperties(instanceID, propertiesObject) {
    const cartObj = getCartFromLocalStorage();
    cartObj[instanceID].properties = propertiesObject;

    localStorage.setItem("cart", JSON.stringify(cartObj));
}

export function getProductsFromCart() {
    const cart = getCartFromLocalStorage();
    const cartObjectsArray = Object.keys(cart).map((instanceID) => {
        return { instanceID, ...cart[instanceID] };
    });

    return cartObjectsArray;
}

export function getProductFromCart(productID, productProperties) {
    const cart = getCartFromLocalStorage();
    const productInstanceID = findProduct(productID, productProperties);

    return cart[productInstanceID];
}

export function getProductNumberInCart() {
    const cart = getCartFromLocalStorage();
    let productCount = 0;

    Object.keys(cart).forEach((instanceID) => {
        productCount += cart[instanceID].count;
    });

    return productCount;
}

export function clearCart() {
    localStorage.removeItem("cart");
}
