import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiClient } from '../../lib/api-client';

export default function AdminAddProduct() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    description: '',
    topNotes: '',
    midNotes: '',
    baseNotes: '',
    longevity: 8,
    projection: 7,
    price: '',
    costPrice: '',
    stock: '',
    category: 'Fresh',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8DSSdK7FjpVpN6Cz2sg-rmN9WnCcKMY1pSrcg6gKmefRSkE8ydMADxzM0z-RPbqGUyjuQAq-5UwPtMnrrZ5Ct9WCp2c9MtigO6KQJtoxx_OfEoNao8QYQaTh2oYniIgL_YuJiCvqz_eh3KT5gqId5BfcZXF7gl63r0GYM4Rkee2zuHfo1hCyqECEJ_uz8UAeySHkcCYPDpwwSa8ES1Not-AXOp9Lj4NBqihK4CbDbF_sULSAe8LMjEd5R0Otc2c8VLL_HBvRCk2_n'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create a temporary local object URL for the preview
      const objectUrl = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, image: objectUrl }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic Validation
    if (!formData.name || !formData.brand || !formData.price || !formData.stock) {
      alert("Harap lengkapi field Nama Produk, Brand, Harga, dan Stok!");
      return;
    }

    setIsSubmitting(true);

    try {
      // Send product data to the API
      const productPayload = {
        name: formData.name,
        brand: formData.brand,
        description: formData.description || null,
        topNotes: formData.topNotes || null,
        midNotes: formData.midNotes || null,
        baseNotes: formData.baseNotes || null,
        longevity: Number(formData.longevity),
        projection: Number(formData.projection),
        price: parseInt(formData.price),
        costPrice: formData.costPrice ? parseInt(formData.costPrice) : null,
        stock: parseInt(formData.stock),
        category: formData.category || null,
        status: parseInt(formData.stock) > 0 ? 'READY STOCK' : 'SOLD OUT',
      };

      const res = await apiClient.post('/products', productPayload);
      const createdProduct = res.data;

      // Also add the image if we have a valid URL (not a blob)
      if (formData.image && !formData.image.startsWith('blob:')) {
        await apiClient.post(`/products/${createdProduct.id}/images`, {
          url: formData.image,
          sortOrder: 0,
        });
      }

      alert(`Produk "${formData.name}" berhasil ditambahkan ke katalog!`);
      navigate('/admin/products');
    } catch (err: any) {
      console.error('Failed to create product:', err);
      const message = err?.response?.data?.error || err.message || 'Gagal menambahkan produk';
      alert(`Error: ${message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Format currency securely
  const formatCurrency = (val: string) => {
    if (!val) return 'Rp 0';
    const num = parseInt(val.replace(/\D/g, ''), 10);
    if (isNaN(num)) return 'Rp 0';
    return `Rp ${num.toLocaleString('id-ID')}`;
  };

  const formattedPrice = formatCurrency(formData.price);
  const displayBrand = formData.brand || 'Brand Name';
  const displayName = formData.name || 'Product Name';

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-10 flex justify-between items-end">
        <div>
          <nav className="flex gap-2 text-xs text-on-surface-variant mb-2 uppercase tracking-widest font-semibold">
            <Link to="/admin/products" className="hover:text-primary transition-colors">Catalogue</Link>
            <span>/</span>
            <span className="text-primary">New Product</span>
          </nav>
          <h2 className="text-4xl font-headline font-extrabold tracking-tight text-on-surface">Tambah Koleksi <span className="text-primary italic">Baru</span></h2>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-12">
        <section className="lg:w-[60%] space-y-8">
          <div className="bg-surface-container/60 backdrop-blur-xl rounded-3xl p-8 border border-outline-variant/10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1.5 h-6 bg-primary rounded-full"></div>
              <h3 className="text-xl font-headline font-bold text-on-surface">Informasi Produk</h3>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider flex items-center gap-1">
                    Nama Produk <span className="text-error">*</span>
                  </label>
                  <input name="name" value={formData.name} onChange={handleChange} className="w-full bg-surface-container-low border border-outline-variant/20 rounded-xl px-4 py-3 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 outline-none transition-all text-on-surface" placeholder="Contoh: Dior Sauvage EDP" type="text"/>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider flex items-center gap-1">
                    Brand <span className="text-error">*</span>
                  </label>
                  <input name="brand" value={formData.brand} onChange={handleChange} className="w-full bg-surface-container-low border border-outline-variant/20 rounded-xl px-4 py-3 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 outline-none transition-all text-on-surface" placeholder="Contoh: Christian Dior" type="text"/>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Deskripsi Wangi</label>
                <textarea name="description" value={formData.description} onChange={handleChange} className="w-full bg-surface-container-low border border-outline-variant/20 rounded-xl px-4 py-3 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 outline-none transition-all text-on-surface resize-none" placeholder="Ceritakan karakter dari aroma ini..." rows={4}></textarea>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-primary uppercase tracking-widest">Top Notes</label>
                  <input name="topNotes" value={formData.topNotes} onChange={handleChange} className="w-full bg-surface-container-low border border-outline-variant/20 rounded-xl px-4 py-2.5 text-sm focus:border-primary/50 outline-none transition-all text-on-surface" placeholder="Bergamot..." type="text"/>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-primary uppercase tracking-widest">Mid Notes</label>
                  <input name="midNotes" value={formData.midNotes} onChange={handleChange} className="w-full bg-surface-container-low border border-outline-variant/20 rounded-xl px-4 py-2.5 text-sm focus:border-primary/50 outline-none transition-all text-on-surface" placeholder="Lavender..." type="text"/>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-primary uppercase tracking-widest">Base Notes</label>
                  <input name="baseNotes" value={formData.baseNotes} onChange={handleChange} className="w-full bg-surface-container-low border border-outline-variant/20 rounded-xl px-4 py-2.5 text-sm focus:border-primary/50 outline-none transition-all text-on-surface" placeholder="Ambroxan..." type="text"/>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-8 py-4">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Longevity</label>
                    <span className="text-primary font-headline font-bold">{formData.longevity}/10</span>
                  </div>
                  <input name="longevity" value={formData.longevity} onChange={handleChange} className="w-full h-1.5 bg-surface-container-highest rounded-full appearance-none cursor-pointer custom-range" max="10" min="1" type="range" />
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Projection</label>
                    <span className="text-primary font-headline font-bold">{formData.projection}/10</span>
                  </div>
                  <input name="projection" value={formData.projection} onChange={handleChange} className="w-full h-1.5 bg-surface-container-highest rounded-full appearance-none cursor-pointer custom-range" max="10" min="1" type="range" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider flex items-center gap-1">
                    Harga Jual (Rp) <span className="text-error">*</span>
                  </label>
                  <input name="price" value={formData.price} onChange={handleChange} className="w-full bg-surface-container-low border border-outline-variant/20 rounded-xl px-4 py-3 focus:border-primary/50 outline-none transition-all text-on-surface font-headline font-bold" placeholder="0" type="number"/>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Harga Modal (Rp)</label>
                  <input name="costPrice" value={formData.costPrice} onChange={handleChange} className="w-full bg-surface-container-low border border-outline-variant/20 rounded-xl px-4 py-3 focus:border-primary/50 outline-none transition-all text-on-surface font-headline font-bold" placeholder="0" type="number"/>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider flex items-center gap-1">
                    Stok <span className="text-error">*</span>
                  </label>
                  <input name="stock" value={formData.stock} onChange={handleChange} className="w-full bg-surface-container-low border border-outline-variant/20 rounded-xl px-4 py-3 focus:border-primary/50 outline-none transition-all text-on-surface font-headline font-bold" placeholder="0" type="number"/>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Media Produk</label>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleImageChange} 
                  accept="image/png, image/jpeg, image/webp" 
                  className="hidden" 
                />
                <div onClick={handleImageClick} className="border-2 border-dashed border-outline-variant/30 rounded-2xl p-10 flex flex-col items-center justify-center bg-surface-container-low/30 group hover:border-primary/40 hover:bg-surface-container-low transition-all cursor-pointer">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-primary text-3xl">upload_file</span>
                  </div>
                  <p className="text-on-surface font-medium">Klik atau geser foto produk ke sini</p>
                  <p className="text-xs text-on-surface-variant mt-1">PNG, JPG up to 10MB (Square recommended)</p>
                </div>
              </div>
              <div className="flex gap-4 pt-6">
                <Link to="/admin/products" className="flex-1 py-4 px-6 border border-outline-variant/20 rounded-2xl font-bold text-center text-on-surface hover:bg-surface-container-highest transition-all">
                  Batal
                </Link>
                <button 
                  disabled={isSubmitting}
                  className="flex-[2] py-4 px-6 bg-gradient-to-r from-primary to-secondary disabled:opacity-70 disabled:scale-100 rounded-2xl font-bold text-on-primary shadow-[0_10px_30px_rgba(230,195,100,0.3)] hover:scale-[1.02] transition-all flex items-center justify-center gap-2 cursor-pointer" 
                  type="submit"
                >
                  {isSubmitting ? (
                    <>
                      <span className="material-symbols-outlined animate-spin text-xl">progress_activity</span>
                      Memproses...
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-xl">save</span>
                      Simpan Produk
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </section>
        <aside className="lg:w-[40%]">
          <div className="sticky top-24">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-bold text-on-surface-variant uppercase tracking-widest">Live Preview</h3>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-[10px] font-bold text-on-surface-variant">SYNCED</span>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-primary/10 to-secondary/10 blur-3xl rounded-full opacity-50"></div>
              <div className="relative bg-surface-container rounded-[2.5rem] overflow-hidden border border-outline-variant/10 shadow-2xl transition-transform duration-500 hover:scale-[1.02]">
                <div className="absolute top-6 left-6 z-10">
                  <span className={`bg-primary-container text-on-primary-container text-[10px] font-black tracking-widest px-4 py-1.5 rounded-full shadow-lg ${!formData.stock || parseInt(formData.stock) <= 0 ? 'bg-error text-white' : ''}`}>
                    {!formData.stock || parseInt(formData.stock) <= 0 ? 'OUT OF STOCK' : 'READY'}
                  </span>
                </div>
                <div className="h-96 w-full bg-[#111] flex items-center justify-center overflow-hidden">
                  <img alt={formData.name || 'Preview'} className="w-full h-full object-cover opacity-90 group-hover:scale-110 transition-transform duration-700" src={formData.image}/>
                </div>
                <div className="p-8 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[10px] text-primary font-bold tracking-widest uppercase mb-1 truncate max-w-[120px]">{displayBrand}</p>
                      <h4 className="text-2xl font-headline font-bold text-on-surface tracking-tight truncate max-w-[200px]">{displayName}</h4>
                    </div>
                    <div className="text-right">
                      {formData.price && <p className="text-xs text-on-surface-variant line-through opacity-50">Rp {(parseInt(formData.price)+300000).toLocaleString('id-ID')}</p>}
                      <p className="text-xl font-headline font-extrabold text-primary">{formattedPrice}</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-center py-4 border-y border-outline-variant/10">
                    <div className="flex flex-col">
                      <span className="text-[9px] text-on-surface-variant font-bold uppercase tracking-wider">Longevity</span>
                      <div className="flex gap-0.5 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className={`w-1.5 h-1.5 rounded-full ${i < formData.longevity / 2 ? 'bg-primary' : 'bg-outline-variant/30'}`}></div>
                        ))}
                      </div>
                    </div>
                    <div className="h-6 w-px bg-outline-variant/10"></div>
                    <div className="flex flex-col">
                      <span className="text-[9px] text-on-surface-variant font-bold uppercase tracking-wider">Projection</span>
                      <div className="flex gap-0.5 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className={`w-1.5 h-1.5 rounded-full ${i < formData.projection / 2 ? 'bg-primary' : 'bg-outline-variant/30'}`}></div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="flex-1 bg-surface-container-highest border border-outline-variant/20 text-on-surface py-3 rounded-2xl font-bold text-sm hover:bg-surface-container-high transition-all">
                      View Details
                    </button>
                    <button className="w-12 h-12 flex items-center justify-center rounded-2xl border border-primary/30 text-primary hover:bg-primary/10 transition-all">
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>shopping_cart</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 p-6 bg-primary/5 border border-primary/10 rounded-3xl">
              <div className="flex gap-4">
                <span className="material-symbols-outlined text-primary">auto_awesome</span>
                <div>
                  <h4 className="text-sm font-bold text-primary mb-1">Editor's Tip</h4>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Gunakan deskripsi yang menggugah indera penciuman pelanggan. Sebutkan suasana yang diciptakan oleh wewangian ini.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
