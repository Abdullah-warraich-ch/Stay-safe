'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { getCity } from '@/utils/helperFunctions';
import { cities } from "@/data/citiesData"

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [currentCity, setCurrentCity] = useState(undefined);

  useEffect(() => {
    // Check for saved user in cookies on mount
    const savedUser = Cookies.get('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Failed to parse user cookie:', error);
        Cookies.remove('user');
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (user) {
      try {
        setCurrentCity(user.city);
      } catch (error) {
        console.error('Failed to parse user cookie:', error);
        Cookies.remove('user');
      }
    } else {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          // You can use these coordinates to fetch the city name
          const cityData = await getCity(latitude, longitude);
          let found = false;
          cities.forEach(city => {
            if (cityData?.display_name?.includes(city)) {
              console.log(city, "city");
              setCurrentCity(city);
              found = true;
            }
          });
          if (!found) setCurrentCity(null);
        },
        (error) => {
          console.error("Geolocation blocked or failed:", error);
          setCurrentCity(null);
        }
      );
    }
  }, [user]);

  const login = (userData) => {
    setUser(userData);
    // Set cookie with 7-day expiration
    Cookies.set('user', JSON.stringify(userData), { expires: 7, secure: true, sameSite: 'strict' });
  };

  const logout = () => {
    setUser(null);
    Cookies.remove('user');
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, currentCity }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
