import React from 'react';
import { useCart } from '../context/CartContext';

const CartSummary: React.FC = () => {
  const { totalItems, cartTotal } = useCart();

  return (
    <div className="cart-summary">
      <div className="cart-info">
        <span className="cart-items">Carrinho ({totalItems})</span>
        <span className="cart-total">R$ {cartTotal.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default CartSummary;