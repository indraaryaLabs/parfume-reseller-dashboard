import { useState } from 'react';

type TransactionType = 'INCOME' | 'EXPENSE';

interface Transaction {
  id: string;
  date: string;
  category: string;
  description: string;
  amount: number;
  type: TransactionType;
}

const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: '1', date: '25 Mar 2026', category: 'Beli Stok', description: 'Dior Sauvage x5 (Batch Summer 2025)', amount: 1400000, type: 'EXPENSE' },
  { id: '2', date: '25 Mar 2026', category: 'Ongkir OS', description: 'JNE dr Jkt ke Gudang Surabaya', amount: 85000, type: 'EXPENSE' },
  { id: '3', date: '24 Mar 2026', category: 'Penjualan', description: 'Order #ORD-001 (Budi S, Jakarta)', amount: 3075000, type: 'INCOME' },
  { id: '4', date: '23 Mar 2026', category: 'Packaging', description: 'Bubble wrap 50m Premium Grade', amount: 45000, type: 'EXPENSE' },
  { id: '5', date: '22 Mar 2026', category: 'Beli Stok', description: 'TF Tobacco Vanille x3 (Retail Pack)', amount: 4200000, type: 'EXPENSE' },
  { id: '6', date: '21 Mar 2026', category: 'Penjualan', description: 'Order #ORD-B192 (Corporate Order)', amount: 12500000, type: 'INCOME' },
];

export default function AdminFinance() {
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [filterType, setFilterType] = useState<'ALL' | 'INCOME' | 'EXPENSE'>('ALL');
  const [showAddForm, setShowAddForm] = useState(false);

  // Form states
  const [formDate, setFormDate] = useState('2026-03-26');
  const [formCategory, setFormCategory] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formAmount, setFormAmount] = useState('');
  const [formType, setFormType] = useState<TransactionType>('INCOME');

  const filteredTransactions = filterType === 'ALL' 
    ? transactions 
    : transactions.filter(t => t.type === filterType);

  const totalIncome = transactions.filter(t => t.type === 'INCOME').reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'EXPENSE').reduce((sum, t) => sum + t.amount, 0);
  const netBalance = totalIncome - totalExpense;

  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formCategory || !formDesc || !formAmount) {
      alert("Lengkapi semua form transaksi!");
      return;
    }

    const newTx: Transaction = {
      id: Math.random().toString(),
      date: new Date(formDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
      category: formCategory,
      description: formDesc,
      amount: parseInt(formAmount),
      type: formType
    };

    setTransactions([newTx, ...transactions]);
    setShowAddForm(false);
    setFormCategory('');
    setFormDesc('');
    setFormAmount('');
  };

  const getCategoryBadge = (category: string, type: TransactionType) => {
    if (type === 'INCOME') {
      return <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-green-500/10 text-green-400 border border-green-500/20">{category}</span>;
    }

    if (category.toLowerCase().includes('stok')) {
      return <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-primary/10 text-primary border border-primary/20">{category}</span>;
    } else if (category.toLowerCase().includes('ongkir')) {
      return <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-secondary/10 text-secondary border border-secondary/20">{category}</span>;
    }
    return <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-tertiary/10 text-on-tertiary-container border border-tertiary/20">{category}</span>;
  };

  return (
    <>
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="text-4xl font-headline font-extrabold tracking-tighter text-on-surface mb-2">Cash Book</h2>
          <div className="flex items-center gap-3 text-on-surface-variant">
            <span className="material-symbols-outlined text-sm">calendar_month</span>
            <span className="text-sm font-medium">Bulan Ini (Maret 2026)</span>
            <span className="material-symbols-outlined text-sm flex items-center justify-center p-1 rounded-full hover:bg-surface-container transition-colors cursor-pointer" title="Pilih Bulan">expand_more</span>
          </div>
        </div>
        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-gradient-to-br from-primary to-secondary text-on-primary-container px-6 py-3 rounded-xl font-headline font-bold text-sm flex items-center gap-2 hover:scale-[1.02] active:opacity-80 transition-all shadow-lg shadow-primary/10"
        >
          <span className="material-symbols-outlined text-lg">{showAddForm ? 'close' : 'add'}</span>
          {showAddForm ? 'Tutup Form' : 'Catat Baru'}
        </button>
      </div>

      {showAddForm && (
        <div className="mb-12 glass-card rounded-3xl p-8 border border-primary/30 shadow-[0_10px_40px_rgba(201,168,76,0.1)] animate-in slide-in-from-top-4 fade-in">
          <h3 className="text-xl font-headline font-bold text-primary mb-6">Pencatatan Keuangan Manual</h3>
          <form onSubmit={handleAddTransaction} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-on-surface-variant">Jenis Transaksi</label>
                <div className="flex gap-4">
                  <label className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl bg-surface-container-high/50 cursor-pointer border border-transparent hover:border-green-500/30 transition-all">
                    <input type="radio" checked={formType === 'INCOME'} onChange={() => setFormType('INCOME')} className="w-4 h-4 text-green-500 bg-surface-container border-outline-variant focus:ring-green-500/50" />
                    <span className="text-sm font-bold text-green-400">Pemasukan</span>
                  </label>
                  <label className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl bg-surface-container-high/50 cursor-pointer border border-transparent hover:border-error/30 transition-all">
                    <input type="radio" checked={formType === 'EXPENSE'} onChange={() => setFormType('EXPENSE')} className="w-4 h-4 text-error bg-surface-container border-outline-variant focus:ring-error/50" />
                    <span className="text-sm font-bold text-error">Pengeluaran</span>
                  </label>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-on-surface-variant">Tanggal</label>
                <input type="date" value={formDate} onChange={e => setFormDate(e.target.value)} className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-4 py-3 text-sm focus:border-primary/50 text-white" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-on-surface-variant">Kategori</label>
                <input type="text" placeholder="Cth: Penjualan Offline" value={formCategory} onChange={e => setFormCategory(e.target.value)} className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-4 py-3 text-sm focus:border-primary/50 text-white" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-on-surface-variant">Nominal (Rp)</label>
                <input type="number" placeholder="500000" value={formAmount} onChange={e => setFormAmount(e.target.value)} className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-4 py-3 text-sm font-bold font-headline focus:border-primary/50 text-white" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-on-surface-variant">Keterangan / Deskripsi</label>
                <input type="text" placeholder="Catatan transaksi..." value={formDesc} onChange={e => setFormDesc(e.target.value)} className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-4 py-3 text-sm focus:border-primary/50 text-white" />
              </div>
            </div>

            <div className="flex justify-end border-t border-outline-variant/10 pt-6">
              <button type="submit" className="px-8 py-3 rounded-xl bg-primary text-on-primary font-bold text-sm shadow-[0_5px_15px_rgba(201,168,76,0.3)] hover:scale-[1.02] transition-all">Simpan Catatan</button>
            </div>
          </form>
        </div>
      )}

      {/* DASHBOARD SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="glass-card rounded-3xl p-6 border border-outline-variant/10 relative overflow-hidden group">
          <div className="absolute right-0 top-0 w-32 h-32 bg-primary/5 rounded-full blur-[40px] group-hover:bg-primary/10 transition-all"></div>
          <p className="text-sm text-on-surface-variant mb-2">Total Saldo (Net)</p>
          <div className="flex items-baseline gap-1">
            <span className="text-primary text-sm font-bold">Rp</span>
            <span className="text-3xl font-headline font-extrabold tracking-tighter text-on-surface">{(netBalance / 1000000).toFixed(2)}M</span>
          </div>
        </div>

        <div className="glass-card rounded-3xl p-6 border border-outline-variant/10">
          <p className="text-sm text-on-surface-variant mb-2">Pemasukan Kering</p>
          <div className="flex items-baseline gap-1">
            <span className="text-green-500 text-sm font-bold">Rp</span>
            <span className="text-3xl font-headline font-extrabold tracking-tighter text-on-surface">{(totalIncome / 1000000).toFixed(2)}M</span>
          </div>
        </div>

        <div className="glass-card rounded-3xl p-6 border border-outline-variant/10">
          <p className="text-sm text-on-surface-variant mb-2">Pengeluaran Operasional</p>
          <div className="flex items-baseline gap-1">
            <span className="text-error text-sm font-bold">Rp</span>
            <span className="text-3xl font-headline font-extrabold tracking-tighter text-on-surface">{(totalExpense / 1000000).toFixed(2)}M</span>
          </div>
        </div>
      </div>

      <div className="glass-card rounded-3xl overflow-x-auto border border-outline-variant/10 flex-1">
        <div className="px-8 py-6 flex justify-between items-center border-b border-outline-variant/10">
          <div className="flex items-center gap-6">
            <h3 className="font-headline font-bold text-lg">Riwayat Transaksi</h3>
            <div className="flex gap-4 bg-surface-container-low p-1 rounded-full border border-outline-variant/10">
              <button onClick={() => setFilterType('ALL')} className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all ${filterType === 'ALL' ? 'bg-surface-container-highest text-on-surface' : 'text-on-surface-variant hover:text-on-surface'}`}>Semua</button>
              <button onClick={() => setFilterType('INCOME')} className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all ${filterType === 'INCOME' ? 'bg-green-500/20 text-green-400' : 'text-on-surface-variant hover:text-on-surface'}`}>Pemasukan</button>
              <button onClick={() => setFilterType('EXPENSE')} className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all ${filterType === 'EXPENSE' ? 'bg-error/20 text-error' : 'text-on-surface-variant hover:text-on-surface'}`}>Pengeluaran</button>
            </div>
          </div>
          <button className="text-xs font-semibold text-primary flex items-center gap-1 hover:underline">
            <span className="material-symbols-outlined text-sm">print</span>
            Cetak PDF
          </button>
        </div>
        <table className="w-full text-left min-w-[600px] border-collapse">
          <thead className="bg-surface-container-high/40">
            <tr>
              <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Tanggal</th>
              <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Kategori</th>
              <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Deskripsi</th>
              <th className="px-8 py-4 text-right text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Jumlah (Rp)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/5">
            {filteredTransactions.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-12 text-on-surface-variant text-sm">Belum ada transaksi di tab ini.</td>
              </tr>
            ) : filteredTransactions.map(t => (
              <tr key={t.id} className="hover:bg-surface-container-highest/20 transition-colors group">
                <td className="px-8 py-5 text-sm font-medium">{t.date}</td>
                <td className="px-8 py-5">
                  {getCategoryBadge(t.category, t.type)}
                </td>
                <td className="px-8 py-5 text-sm text-on-surface-variant">{t.description}</td>
                <td className={`px-8 py-5 text-right font-headline font-bold ${t.type === 'INCOME' ? 'text-green-400' : 'text-on-surface'}`}>
                  {t.type === 'INCOME' ? '+ ' : '- '}{t.amount.toLocaleString('id-ID')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
