require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');

const app = express();

// ✅ CORS Configuration for Vercel Deployment
app.use(cors({
  origin: "*", // Frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

// ✅ Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// ✅ User Schema
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true, lowercase: true, trim: true },
  password: { type: String, required: true },
});
const User = mongoose.model('Customer', UserSchema);

// ✅ Cart Schema
const CartSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  items: [
    {
      id: { type: String, required: true },
      name: String,
      image: String,
      price: Number,
      quantity: Number,
    }
  ]
});
const Cart = mongoose.model('Cart', CartSchema);

// ✅ Register or Login Route
app.post('/auth', async (req, res) => {
  let { email, password, name } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and Password are required' });
  }

  email = email.toLowerCase().trim();

  try {
    let user = await User.findOne({ email });

    if (user) {
      // User exists - Login
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
    } else {
      // User does not exist - Register
      if (!name) return res.status(400).json({ message: 'Name is required for registration' });

      const hashedPassword = await bcrypt.hash(password, 10);
      user = new User({ name: name.trim(), email, password: hashedPassword });
      await user.save();
    }

    res.json({ user: { name: user.name, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// ✅ Get User Info Route
app.get('/user', async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) return res.status(400).json({ message: 'Email is required' });

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ name: user.name, email: user.email });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// ✅ Add Item to Cart API
app.post('/cart/add', async (req, res) => {
  const { email, item } = req.body;
  if (!email || !item) return res.status(400).json({ message: 'Invalid request' });

  try {
    let cart = await Cart.findOne({ userEmail: email });

    if (!cart) {
      cart = new Cart({ userEmail: email, items: [item] });
    } else {
      const itemIndex = cart.items.findIndex(i => i.id === item.id);
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += 1; // Increase quantity
      } else {
        cart.items.push(item);
      }
    }

    await cart.save();
    res.json({ message: 'Cart updated', cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// ✅ Get User's Cart API
app.get('/cart', async (req, res) => {
  const { email } = req.query;
  if (!email) return res.status(400).json({ message: 'Email is required' });

  try {
    const cart = await Cart.findOne({ userEmail: email });
    res.json(cart ? cart.items : []);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// ✅ Remove Item from Cart API
app.post('/cart/remove', async (req, res) => {
  const { email, itemId } = req.body;
  if (!email || !itemId) return res.status(400).json({ message: 'Invalid request' });

  try {
    let cart = await Cart.findOne({ userEmail: email });

    if (cart) {
      cart.items = cart.items.filter(item => item.id !== itemId);
      await cart.save();
      return res.json({ message: 'Item removed from cart', cart });
    }

    res.status(404).json({ message: 'Cart not found' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

