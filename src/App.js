import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import AttackLibrary from './pages/AttackLibrary/AttackLibrary';
import Simulator from './pages/Simulator/Simulator';
import Contact from './pages/Contact/Contact';
import Login from './pages/Login/Login';
import AdminMessages from './pages/AdminMessages/AdminMessages';
import './App.css';


function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
         <Routes>
            <Route path="/" element={<Home />} />
           <Route path="/about" element={<About />} />
            <Route path="/attacks" element={<AttackLibrary />} />
           <Route path="/simulator" element={<Simulator />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin/messages" element={<AdminMessages />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
