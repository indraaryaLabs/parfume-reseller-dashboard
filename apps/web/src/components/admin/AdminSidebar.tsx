import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';

const navItems = [
  { path: '/admin', icon: 'dashboard', label: 'Dashboard' },
  { path: '/admin/products', icon: 'fragrance', label: 'Products' },
  { path: '/admin/orders', icon: 'shopping_bag', label: 'Orders' },
  { path: '/admin/finance', icon: 'payments', label: 'Cash Book' },
  { path: '/admin/analytics', icon: 'leaderboard', label: 'Analytics' },
];

export default function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useStore();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <aside className="h-screen w-64 fixed left-0 top-0 border-r border-[#353534]/30 bg-[#201F1F]/80 backdrop-blur-xl flex flex-col py-6 shadow-[20px_0_40px_rgba(201,168,76,0.04)] z-50">
      <div className="px-6 mb-10">
        <h1 className="text-xl font-bold tracking-tighter text-[#C9A84C] font-headline">Reseller Elite</h1>
        <p className="text-[10px] uppercase tracking-[0.2em] text-outline mt-1 font-medium">Digital Curator</p>
      </div>
      <nav className="flex-1 px-2 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={
                isActive
                  ? "flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-[#C9A84C]/20 to-transparent text-[#C9A84C] border-r-2 border-[#C9A84C] font-headline tracking-tight text-sm font-semibold transition-all duration-300"
                  : "flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-gray-300 hover:bg-[#353534]/50 hover:scale-[1.02] transition-all duration-300 font-headline tracking-tight text-sm font-semibold"
              }
            >
              <span className="material-symbols-outlined" style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}>
                {item.icon}
              </span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="px-2 mt-auto pt-6 border-t border-outline-variant/20 flex flex-col gap-2">
        {/* Settings */}
        <Link
          to="/admin/settings"
          className={
            location.pathname.startsWith("/admin/settings")
              ? "flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-[#C9A84C]/20 to-transparent text-[#C9A84C] border-r-2 border-[#C9A84C] font-headline tracking-tight text-sm font-semibold transition-all duration-300"
              : "flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-gray-300 hover:bg-[#353534]/50 hover:scale-[1.02] transition-all duration-300 font-headline tracking-tight text-sm font-semibold"
          }
        >
          <span className="material-symbols-outlined" style={location.pathname.startsWith("/admin/settings") ? { fontVariationSettings: "'FILL' 1" } : {}}>
            settings
          </span>
          <span>Settings</span>
        </Link>

        {/* Switch to Consumer */}
        <Link
          to="/"
          className="flex items-center gap-3 px-4 py-3 text-[#FFB1C0] hover:text-[#FFB1C0] hover:bg-[#FFB1C0]/10 hover:scale-[1.02] transition-all duration-300 font-headline tracking-tight text-sm font-semibold rounded-lg"
        >
          <span className="material-symbols-outlined">storefront</span>
          <span>Lihat Toko</span>
        </Link>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 hover:scale-[1.02] transition-all duration-300 font-headline tracking-tight text-sm font-semibold rounded-lg w-full text-left cursor-pointer"
        >
          <span className="material-symbols-outlined">logout</span>
          <span>Logout</span>
        </button>

        {/* User info */}
        <div className="flex items-center gap-3 px-4 pt-4 mt-2 border-t border-outline-variant/20">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-on-primary text-sm font-bold shrink-0">
            {user?.name?.charAt(0)?.toUpperCase() || 'A'}
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-on-surface truncate">{user?.name || 'Admin'}</p>
            <p className="text-[10px] text-outline uppercase tracking-wider truncate">{user?.email || 'admin@parfume.id'}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
