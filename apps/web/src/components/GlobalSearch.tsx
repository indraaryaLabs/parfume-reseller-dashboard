import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../lib/api-client';

export default function GlobalSearch() {
  const { isSearchOpen, closeSearch } = useStore();
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(timer);
  }, [query]);

  const { data: results = [], isLoading } = useQuery({
    queryKey: ['search-products', debouncedQuery],
    queryFn: async () => {
      const res = await apiClient.get('/products', {
        params: { search: debouncedQuery || undefined, limit: 12 }
      });
      return res.data.items || [];
    },
    enabled: isSearchOpen
  });

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeSearch();
    };
    if (isSearchOpen) {
      window.addEventListener('keydown', handleKeyDown);
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isSearchOpen, closeSearch]);

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-surface/90 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="w-full max-w-4xl mx-auto px-6 py-6 md:py-12 flex-1 flex flex-col h-full">
        {/* Search Header */}
        <div className="flex items-center gap-4 border-b border-outline-variant/20 pb-6 mb-8 mt-12 md:mt-0">
          <span className="material-symbols-outlined text-3xl text-primary">search</span>
          <input 
            autoFocus
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari aroma, brand, atau deskripsi..." 
            className="flex-1 bg-transparent border-none text-2xl md:text-3xl text-white font-headline tracking-tight placeholder:text-outline-variant focus:ring-0 px-0 outline-none"
          />
          <button 
            onClick={closeSearch}
            className="w-12 h-12 rounded-full hover:bg-surface-container-highest flex items-center justify-center text-on-surface-variant hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>

        {/* Search Results */}
        <div className="overflow-y-auto flex-1 custom-scrollbar pb-12 pr-2">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : results.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {results.map((product: any) => (
                <div 
                  key={product.id}
                  onClick={() => {
                    closeSearch();
                    navigate(`/product/${product.id}`);
                  }}
                  className="glass-card flex gap-4 p-4 rounded-2xl border border-outline-variant/10 hover:border-primary/40 cursor-pointer transition-all hover:bg-surface-container group"
                >
                  <div className="w-20 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-surface-container-high border border-outline-variant/20">
                    <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={product.name} src={product.mainImage || "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80"} />
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <span className="text-[10px] text-primary font-bold uppercase tracking-widest">{product.brand}</span>
                    <h4 className="text-lg font-headline font-bold text-white leading-tight mb-2 group-hover:text-primary transition-colors">{product.name}</h4>
                    <span className="text-secondary font-bold text-sm">Rp {product.price?.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex items-center justify-center px-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="material-symbols-outlined text-primary">arrow_forward</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center py-20">
              <span className="material-symbols-outlined text-6xl text-outline-variant mb-6">search_off</span>
              <h3 className="text-2xl font-headline font-bold text-white mb-2">Tidak ditemukan</h3>
              <p className="text-on-surface-variant max-w-md mx-auto">Kami tidak dapat menemukan produk yang sesuai dengan "{query}". Coba kata kunci lain atau telusuri koleksi kami.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
