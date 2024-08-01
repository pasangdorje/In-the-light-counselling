import React from "react";
import InformationCard from "./InformationCard";
import {faTruckMedical, faFaceSmile, faHeadSideMask } from "@fortawesome/free-solid-svg-icons";
import "../styles/Info.css";

function Info() {
  return (
    <div className="info-section" id="services">
      <div className="info-title-content">
        <h3 className="info-title">
          <span>What We Do</span>
        </h3>
        <p className="info-description">
        We consider mental health to be a state of enjoying and flourishing 
        rather than only the absence of illness. Our platform is committed to 
        provide comprehensive resources, assistance, and direction to individuals 
        managing the complicated nature of mental health.
        </p>
      </div>

      <div className="info-cards-content">
        <InformationCard
          title="Emergency Support"
          description=" Our team of trained counselors is here to provide compassionate and 
          confidential support, 24/7, for individuals facing mental health emergencies. 
          Whether you're experiencing a panic attack, suicidal thoughts, or any other 
          urgent mental health concern, know that you're not alone. Your well-being is our priority."
          icon={faTruckMedical}
        />

        <InformationCard
          title="Emotional Support"
          description="Our compassionate counselors provide a safe space for you to express your 
          feelings, process difficult emotions, and gain valuable insights into your mental well-being. 
          Whether you're struggling with stress, grief, relationship issues, or simply need someone to 
          talk to, our team is here to listen without judgment and offer empathetic support tailored to 
          your unique needs. You don't have to face your struggles alone."
          icon={faFaceSmile}
        />

        <InformationCard
          title="Mental Healing"
          description="Our counselors provide a nurturing and non-judgmental space where individuals can 
          explore their thoughts, emotions, and experiences in a safe and confidential environment. 
          Through empathetic listening, validation, and insightful guidance, clients are empowered 
          to gain clarity, perspective, and coping strategies to navigate life's challenges more effectively."
          icon={faHeadSideMask}
        />
      </div>
    </div>
  );
}

export default Info;
