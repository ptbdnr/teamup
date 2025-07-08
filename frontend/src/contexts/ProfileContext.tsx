'use client';

import React, { createContext, useContext, useState } from 'react';
import { User as User } from '@/lib/types';

export interface ProfileContextType {
    profile: User;
    setProfile: (profile: User) => void;
    isLoading: boolean;
    error: string | null;
};

// Create context with default values
const defaultProfile: User = {
  id: 'Joe Doe',
  name: 'Joe Doe',
  avatar: 'https://avatars.githubusercontent.com/u/12345678?v=4',
  dataAiHint: '',
  role: 'developer',
  skills: ['JavaScript', 'React', 'Node.js'],
  interests: ['AI', 'Open Source', 'Hackathons'],
  discord: 'joedoe#1234',
  isYou: true, // Optional field to indicate if this is the current user
  graphCoordinate: {
    result: 0.4, // 0-1
    method: 0.6, // 0-1
    social: 0.5 // 0-1
  }
};
const ProfileContext = createContext<ProfileContextType>({
  profile: defaultProfile,
  setProfile: () => {},
  isLoading: false,
  error: null
});

// Custom hook for using this context
export const useProfileContext = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfileContext must be used within a ProfileProvider');
  }
  return context;
};

// Provider component
export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<User | null>(null);
  const [isLoading, _setIsLoading] = useState<boolean>(false); // eslint-disable-line @typescript-eslint/no-unused-vars
  const [error, _setError] = useState<string | null>(null); // eslint-disable-line @typescript-eslint/no-unused-vars

  // Add authentication logic here
  
  const value = {
    profile: profile || defaultProfile,
    setProfile: setProfile,
    isLoading,
    error
  };

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
};