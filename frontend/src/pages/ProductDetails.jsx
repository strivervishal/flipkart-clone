import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Please log in first to add items to your cart!");
      return;
    }

    const item = {
      id: product.id,
      name: product.title,
      image: product.image,
      price: product.price,
      quantity: 1,
    };

    dispatch(addToCart(item)); // Update Redux state

    try {
      const response = await fetch("http://localhost:5001/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email, item }),
      });

      if (!response.ok) {
        throw new Error("Failed to add item to cart");
      }

      alert("Item added to cart successfully!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add item to cart. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-96 bg-gray-200 rounded-lg mb-4"></div>
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-lg text-gray-500">Product not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Product Image */}
        <div className="sticky top-0">
          <img
            src={product.image}
            alt={product.title}
            className="w-full max-w-lg mx-auto"
          />
          <div className="mt-4 flex gap-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-[#ff9f00] text-white py-4 rounded-sm font-medium hover:bg-[#ff9000]"
            >
              ADD TO CART
            </button>
            <button className="flex-1 bg-[#fb641b] text-white py-4 rounded-sm font-medium hover:bg-[#fb541b]">
              BUY NOW
            </button>
          </div>
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-2xl font-medium mb-2">{product.title}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <div className="text-3xl font-medium mb-6">₹{product.price}</div>

          {/* Highlights */}
          <div className="mb-6">
            <h2 className="text-lg font-medium mb-3">Highlights</h2>
            <ul className="list-disc list-inside space-y-2">
              <li className="text-gray-600">Category: {product.category}</li>
              <li className="text-gray-600">
                Rating: {product.rating.rate} / 5
              </li>
            </ul>
          </div>

          {/* Specifications */}
          <div>
            <h2 className="text-lg font-medium mb-3">Specifications</h2>
            <div className="border rounded-sm">
              <div className="flex p-3 bg-gray-50">
                <div className="w-1/3 text-gray-600">Category</div>
                <div className="w-2/3">{product.category}</div>
              </div>
              <div className="flex p-3 bg-white">
                <div className="w-1/3 text-gray-600">Rating</div>
                <div className="w-2/3">{product.rating.rate} / 5</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
