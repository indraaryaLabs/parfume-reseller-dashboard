export default function SettingsSecurity() {
  return (
    <div className="p-12 max-w-6xl mx-auto w-full">
      <header className="mb-16">
        <h1 className="text-5xl font-extrabold font-headline tracking-tighter mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Pusat Keamanan</h1>
        <p className="text-on-surface-variant text-lg max-w-2xl font-light">
          Kelola benteng privasi Anda. L'Essence Noire memastikan setiap interaksi terlindungi dengan standar enkripsi kurasi eksklusif.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <section className="lg:col-span-7 space-y-8">
          <div className="bg-surface-container p-10 rounded-xl border border-outline-variant/20 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="material-symbols-outlined text-8xl">lock</span>
            </div>
            <h3 className="text-2xl font-bold font-headline mb-8 flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">key</span>
              Ubah Kata Sandi
            </h3>
            <form className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-on-surface-variant font-bold">Kata Sandi Lama</label>
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  className="w-full bg-surface-container-lowest border-none rounded-xl p-4 focus:ring-2 focus:ring-primary/50 text-on-surface placeholder-zinc-700 transition-all" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-on-surface-variant font-bold">Kata Sandi Baru</label>
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  className="w-full bg-surface-container-lowest border-none rounded-xl p-4 focus:ring-2 focus:ring-primary/50 text-on-surface placeholder-zinc-700 transition-all" 
                />
                <div className="pt-2 flex gap-1">
                  <div className="h-1 w-full rounded-full bg-primary"></div>
                  <div className="h-1 w-full rounded-full bg-primary"></div>
                  <div className="h-1 w-full rounded-full bg-primary/30"></div>
                  <div className="h-1 w-full rounded-full bg-zinc-800"></div>
                </div>
                <p className="text-[10px] text-primary uppercase tracking-widest mt-1">Kekuatan: Menengah</p>
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-on-surface-variant font-bold">Konfirmasi Sandi Baru</label>
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  className="w-full bg-surface-container-lowest border-none rounded-xl p-4 focus:ring-2 focus:ring-primary/50 text-on-surface placeholder-zinc-700 transition-all" 
                />
              </div>
              <button className="w-full py-4 mt-4 bg-gradient-to-r from-primary to-secondary text-on-secondary-fixed font-bold rounded-xl hover:scale-[1.02] transition-transform shadow-lg shadow-primary/20">
                Perbarui Kredensial
              </button>
            </form>
          </div>

          <div className="bg-surface-container p-10 rounded-xl border border-outline-variant/20 shadow-2xl">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold font-headline flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">devices</span>
                Sesi Aktif
              </h3>
              <button className="text-[10px] uppercase tracking-widest text-primary border border-primary/30 px-4 py-2 rounded-full hover:bg-primary/10 transition-colors font-bold">
                Keluar dari Semua Perangkat
              </button>
            </div>
            <div className="space-y-6">
              <div className="flex items-center gap-6 p-4 rounded-xl bg-primary/5 border border-primary/20">
                <div className="w-12 h-12 flex items-center justify-center bg-primary rounded-lg text-on-primary">
                  <span className="material-symbols-outlined">laptop_mac</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-on-surface">MacBook Pro M2</h4>
                    <span className="px-2 py-0.5 bg-primary/20 text-primary text-[10px] rounded-full font-bold uppercase tracking-tighter">Sesi Ini</span>
                  </div>
                  <p className="text-sm text-on-surface-variant">Chrome • Jakarta, Indonesia</p>
                </div>
              </div>
              <div className="flex items-center gap-6 p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/10">
                <div className="w-12 h-12 flex items-center justify-center bg-surface-container-highest rounded-lg text-on-surface-variant">
                  <span className="material-symbols-outlined">smartphone</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-on-surface">iPhone 15 Pro</h4>
                  <p className="text-sm text-on-surface-variant">Mobile App • Bandung, Indonesia</p>
                </div>
                <button className="text-zinc-600 hover:text-error transition-colors">
                  <span className="material-symbols-outlined">logout</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        <aside className="lg:col-span-5 space-y-8">
          <div className="bg-gradient-to-br from-surface-container to-surface-container-high p-8 rounded-xl border border-outline-variant/20 shadow-xl overflow-hidden relative">
            <div className="relative z-10">
              <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-primary mb-6">Status Keamanan</h4>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="h-6 w-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500 shrink-0">
                    <span className="material-symbols-outlined text-sm">check</span>
                  </div>
                  <div>
                    <p className="font-bold text-sm">Otentikasi 2 Faktor Aktif</p>
                    <p className="text-xs text-on-surface-variant mt-1">Akun Anda terlindungi dengan lapisan keamanan ekstra.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="h-6 w-6 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-500 shrink-0">
                    <span className="material-symbols-outlined text-sm">warning</span>
                  </div>
                  <div>
                    <p className="font-bold text-sm">Email Pemulihan</p>
                    <p className="text-xs text-on-surface-variant mt-1">Belum diverifikasi. Harap verifikasi untuk keamanan optimal.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-10 -right-10 opacity-5">
              <span className="material-symbols-outlined text-[12rem]">verified_user</span>
            </div>
          </div>
          
          <div className="bg-surface-container-lowest border border-error/20 p-8 rounded-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-error/5 opacity-50"></div>
            <div className="relative z-10">
              <h3 className="text-lg font-headline font-bold text-error mb-2 uppercase tracking-widest">Zona Bahaya</h3>
              <p className="text-sm text-on-surface-variant mb-8">Tindakan di bawah ini bersifat permanen dan tidak dapat dibatalkan. Berhati-hatilah.</p>
              <div className="space-y-4">
                <button className="w-full flex items-center justify-between p-4 rounded-xl border border-error/30 text-error hover:bg-error/10 transition-colors group">
                  <div className="text-left">
                    <p className="font-bold text-sm">Nonaktifkan Akun Sementara</p>
                    <p className="text-[10px] opacity-70">Sembunyikan profil Anda dari publik.</p>
                  </div>
                  <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward_ios</span>
                </button>
                <button className="w-full flex items-center justify-between p-4 rounded-xl bg-error/10 text-error hover:bg-error/20 transition-colors group">
                  <div className="text-left">
                    <p className="font-bold text-sm">Hapus Akun Selamanya</p>
                    <p className="text-[10px] opacity-70">Seluruh data dan koleksi akan dihapus permanen.</p>
                  </div>
                  <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">delete_forever</span>
                </button>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
