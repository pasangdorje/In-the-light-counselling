import React from "react";
import InformationCard from "./InformationCard";
import {
  faTruckMedical,
  faFaceSmile,
  faHeadSideMask,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/info.css";

function Info() {
  return (
    <div className="info-section" id="services">
      <div className="info-title-content">
        <h3 className="info-title">
          <span>What We Do</span>
        </h3>
        <p className="info-description">
          At In the Light Counselling, we view mental health as a state of
          thriving, not just the absence of illness. Our mission is to provide
          comprehensive support and resources, assisting individuals in
          navigating the intricate landscape of mental well-being.
        </p>
      </div>

      <div className="info-cards-content">
        <InformationCard
          title="Emergency Support"
          description="Our dedicated team is available 24/7 to offer immediate assistance during mental health crises. 
          Whether you're facing a panic attack, suicidal thoughts, or any urgent mental health concern, we're here for you. 
          Your safety and well-being are our top priorities."
          icon={faTruckMedical}
        />

        <InformationCard
          title="Emotional Support"
          description="We provide a compassionate space for you to process difficult emotions and gain valuable insights
           into your mental well-being. Whether dealing with stress, grief, or relationship issues, 
           our empathetic team is ready to listen and support you without judgment."
          icon={faFaceSmile}
        />

        <InformationCard
          title="Mental Healing"
          description="Our counselors offer a nurturing environment to explore your thoughts and emotions. 
          Through empathetic listening and insightful guidance, we empower you to gain clarity, build resilience, 
          and effectively navigate life’s challenges."
          icon={faHeadSideMask}
        />
      </div>
    </div>
  );
}

export default Info;