import { View, Text, StyleSheet, Platform } from 'react-native';
import Svg, { Rect, Path } from 'react-native-svg';

// Signal Bars Icon
function SignalBars() {
  return (
    <Svg width={17} height={11} viewBox="0 0 17 11" fill="none">
      <Rect x="0" y="7" width="3" height="4" rx="1" fill="white" />
      <Rect x="4.5" y="5" width="3" height="6" rx="1" fill="white" />
      <Rect x="9" y="3" width="3" height="8" rx="1" fill="white" />
      <Rect x="13.5" y="0" width="3" height="11" rx="1" fill="white" />
    </Svg>
  );
}

// WiFi Icon
function WifiIcon() {
  return (
    <Svg width={15} height={11} viewBox="0 0 15 11" fill="none">
      <Path
        d="M7.5 2.5C9.5 2.5 11.3 3.3 12.6 4.6L14 3.2C12.3 1.5 10 0.5 7.5 0.5C5 0.5 2.7 1.5 1 3.2L2.4 4.6C3.7 3.3 5.5 2.5 7.5 2.5Z"
        fill="white"
      />
      <Path
        d="M4.2 6.4L5.6 7.8C6.1 7.3 6.8 7 7.5 7C8.2 7 8.9 7.3 9.4 7.8L10.8 6.4C9.9 5.5 8.7 5 7.5 5C6.3 5 5.1 5.5 4.2 6.4Z"
        fill="white"
      />
      <Path
        d="M7.5 9C7 9 6.5 9.2 6.2 9.5L7.5 11L8.8 9.5C8.5 9.2 8 9 7.5 9Z"
        fill="white"
      />
    </Svg>
  );
}

// Battery Icon
function BatteryIcon() {
  return (
    <Svg width={25} height={12} viewBox="0 0 25 12" fill="none">
      <Rect
        x="0.5"
        y="0.5"
        width="21"
        height="11"
        rx="2.5"
        stroke="white"
        strokeOpacity="0.35"
      />
      <Rect x="2" y="2" width="18" height="8" rx="1.5" fill="white" />
      <Path
        d="M23 4V8C23.8 7.6 24.5 6.9 24.5 6C24.5 5.1 23.8 4.4 23 4Z"
        fill="white"
        fillOpacity="0.4"
      />
    </Svg>
  );
}

export function FakeStatusBar() {
  // Only render on web
  if (Platform.OS !== 'web') {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <Text style={styles.time}>9:41</Text>
      </View>
      <View style={styles.rightSection}>
        <SignalBars />
        <WifiIcon />
        <BatteryIcon />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 47,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 14,
  },
  leftSection: {
    flex: 1,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  time: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
    fontFamily: 'Inter',
    letterSpacing: -0.3,
  },
});

