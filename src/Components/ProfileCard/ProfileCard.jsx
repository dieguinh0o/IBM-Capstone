import React, { useEffect, useState } from "react";
import "./ProfileCard.css"; // Style file for the card
import { useNavigate } from "react-router-dom";

export default function ProfileCard() {
    const [userDetails, setUserDetails] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        // Get user details from session storage
        const name = sessionStorage.getItem("name");
        const email = sessionStorage.getItem("email");
        const phone = sessionStorage.getItem("phone");

        if (name || email || phone) {
            setUserDetails({ name, email, phone });
        }
    }, []);

    return (
        <div className="profilecard-container">
            <h3>{userDetails.name || "User"}</h3>
            <p><strong>Email:</strong> {userDetails.email || "Not provided"}</p>
            <p><strong>Phone:</strong> {userDetails.phone || "Not provided"}</p>
            <button onClick={() => navigate("/profile")}>Your Profile</button>
            <button onClick={() => navigate("/yourreports")}>Your Reports</button>
        </div>
    );
}
