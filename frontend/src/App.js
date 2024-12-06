import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./Pages/Home";
import SignUpPage from "./Pages/SignUpPage";
import CaregiverMatch from "./Pages/CaregiverMatch";
import About from "./Pages/AboutUs";
import Login from "./Pages/Login";
import EventPage from "./Pages/EventPage";
import ManageProfile from "./Pages/ManageProfile";
import EventDetail from "./components/EventDetail";
import Moreinfo from "./Pages/Moreinfo";
import AppointmentPage from "./Pages/AppointmentPage";
import Appointment from "./Pages/Appointment";
import AdminDashboard from "./components/AdminDashboard" // New Admin Dashboard Page
import AdminEvent from "./Pages/AdminEvent";
import BookingPage from "./Pages/BookingPage";
// New Admin Manage Users Page
import "./index.css";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        {/* Public Routes */}
        <Route path="/" exact element={<Home />} />
        <Route path="/home" exact element={<Home />} />
        <Route path="/caregiver" exact element={<CaregiverMatch />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/about" exact element={<About />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/events" element={<EventPage />} />
        <Route path="/manage" element={<ManageProfile />} />
        <Route path="/event/:id" element={<EventDetail />} />
        <Route path="/moreinfo" element={<Moreinfo />} />
        <Route path="/AppointmentPage" element={<AppointmentPage />}/>
        <Route path="/Appointment" element={<Appointment />}/>
         <Route path="/AdminEvent" element={<AdminEvent />}/>
         <Route path="/BookingPage" element={<BookingPage />}/>

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
       
        {/* Redirect to Home for unknown routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
