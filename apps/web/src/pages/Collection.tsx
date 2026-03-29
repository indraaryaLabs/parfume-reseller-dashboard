import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../lib/api-client';

export default function Collection() {
  const { addToCart } = useStore();

  const { data: serverProducts = [], isLoading } = useQuery({
    queryKey: ['products', 'all'],
    queryFn: async () => {
      const res = await apiClient.get('/products', { params: { limit: 100 } });
      return res.data.items || [];
    }
  });
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [availability, setAvailability] = useState<string>('Semua');
  const [priceRange, setPriceRange] = useState<number>(5000000);
  const [sortBy, setSortBy] = useState<string>('Harga ▼');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 9;

  // Derive unique brands from live data
  const allBrands = Array.from(new Set(serverProducts.map((p: any) => p.brand))) as string[];
  // Extract unique categories from live data or fallback
  const allCategories = Array.from(new Set(serverProducts.map((p: any) => p.category).filter(Boolean))) as string[];
  if (allCategories.length === 0) {
    allCategories.push('Fresh', 'Woody', 'Oriental', 'Floral');
  }

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]);
    setCurrentPage(1);
  };

  const toggleCategory = (cat: string) => {
    // Note: Since mock products lack scent metadata, this is structural only for the wireframe logic
    setSelectedCategories(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]);
    setCurrentPage(1);
  };

  const handleResetFilter = () => {
    setSelectedBrands([]);
    setSelectedCategories([]);
    setAvailability('Semua');
    setPriceRange(5000000);
    setCurrentPage(1);
  };

  const filteredProducts = useMemo(() => {
    return serverProducts.filter((p: any) => {
      // Brand filter
      if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand)) return false;
      
      // Category filter
      if (selectedCategories.length > 0 && p.category && !selectedCategories.includes(p.category)) return false;

      // Availability filter
      if (availability === 'Ready Stock' && p.status !== 'READY STOCK') return false;
      if (availability === 'Sold Out' && p.status !== 'SOLD OUT') return false;
      
      // Price filter
      const numPrice = typeof p.price === 'string' ? parseInt(p.price.replace(/\\D/g, '')) : p.price;
      if (numPrice > priceRange) return false;

      return true;
    }).sort((a: any, b: any) => {
      const priceA = typeof a.price === 'string' ? parseInt(a.price.replace(/\\D/g, '')) : a.price;
      const priceB = typeof b.price === 'string' ? parseInt(b.price.replace(/\\D/g, '')) : b.price;
      if (sortBy === 'Harga ▼') return priceB - priceA;
      if (sortBy === 'Harga ▲') return priceA - priceB;
      return 0;
    });
  }, [serverProducts, selectedBrands, selectedCategories, availability, priceRange, sortBy]);

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentItems = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleAddToCart = (e: React.MouseEvent, id: string, name: string) => {
    e.preventDefault();
    addToCart(id, 1);
    alert(`1 ${name} ditambahkan ke keranjang!`);
  };

  return (
    <div className="max-w-[1400px] mx-auto px-6 pt-8 pb-32">
      <header className="mb-8 border-b border-outline-variant/10 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-headline font-bold mb-2 text-white">Katalog Produk</h1>
          <p className="text-on-surface-variant text-sm">Menampilkan {filteredProducts.length} parfum dari koleksi kami</p>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="md:hidden flex items-center gap-2 bg-surface-container border border-outline-variant/30 px-4 py-2 rounded-lg text-sm text-white"
          >
            <span className="material-symbols-outlined text-sm">filter_list</span>
            {isSidebarOpen ? 'Sembunyikan Filter' : 'Tampilkan Filter'}
          </button>
          <div className="bg-surface-container border border-outline-variant/30 px-4 py-2 rounded-lg flex items-center gap-2">
            <span className="text-sm text-on-surface-variant">Sort:</span>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent border-none text-sm text-white focus:ring-0 cursor-pointer outline-none"
            >
              <option className="bg-surface text-white">Harga ▼</option>
              <option className="bg-surface text-white">Harga ▲</option>
            </select>
          </div>
        </div>
      </header>

      <div className="flex flex-col md:flex-row gap-8 items-start relative">
        {/* Sidebar Filter */}
        <aside className={`w-full md:w-64 flex-shrink-0 transition-all duration-300 md:sticky md:top-24 ${isSidebarOpen ? 'block' : 'hidden md:block'}`}>
          <div className="glass-card rounded-2xl p-6 border border-outline-variant/20 flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h2 className="font-headline font-bold text-lg flex items-center gap-2">
                <span className="material-symbols-outlined">filter_alt</span> FILTER
              </h2>
              <button onClick={() => setIsSidebarOpen(false)} className="md:hidden material-symbols-outlined text-on-surface-variant hover:text-white">close</button>
            </div>

            {/* Brand Filter */}
            <div className="border-t border-outline-variant/10 pt-4">
              <h3 className="text-sm font-bold text-on-surface-variant mb-3 uppercase tracking-widest">Brand</h3>
              <div className="space-y-3">
                {allBrands.map(brand => (
                  <div key={brand} onClick={() => toggleBrand(brand)} className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${selectedBrands.includes(brand) ? 'bg-primary border-primary' : 'border-outline-variant/50 group-hover:border-primary'}`}>
                      {selectedBrands.includes(brand) && <span className="material-symbols-outlined text-[14px] text-on-primary">check</span>}
                    </div>
                    <span className="text-sm text-white group-hover:text-primary transition-colors">{brand}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Category Filter */}
            <div className="border-t border-outline-variant/10 pt-4">
              <h3 className="text-sm font-bold text-on-surface-variant mb-3 uppercase tracking-widest">Kategori Aroma</h3>
              <div className="space-y-3">
                {allCategories.map(cat => (
                  <div key={cat} onClick={() => toggleCategory(cat)} className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${selectedCategories.includes(cat) ? 'bg-primary border-primary' : 'border-outline-variant/50 group-hover:border-primary'}`}>
                      {selectedCategories.includes(cat) && <span className="material-symbols-outlined text-[14px] text-on-primary">check</span>}
                    </div>
                    <span className="text-sm text-white group-hover:text-primary transition-colors">{cat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Availability Filter */}
            <div className="border-t border-outline-variant/10 pt-4">
              <h3 className="text-sm font-bold text-on-surface-variant mb-3 uppercase tracking-widest">Ketersediaan</h3>
              <div className="space-y-3">
                {['Semua', 'Ready Stock', 'Restocking', 'Sold Out'].map(status => (
                  <div key={status} onClick={() => { setAvailability(status); setCurrentPage(1); }} className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${availability === status ? 'border-primary' : 'border-outline-variant/50 group-hover:border-primary'}`}>
                      {availability === status && <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>}
                    </div>
                    <span className="text-sm text-white group-hover:text-primary transition-colors">{status}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="border-t border-outline-variant/10 pt-4">
              <h3 className="text-sm font-bold text-on-surface-variant mb-3 uppercase tracking-widest flex justify-between">
                Harga 
                <span className="text-primary font-mono normal-case">≤ {(priceRange/1000).toFixed(0)}k</span>
              </h3>
              <input 
                type="range" 
                min="500000" 
                max="5000000" 
                step="100000" 
                value={priceRange} 
                onChange={(e) => { setPriceRange(parseInt(e.target.value)); setCurrentPage(1); }}
                className="w-full accent-primary bg-surface-container-high h-2 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-on-surface-variant mt-2">
                <span>500rb</span>
                <span>5jt</span>
              </div>
            </div>

            <button 
              onClick={handleResetFilter}
              className="mt-6 w-full py-3 bg-surface-container-highest hover:bg-surface-container-high border border-outline-variant/30 rounded-xl text-sm font-bold text-white transition-colors flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">refresh</span>
              Reset Filter
            </button>
          </div>
        </aside>

        <main className="flex-1 w-full">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : currentItems.length > 0 ? (
            <div className={`grid grid-cols-1 sm:grid-cols-2 ${isSidebarOpen ? 'lg:grid-cols-3' : 'lg:grid-cols-4'} gap-6 transition-all`}>
              {currentItems.map((product: any) => (
                <Link to={`/product/${product.id}`} key={product.id} className="glass-card group rounded-3xl overflow-hidden flex flex-col transition-all hover:scale-[1.02] text-left border border-outline-variant/10 hover:border-primary/30">
                  <div className="relative aspect-square overflow-hidden bg-surface-container-high">
                    <img className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ${product.status === 'SOLD OUT' ? 'grayscale' : ''}`} alt={product.name} src={product.mainImage || "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80"} />
                    
                    <div className="absolute top-4 left-4">
                      {product.status !== 'SOLD OUT' ? (
                        <span className="bg-primary/90 backdrop-blur-md border border-primary text-on-primary-container text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg shadow-black/50">READY</span>
                      ) : (
                        <span className="bg-surface/80 backdrop-blur-md text-white border border-white/20 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">SOLD OUT</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-[10px] text-primary font-bold tracking-widest uppercase">{product.brand}</span>
                    </div>
                    <h3 className="font-headline text-lg font-bold mb-3 line-clamp-1">{product.name}</h3>
                    <div className="mt-auto flex justify-between items-center pt-2">
                      <span className={`text-base font-bold text-white ${product.status === 'SOLD OUT' ? 'opacity-50' : ''}`}>Rp {product.price?.toLocaleString('id-ID')}</span>
                      {product.status !== 'SOLD OUT' ? (
                        <button 
                          onClick={(e) => handleAddToCart(e, product.id, product.name)} 
                          className="w-10 h-10 rounded-full bg-surface-container border border-outline-variant/20 flex items-center justify-center hover:bg-primary hover:text-on-primary hover:border-primary transition-colors text-white"
                        >
                          <span className="material-symbols-outlined text-[20px]">add_shopping_cart</span>
                        </button>
                      ) : null}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-32 text-center border border-dashed border-outline-variant/20 rounded-3xl glass-card">
              <span className="material-symbols-outlined text-6xl text-outline-variant mb-4">search_off</span>
              <h3 className="text-xl font-headline font-bold text-white mb-2">Tidak ada hasil</h3>
              <p className="text-on-surface-variant max-w-sm">Coba sesuaikan filter pencarian Anda, pilih brand lain, atau perbesar rentang harga yang diinginkan.</p>
              <button onClick={handleResetFilter} className="mt-6 text-primary font-bold hover:underline">Reset Semua Filter</button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex justify-center items-center gap-2">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="w-10 h-10 rounded-xl flex items-center justify-center glass-card border border-outline-variant/20 disabled:opacity-50 hover:bg-surface-container-high transition-colors"
              >
                <span className="material-symbols-outlined text-sm">chevron_left</span>
              </button>
              
              {Array.from({ length: totalPages }).map((_, i) => (
                <button 
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-10 h-10 rounded-xl font-bold text-sm transition-colors ${currentPage === i + 1 ? 'bg-primary text-on-primary' : 'glass-card border border-outline-variant/20 hover:bg-surface-container-high'}`}
                >
                  {i + 1}
                </button>
              ))}

              <button 
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="w-10 h-10 rounded-xl flex items-center justify-center glass-card border border-outline-variant/20 disabled:opacity-50 hover:bg-surface-container-high transition-colors"
              >
                <span className="material-symbols-outlined text-sm">chevron_right</span>
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
