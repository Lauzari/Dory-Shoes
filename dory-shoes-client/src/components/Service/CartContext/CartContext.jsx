import React from "react";
import { createContext, useState, useEffect } from "react";
// import {useAuth} from "../../../hooks/useAuth"; // only for demo: commented, not needed for local cart

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  // only for demo: use only local state, no token dependency
  // const {token} = useAuth(); // ORIGINAL - COMMENTED FOR DEMO
  const [countProduct, setCountProduct] = useState(0); // only for demo: initialized to 0
  const [products, setProducts] = useState([]);
  const [cartId, setCartId] = useState(); // only for demo: not used in local mode

  // only for demo: load cart from localStorage on mount
  useEffect(() => {
    loadCartFromStorage();
  }, []);

  const loadCartFromStorage = () => {
    try {
      const storedCart = localStorage.getItem("dory-shoes-cart");
      if (storedCart) {
        const cartData = JSON.parse(storedCart);
        setProducts(cartData.products || []);
        setCountProduct(cartData.totalProducts || 0);
      }
    } catch (error) {
      console.error("Error loading cart from storage:", error);
    }
  };

  // only for demo: save cart to localStorage
  const saveCartToStorage = (updatedProducts) => {
    try {
      const cartData = {
        products: updatedProducts,
        totalProducts: updatedProducts.length
      };
      localStorage.setItem("dory-shoes-cart", JSON.stringify(cartData));
      setProducts(updatedProducts);
      setCountProduct(updatedProducts.length);
    } catch (error) {
      console.error("Error saving cart to storage:", error);
    }
  };

  // only for demo: add product to cart locally
  const addToCartLocal = (product, size) => {
    const storedCart = localStorage.getItem("dory-shoes-cart");
    const currentProducts = storedCart ? JSON.parse(storedCart).products : [];
    
    const newCartItem = {
      id: `${product.id}_${size}_${Date.now()}`, // only for demo: unique ID with timestamp
      productSize: {
        product: {
          id: product.id,
          name: product.name,
          price: product.price,
          imageUrl: product.imageUrl
        },
        size: size
      },
      quantity: 1
    };
    const updatedProducts = [...currentProducts, newCartItem];
    saveCartToStorage(updatedProducts);
  };

  // only for demo: remove product from cart locally
  const removeFromCartLocal = (cartProductId) => {
    const storedCart = localStorage.getItem("dory-shoes-cart");
    const currentProducts = storedCart ? JSON.parse(storedCart).products : [];
    const updatedProducts = currentProducts.filter(item => item.id !== cartProductId);
    saveCartToStorage(updatedProducts);
  };

  // only for demo: clear entire cart locally
  const clearCartLocal = () => {
    saveCartToStorage([]);
  };

  /* ORIGINAL BACKEND CODE - COMMENTED FOR DEMO
  useEffect(() => {
    if (token) {
      fetchCart();
    }
  }, [token]);
  
  const fetchCart = async () => {
      try {
        const response = await fetch("http://localhost:3000/cart", {
          headers: {
          Authorization: `Bearer ${token}`},
        },
        );
        const data = await response.json();
        setProducts(data.cartProducts);
        setCountProduct(data.totalProducts);
        setCartId(data.id);
      } catch (error) {
        console.error("Error al obtener el carrito:", error);
      }
    };
  */

  return (
    <CartContext.Provider
      value={{
        countProduct,
        products,
        cartId,
        // only for demo: expose local functions instead of backend fetchCart
        addToCartLocal,
        removeFromCartLocal,
        clearCartLocal,
        loadCartFromStorage
        // fetchCart // ORIGINAL - COMMENTED FOR DEMO
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
