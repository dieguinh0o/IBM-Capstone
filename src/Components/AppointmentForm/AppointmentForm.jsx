import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./AppointmentForm.css"; 

export default function AppointmentForm({ doctorData }) {
    const [patientName, setPatientName] = useState("");
    const [appointmentDate, setAppointmentDate] = useState("");
    const [patientPhone, setPatientPhone] = useState("");
    const [timeSlot, setTimeSlot] = useState("13:00");
    
    const navigate = useNavigate(); // Initialize navigate function

    function handleSubmit(e) {
        e.preventDefault();
        if (!patientName || !appointmentDate || !patientPhone) {
            alert("Please fill in all fields.");
            return;
        }

        const appointmentData = {
            doctor: {
                name: doctorData.Name,
                speciality: doctorData.Speciality
            },
            patient: {
                name: patientName,
                phone: patientPhone
            },
            date: appointmentDate,
            time: timeSlot
        };

        localStorage.setItem("AppointmentData", JSON.stringify(appointmentData));

        navigate("/"); // Redirect to home page after submission
    }

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <h2>Book an Appointment</h2>
                <input 
                    type="text" 
                    placeholder="Your Name" 
                    value={patientName} 
                    onChange={(e) => setPatientName(e.target.value)}
                    required
                />
                <input 
                    type="tel" 
                    placeholder="Your Phone Number" 
                    value={patientPhone} 
                    onChange={(e) => setPatientPhone(e.target.value)}
                    required
                />
                <input 
                    type="date" 
                    value={appointmentDate} 
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    required
                />
                <select value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)}>
                    {["13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00"].map((time) => (
                        <option key={time} value={time}>{time}</option>
                    ))}
                </select>
                <button type="submit">Book Appointment</button>
            </form>
        </div>
    );
}
