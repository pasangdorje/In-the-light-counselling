import React from "react";
import CounsellorCard from "./CounsellorCard";
import profile1 from "../assets/profile-1.png";
import profile2 from "../assets/profile-2.png";
import profile3 from "../assets/profile-3.png";
import profile4 from "../assets/profile-4.png";
import "../styles/counsellorsList.css";

function CounsellorsList() {
  return (
    <div className="counsellor-section" id="counsellors">
      <div className="dt-title-content">
        <h3 className="dt-title">
          <span>Our Team</span>
        </h3>

      </div>

      <div className="dt-cards-content">
        <CounsellorCard
          img={profile1}
          name="Kathryn Murphy"
          title="Counsellor"

        />
        <CounsellorCard
          img={profile2}
          name="Jacob Jones"
          title="Psychologist"

        />
        <CounsellorCard
          img={profile3}
          name="Jenny Wilson"
          title="Counsellor"

        />
        <CounsellorCard
          img={profile4}
          name="Albert Flores"
          title="Counsellor"

        />
      </div>
    </div>
  );
}

export default CounsellorsList;
