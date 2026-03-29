import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function OrderHistory() {
  const [activeTab, setActiveTab] = useState('Semua Pesanan');
  const tabs = ['Semua Pesanan', 'Sedang Diproses', 'Dikirim', 'Selesai'];

  return (
    <div className="max-w-4xl mx-auto px-6 pt-12 pb-32">
      <div className="mb-12">
        <h1 className="font-headline text-5xl font-extrabold tracking-tight text-white mb-2">📦 Pesanan Saya</h1>
        <p className="text-on-surface-variant text-lg">Kelola dan pantau setiap aroma yang sedang menuju ke tangan Anda.</p>
      </div>

      <div className="flex gap-4 mb-8 overflow-x-auto pb-2 scrollbar-hide">
        {tabs.map((tab) => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${activeTab === tab ? 'bg-primary text-on-primary' : 'bg-surface-container border border-outline-variant/30 text-on-surface-variant hover:border-primary/50'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        <div className="glass-card rounded-2xl p-6 border border-outline-variant/20 bg-gradient-to-br from-[rgba(230,195,100,0.05)] to-[rgba(255,177,192,0.05)] hover:border-primary/30 transition-all duration-300 group">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-outline-variant/10 pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <span className="text-on-surface-variant text-xs font-mono tracking-widest uppercase">#ORD-20260325-001</span>
                <span className="bg-primary-container/20 text-primary text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-primary/20">Dikirim</span>
              </div>
              <p className="text-on-surface-variant/70 text-sm">25 Maret 2026 • 14:20 WIB</p>
            </div>
            <div className="flex items-center gap-2 text-on-surface-variant">
              <span className="material-symbols-outlined text-sm">local_shipping</span>
              <span className="text-xs font-medium">Resi: <span className="text-on-surface">JX9028374651</span></span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-surface-container-high">
              <img alt="Oud Immortel de Nuit" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBv3mrGdLqEZwYw4L_w5QFO8O-2t8_8Rdy9kqlXz_0hu138IGoBjeZG9FWedy3CJHggN5vkGAm9eaKCxPUUwodUizrQqngXiOKr_VZoSZ2FGp2aPxKNia4jNiLe6IaBkD5HpX6Z1crsa10LGUPzRXLrD-A_xI9YL5S5hjSFE77nDc1s7tz9Af7_SIm6LCMdUWFV-EKFYljT_gZU1ilczb9ejg1hY-W3e1FBj4SDkUV8vJiU77CpCaXwlbA_-yuK_9GMT5gOKLQ2jWoL"/>
            </div>
            <div className="flex-grow space-y-2">
              <h3 className="text-xl font-bold text-white font-headline">Oud Immortel de Nuit</h3>
              <p className="text-on-surface-variant text-sm line-clamp-1">50ml Eau de Parfum • Luxury Collector Series</p>
              <div className="flex items-center gap-2 pt-2">
                <span className="text-primary font-bold text-lg font-headline">Rp 2.450.000</span>
                <span className="text-on-surface-variant/50 text-xs line-through">Rp 3.100.000</span>
              </div>
            </div>
            <div className="w-full sm:w-auto self-end sm:self-center">
              <Link to="/orders/1" className="w-full sm:w-auto bg-gradient-to-br from-[#E6C364] to-[#FFB1C0] text-[#0E0E0E] px-6 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 active:scale-95 transition-all">
                Lihat Detail
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6 border border-outline-variant/20 bg-gradient-to-br from-[rgba(230,195,100,0.05)] to-[rgba(255,177,192,0.05)] hover:border-primary/30 transition-all duration-300 group">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-outline-variant/10 pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <span className="text-on-surface-variant text-xs font-mono tracking-widest uppercase">#ORD-20260324-092</span>
                <span className="bg-surface-container-highest text-on-surface-variant text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-outline-variant/20">Diproses</span>
              </div>
              <p className="text-on-surface-variant/70 text-sm">24 Maret 2026 • 09:15 WIB</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-surface-container-high">
              <img alt="Rose Saffron Mist" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEtjjNsf1nh2zhbTha3BTA42gNfa-QN4sl_vt8x5dQ9AqYwCmNSIiEanl1QVgMTBRr0E1foZ7XUht1VAYSLVd-MHIseuYheutaNLdhalhhra-GkfO5s8exOsKhNOuWbbHzB1TRrth5aL6k34Rjh_MRkwEYGV5h2vw5FD7RPYhVRQ2n5qwdas9VgQUCp6qggqBy8VM8KcbQnyt8p5eYkZSSa-DfBxyKXJ8y5zRv2wYTatCbiNnQQCgGsGm9CrspFnkKp2AauL_ETfWA"/>
            </div>
            <div className="flex-grow space-y-2">
              <h3 className="text-xl font-bold text-white font-headline">Rose Saffron Mist</h3>
              <p className="text-on-surface-variant text-sm line-clamp-1">100ml Eau de Cologne • Signature Blend</p>
              <div className="flex items-center gap-2 pt-2">
                <span className="text-primary font-bold text-lg font-headline">Rp 1.890.000</span>
              </div>
            </div>
            <div className="w-full sm:w-auto self-end sm:self-center">
              <Link to="/orders/2" className="w-full sm:w-auto bg-transparent border border-primary text-primary px-6 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 active:scale-95 transition-all hover:bg-primary/10">
                Lihat Detail
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6 border border-outline-variant/20 bg-gradient-to-br from-[rgba(230,195,100,0.05)] to-[rgba(255,177,192,0.05)] hover:border-primary/30 transition-all duration-300 group opacity-80 hover:opacity-100">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-outline-variant/10 pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <span className="text-on-surface-variant text-xs font-mono tracking-widest uppercase">#ORD-20260318-045</span>
                <span className="bg-secondary-container/20 text-secondary text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-secondary/20">Selesai</span>
              </div>
              <p className="text-on-surface-variant/70 text-sm">18 Maret 2026 • 18:45 WIB</p>
            </div>
            <div className="flex items-center gap-2 text-on-surface-variant">
              <span className="material-symbols-outlined text-sm text-secondary">verified</span>
              <span className="text-xs font-medium">Diterima oleh: <span className="text-on-surface">Budi Santoso</span></span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-surface-container-high grayscale group-hover:grayscale-0 transition-all duration-500">
              <img alt="Obsidian Vetiver" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQtwbMdrFdxFNhaC92MbP2pHhTWRQfOJJ0YlsIgl8i59nZ7r9KlFhPCtJo_wLYQvjzNDpZzXKiRg0EEpon76M84KmO06I0-hKUVsJ5EEoG0JMVFqXwhRurPVHF5BKjisfZ7Yw9XljTNaOOsq-qyDxesJbA-WElLM8agZ2MjaIrxE7jsQ7WoOW-OknSJKC84Z_F3A7DZBjPUxYkfT4DJxEQMmW3fizpzwQqus5W8xFFMQJuqgeQPDGLeeHFE3Gwo2PKGaSERk4YnrFX"/>
            </div>
            <div className="flex-grow space-y-2">
              <h3 className="text-xl font-bold text-white font-headline">Obsidian Vetiver</h3>
              <p className="text-on-surface-variant text-sm line-clamp-1">75ml Extrait de Parfum • Limited Edition</p>
              <div className="flex items-center gap-2 pt-2">
                <span className="text-on-surface-variant font-bold text-lg font-headline">Rp 3.200.000</span>
              </div>
            </div>
            <div className="w-full sm:w-auto self-end sm:self-center">
              <Link to="/orders/3" className="w-full sm:w-auto bg-surface-container-highest text-on-surface px-6 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 active:scale-95 transition-all">
                Lihat Detail
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 flex flex-col items-center gap-4">
        <p className="text-on-surface-variant text-sm font-medium tracking-widest uppercase">Menampilkan 3 dari 12 Pesanan</p>
        <button className="group flex items-center gap-4 text-primary font-bold hover:gap-6 transition-all duration-300">
          <span className="h-px w-8 bg-primary group-hover:w-12 transition-all"></span>
          Muat Pesanan Lainnya
          <span className="h-px w-8 bg-primary group-hover:w-12 transition-all"></span>
        </button>
      </div>
    </div>
  );
}
