import React, { useMemo, useReducer, useState, useCallback, useEffect } from 'react';
import { initialProducts } from '../data/products';
import VirtualProductList from '../components/VirtualProductList';
import { storeReducer, initialState } from '../context/Store';
import debounce from 'lodash/debounce'; // tree-shakeable import

export default function Dashboard() {
  const [state, dispatch] = useReducer(storeReducer, initialState);
  const [rawQuery, setRawQuery] = useState('');
  const [query, setQuery] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  // 🧩 useCallback + debounce — stable, tree-shaken, prevents unnecessary re-renders
  const debouncedSetQuery = useMemo(() => debounce((v) => setQuery(v), 200), []);
  useEffect(() => () => debouncedSetQuery.cancel(), [debouncedSetQuery]);

  const onSearchChange = useCallback(
    (e) => {
      const v = e.target.value;
      setRawQuery(v);
      debouncedSetQuery(v);
    },
    [debouncedSetQuery]
  );

  const handleAddToCart = useCallback(
    (id) => dispatch({ type: 'ADD', id }),
    [dispatch]
  );

  // 🧠 useMemo Example 1: Filter products (expensive computation)
  const visibleProducts = useMemo(() => {
    const q = query.toLowerCase();
    return initialProducts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) &&
        p.price >= minPrice &&
        p.price <= maxPrice
    );
  }, [query, minPrice, maxPrice]);

  // 🧮 useMemo Example 2: Derived calculations from filtered data
  const { avgPrice, maxProduct, minProduct } = useMemo(() => {
    if (visibleProducts.length === 0) return { avgPrice: 0, maxProduct: null, minProduct: null };

    const total = visibleProducts.reduce((sum, p) => sum + p.price, 0);
    const avg = total / visibleProducts.length;
    const maxProduct = visibleProducts.reduce((a, b) => (a.price > b.price ? a : b));
    const minProduct = visibleProducts.reduce((a, b) => (a.price < b.price ? a : b));
    return { avgPrice: avg.toFixed(2), maxProduct, minProduct };
  }, [visibleProducts]);

console.log('Dashboard render'+visibleProducts);

  return (
    <section>
      <h2>Product Dashboard (Optimized with Memoization)</h2>

      <div className="toolbar">
        <input
          placeholder="Search..."
          value={rawQuery}
          onChange={onSearchChange}
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

      {/* 🧾 Display derived data (useMemo result) */}
      <div className="stats">
        <p>
          <strong>Average Price:</strong> ${avgPrice}
        </p>
        {maxProduct && (
          <p>
            <strong>Highest Priced:</strong> {maxProduct.title} (${maxProduct.price})
          </p>
        )}
        {minProduct && (
          <p>
            <strong>Lowest Priced:</strong> {minProduct.title} (${minProduct.price})
          </p>
        )}
      </div>

      <VirtualProductList
        products={visibleProducts || []}
        onAddToCart={handleAddToCart}
      />

      <div className="cart">
        <strong>Cart Items:</strong> {state.cart.length}
      </div>
    </section>
  );
}
