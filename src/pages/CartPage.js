import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import CartContext from '../context/CartContext';
import Navbar from '../components/Navbar';

const CartPage = () => {
  const { cart, dispatch } = useContext(CartContext);

  console.log("Cart state:", cart); // Debug log

  const removeFromCart = (id) => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: id
    });
  };

  const updateQuantity = (id, qty) => {
    if (qty < 1) return;
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { id, qty }
    });
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.qty), 0).toFixed(2);
  };

  if (cart.length === 0) {
    return (
      <div>
        <Navbar />
        <div className="container mx-auto p-4">
          <p>Your cart is empty</p>
          <Link to="/" className="text-blue-600">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
        {cart.map((item) => (
          <div key={item._id} className="border p-4 mb-4 rounded flex justify-between">
            <div>
              <h2 className="text-xl">{item.name}</h2>
              <p className="text-gray-600">Price: ${item.price}</p>
              <p className="text-gray-600">Subtotal: ${(item.price * item.qty).toFixed(2)}</p>
            </div>
            <div className="flex items-center">
              <button 
                onClick={() => updateQuantity(item._id, item.qty - 1)}
                className="bg-gray-200 px-3 py-1 rounded"
              >
                -
              </button>
              <span className="mx-3">{item.qty}</span>
              <button 
                onClick={() => updateQuantity(item._id, item.qty + 1)}
                className="bg-gray-200 px-3 py-1 rounded"
              >
                +
              </button>
              <button 
                onClick={() => removeFromCart(item._id)}
                className="bg-red-500 text-white px-4 py-2 rounded ml-4"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
        {cart.length > 0 && (
          <div className="text-right mt-4">
            <p className="text-xl font-bold">Total: ${calculateTotal()}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;