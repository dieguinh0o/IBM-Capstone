// Import necessary modules from React library
import React, { useEffect } from 'react';

// Import components for routing from react-router-dom library
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import custom Navbar component
import Navbar from './Components/Navbar/Navbar.jsx';
import Landing_page from './Components/LandingPage/LandingPage.jsx';
import SignUp from './Components/Signup/Sign_Up.jsx';
import Login from './Components/Login/Login.jsx';
import InstantConsultation from './Components/InstantConsultationBooking/InstantConsultation.js'


// Function component for the main App
function App() {

  // Render the main App component
  return (
    <div className="App">
        {/* Set up BrowserRouter for routing */}
        <BrowserRouter>
          {/* Display the Navbar component */}
          <Navbar/>

          {/* Set up the Routes for different pages */}
        <Routes>
            <Route path="/" element={<Landing_page/>}/>
            <Route path="/Signup" element={<SignUp/>}/>
            <Route path="/Login" element={<Login/>}/>
            <Route path="/instant-consultation" element={<InstantConsultation />} />
        </Routes>
        </BrowserRouter>
    </div>
  );
}

// Export the App component as the default export
export default App;