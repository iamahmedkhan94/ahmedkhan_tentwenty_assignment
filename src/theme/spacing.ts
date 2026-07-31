export const radius = {
  screen: 30,
  card: 10,
  chip: 10,
  pill: 25,
  tabBar: 20,
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const screenPadding = spacing.md;

export const layout = {
  designWidth: 375,
  designHeight: 812,
} as const;

export type Spacing = typeof spacing;
