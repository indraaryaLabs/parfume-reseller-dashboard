export default function SettingsAddress() {
  return (
    <div className="p-12">
      <header className="flex justify-between items-end mb-16">
        <div className="space-y-2">
          <h1 className="text-5xl font-headline font-bold tracking-tighter text-on-surface">Alamat Tersimpan</h1>
          <p className="text-on-surface-variant max-w-md font-body leading-relaxed">
            Kelola destinasi pengiriman eksklusif Anda untuk pengalaman kurasi yang dipersonalisasi.
          </p>
        </div>
        <button className="bg-gradient-to-r from-primary to-secondary text-on-primary font-headline font-bold py-4 px-8 rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2">
          <span className="material-symbols-outlined text-xl">add</span>
          Tambah Alamat Baru
        </button>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div className="group relative bg-surface-container border border-outline-variant/20 rounded-3xl p-8 hover:bg-surface-container-high transition-all duration-500 overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 p-6">
            <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-[10px] font-headline font-black uppercase tracking-[0.2em] border border-primary/20">Utama</span>
          </div>
          <div className="flex flex-col h-full">
            <div className="mb-8">
              <span className="material-symbols-outlined text-4xl text-primary mb-4 block" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
              <h3 className="text-2xl font-headline font-bold text-on-surface mb-2">Kediaman Pribadi</h3>
              <p className="text-primary/60 font-headline font-bold text-sm tracking-widest uppercase mb-6">Rumah</p>
              
              <div className="space-y-1 text-on-surface-variant font-body text-lg leading-relaxed">
                <p className="font-bold text-on-surface">Amanda Dewantara</p>
                <p>(+62) 812-3456-7890</p>
                <p className="mt-4 opacity-80">Jl. Senopati Raya No. 12, Kebayoran Baru</p>
                <p className="opacity-80">Jakarta Selatan, DKI Jakarta 12190</p>
              </div>
            </div>
            <div className="mt-auto flex items-center gap-4 pt-8 border-t border-outline-variant/10">
              <button className="flex-1 py-3 px-6 rounded-xl border border-outline-variant/30 hover:bg-surface-container-highest transition-colors text-sm font-headline font-bold uppercase tracking-widest flex justify-center items-center gap-2">
                <span className="material-symbols-outlined text-lg">edit</span>
                Ubah
              </button>
              <button className="py-3 px-6 rounded-xl border border-error/30 text-error hover:bg-error/10 transition-colors text-sm font-headline font-bold uppercase tracking-widest">
                <span className="material-symbols-outlined text-lg">delete</span>
              </button>
            </div>
          </div>
        </div>

        <div className="group relative bg-surface-container border border-outline-variant/20 rounded-3xl p-8 hover:bg-surface-container-high transition-all duration-500 overflow-hidden">
          <div className="flex flex-col h-full">
            <div className="mb-8">
              <span className="material-symbols-outlined text-4xl text-zinc-600 group-hover:text-primary transition-colors mb-4 block">business</span>
              <h3 className="text-2xl font-headline font-bold text-on-surface mb-2">The Digital Atelier</h3>
              <p className="text-zinc-500 font-headline font-bold text-sm tracking-widest uppercase mb-6">Kantor</p>
              
              <div className="space-y-1 text-on-surface-variant font-body text-lg leading-relaxed">
                <p className="font-bold text-on-surface">Amanda Dewantara</p>
                <p>(+62) 21-555-0192</p>
                <p className="mt-4 opacity-80">Sudirman Central Business District (SCBD)</p>
                <p className="opacity-80">Equity Tower Lt. 42, Jakarta Selatan 12110</p>
              </div>
            </div>
            <div className="mt-auto flex flex-wrap items-center gap-4 pt-8 border-t border-outline-variant/10">
              <button className="flex-1 py-3 px-6 rounded-xl border border-outline-variant/30 hover:bg-surface-container-highest transition-colors text-sm font-headline font-bold uppercase tracking-widest flex justify-center items-center gap-2">
                <span className="material-symbols-outlined text-lg">edit</span>
                Ubah
              </button>
              <button className="py-3 px-6 rounded-xl border border-primary/30 text-primary hover:bg-primary/10 transition-colors text-[10px] font-headline font-black uppercase tracking-[0.2em]">
                Jadikan Utama
              </button>
              <button className="py-3 px-6 rounded-xl border border-error/30 text-error hover:bg-error/10 transition-colors text-sm font-headline font-bold uppercase tracking-widest">
                <span className="material-symbols-outlined text-lg">delete</span>
              </button>
            </div>
          </div>
        </div>

        <div className="xl:col-span-2 group border-2 border-dashed border-outline-variant/20 rounded-3xl p-16 flex flex-col items-center justify-center text-center hover:border-primary/40 transition-all duration-500 cursor-pointer bg-transparent">
          <div className="w-20 h-20 rounded-full bg-surface-container-highest flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
            <span className="material-symbols-outlined text-4xl text-zinc-500 group-hover:text-primary">add_location_alt</span>
          </div>
          <h4 className="text-xl font-headline font-bold text-on-surface-variant mb-2">Tambahkan Destinasi Baru</h4>
          <p className="text-zinc-600 max-w-xs text-sm">Ingin mengirim hadiah atau memiliki lokasi baru? Tambahkan alamat Anda dengan satu langkah mudah.</p>
        </div>
      </div>
    </div>
  );
}
