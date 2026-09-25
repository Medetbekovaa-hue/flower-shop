import React, { useState } from 'react';
import { ShoppingBag, Heart, Trash2, X } from 'lucide-react';

const FLOWERS = [
  { id: 1, name: 'Premium Roses Bouquet', price: 4500, image: 'https://unsplash.com' },
  { id: 2, name: 'White Tulips Minimalist', price: 2800, image: 'https://unsplash.com' },
  { id: 3, name: 'Eucalyptus & Peonies', price: 5200, image: 'https://unsplash.com' },
];

export default function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (item) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === item.id);
      if (exists) return prev.map(i => i.id === item.id ? {...i, qty: i.qty + 1} : i);
      return [...prev, {...item, qty: 1}];
    });
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] text-slate-800 antialiased font-sans">
      {/* Главный Темный Баннер (Как на скриншоте Марты) */}
      <section className="relative h-[65vh] flex items-center justify-center text-center px-4 bg-cover bg-center" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url('https://unsplash.com')` }}>
        <div className="max-w-2xl text-white">
          <h1 className="text-4xl md:text-6xl font-serif tracking-tight mb-4">Flowers for life's beautiful moments.</h1>
          <p className="text-sm md:text-base text-gray-200 tracking-wide max-w-md mx-auto mb-8">
            Thoughtfully designed bouquets made with fresh seasonal flowers and delivered with care.
          </p>
          <button className="border-2 border-white hover:bg-white hover:text-black text-white font-medium text-xs tracking-widest uppercase py-3 px-8 transition duration-300">
            SHOP FLOWERS
          </button>
        </div>
      </section>

      {/* Каталог и иконка корзины */}
      <div className="max-w-7xl mx-auto px-4 pt-12 flex justify-between items-center">
        <h2 className="text-2xl font-serif font-bold">Our Collection</h2>
        <button onClick={() => setIsCartOpen(true)} className="relative p-2 text-slate-700 hover:text-black">
          <ShoppingBag className="w-6 h-6" />
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
              {cart.reduce((sum, i) => sum + i.qty, 0)}
            </span>
          )}
        </button>
      </div>

      {/* Сетка товаров */}
      <main className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
        {FLOWERS.map(flower => (
          <div key={flower.id} className="bg-white border border-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
            <img src={flower.image} alt={flower.name} className="w-full h-64 object-cover" />
            <div className="p-4 flex flex-col justify-between h-40">
              <div>
                <h3 className="font-serif font-bold text-lg">{flower.name}</h3>
                <p className="text-gray-900 font-medium mt-1">{flower.price} ₽</p>
              </div>
              <button onClick={() => addToCart(flower)} className="w-full bg-slate-950 hover:bg-slate-800 text-white text-xs font-semibold py-2.5 rounded transition uppercase tracking-wider">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </main>

      {/* Корзина */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex justify-end">
          <div className="w-full max-w-md bg-white h-full p-6 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex justify-between items-center pb-4 border-b">
                <h3 className="text-lg font-serif font-bold">Your Cart</h3>
                <button onClick={() => setIsCartOpen(false)}><X className="w-5 h-5" /></button>
              </div>
              <div className="mt-4 space-y-4">
                {cart.length === 0 ? <p className="text-gray-400 text-sm">Cart is empty</p> : cart.map(item => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-xs text-gray-500">{item.price} ₽ × {item.qty}</p>
                    </div>
                    <button onClick={() => setCart(cart.filter(i => i.id !== item.id))} className="text-gray-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                  </div>
                ))}
              </div>
            </div>
            {cart.length > 0 && (
              <div className="border-t pt-4">
                <div className="flex justify-between font-bold mb-4">
                  <span>Total:</span>
                  <span>{cart.reduce((sum, i) => sum + (i.price * i.qty), 0)} ₽</span>
                </div>
                <button onClick={() => { alert('Demo Order Success!'); setCart([]); setIsCartOpen(false); }} className="w-full bg-black text-white py-3 text-sm font-bold tracking-wider uppercase rounded">
                  Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
