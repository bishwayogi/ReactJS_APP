import React from 'react';
import '../styles.css';

function ProductListItem({ product, onAddToCart }) {
  if (!product) {
    return null;
  }
  const price = `$${product.price.toFixed(2)}`;
  return (
    <div className="product-card">
      <div className="content">
        <h3>{product.title}</h3>
        <p className="muted">{product.category}</p>
        <p className="product-card-price">{price}</p>
        <button onClick={() => onAddToCart(product.id)}>Add to Cart</button>
      </div>
    </div>
  );
}
export default React.memo(ProductListItem);

