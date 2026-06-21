import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Header = ({ user, cart, logout }) => (
  <header className="topbar">
    <motion.div className="brand" initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
      <Link to="/">BrandStore</Link>
    </motion.div>
    <nav className="nav-links">
      <Link to="/">Shop</Link>
      <Link to="/cart">Cart ({cart.length})</Link>
      {user ? (
        <>
          <Link to="/orders">Orders</Link>
          {user.role === 'admin' && <Link to="/admin">Admin</Link>}
          <button type="button" onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  </header>
);

export default Header;
