import React from "react";
import Doctor from "../assets/doctor-group.png";
import SolutionStep from "./SolutionStep";
import "../styles/About.css";

function About() {
  return (
    <div className="about-page" id="about">
      <div className="about-img-content">
        <img src={Doctor} alt="Doctor Group" className="about-img1" />
      </div>

      <div className="about-text-content">
        <h3 className="about-title">
          <span>About Us</span>
        </h3>
        <p className="about-description">
          Welcome to In the Light Counselling, Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>

        <h4 className="about-text-title">Your Solutions</h4>

        <SolutionStep
          title="Title 1"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor."
        />

        <SolutionStep
          title="Title 2"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor."
        />

        <SolutionStep
          title="Title 3"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor."
        />
      </div>
    </div>
  );
}

export default About;
