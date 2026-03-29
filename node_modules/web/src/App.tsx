import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Collection from './pages/Collection';
import Promo from './pages/Promo';
import Cart from './pages/Cart';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import OrderHistory from './pages/OrderHistory';
import OrderTracking from './pages/OrderTracking';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminAddProduct from './pages/admin/AdminAddProduct';
import AdminOrders from './pages/admin/AdminOrders';
import AdminFinance from './pages/admin/AdminFinance';
import AdminAnalytics from './pages/admin/AdminAnalytics';

import AdminSettingsLayout from './components/admin/AdminSettingsLayout';
import AdminSettingsStore from './pages/admin/settings/AdminSettingsStore';
import AdminSettingsAppearance from './pages/admin/settings/AdminSettingsAppearance';
import AdminSettingsPayment from './pages/admin/settings/AdminSettingsPayment';
import AdminSettingsShipping from './pages/admin/settings/AdminSettingsShipping';
import AdminSettingsNotifications from './pages/admin/settings/AdminSettingsNotifications';

import SettingsLayout from './components/settings/SettingsLayout';
import SettingsProfile from './pages/settings/SettingsProfile';
import SettingsAppearance from './pages/settings/SettingsAppearance';
import SettingsNotifications from './pages/settings/SettingsNotifications';
import SettingsSecurity from './pages/settings/SettingsSecurity';
import SettingsAddress from './pages/settings/SettingsAddress';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/collections", element: <Collection /> },
      { path: "/promos", element: <Promo /> },
      { path: "/cart", element: <Cart /> },
      { path: "/product/:id", element: <ProductDetail /> },
      { path: "/checkout", element: <Checkout /> },
      { path: "/orders", element: <OrderHistory /> },
      { path: "/orders/:id", element: <OrderTracking /> },
      {
        path: "/settings",
        element: <SettingsLayout />,
        children: [
          { index: true, element: <SettingsProfile /> },
          { path: "profile", element: <SettingsProfile /> },
          { path: "appearance", element: <SettingsAppearance /> },
          { path: "notifications", element: <SettingsNotifications /> },
          { path: "security", element: <SettingsSecurity /> },
          { path: "address", element: <SettingsAddress /> }
        ]
      }
    ]
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { path: "", element: <AdminDashboard /> },
      { path: "products", element: <AdminProducts /> },
      { path: "products/new", element: <AdminAddProduct /> },
      { path: "orders", element: <AdminOrders /> },
      { path: "finance", element: <AdminFinance /> },
      { path: "analytics", element: <AdminAnalytics /> },
      {
        path: "settings",
        element: <AdminSettingsLayout />,
        children: [
          { index: true, element: <AdminSettingsStore /> },
          { path: "store", element: <AdminSettingsStore /> },
          { path: "appearance", element: <AdminSettingsAppearance /> },
          { path: "payment", element: <AdminSettingsPayment /> },
          { path: "shipping", element: <AdminSettingsShipping /> },
          { path: "notifications", element: <AdminSettingsNotifications /> }
        ]
      }
    ]
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> }
]);
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StoreProvider } from './context/StoreContext';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <StoreProvider>
        <RouterProvider router={router} />
      </StoreProvider>
    </QueryClientProvider>
  );
}

export default App;
