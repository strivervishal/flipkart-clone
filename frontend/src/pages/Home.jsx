import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Categories with subcategories for dropdown
const categories = [
  { id: 1, name: 'Kilos', image: 'https://rukminim1.flixcart.com/flap/128/128/image/29327f40e9c4d26b.png' },
  { id: 2, name: 'Mobiles', image: 'https://rukminim1.flixcart.com/flap/128/128/image/22fddf3c7da4c4f4.png' },
  { id: 3, name: 'Fashion', image: 'https://rukminim1.flixcart.com/flap/128/128/image/c12afc017e6f24cb.png', 
    subcategories: ['Men', 'Women', 'Kids', 'Footwear', 'Watches'] },
  { id: 4, name: 'Electronics', image: 'https://rukminim1.flixcart.com/flap/128/128/image/69c6589653afdb9a.png', 
    subcategories: ['Mobiles', 'Laptops', 'Cameras', 'Headphones', 'Smart TVs'] },
  { id: 5, name: 'Home & Furniture', image: 'https://rukminim1.flixcart.com/flap/128/128/image/ab7e2b022a4587dd.jpg',
    subcategories: ['Sofas', 'Beds', 'Dining Tables', 'Wardrobes'] },
  { id: 6, name: 'Appliances', image: 'https://rukminim1.flixcart.com/flap/128/128/image/0ff199d1bd27eb98.png' },
  { id: 7, name: 'Flight Bookings', image: 'https://rukminim1.flixcart.com/flap/128/128/image/71050627a56b4693.png' },
  { id: 8, name: 'Beauty, Toys & More', image: 'https://rukminim1.flixcart.com/flap/128/128/image/dff3f7adcf3a90c6.png' },
  { id: 9, name: 'Two Wheelers', image: 'https://rukminim1.flixcart.com/fk-p-flap/128/128/image/05d708653beff580.png' },
];

const banners = [
  'https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/4cd6690ef44564f3.jpg',
  'https://rukminim1.flixcart.com/fk-p-flap/1620/270/image/c5293f1811918a58.jpeg?q=20',
  'https://rukminim1.flixcart.com/fk-p-flap/1620/270/image/d9290fb51138d286.png?q=20',
];

const Home = () => {
  const [electronics, setElectronics] = useState([]);
  const [beautyToysMore, setBeautyToysMore] = useState([]);
  const [clothing, setClothing] = useState([]);
  const [expandedCategory, setExpandedCategory] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();

        setElectronics(data.filter(item => item.category === "electronics"));
        setBeautyToysMore(
          data.filter(item => 
            item.category === "jewelery" || 
            item.category === "beauty" ||    
            item.category === "toys"
          )
        );
        setClothing(
          data.filter(item => 
            item.category === "men's clothing" ||  
            item.category === "women's clothing"
          )
        );
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleMouseEnter = (categoryId) => {
    setExpandedCategory(categoryId);
  };

  const handleMouseLeave = () => {
    setExpandedCategory(null);
  };

  const productSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  const bannerSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="mt-16">
      {/* Categories */}
      <div className="bg-white shadow">
        <div className="container mx-auto px-4">
          <div className="flex justify-between py-4">
            {categories.map((category) => (
              <div 
                key={category.id} 
                className="text-center group cursor-pointer"
                onMouseEnter={() => handleMouseEnter(category.id)}
                onMouseLeave={handleMouseLeave}
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-16 h-16 mx-auto mb-1"
                />
                <p className="text-sm group-hover:text-[#2874f0]">
                  {category.name}
                </p>
                {/* Dropdown for subcategories */}
                {expandedCategory === category.id && category.subcategories && (
                  <ul className="mt-2 bg-white shadow-md rounded p-2 absolute z-10 w-40">
                    {category.subcategories.map((subcategory, index) => (
                      <li key={index} className="py-1 text-sm cursor-pointer hover:text-[#2874f0]">{subcategory}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Banner Slider */}
      <div className="mb-4">
        <Slider {...bannerSliderSettings}>
          {banners.map((banner, index) => (
            <div key={index}>
              <img src={banner} alt={`Banner ${index + 1}`} className="w-full" />
            </div>
          ))}
        </Slider>
      </div>

      {/* Products */}
      <div className="container mx-auto px-4 py-8">
        {/* Electronics */}
        <h2 className="text-2xl font-medium mb-6">Electronics</h2>
        <Slider {...productSliderSettings}>
          {electronics.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="bg-white p-4 rounded hover:shadow-lg transition group flex flex-col h-[400px]"
            >
              <div className="relative flex-grow mb-4">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-[200px] object-contain p-4 mx-auto"
                />
                {/* Discount Badge */}
                <div className="absolute top-2 left-2 bg-red-600 text-white text-xs py-1 px-2 rounded-full">
                  {product.price > 50 ? '50% OFF' : '20% OFF'}
                </div>
              </div>
              <h3 className="font-medium text-sm group-hover:text-[#2874f0] text-center">{product.title}</h3>
              <div className="mt-2 flex items-center justify-center">
                <span className="text-lg font-medium">₹{product.price.toLocaleString()}</span>
              </div>
            </Link>
          ))}
        </Slider>

        {/* Beauty, Toys & More */}
        <h2 className="text-2xl font-medium mb-6 mt-12">Beauty, Toys & More</h2>
        <Slider {...productSliderSettings}>
          {beautyToysMore.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="bg-white p-4 rounded hover:shadow-lg transition group flex flex-col h-[400px]"
            >
              <div className="relative flex-grow mb-4">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-[200px] object-contain p-4 mx-auto"
                />
                <div className="absolute top-2 left-2 bg-red-600 text-white text-xs py-1 px-2 rounded-full">
                  {product.price > 50 ? '50% OFF' : '20% OFF'}
                </div>
              </div>
              <h3 className="font-medium text-sm group-hover:text-[#2874f0] text-center">{product.title}</h3>
              <div className="mt-2 flex items-center justify-center">
                <span className="text-lg font-medium">₹{product.price.toLocaleString()}</span>
              </div>
            </Link>
          ))}
        </Slider>

        {/* Clothing */}
        <h2 className="text-2xl font-medium mb-6 mt-12">Clothing</h2>
        <Slider {...productSliderSettings}>
          {clothing.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="bg-white p-4 rounded hover:shadow-lg transition group flex flex-col h-[400px]"
            >
              <div className="relative flex-grow mb-4">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-[200px] object-contain p-4 mx-auto"
                />
                <div className="absolute top-2 left-2 bg-red-600 text-white text-xs py-1 px-2 rounded-full">
                  {product.price > 50 ? '50% OFF' : '20% OFF'}
                </div>
              </div>
              <h3 className="font-medium text-sm group-hover:text-[#2874f0] text-center">{product.title}</h3>
              <div className="mt-2 flex items-center justify-center">
                <span className="text-lg font-medium">₹{product.price.toLocaleString()}</span>
              </div>
            </Link>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Home;
