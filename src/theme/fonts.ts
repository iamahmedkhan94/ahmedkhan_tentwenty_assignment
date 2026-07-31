import { TextStyle } from 'react-native';

export const fontFamily = {
  regular: 'Poppins-Regular',
  medium: 'Poppins-Medium',
  semiBold: 'Poppins-SemiBold',
} as const;

export const typography = {
  display: {
    fontFamily: fontFamily.medium,
    fontSize: 74,
    lineHeight: 100,
  },
  title: {
    fontFamily: fontFamily.medium,
    fontSize: 16,
    lineHeight: 20,
  },
  label: {
    fontFamily: fontFamily.medium,
    fontSize: 12,
    lineHeight: 15,
  },
  labelAccent: {
    fontFamily: fontFamily.medium,
    fontSize: 12,
    lineHeight: 15,
  },
  meta: {
    fontFamily: fontFamily.medium,
    fontSize: 12,
    lineHeight: 19,
  },
  caption: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    lineHeight: 19,
  },

  heroTitle: {
    fontFamily: fontFamily.medium,
    fontSize: 24,
    lineHeight: 30,
  },
  body: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    lineHeight: 22,
  },
} as const satisfies Record<string, TextStyle>;

export type Typography = typeof typography;
