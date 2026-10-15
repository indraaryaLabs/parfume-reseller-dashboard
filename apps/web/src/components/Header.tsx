import { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

export default function Header() {
  const { cartCount, openSearch, isAuthenticated, isAdmin, user, logout } = useStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  // Close menu on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setIsUserMenuOpen(false);
    await logout();
    navigate('/login');
  };

  return (
    <header className="bg-[#0E0E0E]/80 backdrop-blur-xl docked full-width top-0 z-50 border-b border-[#353534]/30 shadow-[0_4px_30px_rgba(230,195,100,0.05)] sticky">
      <div className="flex justify-between items-center w-full px-6 py-4 max-w-screen-2xl mx-auto">
        <Link to="/" className="text-2xl font-bold tracking-tighter bg-gradient-to-r from-[#E6C364] to-[#FFB1C0] bg-clip-text text-transparent font-['Epilogue']">Parfumé</Link>
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className={`font-['Epilogue'] tracking-tight transition-colors duration-300 ${location.pathname === '/' ? 'text-[#E6C364] border-b-2 border-[#E6C364]' : 'text-[#8E8E8E] hover:text-[#E6C364]'}`}>Beranda</Link>
          <Link to="/collections" className={`font-['Epilogue'] tracking-tight transition-colors duration-300 ${location.pathname === '/collections' ? 'text-[#E6C364] border-b-2 border-[#E6C364]' : 'text-[#8E8E8E] hover:text-[#E6C364]'}`}>Koleksi</Link>
          <Link to="/promos" className={`font-['Epilogue'] tracking-tight transition-colors duration-300 ${location.pathname === '/promos' ? 'text-[#E6C364] border-b-2 border-[#E6C364]' : 'text-[#8E8E8E] hover:text-[#E6C364]'}`}>Promo</Link>
        </nav>
        <div className="flex items-center space-x-5 text-[#E6C364]">
          <button onClick={openSearch} className="material-symbols-outlined hover:scale-110 duration-200" title="Cari">search</button>
          <Link to="/cart" className="relative material-symbols-outlined hover:scale-110 duration-200" title="Keranjang">
            shopping_cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-secondary text-on-secondary text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-in zoom-in">
                {cartCount}
              </span>
            )}
          </Link>
          <Link to="/orders" className={`material-symbols-outlined hover:scale-110 duration-200 ${isActive('/orders') ? 'text-white' : ''}`} title="Pesanan">receipt_long</Link>
          
          {/* Settings button - separate from profile */}
          <Link to="/settings" className={`material-symbols-outlined hover:scale-110 duration-200 ${isActive('/settings') ? 'text-white' : ''}`} title="Pengaturan">settings</Link>

          {/* Admin panel link for admin users */}
          {isAdmin && (
            <Link to="/admin" className="material-symbols-outlined hover:scale-110 duration-200 text-[#FFB1C0]" title="Admin Panel">admin_panel_settings</Link>
          )}

          {/* User menu */}
          {isAuthenticated ? (
            <div className="relative" ref={menuRef}>
              <button 
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 hover:scale-105 duration-200 group"
                title="Akun Saya"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-on-primary text-xs font-bold">
                  {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                </div>
              </button>

              {/* Dropdown menu */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-surface-container/95 backdrop-blur-xl rounded-2xl border border-outline-variant/20 shadow-2xl shadow-black/50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                  {/* User info */}
                  <div className="px-5 py-4 border-b border-outline-variant/10">
                    <p className="text-sm font-bold text-on-surface truncate">{user?.name}</p>
                    <p className="text-xs text-on-surface-variant truncate">{user?.email}</p>
                    {isAdmin && (
                      <span className="inline-block mt-1.5 px-2 py-0.5 bg-primary/15 text-primary text-[10px] font-bold rounded-full uppercase tracking-wider">Admin</span>
                    )}
                  </div>

                  {/* Menu items */}
                  <div className="py-2">
                    <Link 
                      to="/settings/profile" 
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-3 px-5 py-2.5 text-sm text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest/50 transition-colors"
                    >
                      <span className="material-symbols-outlined text-lg">person</span>
                      Profil Saya
                    </Link>
                    <Link 
                      to="/settings" 
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-3 px-5 py-2.5 text-sm text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest/50 transition-colors"
                    >
                      <span className="material-symbols-outlined text-lg">settings</span>
                      Pengaturan
                    </Link>
                    <Link 
                      to="/orders" 
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-3 px-5 py-2.5 text-sm text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest/50 transition-colors"
                    >
                      <span className="material-symbols-outlined text-lg">receipt_long</span>
                      Pesanan Saya
                    </Link>
                    {isAdmin && (
                      <Link 
                        to="/admin" 
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-3 px-5 py-2.5 text-sm text-[#FFB1C0] hover:bg-surface-container-highest/50 transition-colors"
                      >
                        <span className="material-symbols-outlined text-lg">admin_panel_settings</span>
                        Admin Dashboard
                      </Link>
                    )}
                  </div>

                  {/* Logout */}
                  <div className="border-t border-outline-variant/10 py-2">
                    <button 
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-5 py-2.5 text-sm text-error hover:bg-error/10 transition-colors w-full text-left"
                    >
                      <span className="material-symbols-outlined text-lg">logout</span>
                      Keluar dari Akun
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="material-symbols-outlined hover:scale-110 duration-200" title="Masuk">person</Link>
          )}
        </div>
      </div>
    </header>
  )
}
