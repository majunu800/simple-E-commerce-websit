import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CartPage = ({ cart, updateQuantity, removeFromCart, user }) => {
  const navigate = useNavigate();
  const [success, setSuccess] = useState('');

  const total = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart]);

  const handleCheckout = async () => {
    if (!user) return navigate('/login');
    const response = await fetch('http://localhost:5000/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ items: cart, total }),
    });
    if (response.ok) {
      setSuccess('Checkout complete. Your order is on the way!');
    }
  };

  return (
    <section className="cart-page">
      <h1>Your cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty. Browse items to add.</p>
      ) : (
        <div className="cart-grid">
          <div className="cart-items">
            {cart.map((item) => (
              <article key={item._id} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div>
                  <h2>{item.name}</h2>
                  <p>${item.price.toFixed(2)}</p>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item._id, Number(e.target.value))}
                  />
                  <button type="button" onClick={() => removeFromCart(item._id)}>Remove</button>
                </div>
              </article>
            ))}
          </div>
          <aside className="cart-summary">
            <p>Total: ${total.toFixed(2)}</p>
            <button type="button" onClick={handleCheckout}>Checkout</button>
            {success && <p className="success-message">{success}</p>}
          </aside>
        </div>
      )}
    </section>
  );
};

export default CartPage;
