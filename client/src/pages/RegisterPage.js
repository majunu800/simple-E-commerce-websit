import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = ({ setUser }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.message);
      return;
    }
    setUser(data);
    navigate('/');
  };

  return (
    <section className="form-page">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h1>Create account</h1>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email" required />
        <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" required />
        {error && <p className="error-text">{error}</p>}
        <button type="submit">Register</button>
      </form>
    </section>
  );
};

export default RegisterPage;
