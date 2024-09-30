import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './Pages/Home';
import Footer from './components/Footer';
import SignUpPage from './Pages/SignUpPage';
import EventPage from './Pages/EventPage'; // Add this line

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' exact={true} element={<Home />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/events' element={<EventPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
