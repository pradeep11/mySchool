import React, { createContext, useContext, useState, ReactNode } from 'react';

export type ScreenName = 'login' | 'home' | 'studentDetails';

export interface Student {
  id: string;
  name: string;
  parent?: string;
  classSection?: string;
  admissionNo?: string;
}

interface AppContextValue {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  currentScreen: ScreenName;
  navigate: (screen: ScreenName) => void;
  students: Student[];
  selectedStudent?: Student | null;
  selectStudent: (student?: Student | null) => void;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

export const useAppContext = (): AppContextValue => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used within AppProvider');
  return ctx;
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<ScreenName>('login');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  // Sample students — in a real app this would come from an API
  const [students] = useState<Student[]>([
    {
      id: '1',
      name: 'Aarnav Radhu',
      parent: 'Vaibhav Radhu',
      classSection: 'Play Group - A',
      admissionNo: '408766',
    },
    {
      id: '2',
      name: 'Vikkrant Gambhir',
      parent: 'Gautam gambhir',
      classSection: 'Play Group - A',
      admissionNo: '4',
    },
    {
      id: '3',
      name: 'Viyom',
      parent: '',
      classSection: 'Play Group - A',
      admissionNo: '',
    },
  ]);

  const login = () => {
    console.log('[AppContext] login() called');
    setIsLoggedIn(true);
    setCurrentScreen('home');
  };

  const logout = () => {
    setIsLoggedIn(false);
    setCurrentScreen('login');
    setSelectedStudent(null);
  };

  const navigate = (screen: ScreenName) => {
    setCurrentScreen(screen);
  };

  const selectStudent = (student?: Student | null) => {
    setSelectedStudent(student ?? null);
  };

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        currentScreen,
        navigate,
        students,
        selectedStudent,
        selectStudent,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
