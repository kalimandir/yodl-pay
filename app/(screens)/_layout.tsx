import { Stack } from 'expo-router';

export default function ScreensLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="wallet" />
      <Stack.Screen name="token/[id]" />
    </Stack>
  );
}
