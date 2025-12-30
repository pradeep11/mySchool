import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
  FlatList,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getTheme } from '../config/theme';
import { useAppStore } from '../store/appStore';
import { configService } from '../services/ConfigService';
import QuickAccessItemComponent from '../components/QuickAccessItem';

interface QuickAccessItem {
  id: string;
  label: string;
  icon: string;
}

const HomeScreen: React.FC = () => {
  const { navigate, toggleDrawer } = useAppStore();
  const isDarkMode = useColorScheme() === 'dark';
  const theme = getTheme(isDarkMode);
  const [selectedYear] = useState('2025-2026');

  const homeData = configService.getScreenData('home') as {
    title: string;
    organisationName: string;
    adminName: string;
    quickAccessItems: QuickAccessItem[];
  };
  console.log('[HomeScreen] Home Data:', homeData);
  const QUICK_ACCESS_ITEMS = homeData.quickAccessItems;

  const screenWidth = Dimensions.get('window').width;
  const itemWidth = (screenWidth - 48) / 2; // 48 for padding/margins

  const getOnPressForItem = (item: QuickAccessItem) => () => {
    if (item.label === 'Student Details') {
      navigate('details');
      return;
    }
    // placeholder for other actions
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      {/* Header */}

      <View
        style={[
          styles.header,
          {
            flexDirection: 'row',
            backgroundColor: theme.colors.primary,
            alignItems: 'center',
            paddingTop: 16,
            paddingBottom: 10,
          },
        ]}
      >
        <View>
          <TouchableOpacity
            style={styles.menuButton}
            onPress={toggleDrawer}
            activeOpacity={0.7}
          >
            <Text style={styles.menuIcon}>☰</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.schoolName}>{homeData.organisationName}</Text>
      </View>
      <View style={[styles.header, { backgroundColor: theme.colors.primary }]}>
        {/* Menu Icon */}

        <View style={styles.profileSection}>
          {/* Profile Avatar */}

          <View style={styles.avatarContainer}>
            <Text style={{ fontSize: 28 }}>👨‍💼</Text>
          </View>

          {/* Profile Info */}
          <View style={styles.profileInfo}>
            <Text style={styles.schoolName}>{homeData.adminName}</Text>
            <Text style={styles.role}>Admin</Text>
          </View>
        </View>

        {/* Year Selector */}
        <View style={styles.yearContainer}>
          <TouchableOpacity
            style={[
              styles.yearSelector,
              {
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                borderColor: 'rgba(255, 255, 255, 0.5)',
              },
            ]}
          >
            <Text style={styles.yearText}>{selectedYear}</Text>
            <Text style={{ fontSize: 10, color: '#fff' }}>▼</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView
        style={[styles.content, { backgroundColor: theme.colors.background }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Quick Access Section */}
        <View style={styles.sectionContainer}>
          <Text
            style={[
              styles.sectionTitle,
              {
                color: theme.colors.text,
              },
            ]}
          >
            Quick Access
          </Text>

          <FlatList
            data={QUICK_ACCESS_ITEMS}
            renderItem={({ item }) => (
              <QuickAccessItemComponent
                item={item}
                itemWidth={itemWidth}
                onPress={getOnPressForItem(item)}
                isDarkMode={isDarkMode}
              />
            )}
            keyExtractor={item => item.id}
            numColumns={2}
            columnWrapperStyle={styles.columnWrapper}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  menuButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    marginRight: 12,
  },
  menuIcon: {
    fontSize: 20,
    color: '#FFFFFF',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 28,
  },
  profileInfo: {
    flex: 1,
  },
  schoolName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  role: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 2,
  },
  logoutButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutButtonText: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  yearContainer: {
    alignItems: 'flex-start',
  },
  yearSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  yearText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    marginRight: 8,
  },
  yearArrow: {
    color: '#FFFFFF',
    fontSize: 10,
  },
  content: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  sectionContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
});

export default HomeScreen;
