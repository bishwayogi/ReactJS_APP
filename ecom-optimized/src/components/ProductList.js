import React from 'react';
import ProductListItem from './ProductListItem';

export default function ProductList({ products, onAddToCart }) {
  return (
    <div className="grid">
      {products.map((p) => (
        <ProductListItem key={p.id} product={p} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
}
