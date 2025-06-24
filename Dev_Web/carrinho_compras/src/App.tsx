import React from 'react';
import { CartProvider } from './context/CartContext';
import ProductList from './components/ProductList';
import CartSummary from './components/CartSummary';
import CartPage from './components/CartPage';
import './App.css';

const App: React.FC = () => {
  return (
    <CartProvider>
      <div className="App">
        <header className="app-header">
          <h1>E-commerce App</h1>
          <CartSummary />
        </header>
        
        <main className="app-main">
          <section className="products-section">
            <h2>Produtos</h2>
            <ProductList />
          </section>
          
          <section className="cart-section">
            <h2>Carrinho de Compras</h2>
            <CartPage />
          </section>
        </main>
      </div>
    </CartProvider>
  );
};

export default App;