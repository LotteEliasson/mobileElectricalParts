// src/context/GlobalProvider.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser } from '../sevice/userService';
import { getCurrentEngine } from '../sevice/engineService';
import * as SecureStore from 'expo-secure-store';

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [currentEngine, setCurrentEngine] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getStoredEngineId = async () => {
    try {
      const storedEngineId = await SecureStore.getItemAsync('engineId');
      if (storedEngineId) {
        const engine = await getCurrentEngine(storedEngineId);
        setCurrentEngine(engine);
        console.log('Engine Id retrieved and set from storage in GlobalProvider:', engine);
      } else {
        console.log('No Engine Id found in storage.');
      }
    } catch (error) {
      console.log('Error retrieving Engine Id from storage:', error);
    }
  };

  useEffect(() => {
    const fetchUserAndEngine = async () => {
      try {
        console.log('Attempting to fetch user...');
        const token = await SecureStore.getItemAsync('token');
        console.log('Token:', token);
        if (token) {
          const userData = await getCurrentUser();
          if (userData) {
            setUser(userData);
            setIsLoggedIn(true);
            console.log('User data fetched:', userData);
          } else {
            setUser(null);
            setIsLoggedIn(false);
            console.log('No user data found.');
          }
        } else {
          console.log('No token found.');
        }
        await getStoredEngineId();
      } catch (error) {
        console.log('Error fetching user:', error);
        setUser(null);
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserAndEngine();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        currentEngine,
        setCurrentEngine,
        isLoading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
