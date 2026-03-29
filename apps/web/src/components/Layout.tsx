import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import BottomNav from './BottomNav';
import GlobalSearch from './GlobalSearch';

export default function Layout() {
  return (
    <>
      <GlobalSearch />
      <Header />
      <main className="min-h-screen">
         <Outlet />
      </main>
      <Footer />
      <BottomNav />
    </>
  );
}
