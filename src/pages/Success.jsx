import { useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";

export default function Success() {
  const [params] = useSearchParams();
  const orderId = params.get("order");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="text-center text-white max-w-md">
        {/* Success Icon */}
        <div className="mb-8">
          <div className="w-20 h-20 border-2 border-amber-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg 
              className="w-10 h-10 text-amber-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M5 13l4 4L19 7" 
              />
            </svg>
          </div>
        </div>

        {/* Main Message */}
        <h1 className="text-2xl md:text-3xl font-light mb-4 tracking-wide">
          Order Confirmed
        </h1>

        {/* Order Details */}
        <div className="mb-8">
          <p className="text-gray-400 text-lg mb-2">
            Your order has been received
          </p>
          <div className="text-amber-400 font-light tracking-wider text-sm">
            #{orderId}
          </div>
        </div>

        {/* Additional Info */}
        <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-xs mx-auto">
          We've sent your order confirmation and receipt to your email. 
          Thank you for choosing JUBLEH.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/products"
            className="border border-amber-400 text-amber-400 px-6 py-3 rounded-sm font-light hover:bg-amber-400 hover:text-black transition-all duration-300 text-sm tracking-wide"
          >
            Continue Shopping
          </Link>
          <Link 
            to="/"
            className="border border-gray-500 text-gray-400 px-6 py-3 rounded-sm font-light hover:border-gray-300 hover:text-gray-300 transition-all duration-300 text-sm tracking-wide"
          >
            Return Home
          </Link>
        </div>

        {/* Support Info */}
        <div className="mt-12 pt-6 border-t border-gray-800">
          <p className="text-gray-500 text-xs">
            Need help?{" "}
            <a 
              href="mailto:support@jublehhaven.co.ke" 
              className="text-amber-400 hover:text-amber-300 transition-colors"
            >
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
