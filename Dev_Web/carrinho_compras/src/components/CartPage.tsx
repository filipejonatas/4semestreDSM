import React from 'react';
import { useCart } from '../context/CartContext';

const CartPage: React.FC = () => {
  const { cartItems, cartTotal, removeItemFromCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <p className="empty-cart">Seu carrinho está vazio</p>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-items">
        {cartItems.map(item => (
          <div key={item.id} className="cart-item">
            <div className="item-info">
              <h4>{item.name}</h4>
              <p>Quantidade: {item.quantity}</p>
              <p>Preço unitário: R$ {item.price.toFixed(2)}</p>
              <p className="item-subtotal">
                Subtotal: R$ {(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
            <button 
              className="remove-btn"
              onClick={() => removeItemFromCart(item.id)}
            >
              Remover
            </button>
          </div>
        ))}
      </div>
      <div className="cart-footer">
        <h3>Total: R$ {cartTotal.toFixed(2)}</h3>
      </div>
    </div>
  );
};

export default CartPage;