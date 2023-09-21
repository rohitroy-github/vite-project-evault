import React from "react";
import {useParams} from "react-router-dom";

import LoginComponent from "../components/LoginComponent";

const LoginPage = () => {
  const {initialFormType} = useParams();

  return (
    <>
      <LoginComponent initialFormType={initialFormType} />
    </>
  );
};

export default LoginPage;
