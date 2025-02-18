import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Cart from './pages/Cart';
import ProductDetails from './pages/ProductDetails';
import { Provider } from 'react-redux';
import store from './store';

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen flex flex-col">
          {/* Pass user and setUser to Navbar */}
          <Navbar user={user} setUser={setUser} />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              {/* Pass setUser to Login */}
              <Route path="/login" element={<Login setUser={setUser} />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/product/:id" element={<ProductDetails />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
