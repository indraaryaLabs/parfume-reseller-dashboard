export default function SettingsProfile() {
  return (
    <div className="p-8 md:p-16 max-w-6xl mx-auto">
      <header className="mb-16">
        <h1 className="font-headline text-5xl font-extrabold tracking-tighter text-white mb-4">Pengaturan Profil</h1>
        <p className="text-zinc-500 font-body text-lg max-w-2xl leading-relaxed">
          Kelola identitas digital Anda di butik eksklusif L'Essence Noire. Pastikan data Anda tetap terkurasi dengan sempurna.
        </p>
      </header>
      
      {/* Profile Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Profile Picture Section */}
        <section className="lg:col-span-4">
          <div className="relative group">
            <div className="aspect-square rounded-3xl overflow-hidden bg-surface-container shadow-2xl ring-1 ring-white/10">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBqa8QSNEJVKMU_GamLBfhjLYp9Nmo8dE1dztXaUWtjUZsCcviSwz0DOGkSoP7Cut2rl0x5uhShZQEnq4PrOMl98zwJOpylBHwNEwgbsIcFLTgmdkwS1jWE0hFR92HkPjAiH9KSl9Ce3PS76yAKGpSgCZ6JoBdu0nYrSiBP0G1PGzZiGV1lIdvHpLkIvyf9JBXkXc0hq5HerXwFr8z-licaQMV4ThQ50Drv3UaDHvw0JrPUSzFGR6kxBRG-81Lb5yWbf-QJlbxb2RV" 
                alt="User profile large" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" 
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button className="bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-full text-white font-headline text-xs font-bold uppercase tracking-widest hover:bg-primary hover:text-on-primary transition-all">
                  Ganti Foto
                </button>
              </div>
            </div>
            <div className="mt-6 flex flex-col items-center text-center">
              <span className="inline-block px-4 py-1 rounded-full bg-primary-container/20 text-primary font-headline text-[10px] uppercase tracking-widest border border-primary/20 mb-4">
                Exclusive Curator
              </span>
              <button className="md:hidden mt-4 w-full bg-surface-container-highest border border-outline-variant/30 py-4 rounded-xl text-on-surface font-headline text-xs uppercase tracking-widest">
                Ganti Foto
              </button>
            </div>
          </div>
        </section>

        {/* Profile Form Section */}
        <section className="lg:col-span-8">
          <form className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Nama Lengkap */}
              <div className="space-y-3">
                <label className="block font-headline text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Nama Lengkap</label>
                <input 
                  type="text" 
                  defaultValue="Ahmad Fauzi" 
                  className="w-full bg-surface-container-low border-none focus:ring-1 focus:ring-primary rounded-xl py-4 px-6 text-on-surface font-body placeholder:text-zinc-700 transition-all" 
                />
              </div>
              
              {/* Email */}
              <div className="space-y-3">
                <label className="block font-headline text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Email</label>
                <input 
                  type="email" 
                  defaultValue="ahmad.fauzi@luxury.id" 
                  className="w-full bg-surface-container-low border-none focus:ring-1 focus:ring-primary rounded-xl py-4 px-6 text-on-surface font-body transition-all" 
                />
              </div>

              {/* No. Telepon */}
              <div className="space-y-3">
                <label className="block font-headline text-[10px] uppercase tracking-widest text-zinc-500 font-bold">No. Telepon</label>
                <input 
                  type="tel" 
                  defaultValue="+62 812 3456 7890" 
                  className="w-full bg-surface-container-low border-none focus:ring-1 focus:ring-primary rounded-xl py-4 px-6 text-on-surface font-body transition-all" 
                />
              </div>

              {/* Tanggal Lahir */}
              <div className="space-y-3">
                <label className="block font-headline text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Tanggal Lahir</label>
                <div className="relative">
                  <input 
                    type="date" 
                    defaultValue="1992-05-15" 
                    className="w-full bg-surface-container-low border-none focus:ring-1 focus:ring-primary rounded-xl py-4 px-6 text-on-surface font-body transition-all" 
                  />
                </div>
              </div>
            </div>

            {/* Bio / Description */}
            <div className="space-y-3 pt-4">
              <label className="block font-headline text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Personal Bio (Koleksi Pilihan)</label>
              <textarea 
                rows={4} 
                defaultValue="Penikmat aroma oud dan citrus. Mengkurasi pengalaman wewangian terbaik untuk setiap momen berharga."
                className="w-full bg-surface-container-low border-none focus:ring-1 focus:ring-primary rounded-xl py-4 px-6 text-on-surface font-body resize-none transition-all" 
              />
            </div>

            {/* Submit Button */}
            <div className="pt-10 flex justify-end">
              <button 
                type="submit" 
                onClick={(e) => { e.preventDefault(); alert("Profil diperbarui!"); }}
                className="group relative px-10 py-5 bg-gradient-to-r from-primary to-secondary rounded-xl font-headline font-extrabold text-on-primary-fixed uppercase tracking-[0.2em] text-xs shadow-2xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all duration-300"
              >
                <span className="relative z-10">Simpan Perubahan</span>
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
