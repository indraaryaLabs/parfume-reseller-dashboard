import { Link, useLocation } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

export default function BottomNav() {
  const { cartCount, openSearch } = useStore();
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="md:hidden fixed bottom-6 left-0 right-0 z-50 flex justify-around items-center px-4">
      <div className="bg-[#201F1F]/90 backdrop-blur-lg fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.5)] flex justify-around items-center p-2">
        <Link to="/" className={`flex flex-col items-center justify-center rounded-full p-3 transition-all ${location.pathname === '/' ? 'bg-gradient-to-br from-[#E6C364] to-[#FFB1C0] text-[#0E0E0E] scale-110 shadow-lg' : 'text-[#8E8E8E] hover:text-white'}`}>
          <span className="material-symbols-outlined">home</span>
        </Link>
        <button onClick={openSearch} className="flex flex-col items-center justify-center text-[#8E8E8E] p-3 hover:text-white transition-colors">
          <span className="material-symbols-outlined">search</span>
        </button>
        <Link to="/cart" className={`relative flex flex-col items-center justify-center p-3 transition-colors ${isActive('/cart') ? 'text-primary' : 'text-[#8E8E8E] hover:text-white'}`}>
          <span className="material-symbols-outlined">shopping_bag</span>
          {cartCount > 0 && (
            <span className="absolute top-1 right-1 bg-secondary text-on-secondary text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-in zoom-in">
              {cartCount}
            </span>
          )}
        </Link>
        <Link to="/orders" className={`flex flex-col items-center justify-center p-3 transition-colors ${isActive('/orders') || isActive('/settings') ? 'text-primary' : 'text-[#8E8E8E] hover:text-white'}`}>
          <span className="material-symbols-outlined">person_outline</span>
        </Link>
      </div>
    </nav>
  )
}
