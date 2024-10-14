import { BrowserRouter as Router, Route, Switch, BrowserRouter, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./Pages/Home";
import Footer from "./components/Footer";
import SignUpPage from "./Pages/SignUpPage";
import "./index.css";
import CaregiverHome from "./Pages/CaregiverHome";

import About from "./Pages/AboutUs";
import EventPage from "./Pages/EventPage";
import ManageProfile from "./Pages/ManageProfile";
import Login from "./Pages/Login";
import CaregiverMatch from "./Pages/CaregiverMatch";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" exact={true} element={<Home />} />
        <Route path="/home" exact={true} element={<Home />} />
        <Route path="/caregivermatch" exact={true} element={<CaregiverMatch />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" exact={true} element={<About />} />
        <Route path="/events" element={<EventPage />} />
        <Route path="/manage" element={<ManageProfile />} />          
        <Route path="/login" exact={true} element={<Login/>} />

      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
