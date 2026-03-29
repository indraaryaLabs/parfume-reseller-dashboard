import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../lib/api-client';

export default function ProductCatalog() {
  const { addToCart } = useStore();
  const [activeTab, setActiveTab] = useState<'Ready Stock' | 'Restocking Soon' | 'Sold Out'>('Ready Stock');

  const statusMap = {
    'Ready Stock': 'READY STOCK',
    'Restocking Soon': 'RESTOCKING',
    'Sold Out': 'SOLD OUT'
  };

  const { data, isLoading } = useQuery({
    queryKey: ['products', activeTab],
    queryFn: async () => {
      const res = await apiClient.get('/products', {
        params: {
          status: statusMap[activeTab],
          limit: 4
        }
      });
      return res.data;
    }
  });

  const filteredProducts = data?.items || [];

  const handleAddToCart = (e: React.MouseEvent, id: string, name: string) => {
    e.preventDefault(); // prevent navigation to detail page
    addToCart(id, 1);
    alert(`1 ${name} ditambahkan ke keranjang!`);
  };

  const getStatusBadge = (status: string) => {
    if (status === 'SOLD OUT') {
      return <span className="bg-surface/80 backdrop-blur-md text-white border border-white/20 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">SOLD OUT</span>;
    }
    if (status === 'RESTOCKING') {
      return <span className="bg-secondary-container text-on-secondary-container text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">RESTOCK SOON</span>;
    }
    return <span className="bg-primary-container text-on-primary-container text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">READY</span>;
  };

  return (
    <section className="py-20 px-6 max-w-screen-2xl mx-auto">
      {/* Category Tabs */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div>
          <h2 className="font-headline text-4xl font-bold mb-4">Katalog <span className="text-primary">Eksklusif</span></h2>
          <p className="text-on-surface-variant">Pilih dari koleksi terbaik yang tersedia saat ini.</p>
        </div>
        <div className="flex p-1.5 bg-surface-container rounded-full border border-outline-variant/20 overflow-x-auto scrollbar-hide">
          <button 
            onClick={() => setActiveTab('Ready Stock')}
            className={`px-6 md:px-8 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${activeTab === 'Ready Stock' ? 'bg-primary text-on-primary shadow-lg' : 'text-on-surface-variant hover:text-on-surface'}`}
          >
            Ready Stock
          </button>
          <button 
            onClick={() => setActiveTab('Restocking Soon')}
            className={`px-6 md:px-8 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${activeTab === 'Restocking Soon' ? 'bg-primary text-on-primary shadow-lg' : 'text-on-surface-variant hover:text-on-surface'}`}
          >
            Restocking Soon
          </button>
          <button 
            onClick={() => setActiveTab('Sold Out')}
            className={`px-6 md:px-8 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${activeTab === 'Sold Out' ? 'bg-primary text-on-primary shadow-lg' : 'text-on-surface-variant hover:text-on-surface'}`}
          >
            Sold Out
          </button>
        </div>
      </div>

      {/* Product Grid Area */}
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product: any) => (
            <Link to={`/product/${product.id}`} key={product.id} className="glass-card group rounded-3xl overflow-hidden flex flex-col transition-all hover:-translate-y-2 block text-left">
              <div className="relative aspect-[4/5] overflow-hidden bg-surface-container-high">
                <img 
                  className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ${product.status === 'SOLD OUT' ? 'grayscale' : ''}`} 
                  alt={product.name} 
                  src={product.mainImage || "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80"} 
                />
                <div className="absolute top-4 left-4">
                  {getStatusBadge(product.status)}
                </div>
                {product.status === 'SOLD OUT' && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span className="border-2 border-white/40 text-white font-headline font-bold px-6 py-2 rounded-full backdrop-blur-md">HABIS</span>
                  </div>
                )}
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs text-primary font-bold tracking-widest uppercase">{product.brand}</span>
                  <div className="flex items-center text-primary-fixed-dim scale-75 origin-right">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="ml-1 text-sm text-on-surface">4.8</span>
                  </div>
                </div>
                <h3 className="font-headline text-xl font-bold mb-4 line-clamp-1">{product.name}</h3>
                <div className="mt-auto flex justify-between items-center">
                  <span className={`text-lg font-bold ${product.status === 'SOLD OUT' ? 'opacity-50' : ''}`}>Rp {product.price?.toLocaleString('id-ID')}</span>
                  {product.status !== 'SOLD OUT' ? (
                    <button 
                      onClick={(e) => handleAddToCart(e, product.id, product.name)} 
                      className="w-10 h-10 rounded-full border border-outline-variant/30 flex items-center justify-center hover:bg-primary hover:text-on-primary transition-colors"
                    >
                      <span className="material-symbols-outlined text-[20px]">add_shopping_cart</span>
                    </button>
                  ) : (
                    <button disabled className="text-xs font-bold text-primary uppercase tracking-tighter underline">Cek Stock</button>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-outline-variant/20 rounded-3xl glass-card">
          <span className="material-symbols-outlined text-6xl text-outline-variant mb-4">search_off</span>
          <h3 className="text-xl font-headline font-bold text-white mb-2">Tidak Ketersediaan</h3>
          <p className="text-on-surface-variant max-w-sm">Tidak ada produk dalam kategori ini saat ini.</p>
        </div>
      )}
    </section>
  );
}
