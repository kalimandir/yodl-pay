import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Platform, useWindowDimensions } from 'react-native';
import { ThemeProvider } from '../contexts/ThemeContext';
import { useEffect } from 'react';

// iPhone 14 Pro dimensions
const PHONE_WIDTH = 393;
const PHONE_HEIGHT = 852;

// Inject Google Fonts for web
function useGoogleFonts() {
  useEffect(() => {
    if (Platform.OS === 'web') {
      const link = document.createElement('link');
      link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
      link.rel = 'stylesheet';
      document.head.appendChild(link);
      
      // Apply Inter as default font
      const style = document.createElement('style');
      style.textContent = `
        * { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
      `;
      document.head.appendChild(style);
    }
  }, []);
}

export default function RootLayout() {
  useGoogleFonts();
  const { width } = useWindowDimensions();
  
  // Only show phone frame on desktop-sized screens (> 500px wide)
  const isDesktop = Platform.OS === 'web' && width > 500;
  
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

  // On desktop web, wrap in phone frame container
  if (isDesktop) {
    return (
      <View style={styles.webContainer}>
        <View style={styles.phoneFrame}>
          {appContent}
        </View>
      </View>
    );
  }

  // On mobile web or native, render fullscreen
  if (Platform.OS === 'web') {
    return (
      <View style={styles.mobileWebContainer}>
        {appContent}
      </View>
    );
  }

  // On native, render without wrapper
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
  mobileWebContainer: {
    flex: 1,
    backgroundColor: '#18181B',
    minHeight: '100vh' as any,
  },
});
