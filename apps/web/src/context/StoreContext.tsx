import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../lib/api-client';

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  quantity: number;
}

interface UserInfo {
  id: string;
  name: string;
  email: string;
  image?: string | null;
}

interface StoreContextType {
  cart: CartItem[];
  addToCart: (productId: string, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  isSearchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  isAuthenticated: boolean;
  isSessionLoading: boolean;
  user: UserInfo | null;
  userRole: 'customer' | 'admin';
  isAdmin: boolean;
  login: () => void;
  logout: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [localCart, setLocalCart] = useState<CartItem[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSessionLoading, setIsSessionLoading] = useState(true);
  const [user, setUser] = useState<UserInfo | null>(null);
  const [userRole, setUserRole] = useState<'customer' | 'admin'>('customer');

  // Check auth session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch('/api/auth/get-session', { credentials: 'include' });
        if (res.ok) {
          const data = await res.json();
          if (data?.session) {
            setIsAuthenticated(true);
            setUser(data.user || null);
            // Fetch role
            try {
              const meRes = await fetch('/api/me', { credentials: 'include' });
              if (meRes.ok) {
                const meData = await meRes.json();
                setUserRole(meData.role || 'customer');
              }
            } catch {
              // ignore
            }
          } else {
            setIsAuthenticated(false);
            setUser(null);
            setUserRole('customer');
          }
        } else {
          setIsAuthenticated(false);
        }
      } catch {
        setIsAuthenticated(false);
      } finally {
        setIsSessionLoading(false);
      }
    };
    checkSession();
  }, []);

  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => setIsSearchOpen(false);

  const login = useCallback(async () => {
    setIsAuthenticated(true);
    queryClient.invalidateQueries({ queryKey: ['cart'] });
    // Fetch user info and role
    try {
      const res = await fetch('/api/me', { credentials: 'include' });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user || null);
        setUserRole(data.role || 'customer');
      }
    } catch {
      // ignore
    }
  }, [queryClient]);

  const logout = useCallback(async () => {
    try {
      await fetch('/api/auth/sign-out', { method: 'POST', credentials: 'include' });
    } catch {
      // ignore
    }
    setIsAuthenticated(false);
    setUser(null);
    setUserRole('customer');
    queryClient.invalidateQueries({ queryKey: ['cart'] });
  }, [queryClient]);

  // Fetch cart from server if authenticated
  const { data: serverCart = [] } = useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      try {
        const res = await apiClient.get<CartItem[]>('/cart');
        return res.data;
      } catch {
        return [];
      }
    },
    enabled: isAuthenticated,
  });

  const cart = isAuthenticated ? serverCart : localCart;

  // Mutations
  const addToCartMutation = useMutation({
    mutationFn: async ({ productId, quantity }: { productId: string; quantity: number }) => {
      const res = await apiClient.post('/cart', { productId, quantity });
      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] }),
  });

  const updateQuantityMutation = useMutation({
    mutationFn: async ({ itemId, quantity }: { itemId: string; quantity: number }) => {
      const res = await apiClient.patch(`/cart/${itemId}`, { quantity });
      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] }),
  });

  const removeFromCartMutation = useMutation({
    mutationFn: async (itemId: string) => {
      const res = await apiClient.delete(`/cart/${itemId}`);
      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] }),
  });

  const clearCartMutation = useMutation({
    mutationFn: async () => {
      const res = await apiClient.delete('/cart');
      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] }),
  });

  const addToCart = useCallback(
    (productId: string, quantity: number = 1) => {
      if (isAuthenticated) {
        addToCartMutation.mutate({ productId, quantity });
      } else {
        alert('Please log in to add items to your cart.');
      }
    },
    [isAuthenticated, addToCartMutation]
  );

  const removeFromCart = useCallback(
    (itemId: string) => {
      if (isAuthenticated) {
        removeFromCartMutation.mutate(itemId);
      } else {
        setLocalCart((prev) => prev.filter((item) => item.id !== itemId));
      }
    },
    [isAuthenticated, removeFromCartMutation]
  );

  const updateQuantity = useCallback(
    (itemId: string, quantity: number) => {
      if (isAuthenticated) {
        updateQuantityMutation.mutate({ itemId, quantity });
      } else {
        setLocalCart((prev) =>
          prev.map((item) => (item.id === itemId ? { ...item, quantity } : item))
        );
      }
    },
    [isAuthenticated, updateQuantityMutation]
  );

  const clearCart = useCallback(() => {
    if (isAuthenticated) {
      clearCartMutation.mutate();
    } else {
      setLocalCart([]);
    }
  }, [isAuthenticated, clearCartMutation]);

  const cartTotal = cart.reduce((total, item) => {
    const price =
      typeof item.price === 'string'
        ? parseInt(String(item.price).replace(/\D/g, '')) || 0
        : item.price;
    return total + (price || 0) * item.quantity;
  }, 0);

  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <StoreContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
        isSearchOpen,
        openSearch,
        closeSearch,
        isAuthenticated,
        isSessionLoading,
        user,
        userRole,
        isAdmin: userRole === 'admin',
        login,
        logout,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
