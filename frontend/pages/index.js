import { useState, useEffect } from "react";

import Header from "../components/header/Header.jsx";
import Footer from "../components/footer/Footer.jsx";
import MainContainer from "../components/body/MainContainer.jsx";

export default function Home() {
  return (
    <>
      <Header title="Kristian Sales Dashboard" />

      <MainContainer />

      <Footer />
    </>
  );
}
