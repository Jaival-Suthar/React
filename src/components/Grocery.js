import { useState, useMemo } from 'react';

const products = [
  { id: 101, name: 'Apples', price: 2.99, unit: 'kg' },
  { id: 102, name: 'Bananas', price: 1.49, unit: 'dozen' },
  { id: 103, name: 'Tomatoes', price: 3.99, unit: 'kg' },
  { id: 201, name: 'Milk', price: 2.49, unit: 'liter' },
  { id: 202, name: 'Eggs', price: 4.99, unit: 'dozen' },
  { id: 203, name: 'Yogurt', price: 3.49, unit: '500g' },
  { id: 301, name: 'Bread', price: 2.99, unit: 'loaf' },
  { id: 302, name: 'Croissants', price: 3.99, unit: 'pack of 4' },
  { id: 303, name: 'Bagels', price: 2.49, unit: 'pack of 6' },
];

const Grocery = () => {
  const [cart, setCart] = useState([]); // Store only { id, quantity }
  const [search, setSearch] = useState('');

  const filteredProducts = useMemo(() =>
    products.filter(p => p.name.toLowerCase().includes(search.toLowerCase())),
    [search]
  );

  const addToCart = (id) => {
    setCart(prev => {
      const item = prev.find(i => i.id === id);
      if (item) return prev.map(i => i.id === id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { id, quantity: 1 }];
    });
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) setCart(prev => prev.filter(i => i.id !== id));
    else setCart(prev => prev.map(i => i.id === id ? { ...i, quantity } : i));
  };

  const total = useMemo(() =>
    cart.reduce((sum, item) => {
      const product = products.find(p => p.id === item.id);
      return sum + (product.price * item.quantity);
    }, 0).toFixed(2),
    [cart]
  );

  return (
    <div className="grocery">
      <div className="main">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search products..."
          className="search"
        />
        <div className="products">
          {filteredProducts.map(p => (
            <div key={p.id} className="product">
              <span>{p.name} - ${p.price}/{p.unit}</span>
              <button onClick={() => addToCart(p.id)}>Add</button>
            </div>
          ))}
        </div>
      </div>
      <div className="cart">
        <h2>Cart</h2>
        {cart.length === 0 ? (
          <p>Empty</p>
        ) : (
          <>
            {cart.map(item => {
              const p = products.find(p => p.id === item.id);
              return (
                <div key={item.id} className="cart-item">
                  <span>{p.name} - ${p.price} x {item.quantity}</span>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={e => updateQuantity(item.id, +e.target.value)}
                    min="0"
                    max="10"
                  />
                </div>
              );
            })}
            <div>Total: ${total}</div>
            <button>Checkout</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Grocery;