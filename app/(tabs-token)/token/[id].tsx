import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ChevronLeft, Plus, Send, RefreshCw, ArrowUpRight, ArrowDownLeft } from 'lucide-react-native';
import { useTheme } from '../../../hooks/useTheme';
import { FakeStatusBar } from '../../../components/ui/FakeStatusBar';

// Mock Token Data
const tokenData: Record<string, any> = {
  usdt: {
    name: 'USDT',
    symbol: '₮',
    color: '#26A17B',
    networks: [
      { id: 'arbitrum', name: 'Arbitrum', balance: 200.00, balanceToken: 200.00, isActive: true },
      { id: 'bnb', name: 'BNB Chain', balance: 150.00, balanceToken: 150.00, isActive: false },
    ],
    spendableIn: ['🇻🇳', '🇧🇷', '🇵🇭'],
    limits: {
      quick: { perTx: 200, perDay: 500 },
      pro: { perTx: 2000, perDay: 5000, verified: false },
    },
    history: [
      { id: '1', type: 'payment', title: 'Payment', date: 'Dec 8, 09:21', amount: '-30,000 đ', isNegative: true },
      { id: '2', type: 'topup', title: 'Top Up', date: 'Dec 7, 14:30', amount: '+50 USDT', isNegative: false },
    ],
  },
  usdc: {
    name: 'USDC',
    symbol: '$',
    color: '#2775CA',
    networks: [
      { id: 'arbitrum', name: 'Arbitrum', balance: 100.00, balanceToken: 100.00, isActive: true },
      { id: 'base', name: 'Base', balance: 50.00, balanceToken: 50.00, isActive: false },
    ],
    spendableIn: ['🇻🇳', '🇧🇷'],
    limits: {
      quick: { perTx: 200, perDay: 500 },
      pro: { perTx: 2000, perDay: 5000, verified: false },
    },
    history: [],
  },
  eth: {
    name: 'ETH',
    symbol: '◆',
    color: '#627EEA',
    networks: [
      { id: 'ethereum', name: 'Ethereum', balance: 98.50, balanceToken: 0.025, isActive: true },
    ],
    spendableIn: [],
    limits: {
      quick: { perTx: 0, perDay: 0 },
      pro: { perTx: 0, perDay: 0, verified: false },
    },
    history: [],
  },
  dai: {
    name: 'DAI',
    symbol: '◇',
    color: '#F5AC37',
    networks: [
      { id: 'arbitrum', name: 'Arbitrum', balance: 26.50, balanceToken: 26.50, isActive: true },
    ],
    spendableIn: [],
    limits: {
      quick: { perTx: 0, perDay: 0 },
      pro: { perTx: 0, perDay: 0, verified: false },
    },
    history: [],
  },
};

// Network Pill Component
interface NetworkPillProps {
  name: string;
  isActive: boolean;
  onPress: () => void;
}

function NetworkPill({ name, isActive, onPress }: NetworkPillProps) {
  const { colors } = useTheme();

  return (
    <Pressable
      style={[
        styles.networkPill,
        isActive ? styles.networkPillActive : { backgroundColor: colors.bgElevated },
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.networkPillText,
          { color: isActive ? '#FFFFFF' : colors.textMuted },
        ]}
      >
        {name}
      </Text>
    </Pressable>
  );
}

// Action Button Component
interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
}

function ActionButton({ icon, label, onPress }: ActionButtonProps) {
  const { colors } = useTheme();

  return (
    <Pressable style={styles.actionButton} onPress={onPress}>
      <View style={[styles.actionIconCircle, { backgroundColor: colors.bgElevated }]}>
        {icon}
      </View>
      <Text style={[styles.actionLabel, { color: colors.textPrimary }]}>{label}</Text>
    </Pressable>
  );
}

// History Row Component
interface HistoryRowProps {
  type: 'payment' | 'topup';
  title: string;
  date: string;
  amount: string;
  isNegative: boolean;
}

function HistoryRow({ type, title, date, amount, isNegative }: HistoryRowProps) {
  const { colors } = useTheme();

  const icon = type === 'payment' ? (
    <ArrowUpRight size={16} color="#FFFFFF" strokeWidth={2} />
  ) : (
    <ArrowDownLeft size={16} color="#FFFFFF" strokeWidth={2} />
  );

  const iconBgColor = type === 'payment' ? '#5A2828' : '#1F4329';
  const amountColor = isNegative ? '#FF6B6B' : '#22C55E';

  return (
    <View style={styles.historyRow}>
      <View style={[styles.historyIcon, { backgroundColor: iconBgColor }]}>
        {icon}
      </View>
      <View style={styles.historyContent}>
        <Text style={[styles.historyTitle, { color: colors.textPrimary }]}>{title}</Text>
        <Text style={[styles.historyDate, { color: colors.textMuted }]}>{date}</Text>
      </View>
      <Text style={[styles.historyAmount, { color: amountColor }]}>{amount}</Text>
    </View>
  );
}

export default function TokenDetailScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const params = useLocalSearchParams();

  const tokenId = (params.id as string) || 'usdt';
  const token = tokenData[tokenId] || tokenData.usdt;
  const activeNetwork = token.networks.find((n: any) => n.isActive) || token.networks[0];

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
        <View style={styles.headerToken}>
          <View style={[styles.tokenIconSmall, { backgroundColor: token.color }]}>
            <Text style={styles.tokenSymbolSmall}>{token.symbol}</Text>
          </View>
          <Text style={[styles.headerTokenName, { color: colors.textPrimary }]}>{token.name}</Text>
        </View>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Network Pills */}
        <View style={styles.networkPills}>
          {token.networks.map((network: any) => (
            <NetworkPill
              key={network.id}
              name={network.name}
              isActive={network.isActive}
              onPress={() => console.log('Switch to', network.name)}
            />
          ))}
        </View>

        {/* Balance Display */}
        <View style={styles.balanceSection}>
          <Text style={[styles.balanceAmount, { color: colors.textPrimary }]}>
            ${activeNetwork.balance.toFixed(2)}
          </Text>
          <Text style={[styles.balanceToken, { color: colors.textMuted }]}>
            {activeNetwork.balanceToken.toFixed(2)} {token.name}
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actions}>
          <ActionButton
            icon={<Plus size={20} color={colors.textPrimary} strokeWidth={2} />}
            label="Top Up"
            onPress={() => console.log('Top Up')}
          />
          <ActionButton
            icon={<Send size={20} color={colors.textPrimary} strokeWidth={1.5} />}
            label="Send"
            onPress={() => console.log('Send')}
          />
          <ActionButton
            icon={<RefreshCw size={20} color={colors.textPrimary} strokeWidth={1.5} />}
            label="Swap"
            onPress={() => console.log('Swap')}
          />
        </View>

        {/* Spendable In */}
        {token.spendableIn.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.textMuted }]}>SPENDABLE IN</Text>
            <View style={styles.flagsRow}>
              {token.spendableIn.map((flag: string, index: number) => (
                <Text key={index} style={styles.flag}>{flag}</Text>
              ))}
            </View>
          </View>
        )}

        {/* Limits */}
        {(token.limits.quick.perTx > 0 || token.limits.pro.perTx > 0) && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.textMuted }]}>LIMITS</Text>
            <View style={styles.limitsContainer}>
              {/* Quick */}
              <View style={[styles.limitCard, styles.limitCardQuick]}>
                <Text style={[styles.limitTier, { color: colors.textPrimary }]}>Quick</Text>
                <Text style={[styles.limitDetails, { color: colors.textMuted }]}>
                  ${token.limits.quick.perTx}/tx
                </Text>
                <Text style={[styles.limitDetails, { color: colors.textMuted }]}>
                  ${token.limits.quick.perDay}/day
                </Text>
              </View>

              {/* Pro */}
              <View style={[styles.limitCard, { backgroundColor: colors.bgElevated }]}>
                <Text style={[styles.limitTier, { color: colors.textPrimary }]}>Pro</Text>
                <Text style={[styles.limitDetails, { color: colors.textMuted }]}>
                  ${token.limits.pro.perTx.toLocaleString()}/tx
                </Text>
                <Text style={[styles.limitDetails, { color: colors.textMuted }]}>
                  ${token.limits.pro.perDay.toLocaleString()}/day
                </Text>
                {!token.limits.pro.verified && (
                  <Pressable style={styles.verifyLink}>
                    <Text style={[styles.verifyText, { color: colors.purpleSecondary }]}>
                      Verify →
                    </Text>
                  </Pressable>
                )}
              </View>
            </View>
          </View>
        )}

        {/* History */}
        {token.history.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeaderRow}>
              <Text style={[styles.sectionTitle, { color: colors.textMuted }]}>HISTORY</Text>
              <Pressable>
                <Text style={[styles.viewAllLink, { color: colors.purpleSecondary }]}>View all</Text>
              </Pressable>
            </View>
            <View style={styles.historyList}>
              {token.history.map((item: any) => (
                <HistoryRow
                  key={item.id}
                  type={item.type}
                  title={item.title}
                  date={item.date}
                  amount={item.amount}
                  isNegative={item.isNegative}
                />
              ))}
            </View>
          </View>
        )}
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
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  headerToken: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  tokenIconSmall: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tokenSymbolSmall: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  headerTokenName: {
    fontSize: 17,
    fontFamily: 'Inter',
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },

  // Network Pills
  networkPills: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 24,
  },
  networkPill: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  networkPillActive: {
    backgroundColor: '#6430D2',
  },
  networkPillText: {
    fontSize: 14,
    fontFamily: 'Inter',
    fontWeight: '500',
  },

  // Balance
  balanceSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  balanceAmount: {
    fontSize: 48,
    fontFamily: 'Inter',
    fontWeight: '600',
    marginBottom: 4,
  },
  balanceToken: {
    fontSize: 16,
    fontFamily: 'Inter',
    fontWeight: '400',
  },

  // Actions
  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 32,
    marginBottom: 32,
  },
  actionButton: {
    alignItems: 'center',
    gap: 8,
  },
  actionIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionLabel: {
    fontSize: 13,
    fontFamily: 'Inter',
    fontWeight: '500',
  },

  // Section
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: 'Inter',
    fontWeight: '600',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  viewAllLink: {
    fontSize: 14,
    fontFamily: 'Inter',
    fontWeight: '500',
  },

  // Flags
  flagsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  flag: {
    fontSize: 24,
  },

  // Limits
  limitsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  limitCard: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
  },
  limitCardQuick: {
    backgroundColor: '#1F4329',
    borderLeftWidth: 3,
    borderLeftColor: '#22C55E',
  },
  limitTier: {
    fontSize: 16,
    fontFamily: 'Inter',
    fontWeight: '600',
    marginBottom: 8,
  },
  limitDetails: {
    fontSize: 14,
    fontFamily: 'Inter',
    fontWeight: '400',
    marginBottom: 2,
  },
  verifyLink: {
    marginTop: 8,
  },
  verifyText: {
    fontSize: 14,
    fontFamily: 'Inter',
    fontWeight: '500',
  },

  // History
  historyList: {
    gap: 12,
  },
  historyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  historyIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  historyContent: {
    flex: 1,
  },
  historyTitle: {
    fontSize: 15,
    fontFamily: 'Inter',
    fontWeight: '500',
    marginBottom: 2,
  },
  historyDate: {
    fontSize: 13,
    fontFamily: 'Inter',
    fontWeight: '400',
  },
  historyAmount: {
    fontSize: 15,
    fontFamily: 'Inter',
    fontWeight: '600',
  },
});
