export default function SettingsNotifications() {
  return (
    <div className="pt-12 px-6 md:px-16 pb-24 max-w-7xl mx-auto">
      <header className="mb-16">
        <h1 className="text-5xl md:text-6xl font-headline font-black tracking-tighter text-on-surface mb-4">Pengaturan <span className="text-primary italic">Notifikasi</span></h1>
        <p className="text-on-surface-variant max-w-2xl text-lg font-light leading-relaxed">
          Kelola bagaimana Anda menerima pembaruan tentang koleksi eksklusif, status pesanan, dan penawaran terbatas dari L'Essence Noire.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <section className="lg:col-span-7 bg-surface-container rounded-xl p-8 border border-outline-variant/10 shadow-xl backdrop-blur-sm">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-2xl font-headline font-bold flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">cell_tower</span>
              Preferensi Notifikasi
            </h3>
          </div>
          
          <div className="space-y-8">
            <div className="flex items-center justify-between p-4 rounded-lg bg-surface-container-low/50 hover:bg-surface-container-high transition-colors group">
              <div className="flex flex-col gap-1">
                <span className="text-on-surface font-semibold tracking-wide">Push Notification</span>
                <span className="text-on-surface-variant text-sm">Aktifkan untuk menerima notifikasi langsung di perangkat Anda.</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-12 h-6 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-zinc-400 after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary/40 peer-checked:after:bg-primary"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-surface-container-low/50 hover:bg-surface-container-high transition-colors group">
              <div className="flex flex-col gap-1">
                <span className="text-on-surface font-semibold tracking-wide">Update Status Pesanan</span>
                <span className="text-on-surface-variant text-sm">Informasi real-time perjalanan parfum kurasi Anda.</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-12 h-6 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-zinc-400 after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary/40 peer-checked:after:bg-primary"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-surface-container-low/50 hover:bg-surface-container-high transition-colors group">
              <div className="flex flex-col gap-1">
                <span className="text-on-surface font-semibold tracking-wide">Restock Alert</span>
                <span className="text-on-surface-variant text-sm">Jadilah yang pertama tahu saat stok terbatas kembali tersedia.</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-12 h-6 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-zinc-400 after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary/40 peer-checked:after:bg-primary"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-surface-container-low/50 hover:bg-surface-container-high transition-colors group">
              <div className="flex flex-col gap-1">
                <span className="text-on-surface font-semibold tracking-wide">Promo & Diskon</span>
                <span className="text-on-surface-variant text-sm">Akses eksklusif untuk penawaran musiman dan kode voucher.</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-12 h-6 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-zinc-400 after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary/40 peer-checked:after:bg-primary"></div>
              </label>
            </div>
          </div>
        </section>

        <section className="lg:col-span-5 flex flex-col gap-8">
          <div className="bg-gradient-to-br from-surface-container to-surface-container-low border border-outline-variant/10 rounded-xl p-8 shadow-2xl">
            <h3 className="text-2xl font-headline font-bold flex items-center gap-3 mb-8">
              <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>bedtime</span>
              Jam Tenang
            </h3>
            <p className="text-on-surface-variant text-sm mb-8 leading-relaxed">
              Nonaktifkan semua notifikasi selama waktu istirahat Anda agar pengalaman digital tetap seimbang.
            </p>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Mulai</label>
                  <input type="time" defaultValue="22:00" className="w-full bg-surface-container-highest border-none rounded-lg text-primary focus:ring-1 focus:ring-primary py-3 px-4 font-headline text-lg" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Berakhir</label>
                  <input type="time" defaultValue="07:00" className="w-full bg-surface-container-highest border-none rounded-lg text-primary focus:ring-1 focus:ring-primary py-3 px-4 font-headline text-lg" />
                </div>
              </div>
              <div className="pt-4">
                <button className="w-full py-4 bg-gradient-to-r from-primary to-secondary text-on-primary font-bold rounded-xl tracking-widest uppercase text-xs shadow-lg shadow-primary/10 hover:scale-[1.02] active:scale-95 transition-transform duration-300">
                  Simpan Jadwal
                </button>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-high rounded-xl p-8 border border-outline-variant/20 flex flex-col justify-between group overflow-hidden relative">
            <div className="relative z-10">
              <h3 className="text-xl font-headline font-bold flex items-center gap-3 mb-2">
                <span className="material-symbols-outlined text-primary">mail</span>
                Newsletter
              </h3>
              <p className="text-on-surface-variant text-sm">Dapatkan kurasi mingguan tentang seni parfum ke email Anda.</p>
            </div>
            <div className="mt-8 relative z-10">
              <label className="relative inline-flex items-center cursor-pointer gap-4">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-12 h-6 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-zinc-400 after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary/40 peer-checked:after:bg-primary"></div>
                <span className="text-on-surface font-medium">Berlangganan</span>
              </label>
            </div>
          </div>
        </section>
      </div>

      <section className="mt-16 pt-12 border-t border-outline-variant/10">
        <h4 className="text-sm font-headline font-bold uppercase tracking-widest text-secondary mb-6">Zona Sensitif</h4>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 rounded-xl border border-secondary/20 bg-secondary/5">
          <div>
            <h5 className="font-bold text-on-surface">Matikan Semua Notifikasi</h5>
            <p className="text-on-surface-variant text-sm">Ini akan menonaktifkan semua notifikasi push, email, dan SMS secara permanen.</p>
          </div>
          <button className="px-8 py-3 rounded-full border border-secondary text-secondary font-bold text-xs uppercase tracking-widest hover:bg-secondary hover:text-on-secondary transition-colors duration-500">
            Nonaktifkan Semua
          </button>
        </div>
      </section>
    </div>
  );
}
