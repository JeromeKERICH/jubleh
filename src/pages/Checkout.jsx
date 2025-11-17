import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { api } from "../api/apiClient";
import { useNavigate } from "react-router-dom";

export default function Checkout() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const {
    cart,
    clearCart,
    getCartTotal,
    getCartItemsCount,
    getShippingCost,
    getFinalTotal,
  } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const subtotal = getCartTotal();
  const shipping = getShippingCost();
  const total = getFinalTotal();

  const validateForm = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Full name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Email is invalid";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    if (!form.address.trim()) newErrors.address = "Shipping address is required";
    if (!form.city.trim()) newErrors.city = "City is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handlePay = async () => {
    if (!validateForm()) return;
    if (!cart.length) {
      alert("Your cart is empty.");
      return;
    }
  
    try {
      setLoading(true);
  
      // ✅ FIXED: Send shipping in REGULAR units (backend will handle conversion)
      const shippingInRegularUnits = shipping; // No *100 conversion!
  
      // Step 1: Create order in backend
      const { data } = await api.post("/orders", {
        customerName: form.name,
        customerEmail: form.email,
        customerPhone: form.phone,
        shippingAddress: `${form.address}, ${form.city}${form.postalCode ? `, ${form.postalCode}` : ""}`,
        items: cart.map((i) => ({
          productId: i._id,
          qty: i.qty || 1,
        })),
        shipping: shippingInRegularUnits, // ✅ Send in regular units
      });
      
      const { orderId, amount } = data;
  
      // Step 2: Ensure Paystack script is loaded
      if (!window.PaystackPop || typeof window.PaystackPop.setup !== "function") {
        alert("Payment service not loaded. Please refresh the page.");
        setLoading(false);
        return;
      }
  
      // Step 3: Setup Paystack payment
      const transactionRef = `JUBLEH_${orderId}_${Date.now()}`;
  
      const handler = window.PaystackPop.setup({
        key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
        email: form.email,
        amount: amount, // ✅ Backend already returns total × 100
        currency: "KES",
        ref: transactionRef,
        metadata: {
          orderId,
          customerName: form.name,
          customerPhone: form.phone,
          shippingAddress: `${form.address}, ${form.city}`,
        },
        callback: (response) => {
          console.log("✅ Paystack response:", response);
  
          api.post("/paystack/verify", {
            reference: response.reference,
            orderId,
          })
            .then(() => {
              clearCart();
              navigate(`/success?order=${orderId}`);
            })
            .catch((err) => {
              console.error("Verification failed:", err);
              alert("Payment verification failed. Please contact support.");
            });
        },
        onClose: () => {
          alert("Payment window closed. You can try again.");
          setLoading(false);
        },
      });
  
      handler.openIframe();
    } catch (error) {
      console.error("Checkout error:", error);
      alert("An error occurred during checkout. Please try again.");
    } finally {
      setLoading(false);
    }
  };
     

  const handleWhatsAppCheckout = () => {
    if (!validateForm()) return;
  
    const orderSummary = cart
      .map((item) => `- ${item.name} x ${item.qty} = KES ${(item.price * item.qty).toLocaleString()}`)
      .join("\n");
  
    const message = `
  Hello, I'd like to place an order.
  
  Name: ${form.name}
  Email: ${form.email}
  Phone: ${form.phone}
  City: ${form.city}
  Address: ${form.address}${form.postalCode ? `, ${form.postalCode}` : ""}
  
  Order:
  ${orderSummary}
  
  Subtotal: KES ${subtotal.toLocaleString()}
  Shipping: KES ${shipping.toLocaleString()}
  Total: KES ${total.toLocaleString()}
  
  Please confirm availability.
    `;
  
    const encodedMessage = encodeURIComponent(message.trim());
  
    // ✅ Replace with your WhatsApp business number (international format, no + sign)
    const whatsappNumber = "254728588119"; 
  
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, "_blank");
  };
  
  
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-16 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center">
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <div className="w-24 h-24 mx-auto mb-6 text-gray-400">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add some products to your cart before checking out.</p>
            <button
              onClick={() => navigate("/products")}
              className="bg-amber-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-amber-300 transition-colors duration-200"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
          <p className="text-gray-600">Complete your order in just a few steps</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Left Column - Customer Information */}
          <div className="space-y-6">
            {/* Contact Information */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={form.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      placeholder="+254 XXX XXX XXX"
                      value={form.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent ${
                        errors.phone ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Shipping Address *
                  </label>
                  <textarea
                    placeholder="Enter your complete shipping address"
                    value={form.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    rows={3}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent resize-none ${
                      errors.address ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      placeholder="Nairobi"
                      value={form.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent ${
                        errors.city ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      placeholder="00100"
                      value={form.postalCode}
                      onChange={(e) => handleInputChange("postalCode", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>

              {/* Order Items */}
              <div className="space-y-4 mb-6 max-h-80 overflow-y-auto">
                {cart.map((item) => (
                  <div key={item._id} className="flex items-center space-x-3">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.image || item.images?.[0] || '/api/placeholder/100/100'}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 line-clamp-2">{item.name}</h4>
                      <p className="text-gray-500 text-sm">Qty: {item.qty || 1}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-900">
                        KES {((item.price || 0) * (item.qty || 1)).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 border-t border-gray-200 pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal ({getCartItemsCount()} items)</span>
                  <span className="text-gray-900">KES {subtotal.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-900">
                    {shipping === 0 ? (
                      <span className="text-green-600 font-semibold">FREE</span>
                    ) : (
                      `KES ${shipping.toLocaleString()}`
                    )}
                  </span>
                </div>

                {shipping > 0 && (
                  <div className="text-xs text-amber-600 bg-amber-50 p-2 rounded">
                    Add KES {(10000 - subtotal).toLocaleString()} more for free shipping!
                  </div>
                )}

                <div className="flex justify-between text-lg font-semibold border-t border-gray-200 pt-3">
                  <span>Total</span>
                  <span className="text-amber-600">KES {total.toLocaleString()}</span>
                </div>
              </div>

              {/* Pay Button */}
              <button
                onClick={handlePay}
                disabled={loading}
                className="w-full bg-amber-400 text-black py-4 px-6 rounded-lg font-semibold hover:bg-amber-300 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none mt-6"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  `Pay KES ${total.toLocaleString()}`
                )}
              </button>

              <button
                  onClick={handleWhatsAppCheckout}
                  className="w-full bg-green-500 text-white py-4 px-6 rounded-lg font-semibold hover:bg-green-400 transition-all duration-300 transform hover:scale-105 mt-3"
                >
                  Order via WhatsApp
                </button>


              {/* Security Badge */}
              <div className="mt-4 text-center">
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span>Secure payment powered by Paystack</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}