const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Product = require('./models/Product');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

dotenv.config();

const seed = async () => {
  await connectDB();

  await Product.deleteMany();
  await User.deleteMany();

  const products = [
    {
      name: 'Sleek Wireless Headphones',
      description: 'Premium sound with noise isolation and long battery life.',
      price: 129.99,
      image: 'https://images.unsplash.com/photo-1518449070885-97bf1abc35f5?auto=format&fit=crop&w=900&q=80',
      category: 'Audio',
      stock: 25,
    },
    {
      name: 'Minimalist Laptop Stand',
      description: 'Portable aluminum stand for ergonomic desk setups.',
      price: 49.99,
      image: 'https://images.unsplash.com/photo-1516407942671-4f3a38fc0c5f?auto=format&fit=crop&w=900&q=80',
      category: 'Accessories',
      stock: 50,
    },
    {
      name: 'Active Running Sneakers',
      description: 'Comfortable, lightweight shoes built for daily training.',
      price: 89.99,
      image: 'https://images.unsplash.com/photo-1528701800489-20f5f0c9c4fb?auto=format&fit=crop&w=900&q=80',
      category: 'Footwear',
      stock: 20,
    },
  ];

  await Product.insertMany(products);

  const adminPassword = await bcrypt.hash('Admin1234', 10);
  const userPassword = await bcrypt.hash('User1234', 10);

  await User.create([
    { name: 'Admin User', email: 'admin@store.com', password: adminPassword, role: 'admin' },
    { name: 'Regular User', email: 'user@store.com', password: userPassword, role: 'user' },
  ]);

  console.log('Seed complete');
  process.exit();
};

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
