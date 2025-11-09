import React from 'react';

export default function ProductListItem({ product, onAddToCart }) {
  const price = `$${product.price.toFixed(2)}`;
  return (
    <div className="card">
      {/* <img src={product.image} alt={product.title} width={80} height={80} /> */}
      <div className="content">
        <h3>{product.title}</h3>
        <p className="muted">{product.category}</p>
        <p>{price}</p>
        <button onClick={() => onAddToCart(product.id)}>Add to Cart</button>
      </div>
    </div>
  );
}
