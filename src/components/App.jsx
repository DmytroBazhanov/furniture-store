import { Outlet } from "react-router-dom";
import {
    getFilteredProducts,
    getProductCount,
    getProductsWithPagination,
    likeProduct,
} from "../queries/products";
import { useState } from "react";
import { signInWithGoogle, signOut, checkUser } from "../queries/auth";
import { getProfile } from "../queries/profile";
import { endAt, orderBy, startAt, where } from "firebase/firestore";

function App() {
    const [lastProd, setLP] = useState(null);
    const [requestsBeenMade, setRequestCount] = useState(0);

    const test = async () => {
        const result = await getProductsWithPagination(lastProd, 2);
        console.log(result);

        setLP(result.lastProductFirebaseSnapshot);
    };

    const handleGetFiltered = async () => {
        const productCount = await getProductCount();

        if (requestsBeenMade < Math.floor(productCount / 2)) {
            const result = await getFilteredProducts(lastProd, 2, [
                orderBy("price"),
                startAt(15),
                endAt(40),
            ]);

            setRequestCount((prev) => prev + 1);
            setLP(result.lastProductFirebaseSnapshot);

            if (result.products.length === 0) {
                setRequestCount(productCount);
            }
            console.log(result.products);
        }
    };

    const handleGoogleSignIn = () => signInWithGoogle();
    const handleSignOut = () => signOut();

    return (
        <div className="App">
            <h1>Hey! I'm App.jsx!</h1>
            <button onClick={test}>Get product 9HwUtcBFohVDKM0mywtm</button>
            <button onClick={handleGoogleSignIn}>Google sign in</button>
            <button onClick={handleSignOut}>Logout</button>
            <button onClick={checkUser}>Check user</button>
            <button onClick={getProfile}>Get profile</button>
            <button onClick={() => likeProduct("9HwUtcBFohVDKM0mywtm")}>
                Leave a like on product 9HwUtcBFohVDKM0mywtm
            </button>
            <button onClick={handleGetFiltered}>Get filtered products</button>
            <button onClick={getProductCount}>Get count</button>
            <Outlet />
        </div>
    );
}

export default App;
