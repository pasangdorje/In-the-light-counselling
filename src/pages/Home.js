import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Info from "../components/Info";
import About from "../components/About";
import Doctors from "../components/Doctors";
import Footer from "../components/Footer";

function Home() {
  return (
    <div className="home-section">
      <Navbar />
      <Hero />
      <Info />
      <About />
      <Doctors />
      <Footer />
    </div>
  );
}

export default Home;