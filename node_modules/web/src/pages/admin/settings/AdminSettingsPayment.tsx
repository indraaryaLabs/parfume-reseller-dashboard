export default function AdminSettingsPayment() {
  return (
    <div className="w-full mx-auto">
      {/* Page Header */}
      <div className="mb-12">
        <h1 className="font-headline text-4xl font-extrabold tracking-tight text-on-surface mb-2">Metode Pembayaran</h1>
        <p className="text-on-surface-variant font-body">Konfigurasi jalur transaksi untuk kemudahan pelanggan Anda.</p>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-12 gap-8">
        
        {/* Active Payment Methods Section */}
        <div className="col-span-12 bg-surface-container/60 backdrop-blur-xl rounded-2xl p-8 border border-outline-variant/10">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="font-headline text-xl font-bold text-primary flex items-center gap-2">
                <span className="material-symbols-outlined">account_balance</span>
                Metode Pembayaran Aktif
              </h2>
              <p className="text-sm text-on-surface-variant">Kelola daftar rekening bank manual Anda.</p>
            </div>
            <button className="bg-gradient-to-r from-primary to-secondary text-on-primary font-bold px-6 py-2.5 rounded-xl hover:scale-[1.02] transition-transform flex items-center gap-2 text-sm shadow-[0_4px_20px_rgba(201,168,76,0.2)]">
              <span className="material-symbols-outlined text-sm">add</span>
              Tambah Rekening
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-separate border-spacing-y-3">
              <thead>
                <tr className="text-on-surface-variant/60 text-xs uppercase tracking-widest font-bold">
                  <th className="px-6 pb-2">Bank</th>
                  <th className="px-6 pb-2">Nama Pemilik</th>
                  <th className="px-6 pb-2">Nomor Rekening</th>
                  <th className="px-6 pb-2 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="bg-surface-container-high/30 hover:bg-surface-container-high/60 transition-colors group">
                  <td className="px-6 py-4 rounded-l-xl font-bold text-on-surface">BCA</td>
                  <td className="px-6 py-4 text-on-surface-variant">Arisandi Kusuma</td>
                  <td className="px-6 py-4 font-mono tracking-wider text-on-surface">8830 1293 44</td>
                  <td className="px-6 py-4 rounded-r-xl text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:text-primary transition-colors"><span className="material-symbols-outlined text-lg">edit</span></button>
                      <button className="p-2 hover:text-error transition-colors"><span className="material-symbols-outlined text-lg">delete</span></button>
                    </div>
                  </td>
                </tr>
                <tr className="bg-surface-container-high/30 hover:bg-surface-container-high/60 transition-colors group">
                  <td className="px-6 py-4 rounded-l-xl font-bold text-on-surface">Mandiri</td>
                  <td className="px-6 py-4 text-on-surface-variant">Arisandi Kusuma</td>
                  <td className="px-6 py-4 font-mono tracking-wider text-on-surface">142 00 1234567 8</td>
                  <td className="px-6 py-4 rounded-r-xl text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:text-primary transition-colors"><span className="material-symbols-outlined text-lg">edit</span></button>
                      <button className="p-2 hover:text-error transition-colors"><span className="material-symbols-outlined text-lg">delete</span></button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* QRIS Section */}
        <div className="col-span-12 lg:col-span-7 bg-surface-container/60 backdrop-blur-xl rounded-2xl p-8 border border-outline-variant/10 flex flex-col md:flex-row gap-8 items-start">
          <div className="relative group">
            <div className="w-48 h-48 bg-white p-4 rounded-xl shadow-2xl relative overflow-hidden">
              <img 
                alt="QRIS Preview" 
                className="w-full h-full object-contain grayscale opacity-80 group-hover:opacity-100 transition-opacity" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHgsYtHOAuMgL4iOwYo4BawD9vx2Z_DZ1tUuYWQzZOfZ7RKvHcnkrZ5QnzSS0itnaz0eXWhuVN00hVej83vgeLmbS0iiyZi8l26_T59bvYwf03MncjtQGDyw2CXjbE29ZW5b6WygxzCdsqsfFkg8bHJdElPUhMBfuO5ZDeUP2tGzoEVIeHPU1-lhFcnk0qcWXRJAUe_yFtSjdhQVfX-GgLOYOJQOyZxfVXkBjUvqUGvQozcPcG7wu5CzJkQ--hw3uHqRPmXjtzLl7B"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
                <span className="material-symbols-outlined text-white text-3xl">zoom_in</span>
              </div>
            </div>
            <div className="absolute -bottom-2 -right-2 bg-primary text-on-primary w-8 h-8 rounded-full flex items-center justify-center shadow-lg">
              <span className="material-symbols-outlined text-sm">qr_code_2</span>
            </div>
          </div>
          <div className="flex-1 space-y-4">
            <div>
              <h2 className="font-headline text-xl font-bold text-on-surface">QRIS Dinamis</h2>
              <p className="text-sm text-on-surface-variant mt-1">Unggah kode QRIS Anda untuk menerima pembayaran via dompet digital (Gopay, OVO, Dana, dll).</p>
            </div>
            <div className="flex gap-3 pt-2">
              <button className="bg-surface-container-highest text-on-surface px-6 py-2.5 rounded-xl border border-outline-variant/20 hover:bg-surface-container transition-colors text-sm font-semibold flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">upload</span>
                Ganti Gambar
              </button>
              <button className="text-error px-4 py-2.5 rounded-xl hover:bg-error/10 transition-colors text-sm font-semibold">
                Hapus
              </button>
            </div>
            <div className="p-3 bg-primary/5 rounded-lg border border-primary/10 flex items-start gap-3 mt-4">
              <span className="material-symbols-outlined text-primary text-sm mt-0.5">info</span>
              <p className="text-[11px] text-on-surface-variant/80 leading-relaxed italic">Pastikan QRIS yang Anda unggah sudah diverifikasi oleh PJSP terkait untuk menghindari kegagalan transaksi.</p>
            </div>
          </div>
        </div>

        {/* COD Toggle Section */}
        <div className="col-span-12 lg:col-span-5 bg-surface-container/60 backdrop-blur-[12px] rounded-2xl p-8 border border-outline-variant/10 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-secondary-container/20 rounded-2xl text-secondary">
                <span className="material-symbols-outlined text-3xl">local_shipping</span>
              </div>
              {/* Custom Toggle Switch */}
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-14 h-7 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            <h2 className="font-headline text-xl font-bold text-on-surface">Cash On Delivery (COD)</h2>
            <p className="text-sm text-on-surface-variant mt-2 leading-relaxed">
                Aktifkan fitur bayar di tempat untuk wilayah jangkauan kurir internal Anda.
            </p>
          </div>
          <div className="mt-8">
            <div className="flex items-center justify-between text-xs py-2 border-b border-outline-variant/10">
              <span className="text-on-surface-variant">Status</span>
              <span className="px-2 py-0.5 bg-surface-container-highest text-on-surface-variant rounded-full font-bold uppercase tracking-tighter">Nonaktif</span>
            </div>
            <div className="flex items-center justify-between text-xs py-2">
              <span className="text-on-surface-variant">Biaya Penanganan</span>
              <span className="text-on-surface font-semibold">Rp 0 (Flat)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Warning/Note Section */}
      <div className="mt-12 p-6 rounded-xl bg-gradient-to-r from-surface-container to-surface-container-high border-l-4 border-primary/40">
        <div className="flex gap-4 items-center">
          <span className="material-symbols-outlined text-primary text-3xl" style={{fontVariationSettings: "'FILL' 1"}}>verified_user</span>
          <div>
            <h4 className="font-bold text-on-surface text-sm">Keamanan Transaksi</h4>
            <p className="text-xs text-on-surface-variant mt-0.5">Semua data rekening dienkripsi secara aman. Pastikan untuk memverifikasi bukti transfer secara manual melalui menu Pesanan sebelum memproses pengiriman produk.</p>
          </div>
        </div>
      </div>

      {/* Floating Action Feedback */}
      <div className="fixed bottom-8 right-8 z-50">
        <button className="w-14 h-14 bg-primary text-on-primary rounded-full shadow-[0_8px_30px_rgba(201,168,76,0.4)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all">
          <span className="material-symbols-outlined">save</span>
        </button>
      </div>

    </div>
  );
}
