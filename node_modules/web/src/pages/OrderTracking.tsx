export default function OrderTracking() {
  return (
    <div className="max-w-4xl mx-auto px-6 pt-12 pb-32 space-y-12">
      <header className="space-y-2">
        <h1 className="font-headline text-3xl md:text-5xl font-extrabold tracking-tighter text-white">
          📦 Order #ORD-20260325-001
        </h1>
        <p className="text-on-surface-variant font-medium tracking-wide">Estimasi kedatangan: 28 Mar 2026</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <section className="md:col-span-7 space-y-6">
          <div className="glass-card rounded-3xl p-8">
            <h2 className="font-headline text-xl font-bold text-primary mb-8 tracking-tight">Status Pengiriman</h2>
            <div className="relative space-y-8">
              <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-outline-variant/30"></div>
              
              <div className="relative flex gap-6 opacity-40">
                <div className="z-10 w-6 h-6 rounded-full bg-surface-container-highest border-2 border-outline-variant flex items-center justify-center">
                  <span className="w-2 h-2 rounded-full bg-outline-variant"></span>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-white text-lg">Delivered</h3>
                  <p className="text-sm text-on-surface-variant">Pesanan sampai di tujuan</p>
                </div>
              </div>

              <div className="relative flex gap-6">
                <div className="z-10 w-6 h-6 rounded-full bg-primary border-4 border-primary/20 flex items-center justify-center shadow-[0_0_15px_rgba(230,195,100,0.4)]">
                  <span className="material-symbols-outlined text-[14px] text-on-primary font-bold">local_shipping</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-primary text-lg">Shipped</h3>
                    <span className="text-xs font-mono text-on-surface-variant bg-surface-container-high px-2 py-1 rounded">26 Mar, 10:15</span>
                  </div>
                  <p className="text-sm text-on-surface-variant mt-1">Pesanan sedang dalam perjalanan via J&T Express</p>
                  
                  <div className="mt-4 p-4 rounded-2xl bg-surface-container-low border border-outline-variant/20 flex justify-between items-center group cursor-pointer hover:bg-surface-container transition-colors">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Nomor Resi</p>
                      <p className="text-white font-mono font-medium">JT92837465510</p>
                    </div>
                    <button className="bg-primary/10 text-primary p-2 rounded-xl active:scale-90 transition-transform">
                      <span className="material-symbols-outlined text-sm">content_copy</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="relative flex gap-6">
                <div className="z-10 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[14px] text-on-primary font-bold">inventory_2</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-white text-lg">Packing</h3>
                    <span className="text-xs font-mono text-on-surface-variant">25 Mar, 18:30</span>
                  </div>
                  <p className="text-sm text-on-surface-variant">Produk sedang dikemas dengan bubble wrap premium</p>
                </div>
              </div>

              <div className="relative flex gap-6">
                <div className="z-10 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[14px] text-on-primary font-bold">check</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-white text-lg">Payment Confirmed</h3>
                    <span className="text-xs font-mono text-on-surface-variant">25 Mar, 14:05</span>
                  </div>
                  <p className="text-sm text-on-surface-variant">Pembayaran berhasil diverifikasi</p>
                </div>
              </div>

              <div className="relative flex gap-6">
                <div className="z-10 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[14px] text-on-primary font-bold">shopping_cart</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-white text-lg">Order Created</h3>
                    <span className="text-xs font-mono text-on-surface-variant">25 Mar, 13:50</span>
                  </div>
                  <p className="text-sm text-on-surface-variant">Menunggu verifikasi pembayaran</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="md:col-span-5 space-y-6">
          <div className="glass-card rounded-3xl p-6 relative overflow-hidden">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl"></div>
            <h2 className="font-headline text-lg font-bold text-white mb-4">Alamat Pengiriman</h2>
            <div className="space-y-4">
              <div className="flex gap-3">
                <span className="material-symbols-outlined text-primary">person</span>
                <div>
                  <p className="text-white font-semibold">Amanda Wijaya</p>
                  <p className="text-sm text-on-surface-variant">+62 812-3456-7890</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="material-symbols-outlined text-primary">location_on</span>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Jl. Kemang Raya No. 12, Apartemen Mansion Tower A, Lantai 15, Jakarta Selatan, 12730
                </p>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-3xl p-6">
            <h2 className="font-headline text-lg font-bold text-white mb-6">Detail Pesanan</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-16 h-20 rounded-xl bg-surface-container-high overflow-hidden flex-shrink-0">
                  <img className="w-full h-full object-cover" alt="Item" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSiKdQs5X6Husxnsv84-Yda2Xeh3YF8gTuvn4SgVl666OMurNF7JbTv07MCUyIUMpxBB7TZwcqlvybkCqcyWsove06GkUB6U5O6eN1wxQOl6hCaaYv-dKCL5TT36rsiA55eDmENiftEy9IgcJPqRQ_d1AilR438GTQ_pm7eY9Bk-t-jcIaNvNydSqsVrycvFBFh9gtmRRcKuahsyvp-JCsF7J_cenk-ICYLDdtQTc2yFJoygebKyZ7T6zZ3_u3IKne8SZkMUHc3Q1F"/>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="text-white font-medium text-sm leading-tight">Elysian Oud - Extrait de Parfum 50ml</h4>
                    <p className="text-white font-bold text-sm">Rp1.450.000</p>
                  </div>
                  <p className="text-xs text-on-surface-variant mt-1">Qty: 1</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-16 h-20 rounded-xl bg-surface-container-high overflow-hidden flex-shrink-0">
                  <img className="w-full h-full object-cover" alt="Item" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAc1Ra_ZOQ6nCgBdmul8zD4gx5a9IqeFpimDFAOjaRy0TNiiWfNnULMNplnsDV7GXUWtpPDdP3rZ3qKKIPHCn95o2tUHXDojkS1Ass540rgvcfKWVccXCZjntzRg7oX_wceRjsIq6dAtSceMZUKcj1ch1BYxCA82BQnMcip1KfpNYeDmSzP4NzJrGh6cQNM3uanRS0tJ4hb7FjnIcGZWlN0NnSYiKwL51juMY-cIj2OyUnDFzfA21TAuxXSfQpWEa2sOqY5aVsONCGI"/>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="text-white font-medium text-sm leading-tight">Midnight Rose - Limited Edition 30ml</h4>
                    <p className="text-white font-bold text-sm">Rp850.000</p>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="px-2 py-0.5 rounded-full bg-secondary-container/30 text-secondary text-[10px] uppercase font-bold tracking-tighter">Limited Edition</span>
                    <p className="text-xs text-on-surface-variant">Qty: 1</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-outline-variant/20 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-on-surface-variant">Subtotal</span>
                <span className="text-white">Rp2.300.000</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-on-surface-variant">Ongkos Kirim (J&T Reg)</span>
                <span className="text-white">Rp24.000</span>
              </div>
              <div className="flex justify-between text-lg font-headline font-bold mt-4">
                <span className="text-primary">Total Pembayaran</span>
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Rp2.324.000</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center p-8 text-center space-y-4">
        <p className="text-on-surface-variant text-sm">Punya kendala dengan pesanan Anda?</p>
        <button className="px-8 py-3 rounded-full border border-primary/40 text-primary font-bold hover:bg-primary/5 transition-all active:scale-95">
          Hubungi Customer Curator
        </button>
      </div>
    </div>
  );
}
