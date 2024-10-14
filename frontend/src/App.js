import { BrowserRouter as Router, Route, Switch, BrowserRouter, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./Pages/Home";
import Footer from "./components/Footer";
import SignUpPage from "./Pages/SignUpPage";
import "./index.css";
import CaregiverHome from "./Pages/CaregiverHome";
import CaregiverMatch from "./Pages/CaregiverMatch";
import About from './Pages/AboutUs';
import Login from './Pages/Login'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" exact={true} element={<Home />} />
        <Route path="/caregivermatch" exact={true} element={<CaregiverMatch />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/about" exact={true} element={<About/>} />
        <Route path="/login" exact={true} element={<Login/>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
