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

const lightColors: Colors = {
  primary: '#2196F3',
  secondary: '#FFC107',
  background: '#F5F5F5',
  surface: '#FFFFFF',
  text: '#000000',
  textSecondary: '#666666',
  border: '#E0E0E0',
  accent: '#FF6B6B',
  error: '#F44336',
  success: '#4CAF50',
  warning: '#FF9800',
};

const darkColors: Colors = {
  primary: '#4CAF50',
  secondary: '#FFC107',
  background: '#1a1a1a',
  surface: '#2a2a2a',
  text: '#FFFFFF',
  textSecondary: '#AAAAAA',
  border: '#404040',
  accent: '#FF6B6B',
  error: '#EF5350',
  success: '#66BB6A',
  warning: '#FFA726',
};

export const lightTheme: Theme = {
  type: ThemeType.LIGHT,
  colors: lightColors,
  ...baseTheme,
};

export const darkTheme: Theme = {
  type: ThemeType.DARK,
  colors: darkColors,
  ...baseTheme,
};

export const getTheme = (isDarkMode: boolean): Theme => {
  return isDarkMode ? darkTheme : lightTheme;
};
