import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const INITIAL_NOTIFS = [
  { id: 1, title: 'Pesanan Baru: ORD-X001', time: '5 menit lalu', read: false },
  { id: 2, title: 'Stok Sisa 5: Scent of Light', time: '1 jam lalu', read: false },
  { id: 3, title: 'Pembayaran Diterima #INV09', time: '2 jam lalu', read: true }
];

export default function AdminHeader() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFS);
  
  const notifRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Handle click outside to close dropdowns
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchBox(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/admin/products`); 
      setShowSearchBox(false);
    }
  };

  const hasUnread = notifications.some(n => !n.read);

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const clearAllNotifications = () => {
    if(window.confirm("Hapus semua notifikasi?")) {
      setNotifications([]);
    }
  };

  const removeNotification = (e: React.MouseEvent, id: number) => {
    e.stopPropagation(); // prevent triggering markAsRead
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <header className="fixed top-0 right-0 w-[calc(100%-16rem)] h-16 z-40 bg-[#0E0E0E]/80 backdrop-blur-md border-b border-[#353534]/20 flex justify-between items-center px-8">
      
      {/* Search Bar */}
      <div className="relative flex-1 max-w-sm" ref={searchRef}>
        <form onSubmit={handleSearchSubmit} className="flex items-center gap-4 bg-surface-container-low/50 px-4 py-1.5 rounded-full border border-outline-variant/20 focus-within:ring-1 focus-within:ring-primary/50 transition-all w-full">
          <span className="material-symbols-outlined text-outline text-sm">search</span>
          <input
            className="bg-transparent border-none rounded-full py-1 pr-4 text-sm focus:ring-0 transition-all placeholder:text-outline/50 w-full"
            placeholder="Cari pesanan, produk..."
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSearchBox(e.target.value.length > 0);
            }}
            onFocus={() => setShowSearchBox(searchQuery.length > 0)}
          />
        </form>
        
        {/* Search Results Dropdown */}
        {showSearchBox && (
          <div className="absolute top-14 left-0 w-full bg-surface-container-high border border-outline-variant/20 rounded-xl shadow-2xl overflow-hidden py-2 animate-in fade-in slide-in-from-top-2">
            <div className="px-4 py-2 text-xs font-bold text-on-surface-variant uppercase tracking-widest border-b border-outline-variant/10">Saran Pencarian</div>
            <button onClick={() => navigate('/admin/products')} className="w-full text-left px-4 py-3 hover:bg-surface-container text-sm flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-base">fragrance</span>
              Katalog Produk
            </button>
            <button onClick={() => navigate('/admin/orders')} className="w-full text-left px-4 py-3 hover:bg-surface-container text-sm flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-base">shopping_bag</span>
              Riwayat Pesanan
            </button>
            <button className="w-full text-center px-4 py-3 hover:bg-surface-container text-xs text-primary font-bold mt-2 border-t border-outline-variant/10">
              Lihat semua hasil untuk "{searchQuery}"
            </button>
          </div>
        )}
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-6">
        <div className="flex gap-2 items-center">
          
          {/* Notifications Toggle */}
          <div className="relative" ref={notifRef}>
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className={`hover:bg-[#353534]/50 rounded-full p-2.5 transition-all relative ${showNotifications ? 'bg-[#353534]/50' : ''}`}
            >
              <span className="material-symbols-outlined text-on-surface-variant text-[20px]">notifications</span>
              {hasUnread && (
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-secondary rounded-full border border-surface-container shadow-[0_0_10px_rgba(255,177,192,0.8)] animate-pulse"></span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute top-14 right-0 w-80 bg-surface-container-highest border border-outline-variant/20 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-4 origin-top-right">
                <div className="px-5 py-4 flex justify-between items-center border-b border-outline-variant/10 bg-surface-container-low/50">
                  <h3 className="font-headline font-bold text-on-surface">Notifikasi</h3>
                  {hasUnread && (
                    <button onClick={markAllAsRead} className="text-[10px] text-primary hover:underline uppercase tracking-wide font-bold">Tandai Dibaca</button>
                  )}
                </div>
                
                <div className="max-h-[300px] overflow-y-auto custom-scrollbar bg-surface-container/50">
                  {notifications.length === 0 ? (
                    <div className="p-8 text-center flex flex-col items-center justify-center">
                      <span className="material-symbols-outlined text-4xl text-outline-variant mb-2">notifications_off</span>
                      <p className="text-sm text-on-surface-variant font-medium">Tidak ada notifikasi</p>
                    </div>
                  ) : (
                    notifications.map(notif => (
                      <div 
                        key={notif.id} 
                        onClick={() => markAsRead(notif.id)}
                        className={`p-4 border-b border-outline-variant/5 hover:bg-surface-container-high transition-colors cursor-pointer flex gap-4 items-start group relative ${!notif.read ? 'bg-primary/5' : ''}`}
                      >
                        <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${!notif.read ? 'bg-secondary shadow-[0_0_5px_rgba(255,177,192,0.5)]' : 'bg-outline-variant'}`}></div>
                        <div className="flex-1 pr-6">
                          <p className={`text-sm ${!notif.read ? 'font-bold text-on-surface' : 'text-on-surface-variant'}`}>{notif.title}</p>
                          <p className="text-[10px] text-outline mt-1">{notif.time}</p>
                        </div>
                        {/* Delete Button (visible on hover) */}
                        <button 
                          onClick={(e) => removeNotification(e, notif.id)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 p-1.5 rounded-full hover:bg-error/10 text-outline hover:text-error transition-all"
                          title="Hapus"
                        >
                          <span className="material-symbols-outlined text-[16px]">close</span>
                        </button>
                      </div>
                    ))
                  )}
                </div>
                
                {notifications.length > 0 && (
                   <div className="flex items-center justify-between p-3 bg-surface-container-low border-t border-outline-variant/10">
                     <button onClick={clearAllNotifications} className="text-[10px] text-error hover:underline font-bold uppercase tracking-widest px-2">Bersihkan</button>
                     <Link to="/admin/settings/notifications" className="text-[10px] text-primary hover:underline font-bold uppercase tracking-widest px-2">Pengaturan</Link>
                   </div>
                )}
              </div>
            )}
          </div>

          {/* Settings Link */}
          <Link to="/admin/settings" className="hover:bg-[#353534]/50 rounded-full p-2.5 transition-all group">
            <span className="material-symbols-outlined text-on-surface-variant text-[20px] group-hover:rotate-90 transition-transform duration-500">settings</span>
          </Link>
        </div>
        
        <div className="h-8 w-[1px] bg-outline-variant/30"></div>
        <div className="flex items-center gap-3">
          <div className="text-right hidden md:block">
            <p className="text-sm font-headline font-bold text-primary">Luxury Perfume</p>
            <p className="text-[10px] text-outline uppercase tracking-widest">Admin Panel</p>
          </div>
        </div>
      </div>
    </header>
  );
}
