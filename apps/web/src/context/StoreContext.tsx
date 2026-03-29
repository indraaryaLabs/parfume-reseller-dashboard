import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../lib/api-client';
import { authClient } from '../lib/auth-client';

export interface CartItem {
  id: string; // The cart item DB id or local id
  productId: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  quantity: number;
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
  login: () => void;
  logout: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [localCart, setLocalCart] = useState<CartItem[]>([]);

  // Auth state using Better Auth
  const { data: session, isPending: isSessionLoading } = authClient.useSession();
  const isAuthenticated = !!session;

  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => setIsSearchOpen(false);
  
  // Dummy redirects or wrappers for now if you need them externally
  const login = () => { /* Better Auth handles this via signin forms */ };
  const logout = async () => {
    await authClient.signOut();
    queryClient.invalidateQueries({ queryKey: ['cart'] });
  };

  // Fetch cart from server if authenticated
  const { data: serverCart = [] } = useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      const res = await apiClient.get<CartItem[]>('/cart');
      return res.data;
    },
    enabled: isAuthenticated,
  });

  const cart = isAuthenticated ? serverCart : localCart;

  // Mutations
  const addToCartMutation = useMutation({
    mutationFn: async ({ productId, quantity }: { productId: string, quantity: number }) => {
      const res = await apiClient.post('/cart', { productId, quantity });
      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] })
  });

  const updateQuantityMutation = useMutation({
    mutationFn: async ({ itemId, quantity }: { itemId: string, quantity: number }) => {
      const res = await apiClient.patch(`/cart/${itemId}`, { quantity });
      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] })
  });

  const removeFromCartMutation = useMutation({
    mutationFn: async (itemId: string) => {
      const res = await apiClient.delete(`/cart/${itemId}`);
      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] })
  });

  const clearCartMutation = useMutation({
    mutationFn: async () => {
      const res = await apiClient.delete('/cart');
      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] })
  });

  // unified handlers
  const addToCart = async (productId: string, quantity: number = 1) => {
    if (isAuthenticated) {
      addToCartMutation.mutate({ productId, quantity });
    } else {
      // Offline fallback: we need product details. For simplicity, we fetch it or alert
      // In a real app we'd fetch the product details here, but for now we just show an alert
      alert('Please log in to add items to your cart.');
    }
  };

  const removeFromCart = (itemId: string) => {
    if (isAuthenticated) {
      removeFromCartMutation.mutate(itemId);
    } else {
      setLocalCart(prev => prev.filter(item => item.id !== itemId));
    }
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (isAuthenticated) {
      updateQuantityMutation.mutate({ itemId, quantity });
    } else {
      setLocalCart(prev => prev.map(item => item.id === itemId ? { ...item, quantity } : item));
    }
  };

  const clearCart = () => {
    if (isAuthenticated) {
      clearCartMutation.mutate();
    } else {
      setLocalCart([]);
    }
  };

  const cartTotal = cart.reduce((total, item) => {
    const price = typeof item.price === 'string' ? parseInt(String(item.price).replace(/\D/g, '')) || 0 : item.price;
    return total + ((price || 0) * item.quantity);
  }, 0);
  
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <StoreContext.Provider value={{
      cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount,
      isSearchOpen, openSearch, closeSearch,
      isAuthenticated, login, logout
    }}>
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
