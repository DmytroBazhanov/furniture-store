import { Outlet } from "react-router-dom";
import { getProductsWithPagination } from "../queries/products";
import { useState } from "react";
import { signInWithGoogle, signOut, checkUser } from "../queries/auth";

function App() {
    const [lastProd, setLP] = useState(null);

    const test = async () => {
        const result = await getProductsWithPagination(lastProd, 2);
        console.log(result);

        setLP(result.lastProductFirebaseSnapshot);
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
            <Outlet />
        </div>
    );
}

export default App;
