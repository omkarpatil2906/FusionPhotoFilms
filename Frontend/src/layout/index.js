import React, { Suspense } from "react";
import Navbar from "./navbar/Navbar";
import Footer from "./footer/Footer";
import { Outlet, useLocation } from "react-router-dom";


const Layout = () => {
  const location = useLocation();
  return (
    <>
      <Navbar />
      <Suspense
        fallback={<div className="h-[600px] flex justify-center items-center"></div>}
      >
        <Outlet key={location.pathname} />
      </Suspense>
      <Footer />
    </>
  );
};

export default Layout;
