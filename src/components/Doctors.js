import React from "react";
import DoctorCard from "./DoctorCard";
import profile1 from "../assets/profile-1.png";
import profile2 from "../assets/profile-2.png";
import profile3 from "../assets/profile-3.png";
import profile4 from "../assets/profile-4.png";
import "../styles/Doctors.css";

function Doctors() {
  return (
    <div className="doctor-section" id="doctors">
      <div className="dt-title-content">
        <h3 className="dt-title">
          <span>Our Team</span>
        </h3>

      </div>

      <div className="dt-cards-content">
        <DoctorCard
          img={profile1}
          name="Kathryn Murphy"
          title="Counsellor"

        />
        <DoctorCard
          img={profile2}
          name="Jacob Jones"
          title="Psychologist"

        />
        <DoctorCard
          img={profile3}
          name="Jenny Wilson"
          title="Counsellor"

        />
        <DoctorCard
          img={profile4}
          name="Albert Flores"
          title="Counsellor"

        />
      </div>
    </div>
  );
}

export default Doctors;
