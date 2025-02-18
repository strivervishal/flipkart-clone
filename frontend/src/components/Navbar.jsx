import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaShoppingCart, FaSearch } from 'react-icons/fa';

const Navbar = () => {
  const cartItems = useSelector((state) => state.cart?.items || []);
  const [searchQuery, setSearchQuery] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user'))); // Load user on mount
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // ✅ Listen for the custom login event
  useEffect(() => {
    const handleUserLogin = () => {
      setUser(JSON.parse(localStorage.getItem('user')) || null);
    };

    window.addEventListener('userLoggedIn', handleUserLogin);
    return () => {
      window.removeEventListener('userLoggedIn', handleUserLogin);
    };
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('user');  // Remove user from storage
    setUser(null);  // Update state
    setDropdownVisible(false);  // Close dropdown after logout
    navigate('/');  // Redirect to home
  };

  return (
    <nav className="bg-[#2874f0] py-2.5 fixed w-full top-0 z-50">
      <div className="container mx-auto px-4 flex items-center">
        <Link to="/" className="mr-4 min-w-[140px]">
          <img 
            src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/flipkart-plus_8d85f4.png" 
            alt="Flipkart" 
            className="h-5"
          />
        </Link>
        
        <div className="flex-1 max-w-2xl relative">
          <input
            type="text"
            placeholder="Search for products, brands and more"
            className="w-full px-4 py-2 pl-10 rounded-sm text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        <div className="flex items-center ml-auto space-x-8">
          {user ? (
            <div className="relative group" ref={dropdownRef}>
              <button 
                className="text-white px-6 py-1 bg-white bg-opacity-10 font-medium text-sm"
                onClick={() => setDropdownVisible((prev) => !prev)}
              >
                {user.name}
              </button>

              {dropdownVisible && (
                <div className="absolute right-0 mt-3.5 w-48 bg-white rounded-sm shadow-lg py-3 border-t-2 border-[#2874f0]">
                  <Link to="/profile" className="block px-4 py-2 hover:bg-gray-50">My Profile</Link>
                  <Link to="/orders" className="block px-4 py-2 hover:bg-gray-50">Orders</Link>
                  <button 
                    onClick={handleLogout} 
                    className="block w-full text-left px-4 py-2 hover:bg-gray-50 text-red-500"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login">
              <button className="text-white px-8 py-1 bg-white bg-opacity-10 font-medium text-sm">
                Login
              </button>
            </Link>
          )}

          <Link to="/become-seller" className="text-white font-medium text-sm">
            Become a Seller
          </Link>

          <Link to="/cart" className="text-white flex items-center space-x-2 relative">
            <FaShoppingCart className="text-xl" />
            <span>Cart</span>
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
