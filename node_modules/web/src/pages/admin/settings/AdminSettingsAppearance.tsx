export default function AdminSettingsAppearance() {
  return (
    <div className="w-full mx-auto">
      <header className="mb-12">
        <h2 className="text-4xl font-extrabold font-headline tracking-tight mb-2 text-on-surface">Tampilan & Bahasa</h2>
        <p className="text-on-surface-variant max-w-2xl font-body">Sesuaikan estetika dashboard eksklusif Anda untuk kenyamanan kurasi produk premium yang lebih baik.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Theme & Appearance */}
        <div className="lg:col-span-8 space-y-12">
          {/* Section: Mode Tema */}
          <section>
            <div className="flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-primary" style={{fontVariationSettings: "'FILL' 1"}}>palette</span>
              <h3 className="text-xl font-bold font-headline">Mode Tema</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Dark Mode (Active) */}
              <div className="relative group cursor-pointer">
                <div className="h-32 rounded-xl bg-surface-container border-2 border-primary overflow-hidden transition-all shadow-xl shadow-primary/5">
                  <div className="p-3 space-y-2">
                    <div className="h-2 w-2/3 bg-surface-container-highest rounded-full"></div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="h-10 bg-surface-container-low rounded-lg"></div>
                      <div className="h-10 bg-surface-container-low rounded-lg"></div>
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex justify-between items-center px-1">
                  <span className="text-sm font-semibold">Gelap</span>
                  <span className="material-symbols-outlined text-primary text-sm" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
                </div>
              </div>
              
              {/* Light Mode */}
              <div className="relative group cursor-pointer hover:scale-[1.02] transition-transform">
                <div className="h-32 rounded-xl bg-[#F5F5F5] border border-outline-variant/10 overflow-hidden">
                  <div className="p-3 space-y-2">
                    <div className="h-2 w-2/3 bg-gray-300 rounded-full"></div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="h-10 bg-white rounded-lg shadow-sm"></div>
                      <div className="h-10 bg-white rounded-lg shadow-sm"></div>
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex justify-between items-center px-1">
                  <span className="text-sm font-medium text-on-surface-variant">Terang</span>
                </div>
              </div>

              {/* System Mode */}
              <div className="relative group cursor-pointer hover:scale-[1.02] transition-transform">
                <div className="h-32 rounded-xl bg-gradient-to-br from-[#F5F5F5] to-surface-container border border-outline-variant/10 overflow-hidden">
                  <div className="flex h-full">
                    <div className="w-1/2 p-3 bg-[#F5F5F5]">
                      <div className="h-2 w-full bg-gray-300 rounded-full mb-2"></div>
                      <div className="h-10 bg-white rounded-lg"></div>
                    </div>
                    <div className="w-1/2 p-3 bg-surface-container">
                      <div className="h-2 w-full bg-surface-container-highest rounded-full mb-2"></div>
                      <div className="h-10 bg-surface-container-low rounded-lg"></div>
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex justify-between items-center px-1">
                  <span className="text-sm font-medium text-on-surface-variant">Sesuai Sistem</span>
                </div>
              </div>
            </div>
          </section>

          {/* Section: Warna Aksen */}
          <section>
            <div className="flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-primary">colorize</span>
              <h3 className="text-xl font-bold font-headline">Warna Aksen</h3>
            </div>
            <div className="flex flex-wrap gap-4">
              <button className="w-12 h-12 rounded-full bg-primary border-4 border-surface-container-lowest ring-2 ring-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-on-primary text-lg">check</span>
              </button>
              <button className="w-12 h-12 rounded-full bg-[#E67E22] border-4 border-surface-container-lowest hover:scale-110 transition-transform"></button>
              <button className="w-12 h-12 rounded-full bg-[#E74C3C] border-4 border-surface-container-lowest hover:scale-110 transition-transform"></button>
              <button className="w-12 h-12 rounded-full bg-[#8E44AD] border-4 border-surface-container-lowest hover:scale-110 transition-transform"></button>
              <button className="w-12 h-12 rounded-full bg-[#27AE60] border-4 border-surface-container-lowest hover:scale-110 transition-transform"></button>
              <button className="w-12 h-12 rounded-full bg-[#2980B9] border-4 border-surface-container-lowest hover:scale-110 transition-transform"></button>
            </div>
          </section>

          {/* Section: Antarmuka Sidebar */}
          <section className="bg-[rgba(32,31,31,0.6)] backdrop-blur-[12px] p-8 rounded-3xl border border-outline-variant/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-surface-container-highest flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">side_navigation</span>
                </div>
                <div>
                  <h4 className="font-bold text-lg font-headline">Sidebar Compact Mode</h4>
                  <p className="text-sm text-on-surface-variant">Sembunyikan teks label untuk area kerja yang lebih luas.</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-14 h-7 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </section>
        </div>

        {/* Right Column: Language & Regional */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-[rgba(32,31,31,0.6)] backdrop-blur-[12px] p-8 rounded-3xl border border-outline-variant/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <span className="material-symbols-outlined text-8xl">language</span>
            </div>
            <h3 className="text-xl font-bold font-headline mb-8">Regional & Bahasa</h3>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-primary uppercase tracking-widest font-headline">Bahasa Utama</label>
                <div className="relative">
                  <select className="w-full bg-surface-container-low border border-outline-variant/20 rounded-xl py-3 px-4 appearance-none focus:ring-1 focus:ring-primary/50 text-sm font-medium">
                    <option defaultValue="id">Bahasa Indonesia</option>
                    <option defaultValue="en">English (UK)</option>
                    <option defaultValue="fr">Français (Luxury Standard)</option>
                    <option defaultValue="ar">العربية (UAE)</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">expand_more</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-primary uppercase tracking-widest font-headline">Mata Uang</label>
                <div className="relative">
                  <select className="w-full bg-surface-container-low border border-outline-variant/20 rounded-xl py-3 px-4 appearance-none focus:ring-1 focus:ring-primary/50 text-sm font-medium">
                    <option defaultValue="idr">IDR (Rp) - Indonesian Rupiah</option>
                    <option defaultValue="usd">USD ($) - US Dollar</option>
                    <option defaultValue="eur">EUR (€) - Euro</option>
                    <option defaultValue="aed">AED (د.إ) - Dirham</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">payments</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-primary uppercase tracking-widest font-headline">Format Tanggal</label>
                <div className="relative">
                  <select className="w-full bg-surface-container-low border border-outline-variant/20 rounded-xl py-3 px-4 appearance-none focus:ring-1 focus:ring-primary/50 text-sm font-medium">
                    <option defaultValue="ddmmyyyy">DD/MM/YYYY (31/12/2024)</option>
                    <option defaultValue="mmddyyyy">MM/DD/YYYY (12/31/2024)</option>
                    <option defaultValue="yyyymmdd">YYYY-MM-DD (2024-12-31)</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">calendar_today</span>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-outline-variant/10">
              <button className="w-full py-4 bg-gradient-to-r from-primary to-secondary text-on-primary font-bold rounded-2xl shadow-[0_4px_20px_rgba(230,195,100,0.2)] hover:scale-[1.02] active:scale-95 transition-all">
                Simpan Perubahan
              </button>
              <p className="text-[10px] text-center text-on-surface-variant mt-4 italic">Perubahan akan diterapkan ke seluruh sesi aktif Anda.</p>
            </div>
          </div>

          {/* Visual Accent Card */}
          <div className="h-48 rounded-3xl overflow-hidden relative group">
            <img 
              alt="Luxury Perfume" 
              className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3Blx6tweq9rgBfuiHyzhpdzmvDcN5AFiq1Bbbcu9-cfI73DE3cR9kb8EF0emn2Vgaqzqb8dG5y8YugkO2NdQ2mGtTmlA9S3RcPTVRcX4Mk69rxRujvHei1kyVwVgso2V1E8ZDol58dPaAjvfYAC7DDY4LUN-uB0NxKNHmtBazW_T2x5SYBvEjGIBK3gYo5ULOqPGzLzwFzwrCIT3PuRgHe2nGPsDIURe083cmPJwVTBpkyZWIA03tsYxfr5jErlkX82hK626DL6Xx"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest to-transparent flex items-end p-6">
              <div>
                <h4 className="text-white font-bold font-headline">The Scent of Light</h4>
                <p className="text-xs text-on-surface-variant">Editorial Aesthetic Engine v2.0</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
