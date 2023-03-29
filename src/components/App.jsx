import { Outlet } from "react-router-dom";
import { getProductsWithPagination } from "../queries/products";
import { useState } from "react";

function App() {
    const [lastProd, setLP] = useState(null);

    const test = async () => {
        const result = await getProductsWithPagination(lastProd, 2);
        console.log(result);

        setLP(result.lastProductFirebaseSnapshot);
    };

    return (
        <div className="App">
            <h1>Hey! I'm App.jsx!</h1>
            <button onClick={test}>Get product 9HwUtcBFohVDKM0mywtm</button>
            <Outlet />
        </div>
    );
}

export default App;
