import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../Service/CartContext/CartContext.jsx";
import { toast, Bounce } from "react-toastify";
import { BsFillTrash3Fill } from "react-icons/bs";
import { useAuth } from "../../hooks/useAuth.js";
import "react-toastify/dist/ReactToastify.css";
import "./cart.css";

const Cart = ({ isActive, onActive }) => {
  // only for demo: destructure local cart functions
  const { removeFromCartLocal, clearCartLocal, products } =
    useContext(CartContext);

  /* ORIGINAL BACKEND CODE - COMMENTED FOR DEMO
  const { fetchCart, products, cartId } =
    useContext(CartContext);
  */

  const [total, setTotal] = useState();

  const navigate = useNavigate();
  // only for demo: don't need auth hook for local cart, but keep it commented
  // const { isAuthenticated, token } = useAuth(); // COMMENTED FOR DEMO

  useEffect(() => {
    const totalCalculado = products?.reduce((acc, product) => {
      const precio = product.productSize.product.price;
      const cantidad = product.quantity;
      return acc + precio * cantidad;
    }, 0);
    setTotal(totalCalculado);
  }, [products]);

  // only for demo: remove product from local cart
  const onDeleteProduct = (productId) => {
    removeFromCartLocal(productId);
    toast.error("🗑️ Producto eliminado", {
      position: "bottom-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  /* ORIGINAL BACKEND DELETE - COMMENTED FOR DEMO
  const onDeleteProduct = async (productId) => {
    const response = await fetch(`http://localhost:3000/cart`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cartProductId: productId,
      }),
    });
    if (response.ok) {
      toast.error("🗑️ Producto eliminado", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });

      const updatedProducts = products.filter(
        (product) => product.id !== productId
      );
      await fetchCart();
    }
  };
  */

  // only for demo: clear entire cart locally
  const onclickCart = () => {
    clearCartLocal();
    console.log("Carrito vaciado");
  };

  /* ORIGINAL BACKEND CLEAR CART - COMMENTED FOR DEMO
  const onclickCart = async () => {
    const response = await fetch(`http://localhost:3000/allCart`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cartId,
      }),
    });

    if (response.ok) {
      await fetchCart();
      console.log("Carrito vaciado");
    }
  };
  */

  // only for demo: navigate to shopping without login requirement
  const handlenav = () => {
    /* ORIGINAL AUTHENTICATION CHECK - COMMENTED FOR DEMO
    if (!isAuthenticated) {
      toast.error("⚠️ Debes iniciar sesión para finalizar la compra", {
        position: "bottom-left",
        autoClose: 3000,
        theme: "light",
        transition: Bounce,
      });
      return;
    }
    */
    onActive(false);
    navigate("/shopping");
  };

  return (
    <div className={`container-cart-products ${isActive ? "" : "hidden-cart"}`}>
      {products?.length ? (
        <>
          <div className="cart-header-row">
            <span>Cant.</span>
            <span>Producto</span>
            <span>Precio</span>
            <span>Acción</span>
          </div>

          {products.map((product) => (
            <div className="cart-product-row" key={product.id}>
              <span>{product.quantity}</span>
              <span>
                {product.productSize.product.name} ({product.productSize.size})
              </span>
              <span>${product.productSize.product.price}</span>
              <button onClick={() => onDeleteProduct(product.id)}>
                <BsFillTrash3Fill />
              </button>
            </div>
          ))}

          <div className="cart-total">
            <h5><b>Total</b>: ${total}</h5>
          </div>
          <button className="btn-clear-all" onClick={onclickCart}>
            Vaciar carrito
          </button>
          <button onClick={handlenav}>Finalizar pedido</button>
        </>
      ) : (
        <p>El carrito está vacío</p>
      )}
    </div>
  );
};

export default Cart;
