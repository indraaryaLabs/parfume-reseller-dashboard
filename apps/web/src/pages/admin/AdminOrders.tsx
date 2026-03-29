import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../lib/api-client';

type OrderStatus = 'BARU' | 'DIPROSES' | 'DIKIRIM' | 'SELESAI';

export default function AdminOrders() {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<OrderStatus | 'SEMUA'>('SEMUA');

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ['admin-orders', activeTab],
    queryFn: async () => {
      const res = await apiClient.get('/orders/admin/all', {
        params: {
          status: activeTab === 'SEMUA' ? undefined : activeTab
        }
      });
      return res.data;
    }
  });

  const { data: allOrdersCount = [] } = useQuery({
    queryKey: ['admin-orders-count'],
    queryFn: async () => {
      const res = await apiClient.get('/orders/admin/all');
      return res.data;
    }
  });

  const getCount = (status: OrderStatus | 'SEMUA') => {
    return status === 'SEMUA' ? allOrdersCount.length : allOrdersCount.filter((o: any) => o.status === status).length;
  };

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status, trackingNumber }: { id: string, status: OrderStatus, trackingNumber?: string }) => {
      return apiClient.patch(`/orders/admin/${id}/status`, { status, trackingNumber });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-orders'] });
      queryClient.invalidateQueries({ queryKey: ['admin-orders-count'] });
    }
  });

  const updateStatus = (id: string, newStatus: OrderStatus, forceTracking?: string) => {
    if(window.confirm(`Ubah status order ini menjadi ${newStatus}?`)) {
      updateStatusMutation.mutate({ id, status: newStatus, trackingNumber: forceTracking });
    }
  };

  const handleExport = () => {
    alert("Laporan pesanan sedang di-generate dan akan mulai diunduh.");
  };

  const renderStatusBadge = (status: OrderStatus) => {
    switch(status) {
      case 'BARU': return <span className="px-4 py-1.5 rounded-full bg-primary-container text-on-primary-container text-[10px] font-extrabold tracking-widest uppercase">BARU</span>;
      case 'DIPROSES': return <span className="px-4 py-1.5 rounded-full bg-secondary-container text-on-secondary-container text-[10px] font-extrabold tracking-widest uppercase">DIPROSES</span>;
      case 'DIKIRIM': return <span className="px-4 py-1.5 rounded-full bg-tertiary-container text-on-tertiary-container text-[10px] font-extrabold tracking-widest uppercase">DIKIRIM</span>;
      case 'SELESAI': return <span className="px-4 py-1.5 rounded-full bg-surface-container-highest text-on-surface text-[10px] font-extrabold tracking-widest uppercase border border-outline-variant/30">SELESAI</span>;
    }
  };

  return (
    <>
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-4xl font-headline font-extrabold tracking-tight text-on-surface mb-2">Order Management</h2>
          <p className="text-on-surface-variant font-body">Oversee and curate the fulfillment journey of exclusive scents.</p>
        </div>
        <div className="flex gap-4">
          <button onClick={handleExport} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-surface-container-high border border-outline-variant/20 text-on-surface text-sm font-semibold hover:bg-surface-container-highest transition-all shadow-sm">
            <span className="material-symbols-outlined text-lg">download</span>
            Export Report
          </button>
        </div>
      </div>

      {/* TABS */}
      <div className="flex gap-8 mb-12 border-b border-outline-variant/10 pb-0 overflow-x-auto scrollbar-hide">
        {(['SEMUA', 'BARU', 'DIPROSES', 'DIKIRIM', 'SELESAI'] as const).map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-4 px-2 font-headline font-bold border-b-2 transition-all flex items-center gap-1 ${activeTab === tab ? 'text-primary border-primary' : 'text-on-surface-variant border-transparent hover:text-on-surface hover:border-outline-variant/30'}`}
          >
            {tab === 'SEMUA' ? 'Semua' : tab.charAt(0) + tab.slice(1).toLowerCase()} 
            <span className="text-[10px] opacity-60">({getCount(tab)})</span>
          </button>
        ))}
      </div>

      {/* ORDERS LIST */}
      <div className="grid grid-cols-1 gap-6">
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-16 text-on-surface-variant border border-dashed border-outline-variant/20 rounded-2xl bg-surface-container-low/50">
            Tidak ada pesanan dengan status indikator ini.
          </div>
        ) : (
          orders.map((order: any) => (
            <div key={order.id} className={`glass-card rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center gap-8 group transition-all duration-500 border ${order.status === 'BARU' ? 'border-primary/30 hover:shadow-primary/5' : order.status === 'DIPROSES' ? 'border-secondary/30 hover:shadow-secondary/5' : 'border-outline-variant/10'}`}>
              <div className="w-24 h-24 rounded-xl overflow-hidden bg-surface-container-lowest border border-outline-variant/10 flex-shrink-0">
                <img alt="Perfume Product" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" src={"https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80"}/>
              </div>
              <div className="flex-1 w-full">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-[10px] font-bold tracking-[0.2em] text-on-surface-variant uppercase">{order.status === 'SELESAI' ? 'Completed Order' : 'Order Identity'}</span>
                    <h3 className="text-xl font-headline font-bold text-on-surface">{order.orderNumber}</h3>
                  </div>
                  {renderStatusBadge(order.status)}
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                  <div>
                    <p className="text-[10px] text-outline uppercase font-bold tracking-tighter mb-1">Customer</p>
                    <p className="text-sm font-semibold text-on-surface">Customer</p>
                    <p className="text-xs text-on-surface-variant italic">Data tidak diload</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-outline uppercase font-bold tracking-tighter mb-1">Items</p>
                    <p className="text-sm font-semibold text-on-surface">1 Item(s)</p>
                    <p className="text-xs text-on-surface-variant italic truncate max-w-[120px]" title={"Items"}>Items</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-outline uppercase font-bold tracking-tighter mb-1">Total Amount</p>
                    <p className="text-sm font-headline font-bold text-primary">Rp {order.total?.toLocaleString('id-ID')}</p>
                  </div>
                  
                  {/* DYNAMIC ACTIONS */}
                  <div className="flex flex-col gap-2 justify-center mt-4 lg:mt-0">
                    {order.status === 'BARU' && (
                      <>
                        <div className="flex gap-2">
                          <button onClick={() => alert("Menampilkan Bukti Bayar...")} className="px-4 py-2 rounded-lg bg-surface-container-highest border border-outline-variant/30 text-[10px] font-bold uppercase tracking-wider text-on-surface hover:bg-primary/10 transition-all flex-1">Bukti Bayar</button>
                          <button onClick={() => updateStatus(order.id, 'DIPROSES')} disabled={updateStatusMutation.isPending} className="px-4 py-2 rounded-lg bg-primary text-on-primary text-[10px] font-bold uppercase tracking-wider hover:brightness-110 transition-all flex-1 shadow-[0_4px_10px_rgba(201,168,76,0.3)]">Verifikasi</button>
                        </div>
                      </>
                    )}
                    
                    {order.status === 'DIPROSES' && (
                      <>
                        <button onClick={() => { const resi = prompt("Masukkan nomor resi pengiriman:"); if(resi) { alert(`Resi ${resi} tersimpan.`); updateStatus(order.id, 'DIKIRIM', resi); } }} disabled={updateStatusMutation.isPending} className="w-full py-2.5 rounded-lg bg-surface-container-highest border border-outline-variant/30 text-[10px] font-bold uppercase tracking-wider text-on-surface hover:bg-primary/10 transition-all">Input Resi & Kirim</button>
                      </>
                    )}

                    {order.status === 'DIKIRIM' && (
                      <>
                        <button onClick={() => updateStatus(order.id, 'SELESAI')} disabled={updateStatusMutation.isPending} className="w-full py-2.5 rounded-lg bg-surface-container-highest border border-outline-variant/30 hover:border-tertiary/50 hover:text-tertiary text-[10px] font-bold uppercase tracking-wider text-on-surface transition-all">Selesaikan Pesanan</button>
                      </>
                    )}

                    {order.status === 'SELESAI' && (
                      <>
                         <button onClick={() => alert("Mencetak Invoice untuk arsip...")} className="w-full py-2.5 rounded-lg bg-surface-container border border-outline-variant/10 text-[10px] font-bold uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-all">Lihat Invoice</button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
