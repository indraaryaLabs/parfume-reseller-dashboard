import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { authClient } from '../lib/auth-client';
import { motion } from 'framer-motion';

export default function Login() {
  const navigate = useNavigate();
  const { logout } = useStore();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    const { error: signInError } = await authClient.signIn.email({
      email,
      password,
    });
    
    setIsLoading(false);
    
    if (signInError) {
      const msg = signInError.message || '';
      if (msg.includes('credential') || msg.includes('password') || msg.includes('Invalid')) {
        setError('Email atau kata sandi salah. Silakan coba lagi.');
      } else if (msg.includes('not found') || msg.includes('user')) {
        setError('Akun tidak ditemukan. Silakan daftar terlebih dahulu.');
      } else {
        setError(msg || 'Login gagal. Silakan coba lagi.');
      }
    } else {
      // Check user role and redirect accordingly
      try {
        const res = await fetch('/api/me', { credentials: 'include' });
        if (res.ok) {
          const data = await res.json();
          if (data.role === 'admin') {
            navigate('/admin');
            return;
          }
        }
      } catch {
        // ignore, just go to home
      }
      navigate('/');
    }
  };

  const handleGuest = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="bg-surface-container-lowest text-on-surface font-body min-h-screen flex items-center justify-center selection:bg-primary selection:text-on-primary overflow-hidden">
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent z-10"></div>
        <img 
          alt="Luxury Perfume" 
          className="w-full h-full object-cover opacity-40" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCIoM30EGQpW_a5VYYczUDLH0REH-yG0wKVIbIoKBJ0p2ciK1RQlsgSkZ9u3Q5ohDtHQeByPiVoqpArXir17v4lFaJq40I3LhdoB6HZD_26LnwGVLvz1G5L0jnP-wZQtZgFh9Unv7Pq2zCMXa_3rNwP9_Q55HfwjcJ2W69jpnQK8ODUHeaKYt8XW4V49v7ASLWJ4ZJssPex1DTwd5NEV6H_EKREPA91fuvpUktX09ks7tNnmAsqAbWZB_Dof4vMRRVEQVwwQjJb3I_a"
        />
      </div>

      <div className="relative z-20 w-full max-w-6xl px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-24">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full md:w-1/2 space-y-8"
        >
          <div className="space-y-4">
            <span className="inline-block px-4 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-[10px] uppercase tracking-[0.3em] font-semibold">
              The Essence of Darkness
            </span>
            <h1 className="font-headline text-5xl lg:text-7xl font-bold tracking-tighter text-glow leading-tight">
              L'Essence <br/> <span className="text-primary italic">Noire</span>
            </h1>
            <p className="text-on-surface-variant text-lg max-w-md font-light leading-relaxed">
              Masuki dimensi keharuman yang paling eksklusif. Kurasi wewangian premium untuk jiwa yang berani.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-outline-variant/20 max-w-sm">
            <div>
              <div className="font-headline text-2xl font-bold text-primary">500+</div>
              <div className="text-[10px] uppercase tracking-wider text-on-surface-variant">Koleksi</div>
            </div>
            <div>
              <div className="font-headline text-2xl font-bold text-primary">12k</div>
              <div className="text-[10px] uppercase tracking-wider text-on-surface-variant">Member</div>
            </div>
            <div>
              <div className="font-headline text-2xl font-bold text-primary">24h</div>
              <div className="text-[10px] uppercase tracking-wider text-on-surface-variant">Eksklusif</div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="w-full md:w-[480px] shrink-0"
        >
          <div className="glass-card p-10 lg:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 blur-[80px] rounded-full"></div>
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-secondary/10 blur-[80px] rounded-full"></div>
            <div className="relative z-10 space-y-8">
              <div className="text-center md:text-left">
                <h2 className="font-headline text-3xl font-bold text-on-surface">Selamat Datang</h2>
                <p className="text-on-surface-variant text-sm mt-2">Silakan masuk untuk melanjutkan perjalanan Anda.</p>
              </div>

              {error && (
                <div className="bg-error/10 text-error p-3 rounded-lg text-sm text-center">
                  {error}
                </div>
              )}

              <form className="space-y-6" onSubmit={handleLogin}>
                <div className="space-y-2">
                  <label className="block text-[10px] uppercase tracking-widest font-semibold text-primary ml-1">Alamat Email</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">mail</span>
                    <input className="w-full bg-surface-container-low border-none focus:ring-1 focus:ring-primary/50 rounded-2xl py-4 pl-12 pr-4 text-on-surface placeholder:text-on-surface-variant/40 transition-all" placeholder="nama@email.com" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-[10px] uppercase tracking-widest font-semibold text-primary ml-1">Kata Sandi</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">lock</span>
                    <input className="w-full bg-surface-container-low border-none focus:ring-1 focus:ring-primary/50 rounded-2xl py-4 pl-12 pr-12 text-on-surface placeholder:text-on-surface-variant/40 transition-all" placeholder="••••••••" type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required />
                    <button onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors cursor-pointer" type="button" title={showPassword ? 'Sembunyikan sandi' : 'Tampilkan sandi'}>
                      <span className="material-symbols-outlined text-lg">{showPassword ? 'visibility_off' : 'visibility'}</span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input className="w-4 h-4 rounded border-none bg-surface-container-highest text-primary focus:ring-0 focus:ring-offset-0" type="checkbox" />
                    <span className="text-on-surface-variant group-hover:text-on-surface transition-colors">Ingat Saya</span>
                  </label>
                  <Link to="#" className="text-primary hover:text-secondary font-medium transition-colors">Lupa Kata Sandi?</Link>
                </div>

                <button disabled={isLoading} className="w-full py-4 bg-gradient-to-r from-primary to-primary-container text-on-primary font-bold rounded-2xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-75 disabled:cursor-not-allowed" type="submit">
                  {isLoading ? 'Loading...' : 'Masuk Ke Akun'}
                </button>
                <button type="button" onClick={handleGuest} className="w-full py-4 mt-4 border border-primary/30 text-primary font-semibold rounded-2xl hover:bg-primary/5 hover:border-primary/50 transition-all text-sm uppercase tracking-widest flex items-center justify-center">
                  Masuk Tanpa Akun
                </button>
              </form>

              <div className="relative flex items-center gap-4 py-2">
                <div className="flex-grow h-[1px] bg-outline-variant/30"></div>
                <span className="text-[10px] uppercase tracking-widest text-on-surface-variant font-medium">Atau Masuk Dengan</span>
                <div className="flex-grow h-[1px] bg-outline-variant/30"></div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-3 py-3 rounded-2xl bg-surface-container-low border border-outline-variant/20 hover:bg-surface-container-high transition-colors">
                  <img alt="Google" className="w-5 h-5" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBaCnJMkXqk-vG_563fj6xxSZu4LFZtj67yZtAqnRKRQKqiZZgm5jckuzAWE2x-GrL8gzNJX7cVQexKk4YKkxR71m84yKCV8uO_0NKJggjsxk4NCZI6pEnRTyvUqzRBJ8GDVgFmap1S2KWX2uYCMNXDRIVEC8DGfcftJ6emayFQHP-6s1knyU7o6-4Gp6Vsc0ITGrSpNGb_6Lk9lpcdU-yNG6ss4p5Hi3csFuTK3anpdbFT_7MVYUQYeesP98qZ66cAJbWJzrIwz_90" />
                  <span className="text-xs font-semibold">Google</span>
                </button>
                <button className="flex items-center justify-center gap-3 py-3 rounded-2xl bg-surface-container-low border border-outline-variant/20 hover:bg-surface-container-high transition-colors">
                  <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>brand_awareness</span>
                  <span className="text-xs font-semibold">Apple</span>
                </button>
              </div>

              <p className="text-center text-sm text-on-surface-variant pt-4">
                Belum punya akun? <Link to="/register" className="text-primary font-bold hover:underline decoration-primary/30 underline-offset-4 transition-all">Daftar Sekarang</Link>
              </p>
            </div>
          </div>
          <div className="mt-8 flex justify-center gap-6 text-[10px] uppercase tracking-[0.2em] text-on-surface-variant/50">
            <Link to="#" className="hover:text-primary transition-colors">Kebijakan Privasi</Link>
            <span>•</span>
            <Link to="#" className="hover:text-primary transition-colors">Syarat & Ketentuan</Link>
          </div>
        </motion.div>
      </div>

      <div className="fixed bottom-8 left-8 hidden lg:block z-30">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary text-xl">support_agent</span>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider text-on-surface-variant">Bantuan 24/7</div>
            <div className="text-xs font-bold text-on-surface tracking-wide">Concierge Service</div>
          </div>
        </div>
      </div>
    </div>
  );
}
