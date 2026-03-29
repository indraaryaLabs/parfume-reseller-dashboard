import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authClient } from '../lib/auth-client';

export default function Register() {
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    const { error: signUpError } = await authClient.signUp.email({
      name,
      email,
      password,
    });
    
    setIsLoading(false);
    
    if (signUpError) {
      setError(signUpError.message || 'Registration failed');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="bg-surface-container-lowest text-on-surface font-body min-h-screen selection:bg-primary/30 selection:text-primary relative overflow-hidden">
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center" 
        style={{ backgroundImage: 'linear-gradient(to right, rgba(14, 14, 14, 0.95) 30%, rgba(14, 14, 14, 0.4) 100%), url(https://lh3.googleusercontent.com/aida-public/AB6AXuCudq0Dtm6NKgBKgOOLR3YQstkk5D0ErFuLmUIAovRncaEi0ESUMD0EGLhpLSdYOWrB6OBvceb6WpfljToQkSps_xBcT-usUNm__JW9NSOllmj1Jh3-nCBlQjPX-tFTHVnWpvTuH61xm01cazDNIFkzYfI2uY712v5tIhp-WMvYlBZRUVu5i0mOvQpPh6JXtM55WuRnPDWP8IBdCgS84V3mhRTkB_s47IHBj1ROnb1s-4diGWYzeaj48w-aopBA7TBrYhIzaqjMnupF)' }}
      ></div>

      <div className="relative z-10 flex min-h-screen">
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 md:px-16 lg:px-24 py-12">
          <div className="mb-12">
            <h1 className="font-headline text-2xl font-bold tracking-[0.3em] uppercase text-primary mb-2">L'ESSENCE NOIRE</h1>
            <p className="text-on-surface-variant font-light tracking-wide italic">Mulai perjalanan aroma Anda yang paling eksklusif.</p>
          </div>

          <div className="glass-card rounded-2xl p-8 md:p-10 shadow-2xl">
            <div className="mb-8">
              <h2 className="font-headline text-3xl font-bold text-on-surface mb-2">Pendaftaran Akun</h2>
              <p className="text-on-surface-variant text-sm">Bergabunglah dengan komunitas kurator wewangian premium kami.</p>
            </div>

            {error && (
              <div className="bg-error/10 text-error p-3 rounded-lg text-sm text-center mb-4">
                {error}
              </div>
            )}

            <form className="space-y-5" onSubmit={handleRegister}>
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-widest font-semibold text-primary ml-1">Nama Lengkap</label>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-sm">person</span>
                  <input className="w-full bg-surface-container-low border-none focus:ring-1 focus:ring-primary rounded-xl py-3.5 pl-12 pr-4 text-sm text-on-surface placeholder:text-outline/50 transition-all" placeholder="Masukkan nama lengkap Anda" type="text" value={name} onChange={e => setName(e.target.value)} required />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-widest font-semibold text-primary ml-1">Alamat Email</label>
                  <div className="relative group">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-sm">mail</span>
                    <input className="w-full bg-surface-container-low border-none focus:ring-1 focus:ring-primary rounded-xl py-3.5 pl-12 pr-4 text-sm text-on-surface placeholder:text-outline/50 transition-all" placeholder="nama@email.com" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-widest font-semibold text-primary ml-1">Nomor Telepon</label>
                  <div className="relative group">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-sm">call</span>
                    <input className="w-full bg-surface-container-low border-none focus:ring-1 focus:ring-primary rounded-xl py-3.5 pl-12 pr-4 text-sm text-on-surface placeholder:text-outline/50 transition-all" placeholder="+62 812..." type="tel" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-widest font-semibold text-primary ml-1">Kata Sandi</label>
                  <div className="relative group">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-sm">lock</span>
                    <input className="w-full bg-surface-container-low border-none focus:ring-1 focus:ring-primary rounded-xl py-3.5 pl-12 pr-4 text-sm text-on-surface placeholder:text-outline/50 transition-all" placeholder="••••••••" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-widest font-semibold text-primary ml-1">Konfirmasi Kata Sandi</label>
                  <div className="relative group">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-sm">shield</span>
                    <input className="w-full bg-surface-container-low border-none focus:ring-1 focus:ring-primary rounded-xl py-3.5 pl-12 pr-4 text-sm text-on-surface placeholder:text-outline/50 transition-all" placeholder="••••••••" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3 py-2">
                <div className="relative flex items-center">
                  <input className="w-5 h-5 rounded border-outline-variant bg-surface-container-low text-primary focus:ring-primary focus:ring-offset-0 focus:ring-offset-transparent" id="terms" type="checkbox" required />
                </div>
                <label className="text-xs text-on-surface-variant leading-relaxed" htmlFor="terms">
                  Saya menyetujui <Link to="#" className="text-primary cursor-pointer hover:underline">Syarat & Ketentuan</Link> serta <Link to="#" className="text-primary cursor-pointer hover:underline">Kebijakan Privasi</Link> L'Essence Noire.
                </label>
              </div>

              <button disabled={isLoading} className="w-full py-4 bg-gradient-to-r from-primary to-secondary text-on-primary font-bold rounded-xl shadow-[0_8px_30px_rgb(230,195,100,0.2)] hover:scale-[1.02] active:scale-95 transition-all duration-300 tracking-widest uppercase text-xs mt-4 disabled:opacity-75 disabled:cursor-not-allowed" type="submit">
                {isLoading ? 'Processing...' : 'Daftar Sekarang'}
              </button>
            </form>

            <div className="mt-10 pt-8 border-t border-outline-variant/30 text-center">
              <p className="text-sm text-on-surface-variant">
                Sudah memiliki akun? 
                <Link to="/login" className="text-primary font-semibold ml-1 hover:text-secondary transition-colors underline underline-offset-4">Masuk di sini</Link>
              </p>
            </div>
          </div>

          <div className="mt-12 flex justify-between items-center opacity-40">
            <div className="flex space-x-6">
              <span className="text-[10px] tracking-widest uppercase">Instagram</span>
              <span className="text-[10px] tracking-widest uppercase">Twitter</span>
            </div>
            <span className="text-[10px] tracking-widest uppercase">© {new Date().getFullYear()} L'Essence Noire</span>
          </div>
        </div>

        <div className="hidden lg:flex w-1/2 items-end justify-start p-24">
          <div className="max-w-md">
            <div className="w-12 h-1 bg-primary mb-8"></div>
            <blockquote className="font-headline text-4xl font-light italic text-white leading-tight mb-6">
              "Aroma adalah bentuk memori yang paling intens, sebuah identitas yang tak terucapkan."
            </blockquote>
            <p className="text-primary font-headline tracking-widest uppercase text-sm font-bold">The Gold Collection</p>
          </div>
        </div>
      </div>

      <div className="fixed top-0 right-0 p-8 z-20">
        <button className="flex items-center space-x-2 text-primary hover:text-secondary transition-colors group">
          <span className="text-[10px] tracking-widest font-bold uppercase group-hover:mr-2 transition-all">Butuh Bantuan?</span>
          <span className="material-symbols-outlined text-lg">help_outline</span>
        </button>
      </div>
    </div>
  );
}
