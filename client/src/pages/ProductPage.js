import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProductPage = ({ addToCart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then((res) => res.json())
      .then(setProduct)
      .catch(console.error);
  }, [id]);

  if (!product) return <div className="loading">Loading product...</div>;

  return (
    <section className="product-page">
      <img src={product.image} alt={product.name} />
      <div className="product-summary">
        <h1>{product.name}</h1>
        <p className="tag">{product.category}</p>
        <p>{product.description}</p>
        <div className="price-row">
          <strong>${product.price.toFixed(2)}</strong>
          <button type="button" onClick={() => addToCart(product)}>Add to cart</button>
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
