import { Routes, Route, useNavigate } from "react-router-dom";
import AskQuestions from "./Pages/Question/AskQuestions";
import Answer from "./Pages/Q&A/Answer";
import Login from "./Pages/login/Login";
import NotFound from "./Pages/NotFound/NotFound";
import Homepage from "./Pages/Home/Home";

import HowItWorks from "./Pages/HowItWorks/HowItWorks";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";

function Routing() {


  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute redirect="/">
            <Homepage />
          </ProtectedRoute>
        }
      />
      <Route path="/question/:questionid" element={<Answer />} />
      <Route path="/question" element={<AskQuestions />} />
      <Route path="/how-it-works" element={<HowItWorks />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default Routing;
