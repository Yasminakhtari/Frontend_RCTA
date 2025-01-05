// import React, { createContext, useContext, useState, useEffect } from "react";
// import { Product } from "./ProductData";

// interface CartItem extends Product {
//   quantity: number;
// }

// interface CartContextType {
//   cart: CartItem[];
//   addToCart: (product: Product) => void;
//   removeFromCart: (id: number) => void;
//   clearCart: () => void;
//   setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
//   isBooked: (id: number) => boolean;  // Add isBooked method
// }

// const CartContext = createContext<CartContextType | undefined>(undefined);

// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error("useCart must be used within a CartProvider");
//   }
//   return context;
// };

// export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [cart, setCart] = useState<CartItem[]>(() => {
//     const savedCart = localStorage.getItem("cart");
//     return savedCart ? JSON.parse(savedCart) : [];
//   });

//   useEffect(() => {
//     localStorage.setItem("cart", JSON.stringify(cart));
//   }, [cart]);

//   const addToCart = (product: Product) => {
//     setCart((prevCart) => {
//       const existingItem = prevCart.find((item) => item.id === product.id);
//       if (existingItem) {
//         return prevCart.map((item) =>
//           item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
//         );
//       }
//       return [...prevCart, { ...product, quantity: 1 }];
//     });
//   };

//   const removeFromCart = (id: number) => {
//     setCart((prevCart) => prevCart.filter((item) => item.id !== id));
//   };

//   const clearCart = () => {
//     setCart([]);
//   };

//   const isBooked = (id: number) => {
//     return cart.some((item) => item.id === id);
//   };

//   return (
//     <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, setCart, isBooked }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "./ProductData";

interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  isBooked: (id: number) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const isBooked = (id: number) => cart.some((item) => item.id === id);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, setCart, isBooked }}>
      {children}
    </CartContext.Provider>
  );
};
