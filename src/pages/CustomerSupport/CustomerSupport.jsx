import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db, auth } from "../../config/firebase"; // Import your Firebase instance
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CustomerSupport() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = async () => {
    try {
      // Get the currently logged-in user
      const user = auth.currentUser;

      // Check if user is logged in
      if (!user) {
        toast.error('Please log in to submit the form');
        return;
      }

      // Create a new object with form data and user ID
      const formDataWithUserId = {
        ...formData,
        userId: user.uid,
      };

      // Add the form data to the "reviews" collection
      await addDoc(collection(db, "reviews"), formDataWithUserId);

      // Show success message
      toast.success('Form submitted successfully');

      // Clear the form after submission
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });

    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error('An error occurred. Please try again later.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="container">
      <div className="form-group">
        <label className="label">Your Name:</label>
        <input className="input" type="text" name="name" value={formData.name} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label className="label">Your Email:</label>
        <input className="input" type="text" name="email" value={formData.email} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label className="label">Your Phone no:</label>
        <input className="input" type="text" name="phone" value={formData.phone} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label className="label">Your Message:</label>
        <textarea className="textarea" name="message" value={formData.message} onChange={handleChange}></textarea>
      </div>
      <button className="button" onClick={handleSubmit}>Submit</button>

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
}
