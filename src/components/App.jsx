import { Outlet } from "react-router-dom";

function App() {
    return (
        <div className="App">
            <h1>Hey! I'm App.jsx!</h1>
            <Outlet />
        </div>
    );
}

export default App;
