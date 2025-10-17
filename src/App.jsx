import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./pages/Home";
import Footer from "./components/layout/Footer";
import ContactPage from "./pages/Contact";






function App() {
  return (
    <div className="flex flex-col min-h-screen">
     
     
      <main className="flex-grow">
        <Navbar/>
        <Routes>
        
        
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<ContactPage/>}/>
          
          
        
        </Routes>
        <Footer/>
        
      </main>
     
    </div>
  );
}

export default App;
