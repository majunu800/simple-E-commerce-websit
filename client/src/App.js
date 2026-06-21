import { Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import OrdersPage from './pages/OrdersPage';
import AdminPage from './pages/AdminPage';
import Header from './components/Header';
import { useLocalStorage } from './hooks/useLocalStorage';

function App() {
  const [user, setUser] = useLocalStorage('user', null);
  const [cart, setCart] = useLocalStorage('cart', []);

  const addToCart = (product) => {
    setCart((current) => {
      const existing = current.find((item) => item._id === product._id);
      if (existing) {
        return current.map((item) => item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...current, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((current) => current.filter((item) => item._id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    setCart((current) => current.map((item) => item._id === productId ? { ...item, quantity } : item));
  };

  const logout = () => setUser(null);

  return (
    <div className="app-shell">
      <Header user={user} cart={cart} logout={logout} />
      <AnimatePresence mode="wait">
        <motion.main
          key={window.location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.35 }}
          className="page-shell"
        >
          <Routes>
            <Route path="/" element={<HomePage addToCart={addToCart} />} />
            <Route path="/login" element={<LoginPage setUser={setUser} />} />
            <Route path="/register" element={<RegisterPage setUser={setUser} />} />
            <Route path="/product/:id" element={<ProductPage addToCart={addToCart} />} />
            <Route path="/cart" element={<CartPage cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} user={user} />} />
            <Route path="/orders" element={user ? <OrdersPage user={user} /> : <Navigate to="/login" />} />
            <Route path="/admin" element={user?.role === 'admin' ? <AdminPage user={user} /> : <Navigate to="/" />} />
          </Routes>
        </motion.main>
      </AnimatePresence>
    </div>
  );
}

export default App;
