export const palette = {
  midnight: '#2E2739',
  white: '#FFFFFF',
  paper: '#F6F6FA',
  grey: '#827D88',
  blue: '#61C3F2',
  mist: '#DBDBDF',
  teal: '#15D2BE',
  pink: '#E26CA5',
  purple: '#564CA3',
  gold: '#CD9D0F',
  black: '#000000',
} as const;

export const colors = {

  primary: palette.blue,
  background: palette.white,
  surface: palette.paper,
  border: palette.mist,

  text: {
    primary: palette.midnight,
    secondary: palette.grey,
    inverse: palette.white,
  },

  genre: [palette.teal, palette.pink, palette.purple, palette.gold] as string[],

  seat: {
    available: palette.mist,
    selected: palette.gold,
    reserved: palette.grey,
    vip: palette.purple,
  },

  overlay: {
    scrim: 'rgba(0, 0, 0, 0.35)',
    player: palette.black,
  },
} as const;

export type Colors = typeof colors;
