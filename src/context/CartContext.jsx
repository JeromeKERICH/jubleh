import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("jubleh_cart");
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
      return [];
    }
  });

  // Save to localStorage whenever cart changes
  useEffect(() => {
    try {
      localStorage.setItem("jubleh_cart", JSON.stringify(cart));
    } catch (error) {
      console.error("Error saving cart to localStorage:", error);
    }
  }, [cart]);

  const addToCart = (product, qty = 1) => {
    if (!product || !product._id) {
      console.error("Invalid product:", product);
      return;
    }

    setCart(prev => {
      const existing = prev.find(item => item._id === product._id);
      if (existing) {
        return prev.map(item =>
          item._id === product._id
            ? { ...item, qty: Math.min(item.qty + qty, 99) } // Limit max quantity to 99
            : item
        );
      }
      return [...prev, { 
        ...product, 
        qty: Math.min(qty, 99),
        addedAt: new Date().toISOString() // Track when item was added
      }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item._id !== id));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }

    setCart(prev => prev.map(item => 
      item._id === productId 
        ? { ...item, qty: Math.min(newQuantity, 99) } // Limit max quantity to 99
        : item
    ));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price || 0) * (item.qty || 1), 0);
  };

  const getCartItemsCount = () => {
    return cart.reduce((count, item) => count + (item.qty || 1), 0);
  };

  const isInCart = (productId) => {
    return cart.some(item => item._id === productId);
  };

  const getItemQuantity = (productId) => {
    const item = cart.find(item => item._id === productId);
    return item ? item.qty : 0;
  };

  // Calculate shipping (free over KES 10,000)
  const getShippingCost = () => {
    const total = getCartTotal();
    return total > 10000 ? 0 : 5;
  };

  const getFinalTotal = () => {
    return getCartTotal() + getShippingCost();
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemsCount,
    isInCart,
    getItemQuantity,
    getShippingCost,
    getFinalTotal
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};