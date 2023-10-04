import {Routes, Route} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import ClientAdminPage from "./pages/ClientAdminPage";
import TestPage from "./pages/TestPage";
import GetCaseDetailsPage from "./pages/GetCaseDetailsPage";
import CaseDetailsPage from "./pages/CaseDetailsPage";
import RegisterNewLegalCasePage from "./pages/RegisterNewLegalCasePage";

// import MixedSignUpComponent from "./components/MixedSignUpComponent";

function App() {
  return (
    <>
      <div className="min-h-screen">
        <Navbar />

        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/signup" element={<SignUpPage />}></Route>
          <Route path="/login/:initialFormType" element={<LoginPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/test" element={<TestPage />}></Route>
          <Route path="/admin/:clientUID" element={<ClientAdminPage />} />
          <Route path="/admin" element={<ClientAdminPage />}></Route>
          <Route path="/logout" element={<HomePage />}></Route>
          <Route
            path="/get-case-details"
            element={<GetCaseDetailsPage />}
          ></Route>
          <Route path="/case-details" element={<CaseDetailsPage />}></Route>
          <Route
            path="/admin/register-new-case"
            element={<RegisterNewLegalCasePage />}
          ></Route>
        </Routes>

        <Footer />
      </div>
    </>
  );
}

export default App;
