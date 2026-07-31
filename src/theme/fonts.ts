import { TextStyle } from 'react-native';

export const fontFamily = {
  regular: 'Poppins-Regular',
  medium: 'Poppins-Medium',
  semiBold: 'Poppins-SemiBold',
  bold: 'Poppins-Bold',
} as const;

export const fontSize = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 24,
  xxl: 32,
} as const;

export const typography = {
  h1: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.xxl,
  },
  h2: {
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize.xl,
  },
  h3: {
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize.lg,
  },
  body: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.md,
  },
  caption: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.sm,
  },
  button: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.md,
  },
} as const satisfies Record<string, TextStyle>;

export type Typography = typeof typography;
