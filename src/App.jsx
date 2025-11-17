import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./pages/Home";
import Footer from "./components/layout/Footer";
import ProductsPage from "./pages/Products";
import { CartProvider } from "./context/CartContext";
import ProtectedRoute from "./components/protected/ProtectedRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminRegister from "./pages/admin/AdminRegister";
import AdminLogin from "./pages/admin/AdminLogin";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import FAQHelpCenter from "./pages/Faqs";
import ContactSupport from "./pages/Contact";
import Success from "./pages/Success";
import CategoryPage from "./pages/CategoryPage";






function App() {
  return (
    <div className="flex flex-col min-h-screen">
     
     
      <main className="flex-grow">
        <CartProvider>
            <Navbar/>
            <Routes>
            
            
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ProductsPage/>}/>
              <Route path="/contact" element={<ContactSupport/>}/>
              <Route path="/category/:slug" element={<CategoryPage />} />

    

              <Route path="/admin/register" element={<AdminRegister />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/cart" element={<Cart/>}/>
              <Route path="/checkout" element={<Checkout/>}/>
            
              <Route path="/faq" element={<FAQHelpCenter/>}/>
              <Route path="/success" element={<Success/>}/>

                <Route
                  path="/admin/dashboard"
                  element={
                    <ProtectedRoute>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
              
            
            </Routes>
            <Footer/>
          </CartProvider>
      
        
      </main>
     
    </div>
  );
}

export default App;
