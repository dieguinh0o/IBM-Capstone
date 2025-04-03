import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProfileCard from "../ProfileCard/ProfileCard";
import "./Navbar.css";

const Navbar = () => {
    const [click, setClick] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
    const navigate = useNavigate();

    const handleClick = () => setClick(!click);

    const handleLogout = () => {
        sessionStorage.removeItem("auth-token");
        sessionStorage.removeItem("name");
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("phone");
        localStorage.removeItem("doctorData");

        // Remove all reviewFormData entries
        Object.keys(localStorage).forEach((key) => {
            if (key.startsWith("reviewFormData_")) {
                localStorage.removeItem(key);
            }
        });

        setIsLoggedIn(false);
        setUsername("");
        setShowDropdown(false);
        navigate("/"); // Redirect to home page
    };

    const handleDropdown = (event) => {
        setShowDropdown((prev) => !prev);

        if (!showDropdown) {
            const rect = event.target.getBoundingClientRect();
            setDropdownPosition({ 
                top: rect.bottom + 5, // Position slightly below
                left: rect.left, 
            });
        }
    };

    // Close dropdown if clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest(".profile-dropdown")) {
                setShowDropdown(false);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const storedEmail = sessionStorage.getItem("email");
        if (storedEmail) {
            setIsLoggedIn(true);
            setUsername(storedEmail.split("@")[0]);
        }
    }, []);

    return (
        <nav>
            <div className="nav__logo">
                <Link to="/">
                    StayHealthy <i style={{ color: "#2190FF" }} className="fa fa-user-md"></i>
                </Link>
                <span>.</span>
            </div>
            <div className="nav__icon" onClick={handleClick}>
                <i className={click ? "fa fa-times" : "fa fa-bars"}></i>
            </div>
            <ul className={click ? "nav__links active" : "nav__links"}>
                <li className="link">
                    <Link to="/">Home</Link>
                </li>
                <li className="link">
                    <Link to="/search/doctors">Appointments</Link>
                </li>
                <li className="link">
                    <Link to="/healthblog">Health Blog</Link>
                </li>
                <li className="link">
                    <Link to="/Reviews">Reviews</Link>
                </li>
                <li className="link">
                    <Link to="/instant-consultation">Instant Consultation</Link>
                </li>

                {isLoggedIn ? (
                    <li className="link profile-dropdown">
                        <p onClick={handleDropdown} className="profile-name">Welcome, {username}</p>
                        {showDropdown && <ProfileCard position={dropdownPosition} />}
                        <button className="btn2" onClick={handleLogout}>
                            Logout
                        </button>
                    </li>
                ) : (
                    <>
                        <li className="link">
                            <Link to="/signup">
                                <button className="btn1">Sign Up</button>
                            </Link>
                        </li>
                        <li className="link">
                            <Link to="/login">
                                <button className="btn1">Login</button>
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
