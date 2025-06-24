import React from 'react';
import { CartProvider } from './context/CartContext';
import { useNotification } from './hooks/useNotification';
import ProductList from './components/ProductList';
import CartSummary from './components/CartSummary';
import CartPage from './components/CartPage';
import Notification from './components/Notification';
import './App.css';

const AppContent: React.FC = () => {
  const { notifications, addNotification, removeNotification } = useNotification();

  const handleAddToCart = (productName: string) => {
    addNotification(`${productName} adicionado ao carrinho!`, 'success');
  };

  return (
    <div className="App">
      <header className="app-header">
        <div className="header-title">
          <span className="header-icon">🎮</span>
          <h1>GAMER STORE</h1>
        </div>
        <CartSummary />
      </header>
      
      <main className="app-main">
        <section className="products-section">
          <div className="section-title">
            <span className="section-icon">🖥️</span>
            <h2>Produtos Gaming</h2>
          </div>
          <ProductList onAddToCart={handleAddToCart} />
        </section>
        
        <section className="cart-section">
          <div className="section-title">
            <span className="section-icon">🛒</span>
            <h2>Carrinho de Compras</h2>
          </div>
          <CartPage />
        </section>
      </main>

      <div className="notifications-container">
        {notifications.map(notification => (
          <Notification
            key={notification.id}
            message={notification.message}
            type={notification.type}
            onClose={() => removeNotification(notification.id)}
          />
        ))}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
};

export default App;