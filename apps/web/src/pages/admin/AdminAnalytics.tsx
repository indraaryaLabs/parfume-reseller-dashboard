import { useState } from 'react';

type TimeFrame = 'JAN' | 'FEB' | 'MAR';

const DATA_STORE = {
  JAN: {
    revenue: 65.2,
    expense: 40.1,
    profit: 25.1,
    revGrowth: '+5%',
    expGrowth: '+2%',
    profGrowth: '+12%',
    diorSale: 30,
    chanelSale: 28,
    tfSale: 22,
    yslSale: 20,
    topDior: 305,
    topYsl: 250,
    topChanel: 210,
    label: 'Jan 2026',
    barRevHeight: 140,
    barExpHeight: 100
  },
  FEB: {
    revenue: 72.8,
    expense: 45.5,
    profit: 27.3,
    revGrowth: '+11%',
    expGrowth: '+13%',
    profGrowth: '+8%',
    diorSale: 32,
    chanelSale: 26,
    tfSale: 25,
    yslSale: 17,
    topDior: 380,
    topYsl: 310,
    topChanel: 275,
    label: 'Feb 2026',
    barRevHeight: 180,
    barExpHeight: 110
  },
  MAR: {
    revenue: 82.4,
    expense: 52.1,
    profit: 30.3,
    revGrowth: '+18%',
    expGrowth: '+8%',
    profGrowth: '+32%',
    diorSale: 35,
    chanelSale: 25,
    tfSale: 20,
    yslSale: 12,
    topDior: 412,
    topYsl: 385,
    topChanel: 320,
    label: 'Mar 2026',
    barRevHeight: 220,
    barExpHeight: 130
  }
};

export default function AdminAnalytics() {
  const [activeFrame, setActiveFrame] = useState<TimeFrame>('MAR');
  const d = DATA_STORE[activeFrame];

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div>
          <h2 className="text-4xl font-extrabold font-headline tracking-tight text-on-surface mb-2">Financial Insights</h2>
          <p className="text-on-surface-variant max-w-md">Performance overview of your digital perfume boutique for the current quarter.</p>
        </div>
        <div className="flex items-center gap-1 bg-surface-container-low p-1.5 rounded-xl border border-outline-variant/20 overflow-x-auto whitespace-nowrap scrollbar-hide">
          {(['JAN', 'FEB', 'MAR'] as TimeFrame[]).map(frame => (
            <button 
              key={frame} 
              onClick={() => setActiveFrame(frame)}
              className={`px-6 py-2 text-xs font-bold uppercase tracking-widest transition-all rounded-lg ${activeFrame === frame ? 'bg-primary text-on-primary shadow-lg shadow-primary/10' : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-highest'}`}
            >
              {DATA_STORE[frame].label}
            </button>
          ))}
          <div className="w-px h-6 bg-outline-variant/30 mx-2"></div>
          <button onClick={() => alert("Menampilkan kalender untuk custom rentang waktu...")} className="p-2 text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center rounded-lg hover:bg-surface-container-highest">
            <span className="material-symbols-outlined text-sm">calendar_month</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="glass-card p-8 rounded-[2rem] border border-outline-variant/10 group hover:border-primary/30 transition-all duration-500">
          <div className="flex justify-between items-start mb-6">
            <div className="p-3 bg-primary/10 rounded-2xl">
              <span className="material-symbols-outlined text-primary">payments</span>
            </div>
            <span className="px-3 py-1 bg-primary/20 text-primary text-[10px] font-bold rounded-full">{d.revGrowth} vs prev.</span>
          </div>
          <p className="text-on-surface-variant text-sm font-medium mb-1 uppercase tracking-tighter">Total Revenue</p>
          <h3 className="text-5xl font-headline font-bold text-on-surface tracking-tighter">{d.revenue}M</h3>
          <div className="mt-6 h-1 w-full bg-surface-container-highest rounded-full overflow-hidden">
            <div className="h-full bg-primary shadow-[0_0_8px_rgba(230,195,100,0.5)] transition-all duration-1000" style={{ width: `${(d.revenue/100)*100}%` }}></div>
          </div>
        </div>

        <div className="glass-card p-8 rounded-[2rem] border border-outline-variant/10 group hover:border-secondary/30 transition-all duration-500">
          <div className="flex justify-between items-start mb-6">
            <div className="p-3 bg-on-surface-variant/10 rounded-2xl text-on-surface-variant">
              <span className="material-symbols-outlined">receipt_long</span>
            </div>
            <span className="px-3 py-1 bg-on-surface-variant/10 text-on-surface-variant text-[10px] font-bold rounded-full">{d.expGrowth} growth</span>
          </div>
          <p className="text-on-surface-variant text-sm font-medium mb-1 uppercase tracking-tighter">Total Expenses</p>
          <h3 className="text-5xl font-headline font-bold text-on-surface tracking-tighter">{d.expense}M</h3>
          <div className="mt-6 h-1 w-full bg-surface-container-highest rounded-full overflow-hidden">
            <div className="h-full bg-on-surface-variant/40 transition-all duration-1000" style={{ width: `${(d.expense/100)*100}%` }}></div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-primary to-primary-container p-8 rounded-[2rem] shadow-2xl shadow-primary/20 relative overflow-hidden group">
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
          <div className="flex justify-between items-start mb-6 relative z-10">
            <div className="p-3 bg-on-primary/10 rounded-2xl">
              <span className="material-symbols-outlined text-on-primary">trending_up</span>
            </div>
            <span className="px-3 py-1 bg-on-primary/20 text-on-primary text-[10px] font-bold rounded-full">{d.profGrowth} efficiency</span>
          </div>
          <p className="text-on-primary/70 text-sm font-medium mb-1 uppercase tracking-tighter relative z-10">Net Profit</p>
          <h3 className="text-5xl font-headline font-bold text-on-primary tracking-tighter relative z-10">{d.profit}M</h3>
          <p className="mt-6 text-on-primary/60 text-xs font-medium relative z-10">Snapshot for {d.label}</p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8 mb-12">
        <div className="col-span-12 lg:col-span-8 glass-card p-8 rounded-[2.5rem] border border-outline-variant/10">
          <div className="flex justify-between items-center mb-10">
            <h4 className="font-headline font-bold text-xl">Revenue vs Expenses (Q1)</h4>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-primary"></span>
                <span className="text-xs text-on-surface-variant">Revenue</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-surface-container-highest"></span>
                <span className="text-xs text-on-surface-variant">Expenses</span>
              </div>
            </div>
          </div>
          <div className="h-64 flex items-end justify-around gap-12 relative">
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-10">
              <div className="w-full border-t border-on-surface"></div>
              <div className="w-full border-t border-on-surface"></div>
              <div className="w-full border-t border-on-surface"></div>
            </div>
            {/* JAN BAR */}
            <div className="flex-1 flex flex-col items-center gap-3 relative z-10 group cursor-pointer" onClick={() => setActiveFrame('JAN')}>
              <div className="flex items-end gap-2 w-full justify-center">
                <div className={`w-10 rounded-t-lg transition-all duration-700 ${activeFrame === 'JAN' ? 'bg-primary shadow-[0_0_20px_rgba(201,168,76,0.3)]' : 'bg-primary/50 group-hover:bg-primary/80'}`} style={{ height: `${DATA_STORE.JAN.barRevHeight}px` }}></div>
                <div className="w-10 bg-surface-container-highest rounded-t-lg transition-all" style={{ height: `${DATA_STORE.JAN.barExpHeight}px` }}></div>
              </div>
              <span className={`text-xs font-bold uppercase tracking-widest transition-colors ${activeFrame === 'JAN' ? 'text-primary' : 'text-on-surface-variant'}`}>Jan</span>
            </div>
            {/* FEB BAR */}
            <div className="flex-1 flex flex-col items-center gap-3 relative z-10 group cursor-pointer" onClick={() => setActiveFrame('FEB')}>
              <div className="flex items-end gap-2 w-full justify-center">
                <div className={`w-10 rounded-t-lg transition-all duration-700 ${activeFrame === 'FEB' ? 'bg-primary shadow-[0_0_20px_rgba(201,168,76,0.3)]' : 'bg-primary/50 group-hover:bg-primary/80'}`} style={{ height: `${DATA_STORE.FEB.barRevHeight}px` }}></div>
                <div className="w-10 bg-surface-container-highest rounded-t-lg transition-all" style={{ height: `${DATA_STORE.FEB.barExpHeight}px` }}></div>
              </div>
              <span className={`text-xs font-bold uppercase tracking-widest transition-colors ${activeFrame === 'FEB' ? 'text-primary' : 'text-on-surface-variant'}`}>Feb</span>
            </div>
            {/* MAR BAR */}
            <div className="flex-1 flex flex-col items-center gap-3 relative z-10 group cursor-pointer" onClick={() => setActiveFrame('MAR')}>
              <div className="flex items-end gap-2 w-full justify-center">
                <div className={`w-10 rounded-t-lg transition-all duration-700 ${activeFrame === 'MAR' ? 'bg-primary shadow-[0_0_20px_rgba(201,168,76,0.3)]' : 'bg-primary/50 group-hover:bg-primary/80'}`} style={{ height: `${DATA_STORE.MAR.barRevHeight}px` }}></div>
                <div className="w-10 bg-surface-container-highest rounded-t-lg transition-all" style={{ height: `${DATA_STORE.MAR.barExpHeight}px` }}></div>
              </div>
              <span className={`text-xs font-bold uppercase tracking-widest transition-colors ${activeFrame === 'MAR' ? 'text-primary' : 'text-on-surface-variant'}`}>Mar</span>
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 glass-card p-8 rounded-[2.5rem] border border-outline-variant/10 flex flex-col">
          <h4 className="font-headline font-bold text-xl mb-8">Expense Breakdown ({d.label})</h4>
          <div className="relative w-48 h-48 mx-auto mb-8 transition-transform hover:scale-105 duration-500">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <circle cx="18" cy="18" fill="transparent" r="16" stroke="#353534" strokeWidth="4"></circle>
              {/* Dynamic strokeDasharray based on timeframe. For simplicity in UI mock, keeping it somewhat static visually but dynamically labeled */}
              <circle cx="18" cy="18" fill="transparent" r="16" stroke="#C9A84C" strokeDasharray="68, 100" strokeWidth="4"></circle>
              <circle cx="18" cy="18" fill="transparent" r="16" stroke="#E6C364" strokeDasharray="15, 100" strokeDashoffset="-68" strokeWidth="4"></circle>
              <circle cx="18" cy="18" fill="transparent" r="16" stroke="#99907e" strokeDasharray="12, 100" strokeDashoffset="-83" strokeWidth="4"></circle>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span className="text-2xl font-bold transition-all">{d.expense}M</span>
              <span className="text-[10px] text-on-surface-variant uppercase tracking-widest">Total cost</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center group cursor-pointer hover:bg-surface-container-highest p-1 -mx-1 rounded-lg transition-all">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C9A84C] group-hover:scale-150 transition-transform"></span>
                <span className="text-sm text-on-surface-variant">Beli (Stok & Bahan)</span>
              </div>
              <span className="text-sm font-bold">68%</span>
            </div>
            <div className="flex justify-between items-center group cursor-pointer hover:bg-surface-container-highest p-1 -mx-1 rounded-lg transition-all">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#E6C364] group-hover:scale-150 transition-transform"></span>
                <span className="text-sm text-on-surface-variant">Ongkos Kirim</span>
              </div>
              <span className="text-sm font-bold">15%</span>
            </div>
            <div className="flex justify-between items-center group cursor-pointer hover:bg-surface-container-highest p-1 -mx-1 rounded-lg transition-all">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#99907e] group-hover:scale-150 transition-transform"></span>
                <span className="text-sm text-on-surface-variant">Packaging</span>
              </div>
              <span className="text-sm font-bold">12%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-6 glass-card p-8 rounded-[2.5rem] border border-outline-variant/10">
          <h4 className="font-headline font-bold text-xl mb-10">Sales per Brand ({d.label})</h4>
          <div className="space-y-8">
            <div className="group cursor-pointer">
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest mb-3">
                <span>Dior</span>
                <span className="text-primary transition-all">{d.diorSale}%</span>
              </div>
              <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full shadow-[0_0_20px_rgba(201,168,76,0.15)] transition-all duration-1000 group-hover:brightness-125" style={{ width: `${d.diorSale}%` }}></div>
              </div>
            </div>
            <div className="group cursor-pointer">
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest mb-3 text-on-surface-variant">
                <span>Chanel</span>
                <span className="transition-all">{d.chanelSale}%</span>
              </div>
              <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
                <div className="h-full bg-on-surface-variant/40 rounded-full transition-all duration-1000 group-hover:bg-primary/50" style={{ width: `${d.chanelSale}%` }}></div>
              </div>
            </div>
            <div className="group cursor-pointer">
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest mb-3 text-on-surface-variant">
                <span>Tom Ford</span>
                <span className="transition-all">{d.tfSale}%</span>
              </div>
              <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
                <div className="h-full bg-on-surface-variant/40 rounded-full transition-all duration-1000 group-hover:bg-primary/50" style={{ width: `${d.tfSale}%` }}></div>
              </div>
            </div>
            <div className="group cursor-pointer">
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest mb-3 text-on-surface-variant">
                <span>YSL</span>
                <span className="transition-all">{d.yslSale}%</span>
              </div>
              <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
                <div className="h-full bg-on-surface-variant/40 rounded-full transition-all duration-1000 group-hover:bg-primary/50" style={{ width: `${d.yslSale}%` }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-6 glass-card p-8 rounded-[2.5rem] border border-outline-variant/10">
          <div className="flex justify-between items-center mb-8">
            <h4 className="font-headline font-bold text-xl">Top Selling Products ({d.label})</h4>
            <button className="text-primary text-xs font-bold uppercase tracking-widest hover:underline">View All</button>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-2xl hover:bg-surface-container-highest/30 transition-colors cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-surface-container-highest flex-shrink-0 group-hover:shadow-[0_0_15px_rgba(201,168,76,0.3)] transition-all">
                  <img alt="Dior Sauvage" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCw7zQPGGyrUKo8xkyN9gpDdvKjLL7VqV22Fu_TkBH3pS9EliTRVidElL-XupDIy9hUUN69GGuRjmaG4jEKroazlDSy0jZRrLOFUk2q772i6btXwAYgFNtCsgp-gjhoy72F8iWgrIVzY4jRelSj1mSFXcLX2jZaL2KY8AUhJq2GWHnHgppHP3DtbLjR7BkOgq_A_JwVb1G9P2HcovdojkPT5vSMHGTwfbFT49N38Mvi0GpECC0ptoo1wuhBFxGO0DqrhVRf5dEkdeBq" />
                </div>
                <div>
                  <p className="font-bold group-hover:text-primary transition-colors">Dior Sauvage</p>
                  <p className="text-[10px] text-on-surface-variant uppercase tracking-widest">EAU DE PARFUM</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-primary">#1</p>
                <p className="text-xs text-on-surface-variant transition-all">{d.topDior} Sold</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 rounded-2xl hover:bg-surface-container-highest/30 transition-colors cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-surface-container-highest flex-shrink-0 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all">
                  <img alt="YSL Y" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuABzHt0UeZbtv-PC83Vh_cDCvbowRmmtAUbQxMgVSBihFJzaT3cgb8yvCPkIqkfL8KxLNOoQdUQ5paCLPjv2HRpEVVHpZ6otIeR460OS8sdLNmzSbWsoRzUiu21qpumpN_8HKkVuipYErQQfvoB1Z7PbaY4hjmAWQrjmjpC0eshgkZUfFqMHRwXrQnwc0r7jLmDIcze0kZmPHsQ6YcupstYj4pxFwliARHPdP9IjR7P5P-gv3WmPIi9Ws93dbvLUTqG6_29qzoobvGx" />
                </div>
                <div>
                  <p className="font-bold group-hover:text-white transition-colors">YSL Y</p>
                  <p className="text-[10px] text-on-surface-variant uppercase tracking-widest">LE PARFUM</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-on-surface-variant">#2</p>
                <p className="text-xs text-on-surface-variant transition-all">{d.topYsl} Sold</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl hover:bg-surface-container-highest/30 transition-colors cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-surface-container-highest flex-shrink-0 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all">
                  <img alt="Chanel Bleu" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAh24kSLUHKT1JmIIzXfNlQjf8NUfJ1rJl2AZwCsxtH1siOCQRxdgrwEzT1pAawHlJq9w28eA3t7kfUhTpeFRNWp3xd3Y5SUz0lvncshIGEp_8Wu8bzpQ38ZLaU8LbjiZnABlxtdWASz9x0yG2m-xykWt5lg-BfQ9DEgxQwMPlFyfrymOTcHnGp0T3zSRFG0Ot5SSE7fMHxhiDl4_jF133Hz3p_POysRY6dpD7eBoqPaRRpvaqFiz8EV1Djg_Xtw0PNDPBtc2XdJbWo" />
                </div>
                <div>
                  <p className="font-bold group-hover:text-white transition-colors">Chanel Bleu</p>
                  <p className="text-[10px] text-on-surface-variant uppercase tracking-widest">PERFUME CONCENTRATE</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-on-surface-variant">#3</p>
                <p className="text-xs text-on-surface-variant transition-all">{d.topChanel} Sold</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
