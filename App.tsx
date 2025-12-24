/**
 * mySchool App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useAppStore } from './src/store/appStore';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import UpdatesScreen from './src/screens/UpdatesScreen';
import StudentDetails from './src/screens/StudentDetails';
import SchoolInfoScreen from './src/screens/SchoolInfoScreen';
import Drawer from './src/components/Drawer';
import TabBar from './src/components/TabBar';

const AppInner = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const { isLoggedIn, currentScreen } = useAppStore();
  console.log('[App] AppInner render', { isLoggedIn, currentScreen });

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Drawer />
      {!isLoggedIn && <LoginScreen />}

      {isLoggedIn && currentScreen === 'home' && <HomeScreen />}
      {isLoggedIn && currentScreen === 'updates' && <UpdatesScreen />}
      {isLoggedIn && currentScreen === 'details' && <StudentDetails />}
      {isLoggedIn && currentScreen === 'info' && <SchoolInfoScreen />}

      {isLoggedIn && <TabBar />}
    </SafeAreaProvider>
  );
};

function App() {
  return <AppInner />;
}

export default App;
