import React from 'react';
import { ProfileProvider } from './ProfileContext';
import { ProjectProvider } from './ProjectContext';

export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ProfileProvider>
      <ProjectProvider>
          {children}
      </ProjectProvider>
    </ProfileProvider>
  );
};