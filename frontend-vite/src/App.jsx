import {useState} from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import GeneralInformationSection from "./components/GeneralInformationSection ";

function App() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <GeneralInformationSection />
    </>
  );
}

export default App;
