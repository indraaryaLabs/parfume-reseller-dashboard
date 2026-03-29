import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../lib/api-client';

export default function AdminProducts() {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All'); // All, Ready, Restock, Sold
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const limit = 10;

  const statusMap: Record<string, string> = {
    'Ready': 'READY STOCK',
    'Restock': 'RESTOCKING',
    'Sold': 'SOLD OUT'
  };

  const { data, isLoading } = useQuery({
    queryKey: ['admin-products', page, filterStatus, searchQuery],
    queryFn: async () => {
      const res = await apiClient.get('/products', {
        params: {
          page,
          limit,
          search: searchQuery || undefined,
          status: statusMap[filterStatus] || undefined
        }
      });
      return res.data;
    }
  });

  const products = data?.items || [];
  const totalItems = data?.total || 0;
  const totalPages = data?.totalPages || 1;

  const deleteSingleMutation = useMutation({
    mutationFn: async (id: string) => apiClient.delete(`/products/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      setSelectedIds([]);
    }
  });

  const deleteBulkMutation = useMutation({
    mutationFn: async (ids: string[]) => apiClient.delete('/products/bulk', { data: { ids } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      setSelectedIds([]);
    }
  });

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(products.map((p: any) => p.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleDeleteSelected = () => {
    if (window.confirm(`Yakin ingin menghapus ${selectedIds.length} produk terpilih?`)) {
      deleteBulkMutation.mutate(selectedIds);
    }
  };

  const handleDeleteSingle = (id: string) => {
    if (window.confirm('Yakin ingin menghapus produk ini?')) {
      deleteSingleMutation.mutate(id);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'READY STOCK':
        return <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded-full uppercase tracking-tighter border border-primary/20">Ready</span>;
      case 'RESTOCKING':
        return <span className="px-3 py-1 bg-secondary/10 text-secondary text-[10px] font-bold rounded-full uppercase tracking-tighter border border-secondary/20">Restock</span>;
      case 'SOLD OUT':
        return <span className="px-3 py-1 bg-error/10 text-error text-[10px] font-bold rounded-full uppercase tracking-tighter border border-error/20">Sold Out</span>;
      default:
        return <span className="px-3 py-1 bg-outline-variant/10 text-outline text-[10px] font-bold rounded-full uppercase tracking-tighter border border-outline-variant/20">{status}</span>;
    }
  };

  return (
    <section>
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-10 gap-6">
        <div>
          <h2 className="text-4xl font-headline font-bold text-on-surface tracking-tight">Manajemen Produk</h2>
          <p className="text-on-surface-variant mt-2 font-label text-sm">Kelola kurasi koleksi wewangian eksklusif Anda.</p>
        </div>
        <Link to="/admin/products/new" className="px-8 py-3 bg-gradient-to-br from-primary to-primary-container text-on-primary font-headline font-extrabold rounded-xl shadow-[0_10px_20px_rgba(201,168,76,0.2)] hover:scale-[1.03] active:scale-95 transition-all flex items-center gap-2 uppercase tracking-wider text-xs">
          <span className="material-symbols-outlined text-[18px]">add</span>
          Tambah Produk
        </Link>
      </div>

      <div className="flex flex-col gap-6 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          
          <div className="flex items-center bg-surface-container-low px-4 py-1.5 rounded-full border border-outline-variant/20 focus-within:ring-1 focus-within:ring-primary/50 transition-all max-w-sm w-full">
            <span className="material-symbols-outlined text-outline text-sm">search</span>
            <input
              className="bg-transparent border-none rounded-full py-1 pr-4 text-sm focus:ring-0 transition-all placeholder:text-outline/50 w-full"
              placeholder="Cari parfum atau brand..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              type="text"
            />
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[11px] font-headline font-bold uppercase tracking-widest text-on-surface-variant">Filter Status:</span>
            <div className="flex bg-surface-container-low rounded-full p-1 border border-outline-variant/10 overflow-x-auto whitespace-nowrap scrollbar-hide">
              {['All', 'Ready', 'Restock', 'Sold'].map(tab => (
                <button 
                  key={tab}
                  onClick={() => setFilterStatus(tab)}
                  className={`px-5 py-1.5 rounded-full text-xs font-bold transition-all ${filterStatus === tab ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center py-4 border-y border-outline-variant/10">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-surface-container rounded-lg border border-outline-variant/20 cursor-pointer hover:border-primary/50 transition-all">
              <span className="text-xs font-semibold text-on-surface-variant">Bulk: Ubah Status</span>
              <span className="material-symbols-outlined text-[18px] text-on-surface-variant">keyboard_arrow_down</span>
            </div>
            {selectedIds.length > 0 && (
              <button onClick={handleDeleteSelected} disabled={deleteBulkMutation.isPending} className="flex items-center gap-2 px-4 py-2 text-error hover:bg-error/10 rounded-lg transition-all text-xs font-bold uppercase tracking-tighter fade-in animate-in">
                <span className="material-symbols-outlined text-[18px]">delete</span>
                Hapus ({selectedIds.length})
              </button>
            )}
          </div>
          <div className="text-xs font-label text-on-surface-variant">
            Menampilkan <span className="text-on-surface font-bold">{products.length > 0 ? (page - 1) * limit + 1 : 0}-{Math.min(page * limit, totalItems)}</span> dari <span className="text-on-surface font-bold">{totalItems}</span> parfum
          </div>
        </div>
      </div>

      <div className="bg-surface-container-low rounded-3xl overflow-hidden border border-outline-variant/10 shadow-2xl">
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-surface-container-high/40 text-on-surface-variant text-[10px] uppercase tracking-[0.2em] font-headline">
                <th className="py-5 px-6 w-12 text-center">
                  <input 
                    className="rounded-sm border-outline-variant bg-surface-container-highest text-primary focus:ring-primary/40 focus:ring-offset-0 cursor-pointer" 
                    type="checkbox"
                    checked={products.length > 0 && selectedIds.length === products.length}
                    onChange={handleSelectAll}
                  />
                </th>
                <th className="py-5 px-4 font-extrabold">Gambar</th>
                <th className="py-5 px-4 font-extrabold">Nama Produk</th>
                <th className="py-5 px-4 font-extrabold">Brand</th>
                <th className="py-5 px-4 font-extrabold">Stok</th>
                <th className="py-5 px-4 font-extrabold">Status</th>
                <th className="py-5 px-6 text-right font-extrabold">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/5">
              {products.length === 0 ? (
                 <tr>
                    <td colSpan={7} className="text-center py-12 text-on-surface-variant font-medium">Tidak ada produk ditemukan.</td>
                 </tr>
              ) : products.map((product: any) => (
                <tr key={product.id} className={`group hover:bg-surface-container-highest/30 transition-colors ${selectedIds.includes(product.id) ? 'bg-primary/5 border-l-2 border-primary' : 'border-l-2 border-transparent'}`}>
                  <td className="py-4 px-6 text-center">
                    <input 
                      checked={selectedIds.includes(product.id)}
                      onChange={() => handleSelectOne(product.id)}
                      className="rounded-sm border-outline-variant bg-surface-container-highest text-primary focus:ring-primary/40 focus:ring-offset-0 cursor-pointer" 
                      type="checkbox"
                    />
                  </td>
                  <td className="py-4 px-4">
                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-surface-container-high border border-outline-variant/20 group-hover:border-primary/40 transition-all flex shrink-0">
                      <img alt={product.name} className="w-full h-full object-cover" src={product.mainImage || "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80"}/>
                    </div>
                  </td>
                  <td className="py-4 px-4 w-64 max-w-sm">
                    <span className="block text-sm font-headline font-bold text-on-surface truncate">{product.name}</span>
                    <span className="text-[10px] text-on-surface-variant uppercase tracking-widest truncate">Rp {product.price?.toLocaleString('id-ID')}</span>
                  </td>
                  <td className="py-4 px-4 text-sm font-medium text-on-surface-variant">{product.brand}</td>
                  <td className="py-4 px-4 text-sm font-headline font-bold text-on-surface">{product.stock}</td>
                  <td className="py-4 px-4">
                    {getStatusBadge(product.status)}
                  </td>
                  <td className="py-4 px-6 text-right space-x-2 whitespace-nowrap">
                    <button className="p-2 text-on-surface-variant hover:text-primary transition-colors tooltip relative group/btn">
                      <span className="material-symbols-outlined text-[20px]">edit</span>
                    </button>
                    <button onClick={() => handleDeleteSingle(product.id)} disabled={deleteSingleMutation.isPending} className="p-2 text-on-surface-variant hover:text-error transition-colors">
                      <span className="material-symbols-outlined text-[20px]">delete</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          )}
        </div>
        <div className="bg-surface-container-high/20 px-8 py-5 flex justify-between items-center border-t border-outline-variant/10">
          <div className="flex items-center gap-2">
            <span className="text-xs font-label text-on-surface-variant">Halaman {page} dari {totalPages}</span>
          </div>
          <div className="flex items-center gap-1">
            <button onClick={() => setPage(page - 1)} className="p-2 rounded-lg text-on-surface-variant hover:bg-surface-container-highest/50 disabled:opacity-30 transition-all" disabled={page <= 1}>
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button className="w-8 h-8 rounded-lg bg-primary text-on-primary text-xs font-bold flex items-center justify-center">{page}</button>
            <button onClick={() => setPage(page + 1)} className="p-2 rounded-lg text-on-surface-variant hover:bg-surface-container-highest/50 disabled:opacity-30 transition-all" disabled={page >= totalPages}>
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
