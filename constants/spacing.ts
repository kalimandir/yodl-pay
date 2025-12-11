// Spacing Scale (base unit: 4px)
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
  '5xl': 48,
} as const;

// Border Radius
export const radius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 20,
  full: 9999,
} as const;

// Icon Sizes
export const iconSize = {
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
} as const;

// Component Heights
export const componentHeight = {
  header: 100,
  tabBar: 72,
  balanceCard: 280,
  activityRow: 72,
} as const;

// Safe Areas
export const safeArea = {
  top: 47,
  bottom: 34,
} as const;

// Z-Index
export const zIndex = {
  base: 0,
  card: 10,
  sticky: 20,
  modal: 50,
  toast: 100,
} as const;

// Animation Durations
export const duration = {
  fast: 150,
  normal: 250,
  slow: 400,
} as const;

