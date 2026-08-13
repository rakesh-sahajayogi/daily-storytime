import {
  Literata_400Regular,
  Literata_600SemiBold,
} from '@expo-google-fonts/literata';
import {
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_800ExtraBold,
} from '@expo-google-fonts/nunito';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { ReadingProvider, useReading } from '@/context/ReadingContext';
import { theme } from '@/constants/theme';

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
    Literata_400Regular,
    Literata_600SemiBold,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ReadingProvider>
      <RootLayoutNav />
    </ReadingProvider>
  );
}

function RootLayoutNav() {
  const { bedtimeMode } = useReading();

  return (
    <>
      <StatusBar style={bedtimeMode ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          headerShadowVisible: false,
          headerTitleStyle: {
            fontFamily: theme.fonts.title,
            color: bedtimeMode ? theme.colors.bedtimeInk : theme.colors.ink,
          },
          headerStyle: {
            backgroundColor: bedtimeMode
              ? theme.colors.bedtimeBg
              : theme.colors.sky,
          },
          headerTintColor: bedtimeMode
            ? theme.colors.bedtimeAccent
            : theme.colors.teal,
          contentStyle: {
            backgroundColor: bedtimeMode
              ? theme.colors.bedtimeBg
              : theme.colors.sky,
          },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="story/[id]"
          options={{
            title: 'Read aloud',
            presentation: 'card',
          }}
        />
      </Stack>
    </>
  );
}
