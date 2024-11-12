import React from 'react';
import axios from 'axios';
import { AuthContext } from '../../hooks/authContext';
import logger from '../../utils/logger';

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [projectName, setProjectName] = React.useState<string | null>(null);
  const [projectId, setProjectId] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await axios.get('/api/auth/me', { withCredentials: true });
      setProjectName(response.data.projectName);
      setProjectId(response.data.projectId);
    } catch (error) {
      setProjectName(null);
      setProjectId(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (projectName: string, password: string) => {
    try {
      const response = await axios.post(
        'api/auth/login',
        { projectName, password },
        { 
          withCredentials: true,
          headers: { 'Content-Type': 'application/json' }
        }
      );
      setProjectName(response.data.projectName);
      setProjectId(response.data.projectID);
      return response.data;
    } catch (error) {
      logger.error('Login error occured', {
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
        projectName: projectName,
        timestamp: new Date().toISOString()
      })
      throw error;
    }
  };

  const logout = async () => {
    try {
      await axios.post('/api/auth/logout', {}, { withCredentials: true });
      setProjectId(null);
      setProjectName(null);
    } catch (error) {
      logger.error('Logout Failed.', {
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
        projectName: projectName,
        timestamp: new Date().toISOString()
      })
    }
  };

  return (
    <AuthContext.Provider value={{
      projectName,
      login,
      logout,
      isLoading,
      checkAuthStatus,
      projectId
    }}>
      {children}
    </AuthContext.Provider>
  );
}