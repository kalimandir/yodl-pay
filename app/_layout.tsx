import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Platform } from 'react-native';
import { ThemeProvider } from '../contexts/ThemeContext';
import { useEffect, useState } from 'react';

// iPhone 14 Pro dimensions
const PHONE_WIDTH = 393;
const PHONE_HEIGHT = 852;

// Detect if running on actual mobile device (not just small window)
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      const checkIsDesktop = () => {
        // Check for mobile user agent OR small screen
        const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );
        const isSmallScreen = window.innerWidth <= 500;
        setIsDesktop(!isMobileUA && !isSmallScreen);
      };

      checkIsDesktop();
      window.addEventListener('resize', checkIsDesktop);
      return () => window.removeEventListener('resize', checkIsDesktop);
    }
  }, []);

  return isDesktop;
}

// Inject Google Fonts for web
function useGoogleFonts() {
  useEffect(() => {
    if (Platform.OS === 'web' && typeof document !== 'undefined') {
      // Add preconnect for faster font loading
      const preconnect = document.createElement('link');
      preconnect.rel = 'preconnect';
      preconnect.href = 'https://fonts.googleapis.com';
      document.head.appendChild(preconnect);

      const preconnectStatic = document.createElement('link');
      preconnectStatic.rel = 'preconnect';
      preconnectStatic.href = 'https://fonts.gstatic.com';
      preconnectStatic.crossOrigin = 'anonymous';
      document.head.appendChild(preconnectStatic);

      // Load the font
      const link = document.createElement('link');
      link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
      link.rel = 'stylesheet';
      document.head.appendChild(link);
      
      // Apply Inter as default font with higher specificity
      const style = document.createElement('style');
      style.textContent = `
        html, body, #root, * {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);
}

export default function RootLayout() {
  useGoogleFonts();
  const isDesktop = useIsDesktop();
  
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
