import React from "react";
import {useParams} from "react-router-dom";

import AdminDashboardComponent from "../components/AdminDashboardComponent";

const AdminPage = () => {
  const {aadharUID, adminType} = useParams();

  return (
    <>
      <AdminDashboardComponent aadharUID={aadharUID} adminType={adminType} />
    </>
  );
};

export default AdminPage;
