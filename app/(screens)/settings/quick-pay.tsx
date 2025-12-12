import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, Zap } from 'lucide-react-native';
import { useTheme } from '../../../hooks/useTheme';
import { FakeStatusBar } from '../../../components/ui/FakeStatusBar';

// Limit Row Component
interface LimitRowProps {
  label: string;
  value: string;
}

function LimitRow({ label, value }: LimitRowProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.limitRow}>
      <Text style={[styles.limitLabel, { color: colors.textMuted }]}>{label}</Text>
      <Text style={[styles.limitValue, { color: colors.textPrimary }]}>{value}</Text>
    </View>
  );
}

// Token Row Component
interface TokenRowProps {
  name: string;
  network: string;
  iconColor: string;
  symbol: string;
}

function TokenRow({ name, network, iconColor, symbol }: TokenRowProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.tokenRow}>
      <View style={styles.tokenIconWrapper}>
        <View style={[styles.tokenIcon, { backgroundColor: iconColor }]}>
          <Text style={styles.tokenSymbol}>{symbol}</Text>
        </View>
        {/* Small network badge */}
        <View style={styles.networkBadge}>
          <View style={styles.networkBadgeInner}>
            <Text style={styles.networkBadgeText}>◆</Text>
          </View>
        </View>
      </View>
      <View style={styles.tokenContent}>
        <Text style={[styles.tokenName, { color: colors.textPrimary }]}>{name}</Text>
        <Text style={[styles.tokenNetwork, { color: colors.textMuted }]}>{network}</Text>
      </View>
    </View>
  );
}

export default function QuickPayDetailScreen() {
  const { colors } = useTheme();
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.bgPrimary }]}>
      <FakeStatusBar />

      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={handleBack} style={styles.backButton}>
          <ChevronLeft size={24} color={colors.textPrimary} strokeWidth={2} />
        </Pressable>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Icon */}
        <View style={styles.iconContainer}>
          <View style={styles.iconCircle}>
            <Zap size={40} color="#FFFFFF" fill="#FFFFFF" strokeWidth={0} />
          </View>
        </View>

        {/* Country Flags */}
        <View style={styles.flagsRow}>
          <Text style={styles.flag}>🇧🇷</Text>
          <Text style={styles.flag}>🇵🇭</Text>
          <Text style={styles.flag}>🇻🇳</Text>
        </View>

        {/* Title */}
        <Text style={[styles.title, { color: colors.textPrimary }]}>Quick Pay</Text>

        {/* Description */}
        <Text style={[styles.description, { color: colors.textMuted }]}>
          Start paying now. Deposit USDT on Arbitrum and scan any supported QR code.
        </Text>

        {/* Divider */}
        <View style={[styles.divider, { backgroundColor: colors.border }]} />

        {/* Your Limits Section */}
        <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Your Limits</Text>
        
        <View style={styles.limitsContainer}>
          <LimitRow label="Per transaction:" value="$200 USD" />
          <LimitRow label="Daily Limit:" value="$500 USD" />
          <LimitRow label="Monthly Limit:" value="$5,000 USD" />
        </View>

        {/* Divider */}
        <View style={[styles.divider, { backgroundColor: colors.border }]} />

        {/* Supported Tokens Section */}
        <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Supported tokens:</Text>
        
        <TokenRow
          name="USDT"
          network="Arbitrum"
          iconColor="#26A17B"
          symbol="₮"
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    paddingHorizontal: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },

  // Icon
  iconContainer: {
    marginTop: 8,
    marginBottom: 24,
  },
  iconCircle: {
    width: 88,
    height: 88,
    borderRadius: 20,
    backgroundColor: '#6430D2',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Flags
  flagsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  flag: {
    fontSize: 18,
  },

  // Title & Description
  title: {
    fontSize: 32,
    fontFamily: 'Inter',
    fontWeight: '600',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    fontFamily: 'Inter',
    fontWeight: '400',
    lineHeight: 24,
    marginBottom: 24,
  },

  // Divider
  divider: {
    height: 1,
    marginBottom: 24,
  },

  // Section Title
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter',
    fontWeight: '600',
    marginBottom: 16,
  },

  // Limits
  limitsContainer: {
    gap: 12,
    marginBottom: 24,
  },
  limitRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  limitLabel: {
    fontSize: 15,
    fontFamily: 'Inter',
    fontWeight: '400',
  },
  limitValue: {
    fontSize: 15,
    fontFamily: 'Inter',
    fontWeight: '500',
  },

  // Token Row
  tokenRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  tokenIconWrapper: {
    position: 'relative',
    width: 44,
    height: 44,
  },
  tokenIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tokenSymbol: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  networkBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#18181B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  networkBadgeInner: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#28A0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  networkBadgeText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  tokenContent: {
    flex: 1,
  },
  tokenName: {
    fontSize: 16,
    fontFamily: 'Inter',
    fontWeight: '600',
    marginBottom: 2,
  },
  tokenNetwork: {
    fontSize: 14,
    fontFamily: 'Inter',
    fontWeight: '400',
  },
});
