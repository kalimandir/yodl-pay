import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Globe, Wallet } from 'lucide-react-native';
import { FakeStatusBar } from '../components/ui/FakeStatusBar';

export default function SplitScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <FakeStatusBar />

      <View style={styles.content}>
        <Text style={styles.logo}>yodl</Text>
        <Text style={styles.subtitle}>Choose Test Mode</Text>

        {/* Country-Centric Option */}
        <Pressable
          style={({ pressed }) => [
            styles.optionCard,
            pressed && styles.optionCardPressed,
          ]}
          onPress={() => router.push('/(tabs)')}
        >
          <View style={styles.iconContainer}>
            <Globe size={32} color="#6430D2" strokeWidth={1.5} />
          </View>
          <Text style={styles.optionTitle}>Country-Centric</Text>
          <Text style={styles.optionDescription}>
            Payment networks, location-based
          </Text>
        </Pressable>

        {/* Token-Centric Option */}
        <Pressable
          style={({ pressed }) => [
            styles.optionCard,
            pressed && styles.optionCardPressed,
          ]}
          onPress={() => router.push('/(tabs-token)')}
        >
          <View style={styles.iconContainer}>
            <Wallet size={32} color="#6430D2" strokeWidth={1.5} />
          </View>
          <Text style={styles.optionTitle}>Token-Centric</Text>
          <Text style={styles.optionDescription}>
            Asset-focused, wallet-based
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#18181B',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    gap: 24,
  },
  logo: {
    fontSize: 40,
    fontFamily: 'Inter',
    fontWeight: '600',
    color: '#F8FAFC',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter',
    fontWeight: '400',
    color: '#A1A1AA',
    marginBottom: 32,
  },
  optionCard: {
    width: '100%',
    backgroundColor: '#27272A',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  optionCardPressed: {
    backgroundColor: '#2F2F33',
    borderColor: '#6430D2',
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(100, 48, 210, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  optionTitle: {
    fontSize: 20,
    fontFamily: 'Inter',
    fontWeight: '600',
    color: '#F8FAFC',
    marginBottom: 8,
  },
  optionDescription: {
    fontSize: 14,
    fontFamily: 'Inter',
    fontWeight: '400',
    color: '#A1A1AA',
    textAlign: 'center',
  },
});
