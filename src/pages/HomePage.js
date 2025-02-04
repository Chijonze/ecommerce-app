import Navbar from '../components/Navbar';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/products');
        setProducts(data); // Update state with fetched products
      } catch (error) {
        console.error('Error fetching products:', error.response || error.message);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container">
      <Navbar />
      <h1>Products</h1>
      <div className="product-grid">
        {products.length === 0 ? (
          <p>No products available</p>
        ) : (
          products.map((product) => (
            <div key={product._id} className="product-card">
            {/* Wrap the product card in a Link */}
            <Link to={`/product/${product._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              {/* Product Image */}
              <img src={product.image} alt={product.name} />
              {/* Product Name */}
              <h3>{product.name}</h3>
              {/* Product Price */}
              <p>${product.price}</p>
            </Link>
          </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HomePage;
