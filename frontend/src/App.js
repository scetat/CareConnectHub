

import { BrowserRouter as Router, Route, Switch, BrowserRouter, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './Pages/Home';
import Footer from './components/Footer';

function App() {
  return (
   <BrowserRouter>
   <Header/>
   <Routes>
    <Route path='/' exact={true} element ={<Home/>} />
   </Routes>
   <Footer/>
   </BrowserRouter>
  );
}

export default App;
