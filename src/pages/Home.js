import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Info from "../components/Info";
import About from "../components/About";
import Counsellors from "../components/Counsellors";
import Footer from "../components/Footer";

function Home() {
  return (
    <div className="home-section">
      <Navbar />
      <Hero />
      <Info />
      <About />
      <Counsellors />
      <Footer />
    </div>
  );
}

export default Home;