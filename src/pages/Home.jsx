import React from "react";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Info from "../components/Info";
import AboutUs from "../components/AboutUs";
import CounsellorsList from "../components/CounsellorsList";
import Chatbot from "../components/chatbot/Chatbot";

const Home = () => {
  return (
    <div className="home-section">
      <Navbar />
      <Hero />
      <Info />
      <AboutUs />
      <CounsellorsList />
      <Footer />
      <Chatbot />
    </div>
  );
};

export default Home;
