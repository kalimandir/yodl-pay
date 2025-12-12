import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../hooks/useTheme';
import { FakeStatusBar } from '../../components/ui/FakeStatusBar';

// Mock Wallet Data
const mockWallet = {
  totalBalance: 625.00,
  spendableBalance: 500.00,
  otherBalance: 125.00,
};

const forPayments = [
  {
    id: 'usdt',
    name: 'USDT',
    symbol: '₮',
    balance: 350.00,
    color: '#26A17B',
    isActive: true,
  },
  {
    id: 'usdc',
    name: 'USDC',
    symbol: '$',
    balance: 150.00,
    color: '#2775CA',
    isActive: false,
  },
];

const otherAssets = [
  {
    id: 'eth',
    name: 'ETH',
    symbol: '◆',
    balance: 98.50,
    color: '#627EEA',
    network: null,
  },
  {
    id: 'dai',
    name: 'DAI',
    symbol: '◇',
    balance: 26.50,
    balanceUSD: 26.50,
    color: '#F5AC37',
    network: 'Arbitrum',
  },
];

// Section Header Component
interface SectionHeaderProps {
  title: string;
  actionText: string;
  onActionPress?: () => void;
}

function SectionHeader({ title, actionText, onActionPress }: SectionHeaderProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.sectionHeader}>
      <Text style={[styles.sectionTitle, { color: colors.textMuted }]}>{title}</Text>
      <Pressable onPress={onActionPress}>
        <Text style={[styles.sectionAction, { color: colors.textMuted }]}>{actionText}</Text>
      </Pressable>
    </View>
  );
}

// Token Row Component
interface TokenRowProps {
  id: string;
  name: string;
  symbol: string;
  balance: number;
  balanceUSD?: number;
  color: string;
  network?: string | null;
  isActive?: boolean;
  onPress: () => void;
}

function TokenRow({ id, name, symbol, balance, balanceUSD, color, network, isActive, onPress }: TokenRowProps) {
  const { colors } = useTheme();

  return (
    <Pressable
      style={[
        styles.tokenRow,
        { backgroundColor: colors.bgElevated },
        isActive && styles.tokenRowActive,
      ]}
      onPress={onPress}
    >
      {/* Active indicator */}
      {isActive && <View style={styles.activeIndicator} />}
      
      {/* Token Icon */}
      <View style={[styles.tokenIcon, { backgroundColor: color }]}>
        <Text style={styles.tokenSymbol}>{symbol}</Text>
      </View>

      {/* Token Info */}
      <View style={styles.tokenInfo}>
        <Text style={[styles.tokenName, { color: colors.textPrimary }]}>{name}</Text>
        {network && (
          <Text style={[styles.tokenNetwork, { color: colors.textMuted }]}>{network}</Text>
        )}
      </View>

      {/* Balance */}
      <View style={styles.tokenBalance}>
        {balanceUSD !== undefined ? (
          <>
            <Text style={[styles.tokenBalanceAmount, { color: colors.textPrimary }]}>
              {balance.toFixed(2)}
            </Text>
            <Text style={[styles.tokenBalanceUSD, { color: colors.textMuted }]}>
              ${balanceUSD.toFixed(2)}
            </Text>
          </>
        ) : (
          <Text style={[styles.tokenBalanceAmount, { color: colors.textPrimary }]}>
            ${balance.toFixed(2)}
          </Text>
        )}
      </View>

      {/* Chevron */}
      <ChevronRight size={20} color={colors.textMuted} strokeWidth={1.5} />
    </Pressable>
  );
}

export default function WalletScreen() {
  const { colors } = useTheme();
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const handleTokenPress = (tokenId: string) => {
    router.push(`/(tabs-token)/token/${tokenId}`);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.bgPrimary }]}>
      <FakeStatusBar />

      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={handleBack} style={styles.headerButton}>
          <ChevronLeft size={24} color={colors.textPrimary} strokeWidth={2} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Wallet</Text>
        <Pressable style={styles.headerButton}>
          <Text style={[styles.manageText, { color: colors.purpleSecondary }]}>Manage</Text>
        </Pressable>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Total Balance Card */}
        <LinearGradient
          colors={['#2D1B4E', '#231A2E']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.balanceCard}
        >
          <Text style={styles.balanceLabel}>Total Balance</Text>
          <Text style={styles.balanceAmount}>
            ${mockWallet.totalBalance.toFixed(2)}
          </Text>
          <Text style={styles.balanceBreakdown}>
            <Text style={styles.spendableText}>${mockWallet.spendableBalance.toFixed(2)}</Text>
            <Text style={styles.breakdownText}> spendable · </Text>
            <Text style={styles.breakdownText}>${mockWallet.otherBalance.toFixed(2)} other</Text>
          </Text>
        </LinearGradient>

        {/* For Payments Section */}
        <SectionHeader title="FOR PAYMENTS" actionText="Tap for details" />
        <View style={styles.tokenList}>
          {forPayments.map((token) => (
            <TokenRow
              key={token.id}
              {...token}
              onPress={() => handleTokenPress(token.id)}
            />
          ))}
        </View>

        {/* Other Assets Section */}
        <SectionHeader title="OTHER ASSETS" actionText="Swap to spend" />
        <View style={styles.tokenList}>
          {otherAssets.map((token) => (
            <TokenRow
              key={token.id}
              {...token}
              onPress={() => handleTokenPress(token.id)}
            />
          ))}
        </View>
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
    minWidth: 60,
    height: 40,
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 17,
    fontFamily: 'Inter',
    fontWeight: '600',
  },
  manageText: {
    fontSize: 15,
    fontFamily: 'Inter',
    fontWeight: '500',
    textAlign: 'right',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },

  // Balance Card
  balanceCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  balanceLabel: {
    fontSize: 14,
    fontFamily: 'Inter',
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 40,
    fontFamily: 'Inter',
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  balanceBreakdown: {
    fontSize: 14,
    fontFamily: 'Inter',
  },
  spendableText: {
    color: '#22C55E',
    fontWeight: '500',
  },
  breakdownText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontWeight: '400',
  },

  // Section Header
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: 'Inter',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  sectionAction: {
    fontSize: 13,
    fontFamily: 'Inter',
    fontWeight: '400',
  },

  // Token List
  tokenList: {
    gap: 8,
    marginBottom: 16,
  },

  // Token Row
  tokenRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 12,
    position: 'relative',
    overflow: 'hidden',
  },
  tokenRowActive: {
    borderLeftWidth: 3,
    borderLeftColor: '#22C55E',
  },
  activeIndicator: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 3,
    backgroundColor: '#22C55E',
  },
  tokenIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tokenSymbol: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  tokenInfo: {
    flex: 1,
  },
  tokenName: {
    fontSize: 16,
    fontFamily: 'Inter',
    fontWeight: '500',
  },
  tokenNetwork: {
    fontSize: 13,
    fontFamily: 'Inter',
    fontWeight: '400',
    marginTop: 2,
  },
  tokenBalance: {
    alignItems: 'flex-end',
    marginRight: 4,
  },
  tokenBalanceAmount: {
    fontSize: 16,
    fontFamily: 'Inter',
    fontWeight: '500',
  },
  tokenBalanceUSD: {
    fontSize: 13,
    fontFamily: 'Inter',
    fontWeight: '400',
    marginTop: 2,
  },
});
