import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
  useColorScheme,
  ScrollView,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getTheme } from '../config/theme';
import { useAppStore } from '../store/appStore';
import { configService } from '../services/ConfigService';
import QuickAccessItemComponent from './QuickAccessItem';

const { width } = Dimensions.get('window');
const DRAWER_WIDTH = width * 0.8; // Half screen width

const Drawer: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const theme = getTheme(isDarkMode);
  const [isQuickAccessExpanded, setIsQuickAccessExpanded] = useState(false);
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
    quickAccessItems: Array<{ id: string; label: string; icon: string }>;
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

  const handleQuickAccessPress = (item: {
    id: string;
    label: string;
    icon: string;
  }) => {
    if (item.label === 'Student Details') {
      navigate('details');
    }
    // Add other actions as needed
    closeDrawer();
  };

  const drawerItemWidth = (DRAWER_WIDTH - 48) / 2; // 48 for padding/margins

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

          <ScrollView
            style={styles.contentScrollView}
            showsVerticalScrollIndicator={false}
          >
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

            {/* Quick Access Section */}
            <View style={styles.quickAccessSection}>
              <TouchableOpacity
                style={styles.quickAccessHeader}
                onPress={() => setIsQuickAccessExpanded(!isQuickAccessExpanded)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.quickAccessTitle,
                    { color: theme.colors.text },
                  ]}
                >
                  Quick Access
                </Text>
                <Text style={[styles.expandIcon, { color: theme.colors.text }]}>
                  {isQuickAccessExpanded ? '▼' : '▶'}
                </Text>
              </TouchableOpacity>
              {isQuickAccessExpanded && (
                <FlatList
                  data={homeData.quickAccessItems}
                  renderItem={({ item }) => (
                    <QuickAccessItemComponent
                      item={item}
                      itemWidth={drawerItemWidth}
                      onPress={() => handleQuickAccessPress(item)}
                      isDarkMode={isDarkMode}
                    />
                  )}
                  keyExtractor={item => item.id}
                  numColumns={2}
                  columnWrapperStyle={styles.columnWrapper}
                  scrollEnabled={false}
                  contentContainerStyle={styles.quickAccessList}
                />
              )}
            </View>
          </ScrollView>
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
  contentScrollView: {
    flex: 1,
  },
  menuItems: {
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
  quickAccessSection: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
    marginTop: 20,
  },
  quickAccessHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  quickAccessTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  expandIcon: {
    fontSize: 16,
  },
  quickAccessList: {
    paddingHorizontal: 16,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
});

export default Drawer;
