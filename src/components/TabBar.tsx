import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import { getTheme } from '../config/theme';
import { useAppStore } from '../store/appStore';
import { configService } from '../services/ConfigService';

const TabBar: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const theme = getTheme(isDarkMode);
  const { currentScreen, navigate } = useAppStore();
  const tabs = configService.getTabs();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      {tabs.map(tab => (
        <TouchableOpacity
          key={tab.id}
          style={styles.tab}
          onPress={() => navigate(tab.screen as any)}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.tabIcon,
              {
                color:
                  currentScreen === tab.screen
                    ? theme.colors.primary
                    : theme.colors.textSecondary,
              },
            ]}
          >
            {tab.icon}
          </Text>
          <Text
            style={[
              styles.tabLabel,
              {
                color:
                  currentScreen === tab.screen
                    ? theme.colors.primary
                    : theme.colors.textSecondary,
              },
            ]}
          >
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 60,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
    paddingBottom: 5, // Account for safe area
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
  },
  tabIcon: {
    fontSize: 20,
    marginBottom: 2,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '500',
  },
});

export default TabBar;
