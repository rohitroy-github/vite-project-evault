import React from "react";
import {useParams} from "react-router-dom";

import ClientAdminDashboardComponent from "../components/ClientAdminDashboardComponent";

const ClientAdminPage = () => {
  const {clientUID} = useParams();

  return (
    <>
      <ClientAdminDashboardComponent clientUID={clientUID} />
    </>
  );
};

export default ClientAdminPage;
