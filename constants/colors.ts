// Brand Colors
export const brand = {
  purplePrimary: '#4612B4',
  purpleSecondary: '#9662FF',
  purpleLight: '#6430D2',
} as const;

// Header Gradient (shared between themes)
export const gradient = {
  header: ['#9662FF', '#4612B4'] as const,
};

// Dark Theme Colors
export const darkColors = {
  // Backgrounds
  bgPrimary: '#18181B',
  bgSecondary: '#1B1B1E',
  bgElevated: '#262629',
  
  // Text
  textPrimary: '#F8FAFC',
  textSecondary: '#A59CB9',
  textMuted: '#A1A1AA',
  textAmount: '#E1E1E1',
  textLink: '#A1A1AA',
  
  // Icons
  iconDefault: '#3F3F46',
  iconActive: '#6430D2',
  
  // Border
  border: '#262629',
  
  // Brand (included for convenience)
  ...brand,
} as const;

// Light Theme Colors
export const lightColors = {
  // Backgrounds
  bgPrimary: '#F8F8FC',
  bgSecondary: '#FFFFFF',
  bgElevated: '#D9E0F1',
  
  // Text
  textPrimary: '#27272A',
  textSecondary: '#3F3F46',
  textMuted: '#6B7280',
  textAmount: '#27272A',
  textLink: '#52525B',
  
  // Icons
  iconDefault: '#D5D9DD',
  iconActive: '#4612B4',
  
  // Border
  border: '#D9E0F1',
  
  // Brand (included for convenience)
  ...brand,
} as const;

// Semantic Colors (same for both themes)
export const semantic = {
  success: '#22C55E',
  error: '#EF4444',
  warning: '#F59E0B',
  processing: '#6430D2',
} as const;

// Shadow values (light theme only, dark uses elevation)
export const shadows = {
  card: '0 2px 8px rgba(0,0,0,0.08)',
  elevated: '0 4px 16px rgba(0,0,0,0.12)',
} as const;

