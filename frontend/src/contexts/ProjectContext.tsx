'use client';

import React, { createContext, useContext, useState } from 'react';
import { Project } from '@/lib/types';
import { mockupProjects } from '@/lib/mockup-data';

export interface ProjectContextType {
    projects: Project[];
    setProjects: (projects: Project[]) => void;
    isLoading: boolean;
    error: string | null;
};

// Create context with default values
const defaultProjects: Project[] = mockupProjects;
const ProjectContext = createContext<ProjectContextType>({
  projects: defaultProjects,
  setProjects: () => {},
  isLoading: false,
  error: null
});

// Custom hook for using this context
export const useProjectContext = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProjectContext must be used within a ProjectProvider');
  }
  return context;
};

// Provider component
export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [isLoading, _setIsLoading] = useState<boolean>(false); // eslint-disable-line @typescript-eslint/no-unused-vars
  const [error, _setError] = useState<string | null>(null); // eslint-disable-line @typescript-eslint/no-unused-vars

  // Add authentication logic here
  
  const value = {
    projects: projects || defaultProjects,
    setProjects: setProjects,
    isLoading,
    error
  };

  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
};