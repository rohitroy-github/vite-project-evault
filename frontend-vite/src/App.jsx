import {Routes, Route} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
// import MixedSignUpComponent from "./components/MixedSignUpComponent";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/signup" element={<SignUpPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        {/* <Route path="/trialpage" element={<MixedSignUpComponent />}></Route> */}
      </Routes>

      <Footer />
    </>
  );
}

export default App;
