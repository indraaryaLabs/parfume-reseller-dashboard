import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useStore();
  const navigate = useNavigate();
  const SHIPPING_COST = 12000;
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    address: '',
    zip: ''
  });

  const [shipping, setShipping] = useState('jne_reg');
  const [payment, setPayment] = useState('qris');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) {
      alert("Mohon lengkapi data pengiriman (Nama, No Telepon, Alamat).");
      return;
    }
    
    if (cart.length === 0) {
      alert("Keranjang kosong!");
      return;
    }

    setIsSubmitting(true);
    // Simulate network request
    setTimeout(() => {
      alert(`Pesanan berhasil dibuat!\nMetode Pembayaran: ${payment.toUpperCase()}\nTotal: Rp ${(cartTotal + SHIPPING_COST).toLocaleString('id-ID')}`);
      clearCart();
      setIsSubmitting(false);
      navigate('/orders/1'); // redirect to order tracking mock
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
      <header className="mb-16">
        <h1 className="text-4xl md:text-5xl font-headline font-bold tracking-tight text-white mb-4">💳 Checkout</h1>
        <p className="text-on-surface-variant font-light max-w-2xl leading-relaxed">Selesaikan pesanan Anda untuk mendapatkan kurasi wewangian eksklusif yang dirancang khusus untuk karakter Anda.</p>
      </header>

      <form onSubmit={handleCheckout} className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-7 space-y-12">
          {/* Shipping Form */}
          <section>
            <div className="flex items-center gap-3 mb-8">
              <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                <span className="material-symbols-outlined text-primary text-sm">local_shipping</span>
              </span>
              <h2 className="text-xl font-headline font-semibold text-white">Detail Pengiriman</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-on-surface-variant uppercase tracking-widest mb-2">Nama Lengkap</label>
                <input name="name" value={formData.name} onChange={handleInputChange} className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-4 py-3.5 text-on-surface focus:border-primary/50 transition-all focus:ring-2 focus:ring-primary/20 outline-none" placeholder="Contoh: Adrian Wijaya" type="text" required/>
              </div>
              <div>
                <label className="block text-xs font-medium text-on-surface-variant uppercase tracking-widest mb-2">No Telepon</label>
                <input name="phone" value={formData.phone} onChange={handleInputChange} className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-4 py-3.5 text-on-surface focus:border-primary/50 transition-all focus:ring-2 focus:ring-primary/20 outline-none" placeholder="0812xxxxxx" type="tel" required/>
              </div>
              <div>
                <label className="block text-xs font-medium text-on-surface-variant uppercase tracking-widest mb-2">Kota</label>
                <input name="city" value={formData.city} onChange={handleInputChange} className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-4 py-3.5 text-on-surface focus:border-primary/50 transition-all focus:ring-2 focus:ring-primary/20 outline-none" placeholder="Jakarta Selatan" type="text" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-on-surface-variant uppercase tracking-widest mb-2">Alamat Lengkap</label>
                <textarea name="address" value={formData.address} onChange={handleInputChange} className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-4 py-3.5 text-on-surface focus:border-primary/50 transition-all focus:ring-2 focus:ring-primary/20 outline-none" placeholder="Nama jalan, nomor rumah, RT/RW..." rows={3} required></textarea>
              </div>
              <div>
                <label className="block text-xs font-medium text-on-surface-variant uppercase tracking-widest mb-2">Kode Pos</label>
                <input name="zip" value={formData.zip} onChange={handleInputChange} className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-4 py-3.5 text-on-surface focus:border-primary/50 transition-all focus:ring-2 focus:ring-primary/20 outline-none" placeholder="12xxx" type="text" />
              </div>
            </div>
          </section>

          {/* Shipping Method */}
          <section>
            <div className="flex items-center gap-3 mb-8">
              <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                <span className="material-symbols-outlined text-primary text-sm">inventory_2</span>
              </span>
              <h2 className="text-xl font-headline font-semibold text-white">Metode Pengiriman</h2>
            </div>
            <div className="space-y-4">
              <label className={`group relative flex items-center justify-between p-5 rounded-2xl bg-surface-container border cursor-pointer transition-all ${shipping === 'jne_reg' ? 'border-primary' : 'border-outline-variant/20 hover:border-primary/30'}`}>
                <div className="flex items-center gap-4">
                  <input checked={shipping === 'jne_reg'} onChange={() => setShipping('jne_reg')} className="w-5 h-5 text-primary bg-surface-container-highest border-outline focus:ring-primary/20" name="shipping" type="radio" />
                  <div>
                    <p className="font-medium text-white">JNE Reguler</p>
                    <p className="text-sm text-on-surface-variant">Estimasi 2-3 Hari Kerja</p>
                  </div>
                </div>
                <span className="font-headline font-semibold text-primary">Rp 12.000</span>
              </label>
              <label className={`group relative flex items-center justify-between p-5 rounded-2xl bg-surface-container border cursor-pointer transition-all ${shipping === 'jne_yes' ? 'border-primary' : 'border-outline-variant/20 hover:border-primary/30'}`}>
                <div className="flex items-center gap-4">
                  <input checked={shipping === 'jne_yes'} onChange={() => setShipping('jne_yes')} className="w-5 h-5 text-primary bg-surface-container-highest border-outline focus:ring-primary/20" name="shipping" type="radio" />
                  <div>
                    <p className="font-medium text-white">JNE YES (Yakin Esok Sampai)</p>
                    <p className="text-sm text-on-surface-variant">Estimasi 1 Hari Kerja</p>
                  </div>
                </div>
                <span className="font-headline font-semibold text-primary">Rp 28.000</span>
              </label>
              <label className={`group relative flex items-center justify-between p-5 rounded-2xl bg-surface-container border cursor-pointer transition-all ${shipping === 'sicepat' ? 'border-primary' : 'border-outline-variant/20 hover:border-primary/30'}`}>
                <div className="flex items-center gap-4">
                  <input checked={shipping === 'sicepat'} onChange={() => setShipping('sicepat')} className="w-5 h-5 text-primary bg-surface-container-highest border-outline focus:ring-primary/20" name="shipping" type="radio" />
                  <div>
                    <p className="font-medium text-white">SiCepat BEST</p>
                    <p className="text-sm text-on-surface-variant">Estimasi 1-2 Hari Kerja</p>
                  </div>
                </div>
                <span className="font-headline font-semibold text-primary">Rp 18.000</span>
              </label>
            </div>
          </section>

          {/* Payment Method */}
          <section>
            <div className="flex items-center gap-3 mb-8">
              <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                <span className="material-symbols-outlined text-primary text-sm">payments</span>
              </span>
              <h2 className="text-xl font-headline font-semibold text-white">Metode Pembayaran</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className={`flex flex-col gap-4 p-5 rounded-2xl bg-surface-container border cursor-pointer transition-all group ${payment === 'manual' ? 'border-primary' : 'border-outline-variant/20 hover:border-primary/30'}`}>
                <div className="flex justify-between items-start">
                  <span className={`material-symbols-outlined text-2xl ${payment === 'manual' ? 'text-primary' : 'text-on-surface-variant group-hover:text-primary'}`}>account_balance</span>
                  <input checked={payment === 'manual'} onChange={() => setPayment('manual')} className="w-5 h-5 text-primary bg-surface-container-highest border-outline focus:ring-primary/20" name="payment" type="radio" />
                </div>
                <div>
                  <p className="font-medium text-white">Transfer Manual</p>
                  <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">Konfirmasi bukti transfer secara manual melalui admin.</p>
                </div>
              </label>
              <label className={`flex flex-col gap-4 p-5 rounded-2xl bg-surface-container border cursor-pointer transition-all group ${payment === 'qris' ? 'border-primary' : 'border-outline-variant/20 hover:border-primary/30'}`}>
                <div className="flex justify-between items-start">
                  <span className={`material-symbols-outlined text-2xl ${payment === 'qris' ? 'text-primary' : 'text-on-surface-variant group-hover:text-primary'}`}>qr_code_scanner</span>
                  <input checked={payment === 'qris'} onChange={() => setPayment('qris')} className="w-5 h-5 text-primary bg-surface-container-highest border-outline focus:ring-primary/20" name="payment" type="radio" />
                </div>
                <div>
                  <p className="font-medium text-white">QRIS (Otomatis)</p>
                  <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">Scan kode QR untuk pembayaran instan dan aman.</p>
                </div>
              </label>
            </div>
          </section>
        </div>

        {/* Order Review Sidebar */}
        <aside className="lg:col-span-5">
          <div className="glass-card rounded-3xl p-8 border border-outline-variant/10 sticky top-32 shadow-2xl">
            <h2 className="text-xl font-headline font-semibold text-white mb-8">Ringkasan Pesanan</h2>
            
            <div className="space-y-6 mb-10 max-h-60 overflow-y-auto custom-scrollbar pr-2">
              {cart.map(item => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-20 h-20 rounded-xl bg-surface-container overflow-hidden flex-shrink-0 border border-outline-variant/20">
                    <img className="w-full h-full object-cover" alt={item.name} src={item.image}/>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="text-white font-medium">{item.name}</h3>
                      <span className="text-primary font-semibold">Rp {(item.price * item.quantity).toLocaleString('id-ID')}</span>
                    </div>
                    <p className="text-xs text-on-surface-variant mt-1">{item.brand}</p>
                    <p className="text-xs text-on-surface-variant mt-0.5">Jumlah: {item.quantity}</p>
                  </div>
                </div>
              ))}
              {cart.length === 0 && (
                <p className="text-on-surface-variant text-sm italic py-4">Keranjang kosong. Tambahkan produk sebelum checkout.</p>
              )}
            </div>

            <div className="space-y-4 border-t border-outline-variant/20 pt-8 mb-8">
              <div className="flex justify-between text-sm">
                <span className="text-on-surface-variant">Subtotal</span>
                <span className="text-white">Rp {cartTotal.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-on-surface-variant">Biaya Pengiriman</span>
                <span className="text-white">Rp {SHIPPING_COST.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between items-end pt-4 border-t border-outline-variant/10">
                <div>
                  <p className="text-xs font-medium text-on-surface-variant uppercase tracking-widest">Total Pembayaran</p>
                  <p className="text-3xl font-headline font-bold text-white mt-1">Rp {(cartTotal + SHIPPING_COST).toLocaleString('id-ID')}</p>
                </div>
              </div>
            </div>

            <button disabled={isSubmitting || cart.length === 0} type="submit" className="w-full py-5 rounded-2xl bg-gradient-to-br from-primary to-secondary text-on-primary font-headline font-bold text-lg shadow-lg shadow-primary/20 active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed">
              <span>{isSubmitting ? 'Memproses...' : 'Bayar Sekarang'}</span>
              {!isSubmitting && <span className="material-symbols-outlined text-xl">arrow_forward</span>}
            </button>
            <p className="text-center text-[10px] text-on-surface-variant mt-6 uppercase tracking-[0.2em]">Transaksi dienkripsi secara aman</p>
          </div>
        </aside>
      </form>
    </div>
  );
}
