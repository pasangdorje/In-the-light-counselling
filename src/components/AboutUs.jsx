import React from "react";
import Counsellor from "../assets/counsellor-group.png";
import SolutionStep from "./SolutionStep";
import "../styles/aboutus.css";

function AboutUs() {
  return (
    <div className="about-page" id="about">
      <div className="about-img-content">
        <img src={Counsellor} alt="Counsellor Group" className="about-img1" />
      </div>

      <div className="about-text-content">
        <h3 className="about-title">
          <span>About Us</span>
        </h3>
        <p className="about-description">
          Welcome to In the Light Counselling, your trusted partner for
          personalized mental health care. Our expert counselors offer online
          consultations and specialized services, prioritizing your well-being.
          Join us on this journey towards a healthier, happier you.
        </p>

        <h4 className="about-text-title">Your Solutions</h4>

        <SolutionStep
          title="Choose a Specialist"
          description="Find and book your ideal counselor with ease. Our specialists are dedicated to providing tailored care that meets your unique needs."
        />

        <SolutionStep
          title="Make a Schedule"
          description="Select a convenient date and time for your appointment. Our professional team is ready to support your mental health journey."
        />

        <SolutionStep
          title="Get Your Solutions"
          description="Receive expert advice and personalized treatment plans from our experienced counselors, helping you achieve your best possible health."
        />
      </div>
    </div>
  );
}

export default AboutUs;