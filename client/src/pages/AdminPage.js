import { useEffect, useState } from 'react';

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', description: '', price: 0, image: '', category: '', stock: 10 });

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then((res) => res.json())
      .then(setProducts)
      .catch(console.error);
  }, []);

  const createProduct = async (event) => {
    event.preventDefault();
    await fetch('http://localhost:5000/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user?.token}`,
      },
      body: JSON.stringify(form),
    });
    setForm({ name: '', description: '', price: 0, image: '', category: '', stock: 10 });
  };

  return (
    <section className="admin-page">
      <h1>Admin panel</h1>
      <form className="admin-form" onSubmit={createProduct}>
        <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Name" required />
        <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="Category" required />
        <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} placeholder="Price" required />
        <input type="text" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="Image URL" required />
        <input type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })} placeholder="Stock" required />
        <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Description" required />
        <button type="submit">Add product</button>
      </form>
      <div className="admin-grid">
        {products.map((product) => (
          <article key={product._id} className="admin-card">
            <img src={product.image} alt={product.name} />
            <div>
              <strong>{product.name}</strong>
              <span>${product.price.toFixed(2)}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default AdminPage;
