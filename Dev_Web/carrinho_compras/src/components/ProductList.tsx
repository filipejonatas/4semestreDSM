// components/ProductList.tsx (corrigido com emojis)
import React from 'react';
import { useCart } from '../context/CartContext';
import { Product } from '../types/CartType';

const products: Product[] = [
  { id: 1, name: 'Gaming Smartphone', price: 899.99 },
  { id: 2, name: 'Gaming Notebook', price: 2499.99 },
  { id: 3, name: 'Gaming Headset', price: 199.99 },
  { id: 4, name: 'Gaming Mouse', price: 89.99 },
  { id: 5, name: 'Mechanical Keyboard', price: 299.99 },
];

const productIcons: { [key: number]: string } = {
  1: '📱',
  2: '💻',
  3: '🎧',
  4: '🖱️',
  5: '⌨️',
};

interface ProductListProps {
  onAddToCart?: (productName: string) => void;
}

const ProductList: React.FC<ProductListProps> = ({ onAddToCart }) => {
  const { addItemToCart } = useCart();

  const handleAddToCart = (product: Product) => {
    addItemToCart(product);
    onAddToCart?.(product.name);
  };

  return (
    <div className="product-list">
      {products.map(product => (
        <div key={product.id} className="product-item">
          <div className="product-icon">
            <span>{productIcons[product.id]}</span>
          </div>
          <div className="product-info">
            <h3>{product.name}</h3>
            <p className="product-price">R$ {product.price.toFixed(2)}</p>
          </div>
          <button 
            className="add-to-cart-btn"
            onClick={() => handleAddToCart(product)}
          >
            <span className="btn-icon">🛒</span>
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;