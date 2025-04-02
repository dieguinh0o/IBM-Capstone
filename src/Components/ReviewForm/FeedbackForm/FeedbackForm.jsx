import { useState } from "react";
import "./FeedbackForm.css"; // Ensure the CSS file is linked

export default function FeedbackForm({ onSubmit, id, closeModal }) {
    const [feedback, setFeedback] = useState("");
    const [rating, setRating] = useState(0); // Rating from 1-5

    const handleSubmit = (e) => {
        e.preventDefault();
        if (rating === 0) {
            alert("Please select a rating before submitting.");
            return;
        }
        onSubmit(id, { feedback, rating }); // Submit both feedback & rating
        setFeedback(""); 
        setRating(0); 
        closeModal();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-btn" onClick={closeModal}>✖</button>
                <h3>Provide Feedback</h3>
                <form onSubmit={handleSubmit}>
                    
                    {/* Star Rating */}
                    <div className="form-item rating-container">
                        <strong>Rating:</strong>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span 
                                key={star} 
                                className={`star ${star <= rating ? "selected" : ""}`} 
                                onClick={() => setRating(star)}
                            >
                                ★
                            </span>
                        ))}
                    </div>

                    {/* Feedback Input */}
                    <div className="form-item">
                        <label htmlFor="feedback"><strong>Review</strong></label>
                        <input 
                            type="text" 
                            id="feedback"
                            placeholder="Write your review here..." 
                            onChange={(e) => setFeedback(e.target.value)} 
                            value={feedback} 
                        />
                    </div>

                    <button type="submit" className="submit-btn">Submit Feedback</button>
                </form>
            </div>
        </div>
    );
}
