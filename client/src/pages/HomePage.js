import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HomePage = ({ addToCart }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then((res) => res.json())
      .then(setProducts)
      .catch(console.error);
  }, []);

  return (
    <section className="hero-section">
      <div className="hero-copy">
        <h1>Shop modern essentials with smooth motion.</h1>
        <p>Browse products, add to cart, and checkout on any device.</p>
      </div>
      <div className="product-grid">
        {products.map((product) => (
          <motion.article key={product._id} className="product-card" whileHover={{ y: -5 }}>
            <Link to={`/product/${product._id}`}>
              <img src={product.image} alt={product.name} />
            </Link>
            <div className="product-details">
              <h2>{product.name}</h2>
              <p>{product.category}</p>
              <span>${product.price.toFixed(2)}</span>
              <button type="button" onClick={() => addToCart(product)}>Add to cart</button>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default HomePage;
