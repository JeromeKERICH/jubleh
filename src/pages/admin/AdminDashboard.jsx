import { useState } from "react";
import ProductsManager from "./ProductsManager";
import OrdersManager from "./OrdersManager";
import CategoryManager from "./CategoryManager";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("products");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("admin_token");
    window.location.href = "/admin/login";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-black text-white p-4 fixed top-0 left-0 right-0 z-50 border-b border-amber-400/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-amber-400 rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-sm">J</span>
            </div>
            <h2 className="text-lg font-bold">JUBLEH Admin</h2>
          </div>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg hover:bg-amber-400 hover:text-black transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <div className="flex pt-16 lg:pt-0">
        {/* Sidebar - Mobile Overlay */}
        {mobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div className={`
          fixed lg:static inset-y-0 left-0 z-40
          w-64 bg-black text-white flex flex-col p-4 border-r border-amber-400/30
          transform transition-transform duration-300 ease-in-out
          ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          {/* Desktop Logo */}
          <div className="hidden lg:block mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-amber-400 rounded-lg flex items-center justify-center">
                <span className="text-black font-bold text-lg">J</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">JUBLEH HAVEN</h2>
                <p className="text-amber-400 text-sm">Admin Dashboard</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            <button
              onClick={() => {
                setActiveTab("products");
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                activeTab === "products" 
                  ? "bg-amber-400 text-black shadow-lg shadow-amber-400/25" 
                  : "text-gray-300 hover:bg-amber-400/10 hover:text-amber-400 border border-transparent hover:border-amber-400/30"
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <span className="font-medium">Products</span>
            </button>

            <button
              onClick={() => {
                setActiveTab("orders");
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                activeTab === "orders" 
                  ? "bg-amber-400 text-black shadow-lg shadow-amber-400/25" 
                  : "text-gray-300 hover:bg-amber-400/10 hover:text-amber-400 border border-transparent hover:border-amber-400/30"
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="font-medium">Orders</span>
            </button>

            <button
              onClick={() => {
                setActiveTab("categories");
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                activeTab === "categories" 
                  ? "bg-amber-400 text-black shadow-lg shadow-amber-400/25" 
                  : "text-gray-300 hover:bg-amber-400/10 hover:text-amber-400 border border-transparent hover:border-amber-400/30"
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <span className="font-medium">Categories</span>
            </button>
          </nav>

          {/* Logout Button */}
          <div className="mt-auto pt-4 border-t border-amber-400/30">
            <button 
              onClick={logout}
              className="w-full flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-amber-400 hover:text-black rounded-xl transition-all duration-200 border border-transparent hover:border-amber-400"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 p-4 lg:p-6 bg-white min-h-screen">
          {/* Mobile Header Spacer */}
          <div className="lg:hidden h-4"></div>
          
          {/* Content Header */}
          <div className="mb-6">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
              {activeTab === "products" && "Products Management"}
              {activeTab === "orders" && "Orders Management"}
              {activeTab === "categories" && "Categories Management"}
            </h1>
            <p className="text-gray-600">
              {activeTab === "products" && "Manage your product catalog and inventory"}
              {activeTab === "orders" && "View and process customer orders"}
              {activeTab === "categories" && "Organize your product categories"}
            </p>
          </div>
          
          {/* Content */}
          {activeTab === "products" && <ProductsManager />}
          {activeTab === "orders" && <OrdersManager />}
          {activeTab === "categories" && <CategoryManager />}
        </div>
      </div>
    </div>
  );
}