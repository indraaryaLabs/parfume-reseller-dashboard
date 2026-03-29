import { Link } from 'react-router-dom';

export default function UpcomingRestock() {
  return (
    <section className="py-24 bg-surface-container-low/50">
      <div className="max-w-screen-2xl mx-auto px-6">
        <div className="glass-card p-12 rounded-[3rem] border-primary/20 relative overflow-hidden">
          {/* Decor background */}
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-primary/10 blur-[100px] rounded-full"></div>
          <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-secondary/10 blur-[100px] rounded-full"></div>
            
          <div className="flex flex-col lg:flex-row items-center gap-16 relative z-10">
            <div className="lg:w-1/2">
              <span className="text-primary font-bold tracking-widest mb-4 block uppercase">The Next Icon</span>
              <h2 className="font-headline text-5xl font-bold mb-8 leading-tight">Maison Francis Kurkdjian <br/><span className="gold-gradient-text">Baccarat Rouge 540</span></h2>
              <p className="text-on-surface-variant text-lg mb-10 leading-relaxed">
                Keajaiban alkimia yang menyatukan aroma melati, kunyit, dan cedarwood. Akan hadir kembali dalam stok terbatas minggu depan. Jangan sampai terlewatkan.
              </p>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => alert("Pengingat stok (Restock Alert) telah diaktifkan untuk Baccarat Rouge 540! Kami akan memberi tahu Anda begitu produk tersedia.")}
                  className="bg-on-surface text-surface-container-lowest px-10 py-4 rounded-full font-bold flex items-center gap-3 hover:scale-105 transition-transform"
                >
                  <span className="material-symbols-outlined">notifications</span>
                  Ingatkan Saya
                </button>
                <Link 
                  to="/product/1"
                  className="border border-outline-variant px-10 py-4 rounded-full font-bold hover:bg-surface-variant transition-colors flex items-center justify-center"
                >
                  Lihat Detail Produk
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2 w-full">
              <div className="relative group">
                <div className="absolute inset-0 gold-gradient-bg blur-3xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <img className="relative rounded-2xl w-full h-[500px] object-cover shadow-2xl" alt="MFK Baccarat Rouge 540" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAreJuby5mXbQvPw5ysp18vtW0VqHG7d1J3_a2Z-wI_5o-mbNx38B-UFkPYui5dqlZ1Spbu2OFaF5DtvNaMH-xUy-zV7-C2EQz-YbbHuUgg_McUqd0BrqVCjL1lkCpsFAqlhQvpLEvgnmOmK7xq4_tOWKGXfRvJITQ-g6dudRd_ZGkHoLJ4wV1O-DblFY1EpRJfYWxPIURc-OXr2Uyx-IZ_nhumYO_HLCvSIitw9OOMJctx9ynFFnYeZWVFKWimLVyWSvn3VfCQU291"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
