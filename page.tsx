'use client';

import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import Link from 'next/link';

const PRODUCTS = [
  { id: 1, name: 'Laptop', price: 75000, detail: 'High-performance laptop with 16GB RAM and 512GB SSD', stockLeft: 5 },
  { id: 2, name: 'Phone', price: 45000, detail: 'Latest smartphone with 128GB storage and dual camera', stockLeft: 12 },
  { id: 3, name: 'Headphones', price: 15000, detail: 'Wireless noise-cancelling headphones with premium sound', stockLeft: 8 },
  { id: 4, name: 'Keyboard', price: 6500, detail: 'Mechanical gaming keyboard with RGB backlighting', stockLeft: 15 },
  { id: 5, name: 'Mouse', price: 3500, detail: 'Ergonomic wireless mouse with precision tracking', stockLeft: 20 },
  { id: 6, name: 'Monitor', price: 22000, detail: '24-inch Full HD monitor with IPS display technology', stockLeft: 7 },
];

export default function CustomerPage() {
  const { state, dispatch } = useCart();
  const [customerName, setCustomerName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (state.customerName) {
      setCustomerName(state.customerName);
      setIsLoggedIn(true);
    }
  }, [state.customerName]);

  const handleLogin = () => {
    if (customerName.trim()) {
      const customerId = Date.now().toString(); // Simple ID generation
      dispatch({ 
        type: 'SET_CUSTOMER', 
        payload: { id: customerId, name: customerName.trim() } 
      });
      setIsLoggedIn(true);
    }
  };

  const addToCart = (product: { id: number; name: string; price: number; detail: string; stockLeft: number }) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const getCartItemCount = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded shadow max-w-md w-full">
          <h2 className="text-2xl font-bold mb-4 text-center">Customer Login</h2>
          <input
            type="text"
            placeholder="Enter your name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="w-full p-3 border rounded mb-4"
            onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
          />
          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
          >
            Start Shopping
          </button>
          <div className="mt-4 text-center">
            <Link href="/" className="text-blue-600 hover:underline">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">Customer Store</h1>
            <p className="text-sm text-gray-600">Welcome, {state.customerName}</p>
          </div>
          <div className="flex items-center space-x-4">
            <span className="bg-blue-100 px-3 py-1 rounded">
              Cart: {getCartItemCount()} items
            </span>
            <Link href="/" className="text-blue-600 hover:underline">
              Home
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">Available Products</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.map((product) => (
            <div key={product.id} className="bg-white p-6 rounded shadow">
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{product.detail}</p>
              <p className="text-lg font-bold text-green-600 mb-2">₹{product.price.toLocaleString('en-IN')}</p>
              <p className="text-sm text-orange-600 mb-4">Stock Left: {product.stockLeft}</p>
              <button
                onClick={() => addToCart(product)}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        {state.items.length > 0 && (
          <div className="mt-8 bg-white p-6 rounded shadow">
            <h3 className="text-lg font-semibold mb-4">Your Cart</h3>
            {state.items.map((item) => (
              <div key={item.id} className="py-3 border-b">
                <div className="flex justify-between items-start mb-1">
                  <div className="flex-1">
                    <h4 className="font-semibold">{item.name}</h4>
                    <p className="text-sm text-gray-600">{item.detail}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  </div>
                </div>
              </div>
            ))}
            <div className="mt-4 text-right font-bold">
              Total: ₹{state.items.reduce((total, item) => total + (item.price * item.quantity), 0).toLocaleString('en-IN')}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}