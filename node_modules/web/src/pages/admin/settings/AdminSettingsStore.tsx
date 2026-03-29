export default function AdminSettingsStore() {
  return (
    <div className="max-w-5xl mx-auto">
      {/* Page Header */}
      <div className="mb-12">
        <h2 className="text-4xl font-extrabold font-headline tracking-tight mb-2 text-white">Informasi Toko</h2>
        <p className="text-on-surface-variant max-w-2xl leading-relaxed">
          Kelola identitas visual dan detail operasional butik digital Anda untuk memberikan impresi eksklusif kepada pelanggan.
        </p>
      </div>

      {/* Bento Grid Settings Layout */}
      <div className="grid grid-cols-12 gap-8">
        {/* Visual Identity Section (Left Col) */}
        <div className="col-span-12 lg:col-span-5 space-y-8">
          {/* Shop Logo Upload */}
          <div className="bg-surface-container rounded-3xl p-8 border border-outline-variant/10 shadow-xl overflow-hidden group">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="font-headline font-bold text-lg">Logo Toko</h3>
                <p className="text-xs text-on-surface-variant">Rekomendasi: Persegi (1:1)</p>
              </div>
              <span className="material-symbols-outlined text-primary/40 group-hover:text-primary transition-colors">branding_watermark</span>
            </div>
            <div className="relative group cursor-pointer">
              <div className="aspect-square rounded-2xl bg-surface-container-low border-2 border-dashed border-outline-variant/30 flex flex-col items-center justify-center gap-3 group-hover:border-primary/50 transition-all duration-500">
                <img 
                  alt="Current Logo" 
                  className="absolute inset-0 w-full h-full object-cover rounded-2xl opacity-40 group-hover:opacity-20 transition-opacity" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKRZSmLnujjdxv5o9MDPrbVdF3t3Fi0HL-WsB6x5svT2cdFa0X402i-8YO0X6juS9qFR5iljjTU4xWQ6v3NzMrMpUp3Vy8xwW0SeBvrAHiQ67zo0K-EHAO01qt-pI-YwhURBmW9n8mbUzw2Z99m3LLxv6guRrGKozxbiQgJx04yC_WyRSJt7N2eDMkGvDx1UVJZPcaDr4WQFSW-u-aN9Z5YNO8YQuSAEFDjYx6SyN6jZXnYoS_aS5sil3AVrrAZDe4TjmsBiR2xhvH"
                />
                <span className="material-symbols-outlined text-4xl text-primary">cloud_upload</span>
                <span className="text-xs font-semibold tracking-widest uppercase">Ganti Logo</span>
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="bg-surface-container rounded-3xl p-8 border border-outline-variant/10 shadow-xl">
            <h3 className="font-headline font-bold text-lg mb-6">Kontak & Media Sosial</h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">WhatsApp Business</label>
                <div className="flex items-center gap-3 bg-surface-container-low p-4 rounded-xl border border-outline-variant/20 focus-within:border-primary/50 transition-all">
                  <span className="material-symbols-outlined text-primary text-xl">chat</span>
                  <input className="bg-transparent border-none p-0 text-sm focus:ring-0 w-full font-medium" type="text" defaultValue="+62 812-3456-7890"/>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Instagram Handle</label>
                <div className="flex items-center gap-3 bg-surface-container-low p-4 rounded-xl border border-outline-variant/20 focus-within:border-primary/50 transition-all">
                  <span className="material-symbols-outlined text-primary text-xl">camera</span>
                  <input className="bg-transparent border-none p-0 text-sm focus:ring-0 w-full font-medium" type="text" defaultValue="@parfume_official"/>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Email Bisnis</label>
                <div className="flex items-center gap-3 bg-surface-container-low p-4 rounded-xl border border-outline-variant/20 focus-within:border-primary/50 transition-all">
                  <span className="material-symbols-outlined text-primary text-xl">mail</span>
                  <input className="bg-transparent border-none p-0 text-sm focus:ring-0 w-full font-medium" type="email" defaultValue="concierge@parfume.com"/>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Details Section (Right Col) */}
        <div className="col-span-12 lg:col-span-7 space-y-8">
          {/* Shop Banner */}
          <div className="bg-surface-container rounded-3xl p-8 border border-outline-variant/10 shadow-xl">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="font-headline font-bold text-lg">Banner Toko</h3>
                <p className="text-xs text-on-surface-variant">Rekomendasi: Landscape (16:9)</p>
              </div>
              <span className="material-symbols-outlined text-primary/40">image</span>
            </div>
            <div className="relative group cursor-pointer overflow-hidden rounded-2xl aspect-[21/9] bg-surface-container-low border border-outline-variant/30 transition-all">
              <img 
                alt="Banner Preview" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBgNWRMYHoh73rzB1gpl9BDVUpLLFxSICgtmkT12BfS3M2zm5QQxZVCx8xD3KEoqxjm2Bx_lJ-MK6H0eXC04_pnXJobDI2rT5PXO4NPCDsDS4ytq-mQ_b1kjujxuMjkHHA1XYu8ON44oZgKYqTteKneKKQl-ZkK6rgLCWIRloRz53iPNzFcejFnUPhtFDYmS3fmKpnSZ83NVbSzfmNllBlMHmS3rbGASj8m4HdyG8OH1YotJiac0htCxd6TVl-phc_JgnPRHMENYckn"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-surface-container-lowest/40 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-primary px-6 py-2 rounded-full text-on-primary text-xs font-bold tracking-widest flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">upload</span>
                  UPLOAD BANNER BARU
                </div>
              </div>
            </div>
          </div>

          {/* General Information */}
          <div className="bg-surface-container rounded-3xl p-8 border border-outline-variant/10 shadow-xl">
            <div className="space-y-8">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Nama Toko</label>
                <input className="w-full bg-surface-container-low border border-outline-variant/20 rounded-xl p-4 text-lg font-headline font-bold focus:ring-1 focus:ring-primary/50 focus:border-primary transition-all text-white" type="text" defaultValue="Parfumé"/>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Deskripsi Toko</label>
                <textarea className="w-full bg-surface-container-low border border-outline-variant/20 rounded-xl p-4 text-sm leading-relaxed focus:ring-1 focus:ring-primary/50 focus:border-primary transition-all text-on-surface" rows={4} defaultValue="Kurasi wewangian premium terbaik dari seluruh dunia untuk melengkapi gaya hidup modern Anda. Kami menghadirkan kemewahan dalam setiap semprotan, dari aroma floral yang segar hingga oud yang mendalam dan misterius." />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Alamat Fisik</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute right-4 top-4 text-primary">location_on</span>
                  <textarea className="w-full bg-surface-container-low border border-outline-variant/20 rounded-xl p-4 pr-12 text-sm leading-relaxed focus:ring-1 focus:ring-primary/50 focus:border-primary transition-all text-on-surface" rows={3} defaultValue="Luxury Plaza Level 4, Kawasan Bisnis Terpadu Sudirman, Jakarta Selatan, 12190, Indonesia." />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="mt-12 sticky bottom-8 flex justify-end">
        <div className="bg-surface-container/60 backdrop-blur-xl p-3 rounded-full border border-outline-variant/20 shadow-2xl flex items-center gap-6">
          <p className="text-xs text-on-surface-variant ml-4 italic">Perubahan belum disimpan</p>
          <button className="bg-gradient-to-r from-primary to-secondary text-on-primary font-bold px-8 py-3 rounded-full flex items-center gap-2 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_20px_rgba(201,168,76,0.2)]">
            <span className="material-symbols-outlined">save</span>
            Simpan Perubahan
          </button>
        </div>
      </div>
    </div>
  );
}
