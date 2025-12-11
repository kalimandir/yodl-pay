// Theme Types
export type Theme = 'light' | 'dark';

// Color Types
export interface ThemeColors {
  // Backgrounds
  bgPrimary: string;
  bgSecondary: string;
  bgElevated: string;
  
  // Text
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  textAmount: string;
  textLink: string;
  
  // Icons
  iconDefault: string;
  iconActive: string;
  
  // Border
  border: string;
  
  // Brand
  purplePrimary: string;
  purpleSecondary: string;
  purpleLight: string;
}

// Semantic Colors
export interface SemanticColors {
  success: string;
  error: string;
  warning: string;
  processing: string;
}

// Typography Style
export interface TypographyStyle {
  fontFamily: string;
  fontSize: number;
  fontWeight: '400' | '500' | '600' | '700';
  lineHeight: number;
}

// Typography Types
export interface Typography {
  displayBalance: TypographyStyle;
  heading: TypographyStyle;
  body: TypographyStyle;
  bodySecondary: TypographyStyle;
  caption: TypographyStyle;
}

// Spacing Types
export interface Spacing {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  '2xl': number;
  '3xl': number;
  '4xl': number;
  '5xl': number;
}

// Radius Types
export interface Radius {
  sm: number;
  md: number;
  lg: number;
  xl: number;
  '2xl': number;
  full: number;
}

// Theme Context Value
export interface ThemeContextValue {
  theme: Theme;
  colors: ThemeColors;
  semantic: SemanticColors;
  typography: Typography;
  spacing: Spacing;
  radius: Radius;
  gradient: {
    header: readonly [string, string];
  };
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

