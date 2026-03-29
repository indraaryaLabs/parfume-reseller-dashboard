export default function AdminSettingsNotifications() {
  return (
    <div className="w-full mx-auto">
      {/* Header Section */}
      <div className="mb-12">
        <h2 className="text-4xl font-headline font-extrabold tracking-tight text-on-surface mb-2">Notifikasi Admin</h2>
        <p className="text-on-surface-variant font-body max-w-2xl">Personalisasi cara Anda menerima pembaruan sistem dan laporan performa butik digital Anda.</p>
      </div>

      {/* Bento Grid Settings */}
      <div className="grid grid-cols-12 gap-6">
        
        {/* New Order Notification Card */}
        <div className="col-span-12 lg:col-span-7 bg-[rgba(32,31,31,0.6)] backdrop-blur-[12px] border border-outline-variant/10 p-8 rounded-3xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity">
            <span className="material-symbols-outlined text-8xl" style={{fontVariationSettings: "'FILL' 1"}}>shopping_bag</span>
          </div>
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h3 className="text-xl font-headline font-bold text-primary mb-2">Notifikasi Pesanan Baru</h3>
                <p className="text-sm text-on-surface-variant max-w-sm">Dapatkan peringatan instan setiap kali pelanggan melakukan checkout produk eksklusif.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-14 h-7 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-primary peer-checked:to-secondary"></div>
              </label>
            </div>
            
            <div className="space-y-4">
              <label className="block text-xs font-headline font-bold uppercase tracking-widest text-on-surface-variant mb-2">Pilih Suara Notifikasi</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <button className="flex items-center justify-between p-4 rounded-xl bg-surface-container border border-primary/40 text-primary transition-all">
                  <span className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-lg">music_note</span>
                    <span className="text-sm font-medium">Royal Chime (Default)</span>
                  </span>
                  <span className="material-symbols-outlined text-sm">check_circle</span>
                </button>
                <button className="flex items-center justify-between p-4 rounded-xl bg-surface-container-low border border-outline-variant/10 text-on-surface-variant hover:border-outline-variant/30 transition-all">
                  <span className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-lg">music_note</span>
                    <span className="text-sm font-medium">Velvet Echo</span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Received Card */}
        <div className="col-span-12 lg:col-span-5 bg-[rgba(32,31,31,0.6)] backdrop-blur-[12px] border border-outline-variant/10 p-8 rounded-3xl flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-primary" style={{fontVariationSettings: "'FILL' 1"}}>payments</span>
            </div>
            <h3 className="text-xl font-headline font-bold text-on-surface mb-2">Pembayaran Berhasil</h3>
            <p className="text-sm text-on-surface-variant">Notifikasi push saat dana masuk ke akun bank yang terhubung.</p>
          </div>
          <div className="mt-8 flex items-center justify-between p-4 bg-surface-container-low rounded-2xl border border-outline-variant/5">
            <span className="text-sm font-medium text-on-surface">Aktifkan Notifikasi</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-surface-container-highest rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>

        {/* Low Stock Alert Card */}
        <div className="col-span-12 lg:col-span-5 bg-[rgba(32,31,31,0.6)] backdrop-blur-[12px] border border-outline-variant/10 p-8 rounded-3xl relative">
          <h3 className="text-xl font-headline font-bold text-on-surface mb-6 flex items-center gap-3">
            <span className="material-symbols-outlined text-secondary">warning</span>
            Peringatan Stok Rendah
          </h3>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <p className="text-sm text-on-surface-variant">Nyalakan peringatan stok</p>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-surface-container-highest rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
              </label>
            </div>
            <div className="pt-4 border-t border-outline-variant/10">
              <label className="block text-xs font-headline font-bold uppercase tracking-widest text-on-surface-variant mb-3">Ambang Batas Minimum</label>
              <div className="relative">
                <input className="w-full bg-surface-container-low border border-outline-variant/20 rounded-xl px-4 py-3 text-primary font-bold focus:ring-1 focus:ring-primary outline-none" type="number" defaultValue="5" />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-on-surface-variant">Botol</span>
              </div>
              <p className="text-[10px] text-on-surface-variant/60 mt-2 italic">Sistem akan memberi tahu Anda jika stok parfum turun di bawah angka ini.</p>
            </div>
          </div>
        </div>

        {/* Daily Email Report Card */}
        <div className="col-span-12 lg:col-span-7 bg-[rgba(32,31,31,0.6)] backdrop-blur-[12px] border border-outline-variant/10 p-8 rounded-3xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <span className="material-symbols-outlined text-on-primary">mail</span>
            </div>
            <div>
              <h3 className="text-xl font-headline font-bold text-on-surface">Laporan Email Harian</h3>
              <p className="text-sm text-on-surface-variant">Ringkasan penjualan dan analitik langsung ke inbox Anda.</p>
            </div>
            <div className="ml-auto">
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-14 h-7 bg-surface-container-highest rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-xs font-headline font-bold uppercase tracking-widest text-on-surface-variant">Alamat Email Penerima</label>
              <input className="w-full bg-surface-container-low border border-outline-variant/20 rounded-xl px-4 py-3 text-on-surface focus:ring-1 focus:ring-primary outline-none font-body" type="email" defaultValue="admin@resellerelite.luxury" />
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-headline font-bold uppercase tracking-widest text-on-surface-variant">Waktu Pengiriman</label>
              <div className="relative">
                <input className="w-full bg-surface-container-low border border-outline-variant/20 rounded-xl px-4 py-3 text-on-surface focus:ring-1 focus:ring-primary outline-none font-body" type="time" defaultValue="08:00" />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant pointer-events-none">schedule</span>
              </div>
            </div>
          </div>
          
          <div className="mt-8 p-4 rounded-2xl bg-primary/5 border border-primary/10 flex items-start gap-3">
            <span className="material-symbols-outlined text-primary text-sm mt-0.5">info</span>
            <p className="text-[11px] text-on-surface-variant leading-relaxed">
                Laporan mencakup: Total Pendapatan, Produk Terlaris, Margin Keuntungan Harian, dan Status Inventaris Global.
            </p>
          </div>
        </div>

      </div>

      {/* Action Footer */}
      <div className="mt-12 flex justify-end gap-4">
        <button className="px-8 py-3 rounded-full border border-outline-variant/20 text-on-surface-variant font-headline font-bold hover:bg-surface-container transition-all">
            Batalkan Perubahan
        </button>
        <button className="px-10 py-3 rounded-full bg-gradient-to-r from-primary to-secondary text-on-primary font-headline font-bold shadow-[0_4px_20px_rgba(201,168,76,0.3)] hover:scale-[1.02] active:opacity-80 transition-all">
            Simpan Konfigurasi
        </button>
      </div>

    </div>
  );
}
