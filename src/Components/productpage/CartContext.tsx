// import React, { createContext, useContext, useState, useEffect } from "react";
// import { Product } from "./ProductData";

// import { createContext, useContext, useEffect, useState } from "react";
// import { Product } from "./ProductData";

// interface CartItem extends Product {
//   players: any;
//   quantity: number;
// }

// interface CartContextType {
//   cart: CartItem[];
//   addToCart: (product: Product) => void;
//   removeFromCart: (id: number) => void;
//   clearCart: () => void;
//   setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
//   isBooked: (id: number) => boolean;
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

//   const isBooked = (id: number) => cart.some((item) => item.id === id);

//   return (
//     <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, setCart, isBooked }}>
//       {children}
//     </CartContext.Provider>
//   );
// };


import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "./ProductData";

// Define the Player interface
interface Player {
  id: string;
  name: string;
}

// Define the CartItem interface
interface CartItem extends Product {
  players: Player[]; // Players are now stored as objects with id and name
  quantity: number;
}

// Define the CartContextType interface
interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  isBooked: (id: number) => boolean;
}

// Create the CartContext
const CartContext = createContext<CartContextType | undefined>(undefined);

// Custom hook to use the CartContext
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

// CartProvider component
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
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
                players: Array.from(new Set([...item.players, ...(product.players || [])])), // Merge players properly
              }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1, players: product.players || [] }]; // Ensure players array exists
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

// import React, { createContext, useContext, useState, useEffect } from "react";
// import { CartItem, Product } from "../productpage/ProductData";

// // Define the CartContextType interface
// interface CartContextType {
//   cart: CartItem[];
//   addToCart: (product: Product) => void;
//   removeFromCart: (id: number) => void;
//   clearCart: () => void;
//   setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
//   isBooked: (id: number) => boolean;
// }

// // Create the CartContext
// const CartContext = createContext<CartContextType | undefined>(undefined);

// // Custom hook to use the CartContext
// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error("useCart must be used within a CartProvider");
//   }
//   return context;
// };

// // CartProvider component
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
//           item.id === product.id
//             ? {
//                 ...item,
//                 quantity: item.quantity + 1,
//                 players: Array.from(new Set([...item.players, ...product.players])), // Merge players properly
//               }
//             : item
//         );
//       }
//       return [...prevCart, { ...product, quantity: 1, players: product.players || [] }]; // Ensure players array exists
//     });
//   };

//   const removeFromCart = (id: number) => {
//     setCart((prevCart) => prevCart.filter((item) => item.id !== id));
//   };

//   const clearCart = () => {
//     setCart([]);
//   };

//   const isBooked = (id: number) => cart.some((item) => item.id === id);

//   return (
//     <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, setCart, isBooked }}>
//       {children}
//     </CartContext.Provider>
//   );
// };