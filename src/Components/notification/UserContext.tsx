import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserContextProps {
  userId: string;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode; // This allows the children prop
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userId] = useState('12345'); // Replace with your actual logic
  return <UserContext.Provider value={{ userId }}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};
