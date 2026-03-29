export default function SettingsAppearance() {
  return (
    <div className="p-8 md:p-12 lg:p-16 max-w-6xl mx-auto">
      <header className="mb-16">
        <h1 className="text-5xl font-headline font-extrabold tracking-tighter mb-4 text-on-surface">Tampilan & Bahasa</h1>
        <p className="text-on-surface-variant font-light text-lg">Personalisasi pengalaman butik digital Anda untuk kenyamanan maksimal.</p>
      </header>
      
      <div className="space-y-16">
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-headline font-bold text-primary tracking-tight">Mode Tema</h2>
            <span className="text-xs uppercase tracking-[0.2em] text-on-surface-variant">Visual Interface</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Light Mode */}
            <div className="group relative glass-card p-6 rounded-xl border border-outline-variant/20 hover:border-primary/40 transition-all cursor-pointer">
              <div className="aspect-video bg-white rounded-lg mb-6 overflow-hidden flex items-center justify-center border border-zinc-200">
                <div className="w-3/4 h-1/2 bg-zinc-100 rounded shadow-sm p-2 flex flex-col gap-2">
                  <div className="h-2 w-1/2 bg-zinc-300 rounded"></div>
                  <div className="h-2 w-full bg-zinc-200 rounded"></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold tracking-tight">Light Mode</span>
                <div className="w-5 h-5 rounded-full border-2 border-outline-variant group-hover:border-primary flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-primary opacity-0 group-active:opacity-100"></div>
                </div>
              </div>
            </div>

            {/* Dark Mode */}
            <div className="group relative bg-surface-container-high p-6 rounded-xl border-2 border-primary shadow-2xl shadow-primary/10 transition-all cursor-pointer">
              <div className="aspect-video bg-zinc-950 rounded-lg mb-6 overflow-hidden flex items-center justify-center border border-zinc-800">
                <div className="w-3/4 h-1/2 bg-zinc-900 rounded shadow-sm p-2 flex flex-col gap-2">
                  <div className="h-2 w-1/2 bg-zinc-700 rounded"></div>
                  <div className="h-2 w-full bg-zinc-800 rounded"></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold tracking-tight text-primary">Dark Mode</span>
                <div className="w-5 h-5 rounded-full border-2 border-primary flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>
                </div>
              </div>
              <div className="absolute -top-3 left-6 bg-primary text-on-primary text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">Selected</div>
            </div>

            {/* System Mode */}
            <div className="group relative glass-card p-6 rounded-xl border border-outline-variant/20 hover:border-primary/40 transition-all cursor-pointer">
              <div className="aspect-video rounded-lg mb-6 overflow-hidden flex border border-outline-variant/20">
                <div className="w-1/2 h-full bg-white"></div>
                <div className="w-1/2 h-full bg-zinc-950"></div>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold tracking-tight">Sistem</span>
                <div className="w-5 h-5 rounded-full border-2 border-outline-variant group-hover:border-primary flex items-center justify-center"></div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">language</span>
                <h2 className="text-xl font-headline font-bold text-on-surface">Bahasa</h2>
              </div>
              <div className="relative group">
                <select defaultValue="id" className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-6 py-4 appearance-none focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all text-on-surface">
                  <option value="id">Bahasa Indonesia</option>
                  <option value="en">English (US)</option>
                </select>
                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant">expand_more</span>
              </div>
              <p className="text-xs text-on-surface-variant italic">Konten dan navigasi akan diperbarui sesuai pilihan bahasa Anda.</p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">payments</span>
                <h2 className="text-xl font-headline font-bold text-on-surface">Mata Uang</h2>
              </div>
              <div className="relative">
                <select defaultValue="idr" className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-6 py-4 appearance-none focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all text-on-surface">
                  <option value="idr">IDR - Rupiah Indonesia</option>
                  <option value="usd">USD - US Dollar</option>
                </select>
                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant">expand_more</span>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">calendar_today</span>
                <h2 className="text-xl font-headline font-bold text-on-surface">Format Tanggal</h2>
              </div>
              <div className="relative">
                <select defaultValue="1" className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-6 py-4 appearance-none focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all text-on-surface">
                  <option value="1">DD / MM / YYYY (31/12/2024)</option>
                  <option value="2">MM / DD / YYYY (12/31/2024)</option>
                </select>
                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant">expand_more</span>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">schedule</span>
                <h2 className="text-xl font-headline font-bold text-on-surface">Zona Waktu</h2>
              </div>
              <div className="relative">
                <select defaultValue="wib" className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-6 py-4 appearance-none focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all text-on-surface">
                  <option value="wib">(GMT+07:00) Jakarta, Bangkok</option>
                  <option value="wita">(GMT+08:00) Bali, Singapore</option>
                </select>
                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant">expand_more</span>
              </div>
            </div>
        </section>

        <footer className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-outline-variant/20">
          <div className="text-on-surface-variant text-sm flex items-center gap-2">
            <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>info</span>
            Terakhir diperbarui pada 24 Oktober 2024
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <button className="flex-1 md:flex-none px-12 py-4 rounded-xl font-bold tracking-widest text-primary border border-primary hover:bg-primary/5 transition-all active:scale-95 uppercase text-xs">
              Batalkan
            </button>
            <button className="flex-1 md:flex-none px-12 py-4 rounded-xl font-bold tracking-widest text-on-primary bg-gradient-to-r from-primary to-secondary shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all active:scale-95 uppercase text-xs">
              Simpan Perubahan
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
