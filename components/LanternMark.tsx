import { Image, StyleSheet, View } from 'react-native';

type Props = {
  size?: number;
};

/** Little Lantern brand mark used in-app (matches store icon). */
export function LanternMark({ size = 72 }: Props) {
  return (
    <View style={[styles.wrap, { width: size, height: size }]}>
      <Image
        source={require('../assets/images/brand-logo.png')}
        style={{ width: size, height: size, borderRadius: size * 0.22 }}
        accessibilityLabel="Little Lantern logo"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
