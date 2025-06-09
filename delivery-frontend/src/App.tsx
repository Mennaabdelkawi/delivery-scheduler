import React, { useState } from 'react';

export type ProductType = 'in-stock' | 'fresh-food' | 'external';

export interface Product {
  id: number;
  type: ProductType;
}

export interface DeliverySlot {
  id: number;
  datetime: string;  // ISO date-time string
  isGreen: boolean;
}

const PRODUCTS: Product[] = [
  { id: 1, type: 'in-stock' },
  { id: 2,  type: 'fresh-food' },
  { id: 4, type: 'external' },

];

function App() {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [slots, setSlots] = useState<DeliverySlot[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleProduct = (product: Product) => {
    setSelectedProducts((prev) =>
      prev.find((p) => p.id === product.id)
        ? prev.filter((p) => p.id !== product.id)
        : [...prev, product]
    );
  };

  const fetchSlots = async () => {
    if (selectedProducts.length === 0) {
      setError('Please select at least one product.');
      return;
    }

    setLoading(true);
    setError(null);

    try {


      const response = await fetch('http://localhost:5000/api/slots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ cart: selectedProducts }), 
      });

      if (!response.ok) throw new Error('Failed to fetch slots');
      const data: DeliverySlot[] = await response.json();
      setSlots(data);
    } catch (err: any) {
      setError(err.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>📦 Bytes Maestros Delivery Scheduler</h1>

      <h2>Select Product Types</h2>
      <div className="types-container">
        {['in-stock', 'fresh-food', 'external'].map((type) => (
          <button
            key={type}
            onClick={() => {
              const filtered = PRODUCTS.filter((p) => p.type === type);
              const allSelected = filtered.every((fp) =>
                selectedProducts.some((sp) => sp.id === fp.id)
              );
              if (allSelected) {
                setSelectedProducts((prev) =>
                  prev.filter((p) => p.type !== type)
                );
              } else {
                setSelectedProducts((prev) => [
                  ...prev,
                  ...filtered.filter(
                    (fp) => !prev.some((sp) => sp.id === fp.id)
                  ),
                ]);
              }
            }}
            className={`type-btn ${
              selectedProducts.some((p) => p.type === type) ? 'selected' : ''
            }`}
            type="button"
          >
            {type.replace('-', ' ')}
          </button>
        ))}
      </div>

      <button
        className="fetch-btn"
        onClick={fetchSlots}
        disabled={loading}
        type="button"
      >
        {loading ? 'Loading...' : 'Get Delivery Slots'}
      </button>

      {error && <p className="error">{error}</p>}

      {slots.length > 0 && (
        <>
          <h2>Available Delivery Slots</h2>
          <div className="slots-grid">
            {slots.map((slot) => {
              const dateObj = new Date(slot.datetime);
              const formatted = dateObj.toLocaleString(undefined, {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              });
              return (
                <div
                  key={slot.id}
                  className={`slot ${slot.isGreen ? 'green' : ''}`}
                  title={slot.isGreen ? 'Green delivery slot' : ''}
                >
                  <span className="slot-text">{formatted}</span>
                  {slot.isGreen && <span className="slot-icon">🌿</span>}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
