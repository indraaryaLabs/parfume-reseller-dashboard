import { Link, useLocation } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

export default function Header() {
  const { cartCount, openSearch, isAuthenticated } = useStore();
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  return (
    <header className="bg-[#0E0E0E]/80 backdrop-blur-xl docked full-width top-0 z-50 border-b border-[#353534]/30 shadow-[0_4px_30px_rgba(230,195,100,0.05)] sticky">
      <div className="flex justify-between items-center w-full px-6 py-4 max-w-screen-2xl mx-auto">
        <Link to="/" className="text-2xl font-bold tracking-tighter bg-gradient-to-r from-[#E6C364] to-[#FFB1C0] bg-clip-text text-transparent font-['Epilogue']">Parfumé</Link>
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className={`font-['Epilogue'] tracking-tight transition-colors duration-300 ${location.pathname === '/' ? 'text-[#E6C364] border-b-2 border-[#E6C364]' : 'text-[#8E8E8E] hover:text-[#E6C364]'}`}>Beranda</Link>
          <Link to="/collections" className={`font-['Epilogue'] tracking-tight transition-colors duration-300 ${location.pathname === '/collections' ? 'text-[#E6C364] border-b-2 border-[#E6C364]' : 'text-[#8E8E8E] hover:text-[#E6C364]'}`}>Koleksi</Link>
          <Link to="/promos" className={`font-['Epilogue'] tracking-tight transition-colors duration-300 ${location.pathname === '/promos' ? 'text-[#E6C364] border-b-2 border-[#E6C364]' : 'text-[#8E8E8E] hover:text-[#E6C364]'}`}>Promo</Link>
        </nav>
        <div className="flex items-center space-x-6 text-[#E6C364]">
          <button onClick={openSearch} className="material-symbols-outlined hover:scale-110 duration-200">search</button>
          <Link to="/cart" className="relative material-symbols-outlined hover:scale-110 duration-200">
            shopping_cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-secondary text-on-secondary text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-in zoom-in">
                {cartCount}
              </span>
            )}
          </Link>
          <Link to="/orders" className={`material-symbols-outlined hover:scale-110 duration-200 ${isActive('/orders') ? 'text-white' : ''}`}>receipt_long</Link>
          {isAuthenticated ? (
            <Link to="/settings/profile" className={`material-symbols-outlined hover:scale-110 duration-200 ${isActive('/settings') ? 'text-white' : ''}`}>person</Link>
          ) : (
            <Link to="/login" className={`material-symbols-outlined hover:scale-110 duration-200 ${isActive('/login') ? 'text-white' : ''}`}>person</Link>
          )}
        </div>
      </div>
    </header>
  )
}
