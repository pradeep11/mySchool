import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
  useColorScheme,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getTheme } from '../config/theme';
import { useAppStore } from '../store/appStore';
import { configService } from '../services/ConfigService';

const { width } = Dimensions.get('window');
const DRAWER_WIDTH = width * 0.8; // Half screen width

const Drawer: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const theme = getTheme(isDarkMode);
  const {
    drawerOpen,
    closeDrawer,
    navigate,
    logout,
    currentScreen,
    adminName,
  } = useAppStore();

  const menuItems = configService.getDrawerMenuItems().map(item => ({
    ...item,
    disabled: item.action !== 'logout' && !item.screen, // Only logout is enabled for now
  }));

  const homeData = configService.getScreenData('home') as {
    adminName: string;
  };

  const handleMenuPress = (item: (typeof menuItems)[0]) => {
    if (item.disabled) {
      return;
    } else if (item.action === 'logout') {
      logout();
    } else if (item.screen) {
      navigate(item.screen as any);
    }
    closeDrawer();
  };

  if (!drawerOpen) return null;

  return (
    <>
      {/* Overlay */}
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={closeDrawer}
      >
        <View style={styles.overlayBackground} />
      </TouchableOpacity>

      {/* Drawer */}
      <Animated.View
        style={[styles.drawer, { backgroundColor: theme.colors.surface }]}
      >
        <SafeAreaView style={styles.drawerContent}>
          <View style={styles.header}>
            <Text style={[styles.title, { color: theme.colors.primary }]}>
              {homeData.adminName}
            </Text>
          </View>

          <View style={styles.menuItems}>
            {menuItems.map(item => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.menuItem,
                  currentScreen === item.screen && styles.activeMenuItem,
                ]}
                onPress={() => handleMenuPress(item)}
                activeOpacity={0.7}
              >
                <Text style={styles.menuIcon}>{item.icon}</Text>
                <Text
                  style={[
                    styles.menuLabel,
                    { color: theme.colors.text },
                    currentScreen === item.screen && {
                      color: theme.colors.primary,
                    },
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </SafeAreaView>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  overlayBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  drawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: DRAWER_WIDTH,
    height: '100%',
    zIndex: 1001,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  drawerContent: {
    flex: 1,
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  menuItems: {
    flex: 1,
    paddingTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  activeMenuItem: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  menuIcon: {
    fontSize: 20,
    marginRight: 15,
    width: 24,
    textAlign: 'center',
  },
  menuLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default Drawer;
