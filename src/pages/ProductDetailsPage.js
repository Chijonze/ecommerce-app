import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CartContext from '../context/CartContext';
import Navbar from '../components/Navbar';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const { dispatch } = useContext(CartContext);
  const navigate = useNavigate();
  const [product, setProduct] = React.useState(null);

  React.useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
      setProduct(data);
    };
    fetchProduct();
  }, [id]);

  const addToCartHandler = () => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: { ...product, qty: 1 },
    });
    navigate('/cart'); // Navigate to cart page after adding item
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div>
      <Navbar />
      <img src={product.image} alt={product.name} />
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <button onClick={addToCartHandler}>Add to Cart</button>
    </div>
  );
};

export default ProductDetailsPage;