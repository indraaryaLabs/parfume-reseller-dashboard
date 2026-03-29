import { useState } from 'react';
import { Link } from 'react-router-dom';

const INITIAL_RESTOCKS = [
  { id: 1, name: 'Dior Sauvage', type: 'Eau de Parfum', left: 2, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmuqf763j_1Ou1eylYGZXfgWIj2XHlAm-Esp0plln0tMLBtYUYplEEFwqyuh-_MhTHN9Wvm3aAW1bcWEd9T1MbGpxSdrY3WHKuX8hq7H5MqnyGEHZf6Jqo0xIMWRO8I_fPHnGDwBmAswp4yEFyo8wvJ3fJx_Hez59ygH0NuJfsOjr5FWjQ82aGGg17CfuJP00ScYyloMRKA2MZ78wMeg70PZVIXqecKzlfHgE57z98_qrPzqTCnVes1mDmWsmwKsRHuKq6Cm8T7hd3' },
  { id: 2, name: 'TF Tobacco V.', type: 'Private Blend', left: 1, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuASDtM75g5diKAGil9yOBCeJZmAY0IxBz4peXCtxme5vRAea6bpz-CnmsZIy-i-BCAE5QPhMeVAnlBWxu9qlcjBkKX8GpLx9zozqtOjh22x15RoD64c1Rrlpgr8svoZDh6eOVzQCi-6t_7avbBy5GYpL7j2wKXQZNfVIP-iiQ3FVvmyUhQ6TuPKo2ZWAldYx7BWjRP1cDmK5RvLHD-NqH73SPgajdabLRPQaQ5dHTbDbepg3mTbjf340jFcwTy7MdA81oUjKH8uXkDB' },
  { id: 3, name: 'YSL Y EDP', type: "L'Homme Collection", left: 3, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBAJxPw5oV1M7aziQKXAPRmAgl6XBCeMUV5NTO9IBMLuWtozxfeNQpJCc7hfZkRBv2o1KThxQbf_tNC1hh88Zw6y3S9NoThByatbSuaLsNcAyMJ936DJsTYdDrwqYtoDqTLXrHIvR1P4Y8mX9ohx0TrFNV1rNkG9imKtgcnL2QAmELJyyLKLj4o0s6v1HXIjItzTuFyNl1-Eh0LFGW-cT0zuIjdiIEDIZBv2nLJ4XbTjvyinp__HY59YQwy6SW1_0RaTzjoN5yTQoaL' }
];

export default function AdminDashboard() {
  const [restocks, setRestocks] = useState(INITIAL_RESTOCKS);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRestockAll = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setRestocks([]);
      setIsRefreshing(false);
      alert("Semua item dengan stok kritis telah berhasil dipesan ulang (Restocked).");
    }, 1200);
  };

  const handleExport = () => {
    alert("Mengekspor laporan Dashboard Performance ke PDF/Excel...");
  };

  const handleNewShipment = () => {
    alert("Formulir Penerimaan Barang (New Shipment) akan terbuka.");
  };

  return (
    <>
      <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h2 className="text-4xl font-headline font-extrabold tracking-tight mb-2">Portfolio Overview</h2>
          <p className="text-on-surface-variant max-w-md">Real-time performance metrics of your curated fragrance collections and sales channels.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={handleExport} className="px-6 py-2.5 bg-surface-container-high text-on-surface border border-outline-variant/30 rounded-xl text-sm font-medium hover:bg-surface-container-highest transition-all flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">download</span> Export Report
          </button>
          <button onClick={handleNewShipment} className="px-6 py-2.5 bg-gradient-to-r from-primary to-secondary text-on-primary font-bold rounded-xl text-sm shadow-[0_4px_15px_rgba(230,195,100,0.2)] hover:scale-[1.02] transition-all flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">local_shipping</span>
            New Shipment
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="glass-card p-6 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-700"></div>
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <span className="material-symbols-outlined text-primary">payments</span>
            </div>
            <span className="text-xs font-bold text-[#4ade80] bg-[#4ade80]/10 px-2 py-1 rounded-full flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">trending_up</span> +12%
            </span>
          </div>
          <h3 className="text-outline text-xs uppercase tracking-widest font-semibold mb-1">Total Revenue</h3>
          <p className="text-2xl font-headline font-bold">Rp 28.5 jt</p>
        </div>

        <div className="glass-card p-6 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/5 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-700"></div>
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-secondary/10 rounded-lg">
              <span className="material-symbols-outlined text-secondary">shopping_cart_checkout</span>
            </div>
            <span className="text-xs font-bold text-secondary bg-secondary/10 px-2 py-1 rounded-full flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">trending_up</span> +5%
            </span>
          </div>
          <h3 className="text-outline text-xs uppercase tracking-widest font-semibold mb-1">Monthly Expenses</h3>
          <p className="text-2xl font-headline font-bold">Rp 18.2 jt</p>
        </div>

        <div className="glass-card p-6 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary-container/5 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-700"></div>
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-primary/20 rounded-lg">
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
            </div>
            <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-full flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">trending_up</span> +24%
            </span>
          </div>
          <h3 className="text-outline text-xs uppercase tracking-widest font-semibold mb-1">Net Profit</h3>
          <p className="text-2xl font-headline font-bold text-primary">Rp 10.3 jt</p>
        </div>

        <div className="glass-card p-6 rounded-2xl relative overflow-hidden group cursor-pointer hover:border-primary/50 transition-all">
          <div className="absolute top-0 right-0 w-24 h-24 bg-surface-container/20 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-700"></div>
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-surface-container-highest rounded-lg border border-outline-variant/30 flex items-center justify-center">
              <span className="material-symbols-outlined text-on-surface">pending_actions</span>
            </div>
            <Link to="/admin/orders" className="text-[10px] text-primary hover:underline font-bold uppercase tracking-widest">View All</Link>
          </div>
          <h3 className="text-outline text-xs uppercase tracking-widest font-semibold mb-1">Pending Orders</h3>
          <p className="text-2xl font-headline font-bold">5 <span className="text-sm font-normal text-outline">Units</span></p>
        </div>
      </div>

      {/* CHART Area */}
      <div className="glass-card rounded-3xl p-8 mb-10 border border-primary/10">
        <div className="flex justify-between items-start mb-12">
          <div>
            <h3 className="text-xl font-headline font-bold mb-1">Tren Penjualan</h3>
            <p className="text-sm text-outline">Performa volume penjualan 6 bulan terakhir</p>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-primary shadow-[0_0_8px_rgba(230,195,100,0.6)] animate-pulse"></span>
              <span className="text-xs text-on-surface-variant font-medium">Revenue</span>
            </div>
          </div>
        </div>
        <div className="h-[300px] w-full relative">
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 300">
            <defs>
              <linearGradient id="chartGradient" x1="0%" x2="0%" y1="0%" y2="100%">
                <stop offset="0%" stopColor="#C9A84C" stopOpacity="0.3"></stop>
                <stop offset="100%" stopColor="#C9A84C" stopOpacity="0"></stop>
              </linearGradient>
            </defs>
            <line stroke="#353534" strokeDasharray="8,8" strokeWidth="0.5" x1="0" x2="1000" y1="50" y2="50"></line>
            <line stroke="#353534" strokeDasharray="8,8" strokeWidth="0.5" x1="0" x2="1000" y1="150" y2="150"></line>
            <line stroke="#353534" strokeDasharray="8,8" strokeWidth="0.5" x1="0" x2="1000" y1="250" y2="250"></line>
            
            {/* Chart Area Fill */}
            <path className="animate-[fade-in_1.5s_ease-out]" d="M0,250 L100,200 L300,220 L500,120 L700,160 L900,60 L1000,80 V300 H0 Z" fill="url(#chartGradient)"></path>
            
            {/* Line connecting points */}
            <path className="drop-shadow-[0_0_10px_rgba(201,168,76,0.5)]" d="M0,250 L100,200 L300,220 L500,120 L700,160 L900,60 L1000,80" fill="none" stroke="#C9A84C" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4"></path>
            
            {/* Interactive Data Points */}
            <g className="group cursor-pointer"><circle cx="100" cy="200" fill="#0E0E0E" r="6" stroke="#C9A84C" strokeWidth="2" className="group-hover:fill-primary transition-colors"></circle></g>
            <g className="group cursor-pointer"><circle cx="300" cy="220" fill="#0E0E0E" r="6" stroke="#C9A84C" strokeWidth="2" className="group-hover:fill-primary transition-colors"></circle></g>
            <g className="group cursor-pointer"><circle cx="500" cy="120" fill="#0E0E0E" r="6" stroke="#C9A84C" strokeWidth="2" className="group-hover:fill-primary transition-colors"></circle></g>
            <g className="group cursor-pointer"><circle cx="700" cy="160" fill="#0E0E0E" r="6" stroke="#C9A84C" strokeWidth="2" className="group-hover:fill-primary transition-colors"></circle></g>
            <g className="group cursor-pointer"><circle cx="900" cy="60" fill="#0E0E0E" r="6" stroke="#C9A84C" strokeWidth="2" className="group-hover:fill-primary transition-colors"></circle></g>
          </svg>
          <div className="flex justify-between mt-6 px-2 text-[10px] font-bold text-outline uppercase tracking-[0.2em]">
            <span>Okt</span><span>Nov</span><span>Des</span><span>Jan</span><span>Feb</span><span>Mar</span>
          </div>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders Table */}
        <div className="lg:col-span-2 glass-card rounded-3xl overflow-hidden shadow-xl">
          <div className="p-6 border-b border-outline-variant/10 flex justify-between items-center bg-surface-container-low/30">
            <h3 className="font-headline font-bold">Recent Orders</h3>
            <Link to="/admin/orders" className="text-xs text-primary font-bold hover:underline">View All</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left font-body">
              <thead>
                <tr className="text-[10px] uppercase tracking-widest text-outline border-b border-outline-variant/10 bg-surface-container-lowest/30">
                  <th className="px-6 py-4 font-semibold">ID</th>
                  <th className="px-6 py-4 font-semibold">Client</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold text-right">Value (Rp)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                <tr className="hover:bg-surface-container-high/50 transition-colors group cursor-pointer">
                  <td className="px-6 py-5 text-sm font-medium text-outline">#001</td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary shadow-[inset_0_0_10px_rgba(201,168,76,0.2)]">B</div>
                      <span className="text-sm font-semibold">Budi</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="px-3 py-1 bg-primary-container text-on-primary-container border border-primary/20 rounded-full text-[10px] font-bold uppercase tracking-wider">Baru</span>
                  </td>
                  <td className="px-6 py-5 text-sm font-headline font-bold text-right group-hover:text-primary transition-colors">3.0jt</td>
                </tr>
                <tr className="hover:bg-surface-container-high/50 transition-colors group cursor-pointer">
                  <td className="px-6 py-5 text-sm font-medium text-outline">#002</td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-[10px] font-bold text-secondary">R</div>
                      <span className="text-sm font-semibold">Rina</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="px-3 py-1 bg-tertiary-container text-on-tertiary-container border border-tertiary/20 rounded-full text-[10px] font-bold uppercase tracking-wider">Kirim</span>
                  </td>
                  <td className="px-6 py-5 text-sm font-headline font-bold text-right group-hover:text-primary transition-colors">1.6jt</td>
                </tr>
                <tr className="hover:bg-surface-container-high/50 transition-colors group cursor-pointer">
                  <td className="px-6 py-5 text-sm font-medium text-outline">#003</td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center text-[10px] font-bold text-outline">A</div>
                      <span className="text-sm font-semibold">Andi</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="px-3 py-1 bg-secondary-container text-on-secondary-container border border-secondary/30 rounded-full text-[10px] font-bold uppercase tracking-wider">Proses</span>
                  </td>
                  <td className="px-6 py-5 text-sm font-headline font-bold text-right group-hover:text-primary transition-colors">2.4jt</td>
                </tr>
                <tr className="hover:bg-surface-container-high/50 transition-colors group cursor-pointer">
                  <td className="px-6 py-5 text-sm font-medium text-outline">#004</td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center text-[10px] font-bold text-outline">S</div>
                      <span className="text-sm font-semibold">Sari</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="px-3 py-1 bg-surface-container-highest text-on-surface-variant border border-outline-variant/30 rounded-full text-[10px] font-bold uppercase tracking-wider">Done</span>
                  </td>
                  <td className="px-6 py-5 text-sm font-headline font-bold text-right group-hover:text-primary transition-colors">1.8jt</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Stock Alerts Widget */}
        <div className="glass-card rounded-3xl p-6 flex flex-col h-full shadow-xl border border-error/10 relative overflow-hidden bg-gradient-to-br from-surface to-surface-container-low">
          <div className="absolute top-0 right-0 w-32 h-32 bg-error/5 rounded-full blur-2xl"></div>
          
          <div className="flex items-center gap-3 mb-8 relative z-10">
            <div className={`p-2 rounded-lg ${restocks.length > 0 ? 'bg-secondary/10' : 'bg-green-500/10'}`}>
              <span className={`material-symbols-outlined text-xl ${restocks.length > 0 ? 'text-secondary animate-pulse' : 'text-green-500'}`}>inventory_2</span>
            </div>
            <div>
              <h3 className="font-headline font-bold">Stock Alerts</h3>
              <p className={`text-[10px] uppercase tracking-widest font-bold ${restocks.length > 0 ? 'text-error' : 'text-green-500'}`}>
                {restocks.length > 0 ? 'Urgent Restock' : 'All Clear'}
              </p>
            </div>
          </div>
          
          <div className="space-y-4 flex-1 relative z-10 overflow-auto pr-2 custom-scrollbar">
            {restocks.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center pt-8 pb-4 text-center">
                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-4xl text-green-500">verified</span>
                </div>
                <p className="text-sm font-bold text-on-surface">Stok Aman</p>
                <p className="text-[10px] text-on-surface-variant mt-1">Gudang anda optimal. Tidak ada peringatan re-stock.</p>
              </div>
            ) : (
              restocks.map(item => (
                <div key={item.id} className="flex items-center justify-between p-4 bg-surface-container-low/50 rounded-2xl border border-outline-variant/10 group hover:border-secondary/30 transition-all cursor-pointer hover:shadow-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-black/40 p-1 flex-shrink-0 group-hover:bg-black/60 transition-colors">
                      <img alt={item.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform" src={item.image} />
                    </div>
                    <div>
                      <p className="text-sm font-bold group-hover:text-primary transition-colors">{item.name}</p>
                      <p className="text-[10px] text-outline uppercase font-bold">{item.type}</p>
                    </div>
                  </div>
                  <div className="text-center rounded-lg bg-surface-container px-3 py-1 border border-outline-variant/10">
                    <span className="block text-lg font-headline font-bold text-secondary animate-pulse">{item.left}</span>
                    <span className="text-[8px] uppercase font-black text-secondary/70">Left</span>
                  </div>
                </div>
              ))
            )}
          </div>
          
          <button 
            disabled={restocks.length === 0 || isRefreshing}
            onClick={handleRestockAll}
            className="relative z-10 w-full mt-8 py-4 bg-surface-container-highest border border-secondary/20 text-secondary font-bold rounded-2xl text-sm uppercase tracking-widest hover:bg-secondary hover:text-on-secondary disabled:opacity-30 disabled:hover:bg-surface-container-highest disabled:hover:text-secondary disabled:cursor-not-allowed transition-all shadow-xl hover:shadow-secondary/20 flex items-center justify-center gap-2"
          >
            {isRefreshing ? (
              <><span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span> Processing</>
            ) : (
              'Restock All'
            )}
          </button>
        </div>
      </div>
    </>
  );
}
