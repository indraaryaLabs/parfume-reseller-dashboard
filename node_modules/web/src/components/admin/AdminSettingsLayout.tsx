import { Outlet, Link, useLocation, Navigate } from 'react-router-dom';

const settingsNav = [
  { path: "/admin/settings/store", label: "Info Toko", icon: "store" },
  { path: "/admin/settings/appearance", label: "Tampilan & Bahasa", icon: "palette" },
  { path: "/admin/settings/payment", label: "Pembayaran", icon: "account_balance" },
  { path: "/admin/settings/shipping", label: "Pengiriman", icon: "local_shipping" },
  { path: "/admin/settings/notifications", label: "Notifikasi", icon: "notifications" }
];

export default function AdminSettingsLayout() {
  const location = useLocation();

  if (location.pathname === "/admin/settings") {
    return <Navigate to="/admin/settings/store" replace />;
  }

  return (
    <div className="max-w-6xl mx-auto w-full">
      <div className="mb-8 flex gap-4 overflow-x-auto pb-4 border-b border-outline-variant/10 scrollbar-hide">
        {settingsNav.map(item => {
           const isActive = location.pathname.startsWith(item.path);
           return (
             <Link 
               key={item.path} 
               to={item.path} 
               className={`flex items-center gap-2 px-6 py-3 rounded-xl font-headline font-bold text-sm transition-all whitespace-nowrap shrink-0 ${isActive ? "bg-primary/10 text-primary shadow-[inset_0_0_0_1px_rgba(201,168,76,0.3)]" : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"}`}
             >
                <span className="material-symbols-outlined text-lg" style={isActive ? {fontVariationSettings: "'FILL' 1"} : {}}>
                  {item.icon}
                </span>
                {item.label}
             </Link>
           )
        })}
      </div>
      <Outlet />
    </div>
  )
}
