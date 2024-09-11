import React from "react";
import CounsellorCard from "./CounsellorCard";
import profile1 from "../assets/profile-1.png";
import profile2 from "../assets/profile-2.png";
import profile3 from "../assets/profile-3.png";
import profile4 from "../assets/profile-4.png";
import jwtDecode from "jwt-decode";
import "../styles/counsellorsList.css";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/routePaths";

function CounsellorsList() {
  const navigate = useNavigate();
  const user = localStorage.getItem("token")
    ? jwtDecode(localStorage.getItem("token"))
    : null;

  const handleJoinTeamClick = () => {
    if (user?.isCounsellorAccount) navigate(ROUTES.APPLY_FOR_COUNSELLOR);
    else navigate(ROUTES.REGISTER_COUNSELLOR);
  };

  return (
    <div className="counsellor-section" id="ourteam">
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
        <CounsellorCard img={profile3} name="Jenny Wilson" title="Counsellor" />
        <CounsellorCard
          img={profile4}
          name="Albert Flores"
          title="Counsellor"
        />
      </div>
      {user?.isCounsellorAccount && (
        <button
          onClick={() => handleJoinTeamClick()}
          className="text-appointment-btn"
          type="button"
        >
          Apply for counsellor
        </button>
      ) }
      {!user &&  (
        <button
          onClick={() => handleJoinTeamClick()}
          className="text-appointment-btn"
          type="button"
        >
          Join our team
        </button>
      )
    }
    </div>
  );
}

export default CounsellorsList;
