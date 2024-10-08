import React, { useState } from 'react';
import { Stack } from 'expo-router';
import { CartProvider } from '../contexts/CartContext';

export const SearchContext = React.createContext({
  showNavigation: false,
  setShowNavigation: (show: boolean) => { },
});

export default function Layout() {
  const [showNavigation, setShowNavigation] = useState(false);

  return (
    <CartProvider>
      <SearchContext.Provider value={{ showNavigation, setShowNavigation }}>
        <Stack
          screenOptions={{
            headerShown: showNavigation,
          }}
        />
      </SearchContext.Provider>
    </CartProvider>
  );
}