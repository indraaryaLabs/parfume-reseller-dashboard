import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { path: '/admin', icon: 'dashboard', label: 'Dashboard' },
  { path: '/admin/products', icon: 'fragrance', label: 'Products' },
  { path: '/admin/orders', icon: 'shopping_bag', label: 'Orders' },
  { path: '/admin/finance', icon: 'payments', label: 'Cash Book' },
  { path: '/admin/analytics', icon: 'leaderboard', label: 'Analytics' },
];

export default function AdminSidebar() {
  const location = useLocation();

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
      <div className="px-6 mt-auto pt-6 border-t border-outline-variant/20 flex flex-col gap-6">
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
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-surface-container-highest overflow-hidden border border-primary/30 shrink-0">
            <img
              alt="Admin Avatar"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3p0DhYKmbfMzdKCGn9tKVv-uH-K67gCr2jxIOAmHAZgiiZMUwfl2LwAEOGodkO30sZHA2qMbdNWsm1HPv7UXbHt9hc7aOxMbNpJELjXO-M7O7-pJpNn-wJMGSVRyRkMY7WR9ym7ObUrqyUl3k_AZ4AjVvz8qCHamr8Eum63FnBiw1SlLOUqIpyOGKAxg2YsqnOlRZvBqOeKxq9ASnB9VY3yy1ESwu6uqag2lN93RImlaf-PpcZxr_bHK4rD29u7pkAO5R_FOlXsoQ"
            />
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-on-surface truncate">Alex Vesper</p>
            <p className="text-[10px] text-outline uppercase tracking-wider truncate">Master Curator</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
