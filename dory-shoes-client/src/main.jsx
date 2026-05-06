import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Importar tus contextos
import CartProvider from './components/Service/cartContext/CartContext.jsx';
import { UserProvider } from './components/Service/auth/usercontext/UserContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <UserProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </UserProvider>
    </HashRouter>
  </StrictMode>
);
