'use client';

import { useCart } from '../context/CartContext';
import Link from 'next/link';

export default function AdminPage() {
  const { state, dispatch } = useCart();

  const getTotalValue = () => {
    return state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <Link href="/" className="text-blue-600 hover:underline">
            Home
          </Link>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-6">
          <div className="mb-4">
            <h2 className="text-2xl font-bold">Cart Overview</h2>
            {state.items.length > 0 && (
              <div className="mt-2 p-3 bg-blue-50 rounded">
                <p className="text-sm text-gray-600">Customer Information:</p>
                <p className="font-semibold">Name: {state.customerName || 'Unknown Customer'}</p>
                <p className="text-sm text-gray-600">Customer ID: {state.customerId || 'N/A'}</p>
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-4 rounded shadow text-center">
              <h3 className="text-lg font-semibold">Total Items</h3>
              <p className="text-2xl font-bold text-blue-600">{getTotalItems()}</p>
            </div>
            <div className="bg-white p-4 rounded shadow text-center">
              <h3 className="text-lg font-semibold">Total Value</h3>
              <p className="text-2xl font-bold text-green-600">₹{getTotalValue().toLocaleString('en-IN')}</p>
            </div>
            <div className="bg-white p-4 rounded shadow text-center">
              <h3 className="text-lg font-semibold">Unique Products</h3>
              <p className="text-2xl font-bold text-purple-600">{state.items.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded shadow">
          <div className="p-4 border-b">
            <h3 className="text-lg font-semibold">Cart Items</h3>
          </div>
          
          {state.items.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <p>No active customer cart</p>
              <p className="text-sm mt-2">Waiting for customer to add items...</p>
            </div>
          ) : (
            <div className="p-4">
              {state.items.map((item) => (
                <div key={item.id} className="py-4 border-b last:border-b-0">
                  <div>
                    <h4 className="font-semibold">{item.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">{item.detail}</p>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-gray-600">₹{item.price.toLocaleString('en-IN')} each</p>
                        <p className="text-sm text-orange-600">Stock Left: {item.stockLeft}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">Quantity: {item.quantity}</p>
                        <p className="font-bold text-green-600">Total: ₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}