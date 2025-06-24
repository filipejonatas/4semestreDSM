// components/CartPage.tsx (corrigido)
import React from 'react';
import { useCart } from '../context/CartContext';

const CartPage: React.FC = () => {
  const { 
    cartItems, 
    cartTotal, 
    removeItemFromCart, 
    increaseQuantity, 
    decreaseQuantity,
    clearCart 
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="empty-cart">
          <span className="empty-icon">🎮</span>
          <p>Seu carrinho está vazio</p>
          <span>Adicione alguns itens gaming!</span>
        </div>
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
              <p>Preço unitário: R$ {item.price.toFixed(2)}</p>
              <p className="item-subtotal">
                Subtotal: R$ {(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
            
            <div className="item-controls">
              <div className="quantity-controls">
                <button 
                  className="quantity-btn decrease"
                  onClick={() => decreaseQuantity(item.id)}
                  title="Diminuir quantidade"
                >
                  ➖
                </button>
                <span className="quantity-display">{item.quantity}</span>
                <button 
                  className="quantity-btn increase"
                  onClick={() => increaseQuantity(item.id)}
                  title="Aumentar quantidade"
                >
                  ➕
                </button>
              </div>
              
              <button 
                className="remove-btn"
                onClick={() => removeItemFromCart(item.id)}
                title="Remover item completamente"
              >
                <span className="btn-icon">🗑️</span>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="cart-footer">
        <div className="cart-actions">
          <button 
            className="clear-cart-btn"
            onClick={clearCart}
          >
            <span className="btn-icon">💥</span>
            Clear All
          </button>
        </div>
        <h3>Total: R$ {cartTotal.toFixed(2)}</h3>
      </div>
    </div>
  );
};

export default CartPage;