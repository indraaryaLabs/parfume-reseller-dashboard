export default function AdminSettingsShipping() {
  return (
    <div className="w-full mx-auto">
      {/* Breadcrumb / Header Section */}
      <div className="mb-12">
        <h2 className="text-4xl font-extrabold font-headline tracking-tighter text-on-surface">Opsi Pengiriman</h2>
        <p className="text-on-surface-variant mt-2 max-w-2xl font-body leading-relaxed">
          Kelola metode pengiriman, kurir yang tersedia, dan promosi bebas ongkir untuk memberikan pengalaman belanja eksklusif bagi pelanggan Anda.
        </p>
      </div>

      <div className="grid grid-cols-12 gap-8">
        
        {/* Left Column: Main Configuration */}
        <div className="col-span-12 lg:col-span-8 space-y-8">
          
          {/* Pickup Address Section */}
          <section className="bg-surface-container/60 backdrop-blur-xl p-8 rounded-3xl border border-outline-variant/10 shadow-xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
                <span className="material-symbols-outlined text-primary">location_on</span>
              </div>
              <div>
                <h3 className="text-xl font-bold font-headline">Alamat Penjemputan</h3>
                <p className="text-sm text-on-surface-variant">Titik lokasi kurir mengambil paket Anda</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="relative">
                <label className="block text-[10px] font-bold text-primary uppercase tracking-widest mb-2 ml-1">Detail Alamat Lengkap</label>
                <textarea 
                  className="w-full bg-surface-container-low border border-outline-variant/20 rounded-2xl p-4 text-on-surface focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all resize-none h-32" 
                  placeholder="Masukkan alamat lengkap toko atau gudang..."
                  defaultValue="Luxury Plaza Level 4, Kawasan Bisnis Terpadu Sudirman, Jakarta Selatan, 12190, Indonesia."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <label className="block text-[10px] font-bold text-primary uppercase tracking-widest mb-2 ml-1">Kota / Kecamatan</label>
                  <input className="w-full bg-surface-container-low border border-outline-variant/20 rounded-xl px-4 py-3 text-sm text-on-surface focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all" type="text" defaultValue="Jakarta Selatan, Kebayoran Baru" />
                </div>
                <div className="relative">
                  <label className="block text-[10px] font-bold text-primary uppercase tracking-widest mb-2 ml-1">Kode Pos</label>
                  <input className="w-full bg-surface-container-low border border-outline-variant/20 rounded-xl px-4 py-3 text-sm text-on-surface focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all" type="text" defaultValue="12110" />
                </div>
              </div>
            </div>
          </section>

          {/* Couriers Checklist Bento */}
          <section className="space-y-6">
            <div className="flex items-center justify-between px-4">
              <h3 className="text-xl font-bold font-headline">Kurir Tersedia</h3>
              <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full border border-primary/20 font-bold uppercase tracking-wider">3 Aktif</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* JNE Card */}
              <div className="bg-surface-container/60 backdrop-blur-xl p-6 rounded-3xl border border-outline-variant/10 hover:border-primary/30 transition-all group">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center overflow-hidden">
                      <img className="w-8" alt="JNE" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYQVg0hGoGYlq-O4JqYsz-XID8TEDiP1xZzWjilD7yWOS0IAg3yaN9M_-GRh97SLqVH0maRUdLtJw_qkwPK0cfi9DRyVAw9SY7GTkrSNTy0gpa2ty9EJwYpxGeZzDO-yeixCx1AoRksiKmm2pGr7N1JRRSpgl_QFCz_fapDPZZ_2GbUTm1odv3nSpyWz-tW5N9jmzp0Xdps22QhLSMov-mKwxg6M9EuRv7eE36l0NE9IZitlJVM3wfyLJ9tf9b5Ftz64GsJvoQ53mY" />
                    </div>
                    <span className="font-bold text-lg font-headline">JNE Express</span>
                  </div>
                  <input type="checkbox" defaultChecked className="w-6 h-6 rounded-lg bg-surface-container text-primary border-outline-variant/30 focus:ring-primary/50" />
                </div>
                <div className="space-y-3">
                  <label className="flex items-center justify-between p-3 rounded-xl bg-surface-container-high/50 hover:bg-surface-container-high transition-colors cursor-pointer border border-transparent hover:border-outline-variant/20">
                    <span className="text-sm font-medium">JNE Regular (REG)</span>
                    <input type="checkbox" defaultChecked className="w-4 h-4 rounded-full bg-surface-container text-primary border-outline-variant/30 focus:ring-primary/50" />
                  </label>
                  <label className="flex items-center justify-between p-3 rounded-xl bg-surface-container-high/50 hover:bg-surface-container-high transition-colors cursor-pointer border border-transparent hover:border-outline-variant/20">
                    <span className="text-sm font-medium">JNE Yakin Esok Sampai (YES)</span>
                    <input type="checkbox" className="w-4 h-4 rounded-full bg-surface-container text-primary border-outline-variant/30 focus:ring-primary/50" />
                  </label>
                </div>
              </div>

              {/* SiCepat Card */}
              <div className="bg-surface-container/60 backdrop-blur-[12px] p-6 rounded-3xl border border-outline-variant/10 hover:border-primary/30 transition-all group">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center overflow-hidden">
                      <img className="w-8" alt="SiCepat" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCTPJVeZym1dgcgxz-8yvWSyFhy0Rm-E_jZZPgIZPtGceOQGPVmMI5x8pAg17xsH0FJoRf1reE6Gl0Wt2WPbmb6QfPESamjF6MiVvDrdQZYnURzLjqaEF7r_cigLTRTJG1qfa_inop74FXXe_vzV9hFaLy4Taxao-49WDBX9RTagCNE262clx6R6Uw701x1m0Frt6XtTk-FGmEAkHPEZtXUZAiqAhIFbcMVPaZRtb7rfmhpYNdZk9tZHgoSKSqrIcjP6BHRIGxqN288" />
                    </div>
                    <span className="font-bold text-lg font-headline">SiCepat</span>
                  </div>
                  <input type="checkbox" defaultChecked className="w-6 h-6 rounded-lg bg-surface-container text-primary border-outline-variant/30 focus:ring-primary/50" />
                </div>
                <div className="space-y-3">
                  <label className="flex items-center justify-between p-3 rounded-xl bg-surface-container-high/50 hover:bg-surface-container-high transition-colors cursor-pointer border border-transparent hover:border-outline-variant/20">
                    <span className="text-sm font-medium">SiCepat HALU (Ekonomi)</span>
                    <input type="checkbox" defaultChecked className="w-4 h-4 rounded-full bg-surface-container text-primary border-outline-variant/30 focus:ring-primary/50" />
                  </label>
                  <label className="flex items-center justify-between p-3 rounded-xl bg-surface-container-high/50 hover:bg-surface-container-high transition-colors cursor-pointer border border-transparent hover:border-outline-variant/20">
                    <span className="text-sm font-medium">SiCepat BEST (Besok Sampai)</span>
                    <input type="checkbox" defaultChecked className="w-4 h-4 rounded-full bg-surface-container text-primary border-outline-variant/30 focus:ring-primary/50" />
                  </label>
                </div>
              </div>

              {/* GoSend Card */}
              <div className="bg-surface-container/60 backdrop-blur-[12px] p-6 rounded-3xl border border-outline-variant/10 hover:border-primary/30 transition-all group col-span-1 md:col-span-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#00AA13] rounded-xl flex items-center justify-center overflow-hidden">
                      <span className="material-symbols-outlined text-white" style={{fontVariationSettings: "'FILL' 1"}}>motorcycle</span>
                    </div>
                    <div>
                      <span className="font-bold text-lg font-headline">GoSend Instant</span>
                      <p className="text-[10px] text-on-surface-variant uppercase tracking-tighter">Pengiriman dalam hari yang sama</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-on-surface-variant italic">Hanya berlaku area tertentu</span>
                    <input type="checkbox" className="w-6 h-6 rounded-lg bg-surface-container text-primary border-outline-variant/30 focus:ring-primary/50" />
                  </div>
                </div>
              </div>

            </div>
          </section>
        </div>

        {/* Right Column: Features & Status */}
        <div className="col-span-12 lg:col-span-4 space-y-8">
          
          {/* Free Shipping Promotion Toggle Card */}
          <section className="bg-surface-container/60 backdrop-blur-[12px] p-8 rounded-3xl border border-primary/20 shadow-[0_20px_50px_rgba(230,195,100,0.08)] bg-gradient-to-br from-surface-container to-surface-container-high relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-3xl" style={{fontVariationSettings: "'FILL' 1"}}>auto_awesome</span>
                <h3 className="text-xl font-bold font-headline">Bebas Ongkir</h3>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-surface-container-highest rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-2">Min. Belanja (Rp)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary font-bold">Rp</span>
                  <input type="text" defaultValue="500.000" className="w-full bg-surface-container-low/50 border border-outline-variant/20 rounded-xl pl-12 pr-4 py-3 text-sm text-on-surface focus:border-primary/50 focus:ring-0" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-2">Maks. Subsidi (Rp)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary font-bold">Rp</span>
                  <input type="text" defaultValue="50.000" className="w-full bg-surface-container-low/50 border border-outline-variant/20 rounded-xl pl-12 pr-4 py-3 text-sm text-on-surface focus:border-primary/50 focus:ring-0" />
                </div>
              </div>
              
              <div className="pt-4 border-t border-outline-variant/10">
                <p className="text-[10px] text-on-surface-variant leading-relaxed">
                  Promosi ini akan muncul sebagai badge <span className="text-primary font-bold italic">"Exclusive Free Shipping"</span> pada katalog produk.
                </p>
              </div>
            </div>
          </section>

          {/* Default Packing Radio Buttons */}
          <section className="bg-[rgba(32,31,31,0.6)] backdrop-blur-[12px] p-8 rounded-3xl border border-outline-variant/10 shadow-xl">
            <div className="flex items-center gap-3 mb-8">
              <span className="material-symbols-outlined text-secondary" style={{fontVariationSettings: "'FILL' 1"}}>package_2</span>
              <h3 className="text-xl font-bold font-headline">Default Packing</h3>
            </div>
            <div className="space-y-4">
              <label className="flex items-center gap-4 p-4 rounded-2xl bg-surface-container-high/30 border border-outline-variant/10 cursor-pointer hover:border-secondary/40 transition-all group">
                <input type="radio" name="packing" className="w-5 h-5 text-secondary bg-surface-container border-outline-variant/30 focus:ring-secondary/50" />
                <div className="flex-1">
                  <span className="block font-bold text-sm">Bubble Wrap Premium</span>
                  <span className="block text-[10px] text-on-surface-variant">Lapis ganda untuk keamanan ekstra</span>
                </div>
              </label>
              
              <label className="flex items-center gap-4 p-4 rounded-2xl bg-surface-container-high/30 border border-secondary/40 cursor-pointer transition-all group ring-1 ring-secondary/20">
                <input type="radio" name="packing" defaultChecked className="w-5 h-5 text-secondary bg-surface-container border-outline-variant/30 focus:ring-secondary/50" />
                <div className="flex-1">
                  <span className="block font-bold text-sm">Kardus Signature</span>
                  <span className="block text-[10px] text-on-surface-variant">Box eksklusif dengan logo emboss</span>
                </div>
              </label>
              
              <label className="flex items-center gap-4 p-4 rounded-2xl bg-surface-container-high/30 border border-outline-variant/10 cursor-pointer hover:border-secondary/40 transition-all group">
                <input type="radio" name="packing" className="w-5 h-5 text-secondary bg-surface-container border-outline-variant/30 focus:ring-secondary/50" />
                <div className="flex-1">
                  <span className="block font-bold text-sm">Wooden Crate (Peti Kayu)</span>
                  <span className="block text-[10px] text-on-surface-variant">Khusus pengiriman pecah belah massal</span>
                </div>
              </label>
            </div>
          </section>

          {/* Save Action Floating */}
          <div className="flex flex-col gap-3">
            <button className="w-full bg-gradient-to-r from-primary to-secondary text-on-primary py-4 rounded-2xl font-bold font-headline text-sm shadow-[0_8px_30px_rgba(230,195,100,0.3)] hover:scale-[1.02] active:scale-95 transition-all">
                Simpan Perubahan
            </button>
            <button className="w-full py-4 rounded-2xl font-bold font-headline text-sm text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-all">
                Batalkan
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
