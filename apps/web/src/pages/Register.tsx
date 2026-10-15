import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authClient } from '../lib/auth-client';
import { motion } from 'framer-motion';

export default function Register() {
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateField = (field: string, value: string) => {
    const errors: Record<string, string> = { ...fieldErrors };

    switch (field) {
      case 'name':
        if (!value.trim()) {
          errors.name = 'Nama lengkap wajib diisi';
        } else if (value.trim().length < 2) {
          errors.name = 'Nama minimal 2 karakter';
        } else {
          delete errors.name;
        }
        break;
      case 'email':
        if (!value.trim()) {
          errors.email = 'Email wajib diisi';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          errors.email = 'Format email tidak valid. Contoh: nama@email.com';
        } else {
          delete errors.email;
        }
        break;
      case 'password':
        if (!value) {
          errors.password = 'Kata sandi wajib diisi';
        } else if (value.length < 8) {
          errors.password = 'Kata sandi minimal 8 karakter';
        } else if (!/[A-Za-z]/.test(value) || !/[0-9]/.test(value)) {
          errors.password = 'Kata sandi harus mengandung huruf dan angka';
        } else {
          delete errors.password;
        }
        // Also re-validate confirm if it has a value
        if (confirmPassword && value !== confirmPassword) {
          errors.confirmPassword = 'Konfirmasi kata sandi tidak cocok';
        } else if (confirmPassword) {
          delete errors.confirmPassword;
        }
        break;
      case 'confirmPassword':
        if (!value) {
          errors.confirmPassword = 'Konfirmasi kata sandi wajib diisi';
        } else if (value !== password) {
          errors.confirmPassword = 'Konfirmasi kata sandi tidak cocok';
        } else {
          delete errors.confirmPassword;
        }
        break;
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleBlur = (field: string, value: string) => {
    validateField(field, value);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const nameValid = !name.trim() || name.trim().length < 2 ? false : true;
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const passwordValid = password.length >= 8 && /[A-Za-z]/.test(password) && /[0-9]/.test(password);
    const confirmValid = password === confirmPassword;

    const newFieldErrors: Record<string, string> = {};
    if (!name.trim()) newFieldErrors.name = 'Nama lengkap wajib diisi';
    else if (!nameValid) newFieldErrors.name = 'Nama minimal 2 karakter';
    if (!email.trim()) newFieldErrors.email = 'Email wajib diisi';
    else if (!emailValid) newFieldErrors.email = 'Format email tidak valid. Contoh: nama@email.com';
    if (!password) newFieldErrors.password = 'Kata sandi wajib diisi';
    else if (password.length < 8) newFieldErrors.password = 'Kata sandi minimal 8 karakter';
    else if (!passwordValid) newFieldErrors.password = 'Kata sandi harus mengandung huruf dan angka';
    if (!confirmPassword) newFieldErrors.confirmPassword = 'Konfirmasi kata sandi wajib diisi';
    else if (!confirmValid) newFieldErrors.confirmPassword = 'Konfirmasi kata sandi tidak cocok';

    setFieldErrors(newFieldErrors);

    if (Object.keys(newFieldErrors).length > 0) {
      setError('Mohon perbaiki kesalahan pada form di atas');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      const { error: signUpError } = await authClient.signUp.email({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
      });
      
      setIsLoading(false);
      
      if (signUpError) {
        // Parse Better Auth error codes into user-friendly Indonesian messages
        const errorMessage = signUpError.message || '';
        const errorCode = (signUpError as any).code || '';
        
        if (errorMessage.includes('already') || errorMessage.includes('exists') || errorCode === 'USER_ALREADY_EXISTS') {
          setError('Email ini sudah terdaftar. Silakan gunakan email lain atau masuk ke akun Anda.');
        } else if (errorMessage.includes('password') && errorMessage.includes('short')) {
          setError('Kata sandi terlalu pendek. Gunakan minimal 8 karakter.');
        } else if (errorMessage.includes('invalid') && errorMessage.includes('email')) {
          setError('Format email tidak valid. Pastikan email Anda benar, contoh: nama@email.com');
        } else if (errorMessage.includes('rate') || errorMessage.includes('limit')) {
          setError('Terlalu banyak percobaan. Silakan coba lagi dalam beberapa menit.');
        } else {
          setError(errorMessage || `Pendaftaran gagal. Silakan periksa koneksi internet Anda dan coba lagi. (${errorCode})`);
        }
      } else {
        navigate('/');
      }
    } catch (err: any) {
      setIsLoading(false);
      console.error('Registration error:', err);
      if (err.message?.includes('fetch') || err.message?.includes('network') || err.message?.includes('Network')) {
        setError('Tidak dapat terhubung ke server. Pastikan koneksi internet Anda stabil.');
      } else {
        setError(`Terjadi kesalahan saat mendaftar: ${err.message || 'Unknown error'}`);
      }
    }
  };

  const inputBaseClass = "w-full bg-surface-container-low border focus:ring-1 focus:ring-primary rounded-xl py-3.5 pl-12 pr-4 text-sm text-on-surface placeholder:text-outline/50 transition-all";
  const inputNormalClass = `${inputBaseClass} border-transparent`;
  const inputErrorClass = `${inputBaseClass} border-error/50 ring-1 ring-error/20`;

  return (
    <div className="bg-surface-container-lowest text-on-surface font-body min-h-screen selection:bg-primary/30 selection:text-primary relative overflow-hidden">
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center" 
        style={{ backgroundImage: 'linear-gradient(to right, rgba(14, 14, 14, 0.95) 30%, rgba(14, 14, 14, 0.4) 100%), url(https://lh3.googleusercontent.com/aida-public/AB6AXuCudq0Dtm6NKgBKgOOLR3YQstkk5D0ErFuLmUIAovRncaEi0ESUMD0EGLhpLSdYOWrB6OBvceb6WpfljToQkSps_xBcT-usUNm__JW9NSOllmj1Jh3-nCBlQjPX-tFTHVnWpvTuH61xm01cazDNIFkzYfI2uY712v5tIhp-WMvYlBZRUVu5i0mOvQpPh6JXtM55WuRnPDWP8IBdCgS84V3mhRTkB_s47IHBj1ROnb1s-4diGWYzeaj48w-aopBA7TBrYhIzaqjMnupF)' }}
      ></div>

      <div className="relative z-10 flex min-h-screen">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full lg:w-1/2 flex flex-col justify-center px-6 md:px-16 lg:px-24 py-12"
        >
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
              <div className="bg-error/10 text-error p-4 rounded-xl text-sm mb-6 flex items-start gap-3 border border-error/20">
                <span className="material-symbols-outlined text-lg flex-shrink-0 mt-0.5">error</span>
                <span>{error}</span>
              </div>
            )}

            <form className="space-y-5" onSubmit={handleRegister} noValidate>
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-widest font-semibold text-primary ml-1">Nama Lengkap</label>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-sm">person</span>
                  <input 
                    className={fieldErrors.name ? inputErrorClass : inputNormalClass}
                    placeholder="Masukkan nama lengkap Anda" 
                    type="text" 
                    value={name} 
                    onChange={e => setName(e.target.value)} 
                    onBlur={() => handleBlur('name', name)}
                    required 
                  />
                </div>
                {fieldErrors.name && (
                  <p className="text-error text-xs ml-1 mt-1 flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">info</span>
                    {fieldErrors.name}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-widest font-semibold text-primary ml-1">Alamat Email</label>
                  <div className="relative group">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-sm">mail</span>
                    <input 
                      className={fieldErrors.email ? inputErrorClass : inputNormalClass}
                      placeholder="nama@email.com" 
                      type="email" 
                      value={email} 
                      onChange={e => setEmail(e.target.value)} 
                      onBlur={() => handleBlur('email', email)}
                      required 
                    />
                  </div>
                  {fieldErrors.email && (
                    <p className="text-error text-xs ml-1 mt-1 flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">info</span>
                      {fieldErrors.email}
                    </p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-widest font-semibold text-primary ml-1">Nomor Telepon <span className="text-outline/50">(opsional)</span></label>
                  <div className="relative group">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-sm">call</span>
                    <input className={inputNormalClass} placeholder="+62 812..." type="tel" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-widest font-semibold text-primary ml-1">Kata Sandi</label>
                  <div className="relative group">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-sm">lock</span>
                    <input 
                      className={fieldErrors.password ? inputErrorClass : inputNormalClass}
                      placeholder="Min. 8 karakter (huruf + angka)" 
                      type="password" 
                      value={password} 
                      onChange={e => setPassword(e.target.value)} 
                      onBlur={() => handleBlur('password', password)}
                      required 
                    />
                  </div>
                  {fieldErrors.password && (
                    <p className="text-error text-xs ml-1 mt-1 flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">info</span>
                      {fieldErrors.password}
                    </p>
                  )}
                  {!fieldErrors.password && password.length > 0 && password.length >= 8 && /[A-Za-z]/.test(password) && /[0-9]/.test(password) && (
                    <p className="text-green-400 text-xs ml-1 mt-1 flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">check_circle</span>
                      Kata sandi kuat
                    </p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-widest font-semibold text-primary ml-1">Konfirmasi Kata Sandi</label>
                  <div className="relative group">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-sm">shield</span>
                    <input 
                      className={fieldErrors.confirmPassword ? inputErrorClass : inputNormalClass}
                      placeholder="Ulangi kata sandi Anda" 
                      type="password" 
                      value={confirmPassword} 
                      onChange={e => setConfirmPassword(e.target.value)} 
                      onBlur={() => handleBlur('confirmPassword', confirmPassword)}
                      required 
                    />
                  </div>
                  {fieldErrors.confirmPassword && (
                    <p className="text-error text-xs ml-1 mt-1 flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">info</span>
                      {fieldErrors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>

              {/* Password requirements hint */}
              <div className="bg-surface-container-low/50 rounded-xl p-4 border border-outline-variant/10">
                <p className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant mb-2">Persyaratan Kata Sandi</p>
                <div className="grid grid-cols-2 gap-2">
                  <div className={`flex items-center gap-2 text-xs ${password.length >= 8 ? 'text-green-400' : 'text-outline/50'}`}>
                    <span className="material-symbols-outlined text-sm">{password.length >= 8 ? 'check_circle' : 'circle'}</span>
                    Minimal 8 karakter
                  </div>
                  <div className={`flex items-center gap-2 text-xs ${/[A-Za-z]/.test(password) ? 'text-green-400' : 'text-outline/50'}`}>
                    <span className="material-symbols-outlined text-sm">{/[A-Za-z]/.test(password) ? 'check_circle' : 'circle'}</span>
                    Mengandung huruf
                  </div>
                  <div className={`flex items-center gap-2 text-xs ${/[0-9]/.test(password) ? 'text-green-400' : 'text-outline/50'}`}>
                    <span className="material-symbols-outlined text-sm">{/[0-9]/.test(password) ? 'check_circle' : 'circle'}</span>
                    Mengandung angka
                  </div>
                  <div className={`flex items-center gap-2 text-xs ${password === confirmPassword && confirmPassword ? 'text-green-400' : 'text-outline/50'}`}>
                    <span className="material-symbols-outlined text-sm">{password === confirmPassword && confirmPassword ? 'check_circle' : 'circle'}</span>
                    Konfirmasi cocok
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

              <button disabled={isLoading} className="w-full py-4 bg-gradient-to-r from-primary to-secondary text-on-primary font-bold rounded-xl shadow-[0_8px_30px_rgb(230,195,100,0.2)] hover:scale-[1.02] active:scale-95 transition-all duration-300 tracking-widest uppercase text-xs mt-4 disabled:opacity-75 disabled:cursor-not-allowed flex items-center justify-center gap-2" type="submit">
                {isLoading ? (
                  <>
                    <span className="material-symbols-outlined animate-spin text-lg">progress_activity</span>
                    Memproses...
                  </>
                ) : 'Daftar Sekarang'}
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
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="hidden lg:flex w-1/2 items-end justify-start p-24"
        >
          <div className="max-w-md">
            <div className="w-12 h-1 bg-primary mb-8"></div>
            <blockquote className="font-headline text-4xl font-light italic text-white leading-tight mb-6">
              "Aroma adalah bentuk memori yang paling intens, sebuah identitas yang tak terucapkan."
            </blockquote>
            <p className="text-primary font-headline tracking-widest uppercase text-sm font-bold">The Gold Collection</p>
          </div>
        </motion.div>
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
