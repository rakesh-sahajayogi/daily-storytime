import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View } from 'react-native';

import { theme } from '@/constants/theme';

type Props = {
  size?: number;
};

/** Simple geometric lantern mark — not an emoji logo. */
export function LanternMark({ size = 72 }: Props) {
  const scale = size / 72;
  return (
    <View style={[styles.wrap, { width: size, height: size * 1.25 }]}>
      <View
        style={[
          styles.glow,
          {
            width: 48 * scale,
            height: 48 * scale,
            borderRadius: 24 * scale,
          },
        ]}
      />
      <View style={[styles.cap, { width: 22 * scale, height: 8 * scale, borderRadius: 4 * scale }]} />
      <View style={[styles.ring, { width: 14 * scale, height: 10 * scale, borderRadius: 7 * scale }]} />
      <LinearGradient
        colors={[theme.colors.goldBright, theme.colors.gold]}
        style={[
          styles.body,
          {
            width: 36 * scale,
            height: 44 * scale,
            borderRadius: 10 * scale,
          },
        ]}
      >
        <View
          style={[
            styles.pane,
            {
              width: 18 * scale,
              height: 22 * scale,
              borderRadius: 4 * scale,
              marginTop: 8 * scale,
            },
          ]}
        />
      </LinearGradient>
      <View style={[styles.base, { width: 42 * scale, height: 6 * scale, borderRadius: 3 * scale }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  glow: {
    position: 'absolute',
    top: '28%',
    backgroundColor: 'rgba(224, 184, 92, 0.35)',
  },
  cap: {
    backgroundColor: theme.colors.goldSoft,
    marginBottom: 2,
  },
  ring: {
    borderWidth: 2,
    borderColor: theme.colors.goldBright,
    marginBottom: 2,
    backgroundColor: 'transparent',
  },
  body: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
  },
  pane: {
    backgroundColor: 'rgba(255, 253, 248, 0.55)',
  },
  base: {
    marginTop: 3,
    backgroundColor: theme.colors.gold,
  },
});
