import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({ setUser }) => {
  // Receive setUser from App.js
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:5001/auth", formData);

      if (response.data?.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user)); // Save user data
        window.dispatchEvent(new Event("userLoggedIn")); // ✅ Trigger event
        navigate("/"); // Redirect to home
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-[#f1f3f6] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex w-full max-w-[850px] min-h-[528px] bg-white shadow-lg rounded">
        <div className="w-[40%] bg-[#2874f0] p-8 text-white">
          <h2 className="text-3xl font-medium mb-4">
            {isLogin ? "Login" : "Looks like you're new here!"}
          </h2>
          <p className="text-[18px] leading-relaxed text-white/80">
            {isLogin
              ? "Get access to your Orders, Wishlist and Recommendations"
              : "Sign up with your mobile number to get started"}
          </p>
          <img
            src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/login_img_c4a81e.png"
            alt="Login banner"
            className="mt-auto"
          />
        </div>

        <div className="flex-1 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <input
                  type="text"
                  placeholder="Enter Name"
                  className="w-full p-2 border border-gray-300 rounded text-sm focus:border-[#2874f0] focus:outline-none"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>
            )}

            <div>
              <input
                type="text"
                placeholder="Enter Email/Mobile number"
                className="w-full p-2 border border-gray-300 rounded text-sm focus:border-[#2874f0] focus:outline-none"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Enter Password"
                className="w-full p-2 border border-gray-300 rounded text-sm focus:border-[#2874f0] focus:outline-none"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full bg-[#fb641b] text-white py-3 rounded text-sm font-medium hover:bg-[#fb641b]/90"
            >
              {isLogin ? "Login" : "Continue"}
            </button>
          </form>

          <p
            className="mt-8 text-[#2874f0] text-sm text-center cursor-pointer"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin
              ? "New to Flipkart? Create an account"
              : "Existing User? Log in"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
