// Font Family
export const fontFamily = {
  base: 'Inter',
} as const;

// Font Sizes
export const fontSize = {
  displayBalance: 35,
  heading: 14,
  body: 13,
  bodySecondary: 12,
  caption: 10,
} as const;

// Font Weights (as strings for React Native compatibility)
export const fontWeight = {
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
};

// Line Heights
export const lineHeight = {
  tight: 1.2,
  normal: 1.4,
} as const;

// Pre-composed Typography Styles
export const typography = {
  displayBalance: {
    fontFamily: fontFamily.base,
    fontSize: fontSize.displayBalance,
    fontWeight: fontWeight.regular,
    lineHeight: fontSize.displayBalance * lineHeight.tight,
  },
  heading: {
    fontFamily: fontFamily.base,
    fontSize: fontSize.heading,
    fontWeight: fontWeight.medium,
    lineHeight: fontSize.heading * lineHeight.normal,
  },
  body: {
    fontFamily: fontFamily.base,
    fontSize: fontSize.body,
    fontWeight: fontWeight.medium,
    lineHeight: fontSize.body * lineHeight.normal,
  },
  bodySecondary: {
    fontFamily: fontFamily.base,
    fontSize: fontSize.bodySecondary,
    fontWeight: fontWeight.medium,
    lineHeight: fontSize.bodySecondary * lineHeight.normal,
  },
  caption: {
    fontFamily: fontFamily.base,
    fontSize: fontSize.caption,
    fontWeight: fontWeight.regular,
    lineHeight: fontSize.caption * lineHeight.normal,
  },
} as const;

