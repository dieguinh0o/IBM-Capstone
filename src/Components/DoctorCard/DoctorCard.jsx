import { useState } from "react";
import "./DoctorCard.css";
import AppointmentForm from "../AppointmentForm/AppointmentForm.jsx";

export default function DoctorCard() {
    const [showForm, setShowForm] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(null);

    const doctors = [
        { Name: "Dr. John Smith", Speciality: "Dentist", Experience: 12, Rating: 5 },
        { Name: "Dr. Alice Johnson", Speciality: "Gynecologist", Experience: 8, Rating: 4 },
        { Name: "Dr. Michael Lee", Speciality: "General Physician", Experience: 10, Rating: 4.5 },
        { Name: "Dr. Sarah Brown", Speciality: "Dermatologist", Experience: 7, Rating: 4 },
        { Name: "Dr. Robert Wilson", Speciality: "ENT Specialist", Experience: 15, Rating: 5 },
        { Name: "Dr. Emma Davis", Speciality: "Homeopath", Experience: 6, Rating: 3.5 },
        { Name: "Dr. William Anderson", Speciality: "Ayurveda", Experience: 9, Rating: 4.2 }
    ];

    function handleBookAppointment(doctor) {
        setSelectedDoctor(doctor);
        setShowForm(true);
    }

    function closeForm() {
        setShowForm(false);
        setSelectedDoctor(null);
    }

    return (
        <div>
            <div className="doctorcard-flex-container">
                {doctors.map((doctor) => (
                    <div className="doctorcard-container" key={doctor.Name}>
                        <p className="doctorname">{doctor.Name}</p>
                        <p className="doctorspeciality">{doctor.Speciality}</p>
                        <p className="doctorexperience">{doctor.Experience} years experience</p>
                        <div className="rating-container">
                            <p>Ratings: </p>
                            <div className="ratings-stars">
                                {'★'.repeat(Math.floor(doctor.Rating)) + '☆'.repeat(5 - Math.floor(doctor.Rating))}
                            </div>
                        </div>
                        <div>
                            <button className="book-appointment-btn" onClick={() => handleBookAppointment(doctor)}>                    
                                <div>Book Appointment</div>
                                <div>No Booking Fee</div>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Popup Modal */}
            {showForm && (
                <div className="modal-overlay" onClick={closeForm}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-btn" onClick={closeForm}>✖</button>
                        <h3>Book an Appointment with {selectedDoctor.Name}</h3>
                        <AppointmentForm />
                    </div>
                </div>
            )}
        </div>
    );
}
