import { configService } from '../services/ConfigService';

export enum ThemeType {
  LIGHT = 'light',
  DARK = 'dark',
}

export interface Colors {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  accent: string;
  error: string;
  success: string;
  warning: string;
}

export interface Theme {
  type: ThemeType;
  colors: Colors;
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  borderRadius: {
    sm: number;
    md: number;
    lg: number;
  };
  fontSizes: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };
}

const baseTheme: Omit<Theme, 'type' | 'colors'> = {
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 16,
  },
  fontSizes: {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 18,
    xxl: 24,
  },
};

const getVendorColors = (): Colors => {
  const vendorTheme = configService.getTheme();
  return {
    primary: vendorTheme.primary,
    secondary: vendorTheme.secondary,
    background: vendorTheme.background,
    surface: vendorTheme.surface,
    text: vendorTheme.text,
    textSecondary: vendorTheme.textSecondary,
    border: vendorTheme.border,
    accent: vendorTheme.secondary, // Using secondary as accent
    error: vendorTheme.error,
    success: vendorTheme.success,
    warning: vendorTheme.secondary, // Using secondary as warning
  };
};

export const getTheme = (isDarkMode: boolean): Theme => {
  // For now, we'll use the vendor's theme regardless of dark/light mode
  // In the future, you could extend the config to have separate light/dark themes per vendor
  const colors = getVendorColors();
  return {
    type: isDarkMode ? ThemeType.DARK : ThemeType.LIGHT,
    colors,
    ...baseTheme,
  };
};
