import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount, isAuthenticated } = useStore();
  const SHIPPING_COST = 45000;

  return (
    <div className="max-w-7xl mx-auto px-6 pt-24 pb-32">
      <div className="mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight text-white mb-2">🛒 Keranjang Belanja</h1>
        <p className="text-on-surface-variant font-label tracking-wider uppercase text-sm">
          {cartCount === 0 ? "Keranjang Anda kosong." : `${cartCount} item tersimpan di butik pribadi Anda`}
        </p>
      </div>
      
      {cart.length === 0 ? (
        <div className="text-center py-20 glass-card rounded-2xl border border-outline-variant/10">
          <span className="material-symbols-outlined text-6xl text-outline-variant mb-4">production_quantity_limits</span>
          <h2 className="text-2xl font-headline font-bold mb-2">Keranjang Kosong</h2>
          <p className="text-on-surface-variant mb-8">Temukan aroma khas untuk perjalanan Anda.</p>
          <Link to="/" className="px-8 py-3 bg-primary text-on-primary font-bold rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform">
            Mulai Belanja
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-8 space-y-6">
            {cart.map(item => (
              <div key={item.id} className="glass-card group relative overflow-hidden rounded-xl p-6 transition-all duration-300 hover:bg-surface-container-high border border-outline-variant/10">
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="w-32 h-40 bg-surface-dim rounded-lg overflow-hidden flex-shrink-0">
                    <img className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-500" alt={item.name} src={item.image}/>
                  </div>
                  <div className="flex-grow w-full text-center md:text-left">
                    <div className="flex flex-col md:flex-row justify-between items-start mb-2">
                      <div>
                        <span className="text-primary text-xs font-bold uppercase tracking-widest block mb-1">{item.brand}</span>
                        <h3 className="text-xl font-headline font-bold text-white tracking-tight">{item.name}</h3>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-on-surface-variant hover:text-error transition-colors p-2 self-end md:self-start md:-mr-2">
                        <span className="material-symbols-outlined">delete</span>
                      </button>
                    </div>
                    <div className="flex flex-wrap items-center justify-between mt-6 gap-4">
                      <div className="text-xl font-headline font-semibold text-secondary">
                        Rp {item.price.toLocaleString('id-ID')}
                      </div>
                      <div className="flex items-center bg-surface-container-lowest rounded-full p-1 border border-outline-variant/20 mx-auto md:mx-0">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center text-on-surface hover:text-primary transition-colors"><span className="material-symbols-outlined">remove</span></button>
                        <span className="w-12 text-center font-bold text-white">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center text-on-surface hover:text-primary transition-colors"><span className="material-symbols-outlined">add</span></button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <aside className="lg:col-span-4 sticky top-28">
            <div className="glass-card rounded-2xl p-8 border border-primary/10 relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/10 blur-[60px] rounded-full pointer-events-none"></div>
              <h2 className="font-headline text-2xl font-bold text-white mb-8 border-b border-outline-variant/20 pb-4">Ringkasan Pesanan</h2>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-on-surface-variant">
                  <span>Subtotal</span>
                  <span className="text-on-surface font-medium">Rp {cartTotal.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-on-surface-variant">
                  <span>Pengiriman (Ongkir)</span>
                  <span className="text-on-surface font-medium">Rp {SHIPPING_COST.toLocaleString('id-ID')}</span>
                </div>
                <div className="pt-4 border-t border-outline-variant/20 flex justify-between items-end">
                  <span className="text-white font-bold">Total Tagihan</span>
                  <span className="text-3xl font-headline font-bold text-primary">Rp {(cartTotal + SHIPPING_COST).toLocaleString('id-ID')}</span>
                </div>
              </div>
              {isAuthenticated ? (
                <Link to="/checkout" className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-on-primary font-bold text-lg flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform active:scale-95 duration-200">
                  Checkout <span className="material-symbols-outlined">arrow_forward</span>
                </Link>
              ) : (
                <Link to="/login" className="w-full py-4 rounded-xl border-2 border-primary/50 text-primary font-bold text-lg flex items-center justify-center gap-2 hover:bg-primary hover:text-on-primary shadow-lg shadow-primary/10 hover:scale-[1.02] transition-all duration-200">
                  Masuk Untuk Checkout <span className="material-symbols-outlined">login</span>
                </Link>
              )}
              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-on-surface-variant uppercase tracking-widest">
                <span className="material-symbols-outlined text-[16px]">lock</span>
                Pembayaran aman & terenkripsi
              </div>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
