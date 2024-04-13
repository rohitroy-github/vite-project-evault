import React from "react";
import {useParams} from "react-router-dom";

import SignUpComponent from "../components/SignUpComponent";

const SignUpPage = () => {
  const {initialFormType} = useParams();

  return (
    <>
      <SignUpComponent initialFormType={initialFormType} />
    </>
  );
};

export default SignUpPage;
