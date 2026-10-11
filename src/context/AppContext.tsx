"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { SUPPORTED_COUNTRIES, CountryConfig, formatPrice, convertPrice } from "@/lib/currency";

export interface UserState {
  id: string;
  email: string;
  name: string;
  freeCredits: number;
  isPro: boolean;
  proExpiresAt: string | null;
  country: string;
  currency: string;
}

interface AppContextType {
  country: CountryConfig;
  setCountry: (country: CountryConfig) => void;
  user: UserState | null;
  setUser: React.Dispatch<React.SetStateAction<UserState | null>>;
  refreshUserData: () => Promise<void>;
  isUpgradeModalOpen: boolean;
  setIsUpgradeModalOpen: (open: boolean) => void;
  isCountryModalOpen: boolean;
  setIsCountryModalOpen: (open: boolean) => void;
  formatCurrency: (amountInUsd: number) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [country, setCountryState] = useState<CountryConfig>(SUPPORTED_COUNTRIES[0]);
  const [user, setUser] = useState<UserState | null>(null);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [isCountryModalOpen, setIsCountryModalOpen] = useState(false);

  // Load preferences from local storage on mount
  useEffect(() => {
    try {
      const savedCountryCode = localStorage.getItem("atelier_country");
      if (savedCountryCode) {
        const found = SUPPORTED_COUNTRIES.find((c) => c.code === savedCountryCode);
        if (found) setCountryState(found);
      }
    } catch (e) {}

    refreshUserData();
  }, []);

  const setCountry = (newCountry: CountryConfig) => {
    setCountryState(newCountry);
    try {
      localStorage.setItem("atelier_country", newCountry.code);
    } catch (e) {}
  };

  const refreshUserData = async () => {
    try {
      let storedUserId = "";
      try {
        storedUserId = localStorage.getItem("atelier_user_id") || "";
      } catch (e) {}

      const res = await fetch(`/api/user/credits?userId=${storedUserId}`);
      if (res.ok) {
        const data = await res.json();
        if (data.user) {
          setUser(data.user);
          try {
            localStorage.setItem("atelier_user_id", data.user.id);
          } catch (e) {}
        }
      }
    } catch (e) {
      console.warn("Failed to fetch user state:", e);
    }
  };

  const formatCurrency = (amountInUsd: number) => {
    return formatPrice(amountInUsd, country.currency);
  };

  return (
    <AppContext.Provider
      value={{
        country,
        setCountry,
        user,
        setUser,
        refreshUserData,
        isUpgradeModalOpen,
        setIsUpgradeModalOpen,
        isCountryModalOpen,
        setIsCountryModalOpen,
        formatCurrency,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
