import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { getTheme } from '../config/theme';

interface QuickAccessItem {
  id: string;
  label: string;
  icon: string;
}

interface QuickAccessItemProps {
  item: QuickAccessItem;
  itemWidth: number;
  onPress?: () => void;
  isDarkMode?: boolean;
}

const QuickAccessItemComponent: React.FC<QuickAccessItemProps> = ({
  item,
  itemWidth,
  onPress,
  isDarkMode = false,
}) => {
  const theme = getTheme(isDarkMode);

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

const styles = StyleSheet.create({
  quickAccessItem: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
  },
  itemLabel: {
    fontSize: 13,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default QuickAccessItemComponent;
