import React from "react";
import Header from "../widgets/Header/Header";
import Main from "../widgets/Main/Main";
import { Outlet } from "react-router-dom";

const Layout = () => {

  return (
    <>
      <Header />
      <Main>
        <Outlet />
      </Main>
    </>
  );
}

export default Layout;