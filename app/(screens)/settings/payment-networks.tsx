import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, ChevronRight, Info, Zap, ShieldCheck, Globe, Check } from 'lucide-react-native';
import { useTheme } from '../../../hooks/useTheme';
import { FakeStatusBar } from '../../../components/ui/FakeStatusBar';

// Payment Tier Data
interface PaymentTier {
  id: string;
  name: string;
  subtitle: string;
  icon: 'zap' | 'shield' | 'globe';
  isActive: boolean;
  isLocked: boolean;
  countries: string[];
  badge?: string;
}

const paymentTiers: PaymentTier[] = [
  {
    id: 'quick',
    name: 'Quick Pay',
    subtitle: 'No verification required',
    icon: 'zap',
    isActive: true,
    isLocked: false,
    countries: ['🇧🇷', '🇵🇭', '🇻🇳'],
    badge: 'Active',
  },
  {
    id: 'pro',
    name: 'Pro Pay',
    subtitle: 'Higher limits. More countries.',
    icon: 'shield',
    isActive: false,
    isLocked: true,
    countries: ['🇦🇷', '🇻🇳'],
  },
  {
    id: 'global',
    name: 'Global Pay',
    subtitle: 'More countries and coverage.',
    icon: 'globe',
    isActive: false,
    isLocked: true,
    countries: ['🇦🇷', '🇻🇳'],
  },
];

// Tier Icon Component
interface TierIconProps {
  type: 'zap' | 'shield' | 'globe';
  color: string;
}

function TierIcon({ type, color }: TierIconProps) {
  const iconProps = { size: 24, color, strokeWidth: 2 };
  
  switch (type) {
    case 'zap':
      return <Zap {...iconProps} fill={color} strokeWidth={0} />;
    case 'shield':
      return <ShieldCheck {...iconProps} />;
    case 'globe':
      return <Globe {...iconProps} />;
  }
}

// Payment Tier Card Component
interface TierCardProps {
  tier: PaymentTier;
  onPress: () => void;
  onCountriesPress: () => void;
}

function TierCard({ tier, onPress, onCountriesPress }: TierCardProps) {
  const { colors } = useTheme();

  return (
    <Pressable
      style={[
        styles.tierCard,
        { backgroundColor: colors.bgElevated },
        tier.isActive && styles.tierCardActive,
      ]}
      onPress={onPress}
    >
      {/* Header Section */}
      <View style={styles.tierHeader}>
        <View style={[styles.tierIconContainer, { backgroundColor: 'rgba(100, 48, 210, 0.2)' }]}>
          <TierIcon type={tier.icon} color={colors.purpleSecondary} />
        </View>
        
        <View style={styles.tierContent}>
          <View style={styles.tierTitleRow}>
            <Text style={[styles.tierName, { color: colors.textPrimary }]}>
              {tier.name}
            </Text>
            {tier.badge && (
              <View style={styles.activeBadge}>
                <Text style={styles.activeBadgeText}>{tier.badge}</Text>
              </View>
            )}
          </View>
          <Text style={[styles.tierSubtitle, { color: colors.textMuted }]}>
            {tier.subtitle}
          </Text>
        </View>

        {/* Selection Indicator */}
        {tier.isActive ? (
          <View style={styles.checkCircle}>
            <Check size={16} color="#FFFFFF" strokeWidth={3} />
          </View>
        ) : (
          <View style={[styles.emptyCircle, { borderColor: colors.textMuted }]} />
        )}
      </View>

      {/* Divider */}
      <View style={[styles.divider, { backgroundColor: colors.border }]} />

      {/* Countries Row */}
      <Pressable style={styles.countriesRow} onPress={onCountriesPress}>
        <View style={styles.flagsContainer}>
          {tier.countries.map((flag, index) => (
            <Text key={index} style={styles.flag}>{flag}</Text>
          ))}
        </View>
        <ChevronRight size={20} color={colors.textMuted} strokeWidth={1.5} />
      </Pressable>

      {/* Verify Button (for locked tiers) */}
      {tier.isLocked && (
        <Pressable style={styles.verifyButton}>
          <Text style={[styles.verifyButtonText, { color: colors.textPrimary }]}>
            Verify to unlock →
          </Text>
        </Pressable>
      )}
    </Pressable>
  );
}

export default function PaymentNetworksScreen() {
  const { colors } = useTheme();
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const handleTierPress = (tier: PaymentTier) => {
    if (tier.isLocked) {
      // Would navigate to verification flow
      console.log('Navigate to verification for:', tier.name);
    } else {
      // Select this tier
      console.log('Selected tier:', tier.name);
    }
  };

  const handleCountriesPress = (tier: PaymentTier) => {
    // Navigate to detail screen based on tier
    if (tier.id === 'quick') {
      router.push('/(screens)/settings/quick-pay');
    } else {
      // Could add pro-pay and global-pay detail screens later
      console.log('View details for:', tier.name);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.bgPrimary }]}>
      <FakeStatusBar />

      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={handleBack} style={styles.headerButton}>
          <ChevronLeft size={24} color={colors.textPrimary} strokeWidth={2} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Payment Networks</Text>
        <Pressable style={styles.headerButton}>
          <Info size={22} color={colors.textPrimary} strokeWidth={1.5} />
        </Pressable>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {paymentTiers.map((tier) => (
          <TierCard
            key={tier.id}
            tier={tier}
            onPress={() => handleTierPress(tier)}
            onCountriesPress={() => handleCountriesPress(tier)}
          />
        ))}
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
    justifyContent: 'space-between',
    height: 56,
    paddingHorizontal: 16,
  },
  headerButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 17,
    fontFamily: 'Inter',
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 40,
    gap: 12,
  },

  // Tier Card
  tierCard: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  tierCardActive: {
    borderColor: '#6430D2',
  },
  tierHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  tierIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  tierContent: {
    flex: 1,
    paddingTop: 4,
  },
  tierTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  tierName: {
    fontSize: 17,
    fontFamily: 'Inter',
    fontWeight: '600',
  },
  activeBadge: {
    backgroundColor: 'rgba(34, 197, 94, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  activeBadgeText: {
    color: '#22C55E',
    fontSize: 12,
    fontFamily: 'Inter',
    fontWeight: '500',
  },
  tierSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter',
    fontWeight: '400',
  },

  // Selection Indicators
  checkCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#6430D2',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
  emptyCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    marginTop: 4,
  },

  // Divider
  divider: {
    height: 1,
    marginVertical: 16,
  },

  // Countries Row
  countriesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  flagsContainer: {
    flexDirection: 'row',
    gap: 6,
  },
  flag: {
    fontSize: 18,
  },

  // Verify Button
  verifyButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 16,
  },
  verifyButtonText: {
    fontSize: 15,
    fontFamily: 'Inter',
    fontWeight: '500',
  },
});
