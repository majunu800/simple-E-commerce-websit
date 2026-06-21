import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const OrdersPage = ({ user }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/orders', {
      headers: { Authorization: `Bearer ${user.token}` },
    })
      .then((res) => res.json())
      .then(setOrders)
      .catch(console.error);
  }, [user]);

  return (
    <section className="orders-page">
      <h1>Order History</h1>
      <div className="orders-list">
        {orders.map((order) => (
          <motion.article key={order._id} className="order-card" whileHover={{ scale: 1.01 }}>
            <h2>Order #{order._id.slice(-6)}</h2>
            <p>Status: {order.status}</p>
            <p>Total: ${order.total.toFixed(2)}</p>
            <div className="order-items">
              {order.items.map((item) => (
                <div key={item.product._id} className="order-item">
                  <span>{item.product.name}</span>
                  <span>{item.quantity} × ${item.price.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default OrdersPage;
