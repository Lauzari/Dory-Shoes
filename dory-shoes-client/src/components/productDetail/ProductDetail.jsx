import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import "./ProductDetail.css";
import ModalImage from "../ui/ModalImage";
import ModalProduct from "../ui/ModalProduct";
import { CartContext } from "../Service/CartContext/CartContext";
import { toast, Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../hooks/useAuth.js";
// only for demo: import local product data
import ProductData from "../../data/products.json";

function ProductDetail() {
  // only for demo: destructure local cart functions
  const { addToCartLocal, toggleFavoriteLocal } = useContext(CartContext);

  /* ORIGINAL BACKEND CODE - COMMENTED FOR DEMO
  const { fetchCart} = useContext(CartContext);
  const { id, token } = useAuth();
  */

  const navigate = useNavigate();
  const { productId } = useParams();

  const [product, setProduct] = useState();
  const [selectedSize, setSelectedSize] = useState(null);
  const [favourite, setFavourite] = useState();
  const [showModal, setShowModal] = useState(false);
  const [showModalProduct, setShowModalProduct] = useState(false);

  // only for demo: Load product from local data
  useEffect(() => {
    fetchProductoLocal();
  }, [productId]);

  const fetchProductoLocal = () => {
    try {
      const foundProduct = ProductData.find(p => p.id === Number(productId));
      if (!foundProduct) {
        navigate("/");
        throw new Error("Producto no encontrado");
      }
      // only for demo: normalize product data structure
      const normalizedProduct = {
        ...foundProduct,
        name: foundProduct.nombre,
        price: foundProduct.precio,
        imageUrl: foundProduct.imagen,
        category: foundProduct.categoria,
        productSizes: Object.entries(foundProduct.size).map(([sizeKey, stock]) => ({
          size: sizeKey,
          stock: stock
        })),
        favourite: null // only for demo: no favorites from backend
      };
      setProduct(normalizedProduct);
      setFavourite(null);
    } catch (err) {
      console.log(err.message);
    }
  };

  /* ORIGINAL BACKEND FETCH - COMMENTED FOR DEMO
  useEffect(() => {
    fetchProducto();
  }, []);

  const fetchProducto = async () => {
    try {
      //Sacar el query del URL cuando agreguemos JWT
      const response = await fetch(
        `http://localhost:3000/products/${productId}`,
        {
          method: "GET",
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );
      if (!response.ok) {
        navigate("/");
        throw new Error("Producto no encontrado");
      }
      const data = await response.json();
      setProduct(data);
      setFavourite(data.favourite);
    } catch (err) {
      console.log(err.message);
    }
  };
  */

  // only for demo: add to cart without authentication
  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Seleccione un talle para continuar", {
        position: "bottom-left",
        autoClose: 5000,
        theme: "light",
        transition: Bounce,
      });
      return;
    }
    try {
      addToCartLocal(product, selectedSize);
      toast.success("✔️ Producto agregado al carrito", {
        position: "bottom-left",
        autoClose: 5000,
        theme: "light",
        pauseOnHover: false,
        transition: Bounce,
      });
    } catch (err) {
      console.error(err.message);
      toast.error("❌ Error al agregar producto al carrito", {
        position: "bottom-left",
        autoClose: 5000,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  /* ORIGINAL BACKEND CART ADD - COMMENTED FOR DEMO
  const handleAddToCart = async () => {
    if (!token) {
      toast.error("Debe iniciar sesión para comenzar a comprar", {
        position: "bottom-left",
        autoClose: 5000,
        theme: "light",
        transition: Bounce,
      });
      return;
    }
    if (!selectedSize) {
      toast.error("Seleccione un talle para continuar", {
        position: "bottom-left",
        autoClose: 5000,
        theme: "light",
        transition: Bounce,
      });
      return;
    }
    try {
      const response = await fetch(`http://localhost:3000/cart/${product.id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quantity: 1,
          size: selectedSize,
        }),
      });

      if (!response.ok) {
        throw new Error("No se pudo agregar el producto al carrito");
      }

      const newProduct = await response.json();

      if (newProduct) {
        await fetchCart();
      }
      toast.success("✔️ Producto agregado al carrito", {
        position: "bottom-left",
        autoClose: 5000,
        theme: "light",
        pauseOnHover: false,
        transition: Bounce,
      });
    } catch (err) {
      console.error(err.message);
      toast.error("❌ Error al agregar producto al carrito", {
        position: "bottom-left",
        autoClose: 5000,
        theme: "light",
        transition: Bounce,
      });
    }
  };
  */

  // only for demo: toggle favorite without authentication
  const toggleFavorite = () => {
    if (favourite) {
      toggleFavoriteLocal(product.id, false);
      setFavourite(null);
      toast.error("💔 Producto eliminado de favoritos", {
        position: "bottom-left",
        autoClose: 5000,
        theme: "light",
        transition: Bounce,
      });
    } else {
      toggleFavoriteLocal(product.id, true);
      setFavourite({ id: product.id }); // only for demo: simple favorite object
      toast.success("❤️ Producto agregado a favoritos", {
        position: "bottom-left",
        autoClose: 5000,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  /* ORIGINAL BACKEND FAVORITES - COMMENTED FOR DEMO
  const toggleFavorite = () => {
    if (token) {
      if (favourite) {
        deleteFavourite();
      } else {
        addFavourite();
      }
    } else {
      toast.error("Debe iniciar sesión para guardar productos en favoritos.", {
        position: "bottom-left",
        autoClose: 5000,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  const addFavourite = async () => {
    try {
      const response = await fetch(`http://localhost:3000/addFavourite`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product.id,
        }),
      });

      if (!response.ok) throw new Error("Error al agregar favorito");

      const newFavourite = await response.json();
      setFavourite(newFavourite);
      toast.success("❤️ Producto agregado a favoritos", {
        position: "bottom-left",
        autoClose: 5000,
        theme: "light",
        transition: Bounce,
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  const deleteFavourite = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/deleteFavourite/${favourite.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Error al eliminar favorito");

      setFavourite(null);
      toast.error("💔 Producto eliminado de favoritos", {
        position: "bottom-left",
        autoClose: 5000,
        theme: "light",
        transition: Bounce,
      });
    } catch (err) {
      console.log(err.message);
    }
  };
  */

  return (
    <div className="product-detail">
      <ToastContainer />
      <img
        src={`${import.meta.env.BASE_URL}${product?.imageUrl.replace(/^\//, '')}`}
        alt={product?.name}
        className="product-image"
        onClick={() => setShowModal(true)}
        style={{ cursor: "pointer" }}
      />

      <h2 className="product-title">{product?.name}</h2>
      <p>${product?.price}</p>

      <div className="sizes">
        <p>Selecciona un talle:</p>
        <div className="size-options">
          {product?.productSizes.map((sizeObj) => (
            <button
              key={sizeObj.size}
              onClick={() => setSelectedSize(sizeObj.size)}
              className={selectedSize === sizeObj.size ? "selected" : ""}
              disabled={sizeObj.stock === 0}
            >
              {sizeObj.stock === 0 ? <s>{sizeObj.size}</s> : sizeObj.size}
            </button>
          ))}
        </div>
        <button
          className="no-size-button"
          onClick={() => setShowModalProduct(true)}
        >
          Tabla de talles
        </button>
      </div>

      <button onClick={() => window.history.back()}>Volver</button>
      <button onClick={handleAddToCart}>Agregar al carrito</button>
      <button onClick={toggleFavorite}>
        {favourite ? <AiFillHeart /> : <AiOutlineHeart />} Favorito
      </button>

      <ModalImage
        show={showModal}
        onClose={() => setShowModal(false)}
        image={product?.imageUrl}
        alt={product?.name}
      />
      <ModalProduct
        show={showModalProduct}
        onHide={() => setShowModalProduct(false)}
      />
    </div>
  );
}

export default ProductDetail;
