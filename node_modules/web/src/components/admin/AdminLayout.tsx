import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';

export default function AdminLayout() {
  return (
    <div className="bg-surface-container-lowest text-on-surface min-h-screen">
      <AdminSidebar />
      <AdminHeader />
      <main className="ml-64 pt-24 pb-12 px-8 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}
