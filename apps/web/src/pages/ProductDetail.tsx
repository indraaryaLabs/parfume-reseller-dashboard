import { useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../lib/api-client';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useStore();
  
  const { data: product, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const res = await apiClient.get(`/products/${id}`);
      return res.data;
    },
    enabled: !!id
  });

  const stock = product?.stock || 0;
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  if (isLoading || !product) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const baseImage = product.mainImage || "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80";
  const images = product.images?.length > 0 
    ? product.images.map((img: any) => img.url)
    : [baseImage];

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollPosition = e.currentTarget.scrollLeft;
    const width = e.currentTarget.clientWidth;
    const index = Math.round(scrollPosition / width);
    if (activeImage !== index) {
      setActiveImage(index);
    }
  };

  const scrollToImage = (index: number) => {
    setActiveImage(index);
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: index * scrollRef.current.clientWidth,
        behavior: 'smooth'
      });
    }
  };

  const increment = () => {
    if (quantity < stock) setQuantity(prev => prev + 1);
  };

  const decrement = () => {
    if (quantity > 1) setQuantity(prev => prev - 1);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 pt-12 pb-32">
      <Link to="/" className="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors mb-10 group">
        <span className="material-symbols-outlined text-sm group-hover:-translate-x-1 transition-transform">arrow_back</span>
        <span className="font-medium tracking-wide">Kembali ke Katalog</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-7 space-y-6">
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-surface-container border border-outline-variant/20 shadow-2xl">
            <div 
              ref={scrollRef} 
              onScroll={handleScroll} 
              className="w-full h-full flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
            >
              {images.map((src: string, idx: number) => (
                <div key={idx} className="w-full h-full flex-shrink-0 snap-center">
                  <img className="w-full h-full object-cover select-none pointer-events-none md:pointer-events-auto" alt={`${product.name} Detail ${idx + 1}`} src={src}/>
                </div>
              ))}
            </div>
            <div className="absolute top-6 left-6 pointer-events-none">
              <span className="bg-primary-container text-on-primary-container px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase shadow-lg">Exclusive Edition</span>
            </div>
            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 pointer-events-none">
              {images.map((_: any, idx: number) => (
                <div key={idx} className={`h-1.5 rounded-full transition-all duration-300 ${activeImage === idx ? 'w-6 bg-primary' : 'w-2 bg-outline-variant/50'}`}></div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-5 gap-4">
            {images.map((src: string, idx: number) => (
              <div 
                key={idx} 
                onClick={() => scrollToImage(idx)}
                className={`aspect-square rounded-xl overflow-hidden border-2 cursor-pointer transition-all ${activeImage === idx ? 'border-primary ring-4 ring-primary/10 grayscale-0' : 'border-outline-variant/30 grayscale hover:grayscale-0'}`}
              >
                <img className="w-full h-full object-cover" alt={`Thumbnail ${idx + 1}`} src={src}/>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col gap-10">
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-primary font-headline font-bold text-xl tracking-widest">{product.brand}</h2>
              <div className="flex items-center gap-1 bg-surface-container-highest px-3 py-1 rounded-lg">
                <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="text-on-surface font-bold">4.5</span>
                <span className="text-on-surface-variant text-xs">(128 Ulasan)</span>
              </div>
            </div>
            <h1 className="text-5xl font-headline font-extrabold tracking-tighter mb-4 text-white">{product.name}</h1>
            <div className="flex items-center gap-4 mb-8">
              <span className="text-primary-fixed-dim text-2xl font-bold">Rp {product.price?.toLocaleString('id-ID')}</span>
              {product.oldPrice && <span className="text-on-surface-variant line-through text-lg">Rp {product.oldPrice.toLocaleString('id-ID')}</span>}
              <div className={`px-3 py-1 rounded-md text-xs font-bold ${product.status === 'READY STOCK' ? 'bg-secondary-container/30 text-secondary' : 'bg-error/20 text-error'}`}>{product.status}</div>
            </div>
            <p className="text-on-surface-variant leading-relaxed text-lg font-light mb-8">
              {product.description}
            </p>
          </section>

          <div className="space-y-6">
            <div className="flex flex-col gap-4">
              <label className="text-xs uppercase tracking-widest font-bold text-on-surface-variant">Kuantitas</label>
              <div className="flex items-center gap-6">
                <div className="flex items-center bg-surface-container border border-outline-variant/30 rounded-xl p-1">
                  <button onClick={decrement} className="w-10 h-10 flex items-center justify-center hover:bg-surface-container-highest rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled={quantity <= 1 || stock === 0}>
                    <span className="material-symbols-outlined text-sm">remove</span>
                  </button>
                  <span className="w-12 text-center font-bold text-lg">{stock === 0 ? 0 : quantity}</span>
                  <button onClick={increment} className="w-10 h-10 flex items-center justify-center hover:bg-surface-container-highest rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled={quantity >= stock || stock === 0}>
                    <span className="material-symbols-outlined text-sm">add</span>
                  </button>
                </div>
                <span className="text-on-surface-variant text-sm">{stock > 0 ? `Tersisa ${stock} botol` : 'Stok Habis'}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {stock > 0 ? (
                <button onClick={() => { addToCart(product.id, quantity); alert(`${quantity} ${product.name} ditambahkan ke keranjang!`); }} className="gold-gradient-bg w-full text-on-primary font-bold py-5 rounded-xl shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3">
                  <span className="material-symbols-outlined">shopping_bag</span>
                  Tambah ke Keranjang
                </button>
              ) : (
                <button disabled className="bg-surface-container w-full border border-outline-variant/30 text-on-surface-variant font-bold py-5 rounded-xl flex items-center justify-center gap-3 cursor-not-allowed opacity-70">
                  <span className="material-symbols-outlined">block</span>
                  Stok Habis
                </button>
              )}
              <button className="bg-surface-container border border-outline-variant/50 text-white font-bold py-5 rounded-xl hover:bg-surface-container-highest transition-all flex items-center justify-center gap-3">
                <span className="material-symbols-outlined text-[#25D366]">chat</span>
                Chat via WhatsApp
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="glass-card p-6 rounded-2xl border border-outline-variant/20">
              <div className="flex justify-between items-end mb-3">
                <span className="text-xs uppercase tracking-widest text-on-surface-variant font-bold">Longevity</span>
                <span className="text-primary font-headline font-bold text-lg">8/10</span>
              </div>
              <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                <div className="h-full gold-gradient w-[80%]"></div>
              </div>
              <span className="text-[10px] text-on-surface-variant mt-2 block">Bertahan 8-10 Jam</span>
            </div>
            <div className="glass-card p-6 rounded-2xl border border-outline-variant/20">
              <div className="flex justify-between items-end mb-3">
                <span className="text-xs uppercase tracking-widest text-on-surface-variant font-bold">Projection</span>
                <span className="text-primary font-headline font-bold text-lg">7/10</span>
              </div>
              <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                <div className="h-full gold-gradient w-[70%]"></div>
              </div>
              <span className="text-[10px] text-on-surface-variant mt-2 block">Radius 2 Meter</span>
            </div>
          </div>
        </div>
      </div>

      <section className="mt-32">
        <h3 className="text-3xl font-headline font-bold mb-12 text-center text-white">Fragrance Profile</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-card p-10 rounded-3xl border border-outline-variant/20 relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all"></div>
            <div className="mb-6 bg-surface-container-highest w-14 h-14 rounded-2xl flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-3xl">keyboard_double_arrow_up</span>
            </div>
            <h4 className="text-primary font-headline font-bold text-lg mb-4">Top Notes</h4>
            <p className="text-on-surface-variant leading-relaxed">Pesan pertama yang segar dan memikat. Dibuka dengan Bergamot Calabria yang berair dan lada hitam yang tajam.</p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-surface-container-low border border-outline-variant/30 rounded-full text-xs">Bergamot</span>
              <span className="px-3 py-1 bg-surface-container-low border border-outline-variant/30 rounded-full text-xs">Pepper</span>
            </div>
          </div>
          
          <div className="glass-card p-10 rounded-3xl border border-outline-variant/20 relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-secondary/5 rounded-full blur-3xl group-hover:bg-secondary/10 transition-all"></div>
            <div className="mb-6 bg-surface-container-highest w-14 h-14 rounded-2xl flex items-center justify-center">
              <span className="material-symbols-outlined text-secondary text-3xl">favorite</span>
            </div>
            <h4 className="text-secondary font-headline font-bold text-lg mb-4">Middle Notes</h4>
            <p className="text-on-surface-variant leading-relaxed">Jantung dari wewangian yang bertahan lebih lama. Perpaduan Lavender dan Sichuan Pepper yang aromatik.</p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-surface-container-low border border-outline-variant/30 rounded-full text-xs">Sichuan Pepper</span>
              <span className="px-3 py-1 bg-surface-container-low border border-outline-variant/30 rounded-full text-xs">Lavender</span>
            </div>
          </div>

          <div className="glass-card p-10 rounded-3xl border border-outline-variant/20 relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary-container/5 rounded-full blur-3xl group-hover:bg-primary-container/10 transition-all"></div>
            <div className="mb-6 bg-surface-container-highest w-14 h-14 rounded-2xl flex items-center justify-center">
              <span className="material-symbols-outlined text-primary-container text-3xl">filter_vintage</span>
            </div>
            <h4 className="text-primary-container font-headline font-bold text-lg mb-4">Base Notes</h4>
            <p className="text-on-surface-variant leading-relaxed">Fondasi yang kaya dan sensual. Jejak hangat dari Sandalwood dan Vanila dari Papua Nugini.</p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-surface-container-low border border-outline-variant/30 rounded-full text-xs">Sandalwood</span>
              <span className="px-3 py-1 bg-surface-container-low border border-outline-variant/30 rounded-full text-xs">Vanilla</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-32 border-t border-outline-variant/20 pt-20">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
          <div>
            <h3 className="text-3xl font-headline font-bold text-white mb-2">Suara Pelanggan</h3>
            <p className="text-on-surface-variant">Apa yang mereka katakan tentang aroma ini.</p>
          </div>
          <button className="text-primary font-bold flex items-center gap-2 hover:gap-4 transition-all">
            Lihat Semua 128 Ulasan <span className="material-symbols-outlined">trending_flat</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card p-8 rounded-3xl border border-outline-variant/10">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-primary/30">
                  <img className="w-full h-full object-cover" alt="Review 1" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAmX66aWWnofkRmUDYgq-YfWMSjacGYRN6LrbAFxpJzhcQebQkYZC1rp0dJmvjzylCycG8cAugMIUYyo_HGa5BAVIBN18OnP9eyZ7s-H9Dqs5mKQe7Ral1Btdm0xCu8on9uO7KJR3QPleY6rHm-1UHE_d1PCW-z50L99_vCvJOuemDanp7TrqJqK-7G38L28ySnwNcbvF92cNed9HNNKVEqc8BYjXHKRTJKo8xWI-KNWpZjn-WR0NbBmvWOasDRXMMkjg9684oxrSRs"/>
                </div>
                <div>
                  <h5 className="font-bold text-white">Adrian Wijaya</h5>
                  <p className="text-xs text-on-surface-variant">Terverifikasi Pembeli</p>
                </div>
              </div>
              <div className="flex text-primary gap-0.5">
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              </div>
            </div>
            <p className="text-on-surface-variant italic leading-relaxed">"Aromanya benar-benar maskulin dan elegan. Proyeksinya luar biasa, saya mendapat banyak pujian di kantor. Pengiriman sangat aman dengan bubble wrap tebal."</p>
          </div>

          <div className="glass-card p-8 rounded-3xl border border-outline-variant/10">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-primary/30">
                  <img className="w-full h-full object-cover" alt="Review 2" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAcDdXGcaF6ySemPKMZ29lvVFd74qnysLLSx0lUr56M2Smc5X-4YPFe2DWOR8StLrvLOW82VdXyYJXTwRuTUA-C6Z7TaMFM2cSiviwdZaEor5Bg9VQd2YPlsTE8ztsRAL_UivFGvey7Q0HNemDvF27M4uIjSxxcJ7Z4pcpZCIhGogtcyFXO9ysIZ9m5Sw_jaq7-aPDa6oKFhP9uXBPaEYdlMpOOcPtw5ApZfnRFVxNP-4SuMAkkQdEb2tLtNpwYqo795421p5ZqT2Or"/>
                </div>
                <div>
                  <h5 className="font-bold text-white">Kevin Sanjaya</h5>
                  <p className="text-xs text-on-surface-variant">Terverifikasi Pembeli</p>
                </div>
              </div>
              <div className="flex text-primary gap-0.5">
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 0" }}>star</span>
              </div>
            </div>
            <p className="text-on-surface-variant italic leading-relaxed">"Wanginya sangat versatile, bisa dipakai siang maupun malam. Versi EDP ini jauh lebih smooth dibanding EDT-nya. Sangat worth the price!"</p>
          </div>
        </div>
      </section>
    </div>
  );
}
