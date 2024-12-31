import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { UserProvider } from "./Components/Dataprovide/DataProvider";
import Routing from "./Router";

function App() {
  return (
    <Router>
      <UserProvider>
        <Routing />
      </UserProvider>
    </Router>
  );
}

export default App;
