
export const palette = {
  navy: '#202C43', // titles, body text
  darkPurple: '#2E2739', // headings, tab bar
  lightGrey: '#F6F6FA', // page background
  grey: '#827D88', // secondary text
  divider: '#DBDBDF', // hairlines
  blue: '#61C3F2', // brand / primary action
  teal: '#15D2BC',
  pink: '#E26CA5',
  purple: '#564CA3',
  gold: '#CD9D0F',

  caption: '#8F8F8F',
  seatGrey: '#A6A6A6',
  border: '#CECED0',
  placeholder: '#C4C4C4',

  white: '#FFFFFF',
  black: '#000000',
} as const;

export const colors = {
  primary: palette.blue,
  background: palette.lightGrey,
  surface: palette.white,
  border: palette.divider,

  text: {
    primary: palette.navy,
    heading: palette.darkPurple,
    secondary: palette.grey,
    caption: palette.caption,
    accent: palette.blue,
    inverse: palette.white,
  },

  seat: {
    available: palette.seatGrey,
    selected: palette.gold,
    reserved: palette.divider,
    vip: palette.purple,
  },

  overlay: {
    player: palette.black,
  },
} as const;

export const genreColors = [
  palette.teal,
  palette.pink,
  palette.purple,
  palette.gold,
  palette.blue,
] as const;

export const genreColorAt = (index: number) =>
  genreColors[index % genreColors.length];

export const gradients = {
  scrimBottom: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, #000000 100%)',
  scrimTop: 'linear-gradient(180deg, #000000 0%, rgba(0,0,0,0) 100%)',
} as const;

export type Colors = typeof colors;
