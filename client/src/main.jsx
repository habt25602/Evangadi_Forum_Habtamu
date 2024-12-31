import { createRoot } from "react-dom/client";

import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";

import App from "./App.jsx";
import { UserProvider } from "./Components/Dataprovide/DataProvider.jsx";

createRoot(document.getElementById("root")).render(
  <>
    <App />
  </>
);
