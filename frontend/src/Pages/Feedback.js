import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../css/feedback.css';

const Feedback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const caregiver = location.state?.caregiver;

  const [feedback, setFeedback] = useState({
    rating: '',
    comments: '',
  });

  if (!caregiver) {
    return <p>No caregiver information available to provide feedback.</p>;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFeedback((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Feedback submitted:', {
      caregiver: caregiver.UserID.FirstName + ' ' + caregiver.UserID.LastName,
      ...feedback,
    });
    alert('Thank you for your feedback!');
    navigate('/caregiver'); // Navigate back to the caregiver list or main page
  };

  const handleCancel = () => {
    navigate('/caregiver');
  };

  return (
    <div className="feedback-form-container">
      <h2>Feedback for {caregiver.UserID.FirstName} {caregiver.UserID.LastName}</h2>
      <form onSubmit={handleSubmit} className="feedback-form">
        <label htmlFor="rating">Rating:</label>
        <select
          id="rating"
          name="rating"
          value={feedback.rating}
          onChange={handleInputChange}
          required
        >
          <option value="" disabled>
            Select a rating
          </option>
          <option value="1">1 - Poor</option>
          <option value="2">2 - Fair</option>
          <option value="3">3 - Good</option>
          <option value="4">4 - Very Good</option>
          <option value="5">5 - Excellent</option>
        </select>

        <label htmlFor="comments">Comments:</label>
        <textarea
          id="comments"
          name="comments"
          rows="4"
          placeholder="Write your feedback here..."
          value={feedback.comments}
          onChange={handleInputChange}
          required
        ></textarea>

        <div className="form-buttons">
          <button type="button" className="cancel-button" onClick={handleCancel}>
            Cancel
          </button>
          <button type="submit" className="submit-button">
            Submit Feedback
          </button>
        </div>
      </form>
    </div>
  );
};

export default Feedback;
