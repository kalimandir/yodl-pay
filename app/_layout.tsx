import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Platform } from 'react-native';
import { ThemeProvider } from '../contexts/ThemeContext';

// iPhone 14 Pro dimensions
const PHONE_WIDTH = 393;
const PHONE_HEIGHT = 852;

export default function RootLayout() {
  const appContent = (
    <ThemeProvider defaultTheme="dark">
      <SafeAreaProvider>
        <StatusBar style="light" />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="split" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="(tabs-token)" />
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(screens)" />
        </Stack>
      </SafeAreaProvider>
    </ThemeProvider>
  );

  // On web, wrap in phone frame container
  if (Platform.OS === 'web') {
    return (
      <View style={styles.webContainer}>
        <View style={styles.phoneFrame}>
          {appContent}
        </View>
      </View>
    );
  }

  // On native, render without frame
  return appContent;
}

const styles = StyleSheet.create({
  webContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0a0a0a',
    minHeight: '100vh' as any,
  },
  phoneFrame: {
    width: PHONE_WIDTH,
    height: PHONE_HEIGHT,
    maxWidth: PHONE_WIDTH,
    maxHeight: PHONE_HEIGHT,
    backgroundColor: '#18181B',
    borderRadius: 44,
    overflow: 'hidden',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)' as any,
  },
});
