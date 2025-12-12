import { View, Text, StyleSheet, Pressable, ScrollView, Platform } from 'react-native';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../../hooks/useTheme';
import { FakeStatusBar } from '../../components/ui/FakeStatusBar';
import { spacing, radius } from '../../constants/spacing';
import { fontSize, fontWeight, fontFamily } from '../../constants/typography';

// Mock wallet data
const walletData = {
  totalBalance: 785.00,
};

// Active country (from settings)
const activeCountry = {
  name: 'Vietnam',
  flag: '🇻🇳',
  availableBalance: 350.00,
  quickPay: {
    limitPerTx: 200,
    limitPerDay: 500,
    tokens: [
      { id: 'usdt-arb', symbol: 'USDT', chain: 'Arbitrum', balance: 200.00, iconColor: '#26A17B' },
      { id: 'usdt-bnb', symbol: 'USDT', chain: 'BNB Chain', balance: 150.00, iconColor: '#26A17B' },
    ],
  },
  proPay: {
    limitPerTx: 2000,
    limitPerDay: 5000,
    isUnlocked: false,
  },
};

// Other assets
const otherAssets = [
  { id: 'eth', symbol: 'ETH', chain: 'Arbitrum', amount: 0.042, usdValue: 98.50, iconColor: '#627EEA' },
  { id: 'dai', symbol: 'DAI', chain: 'Arbitrum', amount: 26.50, usdValue: 26.50, iconColor: '#F5AC37' },
];

// Token Icon Component
interface TokenIconProps {
  symbol: string;
  backgroundColor: string;
  size?: number;
}

function TokenIcon({ symbol, backgroundColor, size = 36 }: TokenIconProps) {
  const glyph = symbol === 'USDT' ? '₮' : symbol.charAt(0);
  return (
    <View style={[styles.tokenIcon, { backgroundColor, width: size, height: size, borderRadius: size / 2 }]}>
      <Text style={[styles.tokenIconText, { fontSize: size * 0.44 }]}>{glyph}</Text>
    </View>
  );
}

// Token Row Component
interface TokenRowProps {
  id: string;
  symbol: string;
  chain: string;
  balance: number;
  iconColor: string;
  onPress: () => void;
}

function TokenRow({ symbol, chain, balance, iconColor, onPress }: TokenRowProps) {
  const { colors } = useTheme();
  
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.tokenRow, pressed && styles.rowPressed]}
    >
      <View style={styles.tokenLeft}>
        <TokenIcon symbol={symbol} backgroundColor={iconColor} size={36} />
        <View>
          <Text style={[styles.tokenSymbol, { color: colors.textPrimary }]}>{symbol}</Text>
          <Text style={[styles.tokenChain, { color: colors.textMuted }]}>{chain}</Text>
        </View>
      </View>
      <View style={styles.tokenRight}>
        <Text style={[styles.tokenBalance, { color: colors.textPrimary }]}>
          ${balance.toFixed(2)}
        </Text>
        <ChevronRight size={16} color={colors.textMuted} />
      </View>
    </Pressable>
  );
}

// Asset Row Component
interface AssetRowProps {
  symbol: string;
  chain: string;
  amount: number;
  usdValue: number;
  iconColor: string;
}

function AssetRow({ symbol, chain, amount, usdValue, iconColor }: AssetRowProps) {
  const { colors } = useTheme();
  
  return (
    <Pressable style={({ pressed }) => [styles.assetRow, { borderBottomColor: colors.border }, pressed && styles.rowPressed]}>
      <View style={styles.tokenLeft}>
        <TokenIcon symbol={symbol} backgroundColor={iconColor} size={36} />
        <View>
          <Text style={[styles.tokenSymbol, { color: colors.textPrimary }]}>{symbol}</Text>
          <Text style={[styles.tokenChain, { color: colors.textMuted }]}>{chain}</Text>
        </View>
      </View>
      <View style={styles.assetRight}>
        <Text style={[styles.tokenBalance, { color: colors.textPrimary }]}>{amount}</Text>
        <Text style={[styles.assetUsd, { color: colors.textMuted }]}>${usdValue.toFixed(2)}</Text>
      </View>
    </Pressable>
  );
}

export default function WalletScreen() {
  const { colors } = useTheme();
  const router = useRouter();

  return (
    <View style={[styles.container, { backgroundColor: colors.bgPrimary }]}>
      {Platform.OS === 'web' && <FakeStatusBar />}
      
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={24} color={colors.textPrimary} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Wallet</Text>
        <Pressable hitSlop={spacing.sm} style={({ pressed }) => [pressed && styles.linkPressed]}>
          <Text style={[styles.manageLink, { color: colors.purpleSecondary }]}>Manage</Text>
        </Pressable>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Total Balance */}
        <View style={styles.balanceSection}>
          <Text style={[styles.balanceLabel, { color: colors.textMuted }]}>Total Balance</Text>
          <Text style={[styles.balanceAmount, { color: colors.textPrimary }]}>
            ${walletData.totalBalance.toFixed(2)}
          </Text>
        </View>

        {/* Active Country Card */}
        <View style={[styles.countryCard, { backgroundColor: colors.bgElevated }]}>
          {/* Country Header */}
          <View style={styles.countryHeader}>
            <Text style={styles.countryFlag}>{activeCountry.flag}</Text>
            <Text style={[styles.countryName, { color: colors.textPrimary }]}>
              {activeCountry.name}
            </Text>
          </View>
          
          <Text style={[styles.countryBalance, { color: colors.textPrimary }]}>
            ${activeCountry.availableBalance.toFixed(2)}
          </Text>
          <Text style={[styles.countrySubtext, { color: colors.textMuted }]}>
            available to spend
          </Text>

          {/* Divider */}
          <View style={[styles.divider, { backgroundColor: colors.border }]} />

          {/* Quick Pay Section */}
          <View style={styles.tierSection}>
            <View style={styles.tierHeader}>
              <Text style={[styles.tierName, { color: colors.textPrimary }]}>Quick Pay</Text>
              <Text style={[styles.tierLimits, { color: colors.textMuted }]}>
                ${activeCountry.quickPay.limitPerTx}/tx · ${activeCountry.quickPay.limitPerDay}/day
              </Text>
            </View>
            <View style={styles.tokenList}>
              {activeCountry.quickPay.tokens.map((token) => (
                <TokenRow
                  key={token.id}
                  id={token.id}
                  symbol={token.symbol}
                  chain={token.chain}
                  balance={token.balance}
                  iconColor={token.iconColor}
                  onPress={() => router.push(`/(screens)/token/${token.id}`)}
                />
              ))}
            </View>
          </View>
        </View>

        {/* Pro Pay Card - Separate */}
        <View style={[styles.proPayCard, { borderColor: colors.border }]}>
          <View style={styles.proPayLeft}>
            <Text style={[styles.tierName, { color: colors.textPrimary }]}>Pro Pay</Text>
            <Text style={[styles.tierLimits, { color: colors.textMuted }]}>
              ${activeCountry.proPay.limitPerTx.toLocaleString()}/tx · ${activeCountry.proPay.limitPerDay.toLocaleString()}/day
            </Text>
          </View>
          <Pressable style={({ pressed }) => [styles.verifyButton, pressed && styles.linkPressed]}>
            <Text style={[styles.verifyText, { color: colors.purpleSecondary }]}>
              Verify to unlock
            </Text>
            <ArrowRight size={spacing.md} color={colors.purpleSecondary} />
          </Pressable>
        </View>

        {/* Other Assets Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textMuted }]}>Other Assets</Text>
          <View style={styles.assetList}>
            {otherAssets.map((asset) => (
              <AssetRow
                key={asset.id}
                symbol={asset.symbol}
                chain={asset.chain}
                amount={asset.amount}
                usdValue={asset.usdValue}
                iconColor={asset.iconColor}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 56,
    paddingHorizontal: spacing.lg,
  },
  backButton: {
    width: spacing['4xl'],
    height: spacing['4xl'],
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  headerTitle: {
    fontFamily: fontFamily.base,
    fontSize: 17,
    fontWeight: fontWeight.semibold,
  },
  manageLink: {
    fontFamily: fontFamily.base,
    fontSize: fontSize.body,
    fontWeight: fontWeight.regular,
  },
  linkPressed: {
    opacity: 0.7,
  },
  rowPressed: {
    opacity: 0.7,
  },
  
  // Scroll
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing['4xl'],
  },
  
  // Total Balance
  balanceSection: {
    marginBottom: spacing['2xl'],
    paddingTop: spacing.sm,
  },
  balanceLabel: {
    fontFamily: fontFamily.base,
    fontSize: fontSize.bodySecondary,
    fontWeight: fontWeight.regular,
    marginBottom: spacing.xs,
  },
  balanceAmount: {
    fontFamily: fontFamily.base,
    fontSize: 28,
    fontWeight: fontWeight.semibold,
  },
  
  // Country Card
  countryCard: {
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  countryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  countryFlag: {
    fontSize: 18,
  },
  countryName: {
    fontFamily: fontFamily.base,
    fontSize: fontSize.body,
    fontWeight: fontWeight.medium,
  },
  countryBalance: {
    fontFamily: fontFamily.base,
    fontSize: 20,
    fontWeight: fontWeight.semibold,
  },
  countrySubtext: {
    fontFamily: fontFamily.base,
    fontSize: fontSize.bodySecondary,
    fontWeight: fontWeight.regular,
    marginTop: spacing.xs,
    marginBottom: spacing.xl,
  },
  
  // Divider
  divider: {
    height: 1,
    width: '100%',
  },
  
  // Tier Section
  tierSection: {
    paddingTop: spacing.xl,
  },
  tierHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  tierName: {
    fontFamily: fontFamily.base,
    fontSize: fontSize.body,
    fontWeight: fontWeight.medium,
  },
  tierLimits: {
    fontFamily: fontFamily.base,
    fontSize: fontSize.caption,
    fontWeight: fontWeight.regular,
  },
  tokenList: {
    gap: 0,
  },
  
  // Token Row
  tokenRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    borderRadius: spacing.md,
  },
  tokenLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  tokenIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  tokenIconText: {
    fontFamily: fontFamily.base,
    fontWeight: fontWeight.bold,
    color: '#FFFFFF',
  },
  tokenSymbol: {
    fontFamily: fontFamily.base,
    fontSize: fontSize.body,
    fontWeight: fontWeight.medium,
  },
  tokenChain: {
    fontFamily: fontFamily.base,
    fontSize: fontSize.caption,
    fontWeight: fontWeight.regular,
    marginTop: 1,
  },
  tokenRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  tokenBalance: {
    fontFamily: fontFamily.base,
    fontSize: fontSize.body,
    fontWeight: fontWeight.medium,
  },
  
  // Pro Pay Card
  proPayCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing['2xl'],
  },
  proPayLeft: {
    gap: spacing.xs,
  },
  verifyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  verifyText: {
    fontFamily: fontFamily.base,
    fontSize: fontSize.bodySecondary,
    fontWeight: fontWeight.medium,
  },
  
  // Section
  section: {
    marginBottom: spacing['3xl'],
  },
  sectionTitle: {
    fontFamily: fontFamily.base,
    fontSize: fontSize.body,
    fontWeight: fontWeight.medium,
    marginBottom: spacing.md,
  },
  
  // Asset Row
  assetList: {
    gap: 0,
  },
  assetRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
  },
  assetRight: {
    alignItems: 'flex-end',
  },
  assetUsd: {
    fontFamily: fontFamily.base,
    fontSize: fontSize.caption,
    fontWeight: fontWeight.regular,
    marginTop: 1,
  },
});
