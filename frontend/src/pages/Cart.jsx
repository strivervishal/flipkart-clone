import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateQuantity } from "../store/cartSlice";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const cartState = useSelector((state) => state.cart.items);

  useEffect(() => {
    if (user) {
      fetch(`https://flipkart-clone-79uc.vercel.app/cart?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => setCartItems(data))
        .catch((error) => console.error("Error fetching cart:", error));
    }
  }, [user]);

  const handleRemoveItem = async (itemId) => {
    try {
      const response = await fetch(
        "https://flipkart-clone-79uc.vercel.app/cart/remove",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: user.email, itemId }),
        }
      );

      if (!response.ok) throw new Error("Failed to remove item");

      // Re-fetch updated cart after deletion
      const updatedCartResponse = await fetch(
        `https://flipkart-clone-79uc.vercel.app/cart?email=${user.email}`
      );
      const updatedCartData = await updatedCartResponse.json();

      setCartItems(updatedCartData);
      dispatch(removeFromCart(itemId)); // Update Redux state
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const handleQuantityChange = async (itemId, quantity) => {
    const updatedCart = cartItems.map((item) =>
      item.id === itemId ? { ...item, quantity } : item
    );
    setCartItems(updatedCart);
    dispatch(updateQuantity({ id: itemId, quantity }));

    try {
      await fetch("https://flipkart-clone-79uc.vercel.app/cart/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email, itemId, quantity }),
      });
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  if (!user) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-lg font-medium mb-4">
          Please log in to view your cart.
        </h2>
        <Link
          to="/login"
          className="bg-[#2874f0] text-white px-8 py-3 rounded font-medium"
        >
          Login
        </Link>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#f1f3f6] pt-20">
        <div className="max-w-5xl mx-auto p-6 bg-white shadow mt-4">
          <div className="text-center py-8">
            <img
              src="https://rukminim1.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png"
              alt="Empty Cart"
              className="w-72 mx-auto mb-4"
            />
            <h2 className="text-lg font-medium mb-4">Your cart is empty!</h2>
            <p className="text-gray-500 mb-4">Add items to it now.</p>
            <Link
              to="/"
              className="bg-[#2874f0] text-white px-16 py-3 rounded-sm font-medium"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-[#f1f3f6] pt-20">
      <div className="max-w-6xl mx-auto p-4 flex gap-4">
        {/* Cart Items */}
        <div className="flex-1">
          <div className="bg-white shadow">
            <div className="p-4 border-b">
              <h1 className="text-lg font-medium">
                My Cart ({cartItems.length})
              </h1>
            </div>

            {cartItems.map((item) => (
              <div key={item.id} className="p-4 border-b flex gap-4">
                <div className="w-24 h-24 flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="flex-1">
                  <h3 className="font-medium text-sm mb-1">{item.name}</h3>
                  <div className="flex items-center gap-2">
                    <select
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(item.id, parseInt(e.target.value))
                      }
                      className="border p-1 rounded"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                        <option key={num} value={num}>
                          {num}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-[#2874f0] font-medium text-sm"
                    >
                      REMOVE
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-medium">
                    ₹{(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              </div>
            ))}

            <div className="p-4 flex justify-end">
              <button className="bg-[#fb641b] text-white px-16 py-4 text-sm font-medium rounded-sm">
                PLACE ORDER
              </button>
            </div>
          </div>
        </div>

        {/* Price Details */}
        <div className="w-96">
          <div className="bg-white shadow p-4">
            <h2 className="text-gray-500 font-medium text-sm uppercase mb-4">
              PRICE DETAILS
            </h2>
            <div className="space-y-4 border-b pb-4">
              <div className="flex justify-between">
                <span>Price ({cartItems.length} items)</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charges</span>
                <span className="text-green-600">FREE</span>
              </div>
            </div>
            <div className="flex justify-between py-4 font-medium text-lg">
              <span>Total Amount</span>
              <span>₹{total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
