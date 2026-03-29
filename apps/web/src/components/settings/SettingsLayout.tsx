import { Outlet, NavLink } from 'react-router-dom';

export default function SettingsLayout() {
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? 'flex items-center gap-4 bg-gradient-to-r from-amber-500/10 to-transparent text-amber-500 dark:text-amber-400 border-l-4 border-amber-500 py-4 px-6 md:px-8 font-epilogue text-sm font-medium uppercase tracking-widest transition-transform translate-x-1 duration-200 ease-out'
      : 'flex items-center gap-4 text-zinc-500 dark:text-zinc-600 py-4 px-6 md:px-8 font-epilogue text-sm font-medium uppercase tracking-widest hover:bg-zinc-800 dark:hover:bg-zinc-900/50 hover:text-zinc-200 transition-colors group';

  return (
    <div className="flex min-h-screen pt-20">
      {/* Sidebar Navigation */}
      <aside className="h-screen w-72 fixed left-0 top-0 pt-24 bg-zinc-900 shadow-[20px_0_40px_rgba(0,0,0,0.5)] z-40 hidden md:block group-hover:block overflow-y-auto custom-scrollbar">
        <div className="px-8 mb-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-secondary p-[1px]">
              <div className="h-full w-full rounded-xl bg-zinc-900 flex items-center justify-center overflow-hidden">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMp8TZkppGNf4sKDlPyAdCQ0I0WQIIVM-L6qwQXAwRzZvQ9W4492DMErlxaq8n_D4XUrUx8Y-b8QmePW8C-3J2fWgc7l7Gr9wSaExvYuF-5PhC0G0kevwqRhq4MaMhbAFxOw_nUpgVfBjEJBOh2pJ5ce_Ko2dkiVXay29LKpItLgIUXz0GeDIhda3ENnGtPA44v_4Afj6Tb9Hr5T60gUJ4UH9j57FS4gOiYWAEc_TPLmfa0v6D-8hUnbepBKPDu8Gxp8v25RLBjg38"
                  alt="Curator Profile"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            <div>
              <p className="text-zinc-100 font-headline font-bold text-sm">Ahmad Fauzi</p>
              <p className="text-zinc-500 text-[10px] uppercase tracking-widest font-light">The Digital Curator</p>
            </div>
          </div>
        </div>

        <nav className="flex flex-col h-full gap-2 divide-y divide-zinc-800/50">
          <NavLink to="/settings/profile" className={navLinkClass} end>
            <span className="material-symbols-outlined text-xl group-hover:scale-110 transition-transform">person</span>
            Profile
          </NavLink>
          <NavLink to="/settings/appearance" className={navLinkClass}>
            <span className="material-symbols-outlined text-xl group-hover:scale-110 transition-transform">palette</span>
            Appearance
          </NavLink>
          <NavLink to="/settings/notifications" className={navLinkClass}>
            <span className="material-symbols-outlined text-xl group-hover:scale-110 transition-transform" style={{ fontVariationSettings: "'FILL' 1" }}>notifications</span>
            Notifications
          </NavLink>
          <NavLink to="/settings/security" className={navLinkClass}>
            <span className="material-symbols-outlined text-xl group-hover:scale-110 transition-transform">shield</span>
            Security
          </NavLink>
          <NavLink to="/settings/address" className={navLinkClass}>
            <span className="material-symbols-outlined text-xl group-hover:scale-110 transition-transform">location_on</span>
            Address
          </NavLink>
        </nav>
      </aside>

      {/* Main Content Canvas */}
      <main className="md:ml-72 flex-1 w-full bg-surface-container-lowest">
        <Outlet />
      </main>
    </div>
  );
}
