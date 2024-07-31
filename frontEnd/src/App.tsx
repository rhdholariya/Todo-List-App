import "./App.css";
import Routes from "./Routes/index.tsx";
import history from "./Helpers/history.tsx";
import BrowserRouter from "./Components/BrowserRouter.tsx";
import "bootstrap/dist/css/bootstrap.css";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { TodoContextProvider } from "./Context/TodoContext.tsx";

function App() {
  return (
    <>
      <TodoContextProvider>
        <Suspense fallback="">
          <BrowserRouter history={history}>
            <Toaster toastOptions={{ position: "top-right" }} />
            <Routes />
          </BrowserRouter>
        </Suspense>
      </TodoContextProvider>
    </>
  );
}

export default App;
