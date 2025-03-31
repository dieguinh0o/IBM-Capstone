import "./Sign_Up.css";
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../../config.js';


export default function SignUp() {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate(); // Navigation hook from react-router

    // Handle input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Form validation logic
    const validateForm = () => {
        let newErrors = {};

        if (formData.name.length < 3) {
            newErrors.name = "Name must be at least 3 characters long.";
        }

        if (!/^\d{10}$/.test(formData.phone)) {
            newErrors.phone = "Phone number must be 10 digits.";
        }

        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
            newErrors.email = "Invalid email format.";
        }

        if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Returns true if no errors
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            const response = await fetch(`${API_URL}/api/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            
            const json = await response.json(); // Parse the response JSON

            if (json.authtoken) {
                // Store user data in session storage
                sessionStorage.setItem("auth-token", json.authtoken);
                sessionStorage.setItem("name", formData.name);
                sessionStorage.setItem("phone", formData.phone);
                sessionStorage.setItem("email", formData.email);
                // Redirect user to home page
                navigate("/");
                window.location.reload(); // Refresh the page
            } else {
                if (json.errors) {
                    for (const error of json.errors) {
                        setShowerr(error.msg); // Show error messages
                    }
                } else {
                    setShowerr(json.error);
                }
            }
        }
    };

    return (
        <div>
            <div className="container" style={{ marginTop: "5%" }}>
                <div className="signup-grid">
                    <div className="signup-text">
                        <h1>Sign Up</h1>
                    </div>
                    <div className="signup-text1" style={{ textAlign: "left" }}>
                        Already a member? <span><a href="../Login/Login.html" style={{ color: "#2190FF" }}>Login</a></span>
                    </div>
                    <div className="signup-form">
                        <form onSubmit={handleSubmit} method="POST">
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input type="text" name="name" id="name" className="form-control" placeholder="Enter your name"
                                    value={formData.name} onChange={handleChange} />
                                {errors.name && <small className="text-danger">{errors.name}</small>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="phone">Phone</label>
                                <input type="tel" name="phone" id="phone" className="form-control" placeholder="Enter your phone number"
                                    value={formData.phone} onChange={handleChange} />
                                {errors.phone && <small className="text-danger">{errors.phone}</small>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" name="email" id="email" className="form-control" placeholder="Enter your email"
                                    value={formData.email} onChange={handleChange} />
                                {errors.email && <small className="text-danger">{errors.email}</small>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" name="password" id="password" className="form-control" placeholder="Enter your password"
                                    value={formData.password} onChange={handleChange} />
                                {errors.password && <small className="text-danger">{errors.password}</small>}
                            </div>

                            <div className="btn-group">
                                <button type="submit" className="btn btn-primary mb-2 mr-1 waves-effect waves-light">Submit</button>
                                <button type="reset" className="btn btn-danger mb-2 waves-effect waves-light"
                                    onClick={() => setFormData({ name: "", phone: "", email: "", password: "" })}>
                                    Reset
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
