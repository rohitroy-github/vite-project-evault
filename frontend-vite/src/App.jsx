import {Routes, Route} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";
import SignUpComponent from "./components/SignUpComponent";
import LoginComponent from "./components/LoginComponent";
import MixedSignUpComponent from "./components/MixedSignUpComponent";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/signup" element={<SignUpComponent />}></Route>
        <Route path="/login" element={<SignUpComponent />}></Route>
        <Route path="/trialpage" element={<MixedSignUpComponent />}></Route>
      </Routes>

      <Footer />
    </>
  );
}

export default App;
