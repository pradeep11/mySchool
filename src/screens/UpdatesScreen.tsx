import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getTheme } from '../config/theme';
import { useAppStore } from '../store/appStore';
import { configService } from '../services/ConfigService';

interface Update {
  id: string;
  title: string;
  date: string;
  description: string;
  icon: string;
}

const UpdatesScreen: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const theme = getTheme(isDarkMode);
  const { toggleDrawer } = useAppStore();

  const updatesData = configService.getScreenData('updates') as {
    title: string;
    updates: Update[];
  };
  const updates = updatesData.updates;

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.primary }]}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={toggleDrawer}
          activeOpacity={0.7}
        >
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.colors.surface }]}>
          Updates
        </Text>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Recent Updates
        </Text>

        {updates.map(update => (
          <TouchableOpacity
            key={update.id}
            style={[
              styles.updateCard,
              { backgroundColor: theme.colors.surface },
            ]}
            activeOpacity={0.8}
          >
            <View style={styles.updateHeader}>
              <Text style={styles.updateIcon}>{update.icon}</Text>
              <View style={styles.updateInfo}>
                <Text
                  style={[styles.updateTitle, { color: theme.colors.text }]}
                >
                  {update.title}
                </Text>
                <Text
                  style={[
                    styles.updateDate,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  {update.date}
                </Text>
              </View>
            </View>
            <Text
              style={[styles.updateDescription, { color: theme.colors.text }]}
            >
              {update.description}
            </Text>
          </TouchableOpacity>
        ))}
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuIcon: {
    fontSize: 20,
    color: '#FFFFFF',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  updateCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  updateHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  updateIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  updateInfo: {
    flex: 1,
  },
  updateTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  updateDate: {
    fontSize: 12,
  },
  updateDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
});

export default UpdatesScreen;
