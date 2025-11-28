/**
 * mySchool App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import { AppProvider, useAppContext } from './src/context/AppContext';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import StudentDetails from './src/screens/StudentDetails';

const AppInner = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const { isLoggedIn, currentScreen } = useAppContext();
  console.log('[App] AppInner render', { isLoggedIn, currentScreen });

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {!isLoggedIn && <LoginScreen />}

      {isLoggedIn && currentScreen === 'home' && <HomeScreen />}

      {isLoggedIn && currentScreen === 'studentDetails' && (
        <StudentDetails />
      )}
    </SafeAreaProvider>
  );
};

function App() {
  return (
    <AppProvider>
      <AppInner />
    </AppProvider>
  );
}

export default App;
