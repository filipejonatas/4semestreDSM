// components/CartSummary.tsx (corrigido)
import React from 'react';
import { useCart } from '../context/CartContext';

const CartSummary: React.FC = () => {
  const { totalItems, cartTotal } = useCart();

  return (
    <div className="cart-summary">
      <div className="cart-info">
        <div className="cart-items">
          <span className="cart-icon">🛒</span>
          <span>Cart ({totalItems})</span>
        </div>
        <div className="cart-total">
          <span className="coins-icon">💰</span>
          <span>R$ {cartTotal.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;