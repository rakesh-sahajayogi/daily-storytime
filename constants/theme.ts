export const brand = {
  name: 'Little Lantern',
  tagline: 'A short story, every night.',
  scheme: 'littlelantern',
} as const;

export const theme = {
  colors: {
    // Night-gold system
    dusk: '#14232C',
    duskMid: '#1E3340',
    sky: '#E8F4F8',
    skyDeep: '#D4EAF2',
    paper: '#FFFDF8',
    ink: '#1A2B32',
    inkSoft: '#4A606A',
    teal: '#1B6B7A',
    tealDark: '#14515C',
    gold: '#C9952A',
    goldBright: '#E0B85C',
    goldSoft: '#F5E6C0',
    coral: '#D96B5B',
    mist: '#F3F7F9',
    white: '#FFFFFF',
    border: '#D5E4EA',
    success: '#2E8B6A',
    bedtimeBg: '#14232C',
    bedtimePaper: '#1E3340',
    bedtimeInk: '#E8F0F3',
    bedtimeAccent: '#E0B85C',
  },
  radius: {
    sm: 10,
    md: 16,
    lg: 24,
    pill: 999,
  },
  space: {
    xs: 6,
    sm: 10,
    md: 16,
    lg: 24,
    xl: 32,
  },
  fonts: {
    display: 'Fraunces_700Bold',
    title: 'Nunito_700Bold',
    body: 'Literata_400Regular',
    bodyBold: 'Literata_600SemiBold',
    ui: 'Nunito_600SemiBold',
    uiRegular: 'Nunito_400Regular',
  },
} as const;
