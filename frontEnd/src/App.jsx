import './App.css'
import Routes from "./Routes/index.jsx";
import history from "./helpers/history.jsx";
import BrowserRouter from "./components/BrowserRouter.jsx";
import "bootstrap/dist/css/bootstrap.css";
import {Suspense} from "react";
import {Toaster} from "react-hot-toast";

function App() {

    return (
        <Suspense fallback="">
            <BrowserRouter history={history}>
                <Toaster toastOptions={{ position: "top-right" }} />
                <Routes/>
            </BrowserRouter>
        </Suspense>
    )
}

export default App
