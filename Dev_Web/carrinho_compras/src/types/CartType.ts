export interface Product {
  id: number;
  name: string;
  price: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CartContextType {
  cartItems: CartItem[];
  totalItems: number;
  cartTotal: number;
  addItemToCart: (product: Product) => void;
  removeItemFromCart: (productId: number) => void;
}