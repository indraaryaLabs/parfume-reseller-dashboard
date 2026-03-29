import { Link } from 'react-router-dom';

export default function Promo() {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-12 pb-32">
      <header className="mb-16 text-center max-w-3xl mx-auto">
        <h1 className="text-5xl font-headline font-bold mb-4 text-secondary">Penawaran <span className="italic text-white">Eksklusif</span></h1>
        <p className="text-on-surface-variant text-lg">Kesempatan terbatas untuk memiliki aroma paripurna dengan keistimewaan istimewa khusus bulan ini.</p>
      </header>

      {/* Featured Promo Banner */}
      <div className="mb-16 rounded-3xl overflow-hidden relative group h-[400px]">
        <img className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDub3o8-aYxCtzBXF8m8foOG-99KIUCEvRdeyQbRhL6jTtDkThytgWl-KWaahzPOgYSnEaB3Yl6QdsZflbv_T_VhiXImMIeX5wbPs7KBXU7tfpvmD0oVCb6UivVrQRJMmTWJn5ptHaEbYbLDPuW_Itrd-waRy9wKSGSJ2eZXpwJZJ_J2-UaI0WtZ4grn5B0F3rZPF7IsMt1a6EKFclrTXmuvkYXhn1uCwfhhF7bkeqbfbTwyAmJ2fc-7iWmwV2f4kmFxcv6tbzoBaRr" alt="Ramadan Promo" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent flex flex-col justify-center px-12 md:px-20">
          <span className="text-secondary font-bold tracking-[0.2em] text-sm uppercase mb-4 block">Ramadan Sale Terbatas</span>
          <h2 className="text-5xl md:text-6xl font-headline font-bold text-white max-w-lg mb-6 leading-tight">Sauvage Bundle Deals</h2>
          <p className="text-on-surface-variant text-lg max-w-md mb-8">Dapatkan potongan 15% untuk setiap pembelian koleksi Sauvage Elixir hari ini.</p>
          <div className="flex items-center gap-4">
            <Link to="/product/1" className="px-8 py-4 bg-secondary text-on-secondary font-bold font-headline rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all">
              Klaim Sekarang
            </Link>
          </div>
        </div>
      </div>

      {/* Minor Promos grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Link to="/collections" className="glass-card p-10 rounded-3xl border border-primary/20 hover:border-primary/50 transition-colors group relative overflow-hidden">
          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all"></div>
          <div className="relative z-10">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/20 text-primary font-bold text-[10px] uppercase tracking-widest mb-6">Cashback</span>
            <h3 className="text-2xl font-headline font-bold text-white mb-2">Gratis Ongkir Seluruh Indonesia</h3>
            <p className="text-on-surface-variant max-w-sm mb-6">Berlaku untuk minimum pembelian Rp 1.500.000 (Tidak bisa digabung promosi lain).</p>
            <span className="text-primary font-bold flex items-center gap-2 group-hover:gap-4 transition-all">
              Gunakan Promo <span className="material-symbols-outlined">arrow_forward</span>
            </span>
          </div>
        </Link>
        <Link to="/product/3" className="glass-card p-10 rounded-3xl border border-outline-variant/20 hover:border-secondary/50 transition-colors group relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-secondary/10 rounded-full blur-3xl group-hover:bg-secondary/20 transition-all"></div>
          <div className="relative z-10">
            <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/20 text-secondary font-bold text-[10px] uppercase tracking-widest mb-6">Flash Sale</span>
            <h3 className="text-2xl font-headline font-bold text-white mb-2">Tom Ford Privée Discount</h3>
            <p className="text-on-surface-variant max-w-sm mb-6">Hanya hari ini! Potongan spesial senilai Rp 500.000 khusus pembelian Signature Oud Wood.</p>
            <span className="text-secondary font-bold flex items-center gap-2 group-hover:gap-4 transition-all">
              Lihat Produk <span className="material-symbols-outlined">arrow_forward</span>
            </span>
          </div>
        </Link>
      </div>

    </div>
  );
}
