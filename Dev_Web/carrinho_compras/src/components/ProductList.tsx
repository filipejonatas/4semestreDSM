import React from 'react';
import { useCart } from '../context/CartContext';
import { Product } from '../types/CartType';

// Lista estática de produtos conforme solicitado
const products: Product[] = [
  { id: 1, name: 'Smartphone', price: 899.99 },
  { id: 2, name: 'Notebook', price: 2499.99 },
  { id: 3, name: 'Headphone', price: 199.99 },
  { id: 4, name: 'Mouse Gamer', price: 89.99 },
  { id: 5, name: 'Teclado Mecânico', price: 299.99 },
];

const ProductList: React.FC = () => {
  const { addItemToCart } = useCart();

  return (
    <div className="product-list">
      {products.map(product => (
        <div key={product.id} className="product-item">
          <h3>{product.name}</h3>
          <p className="product-price">R$ {product.price.toFixed(2)}</p>
          <button 
            className="add-to-cart-btn"
            onClick={() => addItemToCart(product)}
          >
            Adicionar ao Carrinho
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;