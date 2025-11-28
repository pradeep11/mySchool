import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  useColorScheme,
  FlatList,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getTheme } from '../config/theme';
import { useAppContext } from '../context/AppContext';

interface QuickAccessItem {
  id: string;
  label: string;
  icon: string;
}

const QUICK_ACCESS_ITEMS: QuickAccessItem[] = [
  { id: '1', label: 'Home', icon: '🏠' },
  { id: '2', label: 'Updates', icon: '📋' },
  { id: '3', label: 'Attendance', icon: '📊' },
  { id: '4', label: 'Approvals', icon: '🏢' },
  { id: '5', label: 'Sprouts Content', icon: '💻' },
  { id: '6', label: 'Search Content', icon: '🔍' },
  { id: '7', label: 'U&I', icon: '👨‍🎓' },
  { id: '8', label: 'Homework', icon: '📚' },
  { id: '9', label: 'Student Details', icon: '👤' },
  { id: '10', label: 'Events', icon: '📅' },
  { id: '11', label: 'News letter', icon: '📰' },
  { id: '12', label: 'Gallery', icon: '🖼️' },
  { id: '13', label: 'Diary', icon: '📔' },
  { id: '14', label: 'Fee', icon: '💳' },
  { id: '15', label: 'Examination', icon: '📝' },
  { id: '16', label: 'Enquiry', icon: '❓' },
  { id: '17', label: 'Income', icon: '💰' },
  { id: '18', label: 'Notice', icon: '📢' },
  { id: '19', label: 'Expense', icon: '💸' },
  { id: '20', label: 'eDoc', icon: '📄' },
];

const HomeScreen: React.FC = () => {
  const { navigate, logout } = useAppContext();
  const isDarkMode = useColorScheme() === 'dark';
  const theme = getTheme(isDarkMode);
  const [selectedYear, setSelectedYear] = useState('2025-2026');

  const screenWidth = Dimensions.get('window').width;
  const itemWidth = (screenWidth - 48) / 2; // 48 for padding/margins

  const renderQuickAccessItem = ({ item }: { item: QuickAccessItem }) => {
    const onPress = () => {
      if (item.label === 'Student Details') {
        navigate('studentDetails');
        return;
      }
      // placeholder for other actions
    };
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.quickAccessItem,
          {
            width: itemWidth,
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.border,
          },
        ]}
        activeOpacity={0.8}
      >
        <Text style={{ fontSize: 36, marginBottom: 8 }}>{item.icon}</Text>
        <Text
          style={[
            styles.itemLabel,
            {
              color: theme.colors.text,
            },
          ]}
        >
          {item.label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.primary }]}>
        <View style={styles.profileSection}>
          {/* Profile Avatar */}
          <View style={styles.avatarContainer}>
            <Text style={{ fontSize: 28 }}>👨‍💼</Text>
          </View>

          {/* Profile Info */}
          <View style={styles.profileInfo}>
            <Text style={styles.schoolName}>Admin school</Text>
            <Text style={styles.role}>Admin</Text>
          </View>

          {/* Logout Button */}
          <TouchableOpacity
            style={[styles.logoutButton, { backgroundColor: 'rgba(255, 255, 255, 0.2)' }]}
            onPress={logout}
          >
            <Text style={{ fontSize: 18 }}>⊗</Text>
          </TouchableOpacity>
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
            renderItem={renderQuickAccessItem}
            keyExtractor={(item) => item.id}
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
  quickAccessItem: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
  },
  itemIcon: {
    fontSize: 40,
    marginBottom: 8,
  },
  itemLabel: {
    fontSize: 13,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default HomeScreen;
