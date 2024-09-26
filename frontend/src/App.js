import { BrowserRouter as Router, Route, Switch, BrowserRouter, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './Pages/Home';
import Footer from './components/Footer';
import SignUpPage from './Pages/SignUpPage';

function App() {
  return (
   <BrowserRouter>
     <Header/>
     <Routes>
       <Route path='/' exact={true} element={<Home/>} />
       <Route path='/signup' element={<SignUpPage/>} />
     </Routes>
     <Footer/>
   </BrowserRouter>
  );
}

export default App;
