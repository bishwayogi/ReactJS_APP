import React, { useMemo, useReducer, useState } from 'react';
import { initialProducts } from '../data/products';
import ProductList from '../components/ProductList';
import { storeReducer, initialState } from '../context/Store';

export default function Dashboard() {
  const [state, dispatch] = useReducer(storeReducer, initialState);
  const [query, setQuery] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  const visibleProducts = useMemo(() => {
    return initialProducts.filter(
      (p) =>
        p.title.toLowerCase().includes(query.toLowerCase()) &&
        p.price >= minPrice &&
        p.price <= maxPrice
    );
  }, [query, minPrice, maxPrice]);

  const handleAddToCart =(id) => dispatch({ type: 'ADD', id })

  return (
    <section>
      <h2>Product Dashboard</h2>

      <div className="toolbar">
        <input
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <label>
          Min Price
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
          />
        </label>
        <label>
          Max Price
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </label>
      </div>

      <ProductList
        products={visibleProducts}
        onAddToCart={handleAddToCart}
      />

      <div className="cart">
        <strong>Cart Items:</strong> {state.cart.length}
      </div>
    </section>
  );
}
