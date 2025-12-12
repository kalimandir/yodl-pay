import { View, Text, StyleSheet, Pressable, ScrollView, Platform } from 'react-native';
import { ChevronLeft, ArrowUpRight, ArrowDownLeft, ArrowLeftRight, Copy } from 'lucide-react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useTheme } from '../../../hooks/useTheme';
import { FakeStatusBar } from '../../../components/ui/FakeStatusBar';
import { spacing, radius } from '../../../constants/spacing';
import { fontSize, fontWeight, fontFamily } from '../../../constants/typography';

// Mock token data
const tokenData: Record<string, {
  symbol: string;
  chain: string;
  balance: number;
  usdValue: number;
  iconColor: string;
  network: string;
  address: string;
  transactions: Array<{
    id: string;
    type: 'received' | 'sent';
    amount: number;
    date: string;
    time: string;
  }>;
}> = {
  'usdt-arb': {
    symbol: 'USDT',
    chain: 'Arbitrum',
    balance: 200.00,
    usdValue: 200.00,
    iconColor: '#26A17B',
    network: 'Arbitrum One',
    address: '0x8968...ddD7E9',
    transactions: [
      { id: '1', type: 'received', amount: 50, date: '5 AUG', time: '14:30' },
      { id: '2', type: 'sent', amount: 25, date: '3 AUG', time: '09:15' },
      { id: '3', type: 'received', amount: 100, date: '1 AUG', time: '18:45' },
    ],
  },
  'usdt-bnb': {
    symbol: 'USDT',
    chain: 'BNB Chain',
    balance: 150.00,
    usdValue: 150.00,
    iconColor: '#26A17B',
    network: 'BNB Smart Chain',
    address: '0x8968...ddD7E9',
    transactions: [
      { id: '1', type: 'received', amount: 150, date: '2 AUG', time: '11:20' },
    ],
  },
};

// Action Button Component
interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
}

function ActionButton({ icon, label, onPress }: ActionButtonProps) {
  const { colors } = useTheme();
  
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.actionButtonWrapper, pressed && styles.pressed]}>
      <View style={[styles.actionButton, { backgroundColor: colors.bgElevated }]}>
        {icon}
      </View>
      <Text style={[styles.actionLabel, { color: colors.textMuted }]}>{label}</Text>
    </Pressable>
  );
}

// Transaction Row Component
interface TransactionRowProps {
  type: 'received' | 'sent';
  amount: number;
  symbol: string;
  date: string;
  time: string;
}

function TransactionRow({ type, amount, symbol, date, time }: TransactionRowProps) {
  const { colors, semantic } = useTheme();
  const isReceived = type === 'received';
  
  return (
    <View style={[styles.transactionRow, { borderBottomColor: colors.border }]}>
      <View style={styles.transactionLeft}>
        <View style={[styles.transactionIcon, { backgroundColor: colors.bgElevated }]}>
          {isReceived ? (
            <ArrowDownLeft size={18} color={semantic.success} strokeWidth={1.5} />
          ) : (
            <ArrowUpRight size={18} color={colors.textMuted} strokeWidth={1.5} />
          )}
        </View>
        <View>
          <Text style={[styles.transactionType, { color: colors.textPrimary }]}>
            {isReceived ? 'Received' : 'Sent'}
          </Text>
          <Text style={[styles.transactionDate, { color: colors.textMuted }]}>
            {date} • {time}
          </Text>
        </View>
      </View>
      <Text style={[
        styles.transactionAmount,
        { color: isReceived ? semantic.success : colors.textPrimary }
      ]}>
        {isReceived ? '+' : '-'}{amount} {symbol}
      </Text>
    </View>
  );
}

export default function TokenDetailScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  
  const token = tokenData[id || 'usdt-arb'];
  
  if (!token) {
    return (
      <View style={[styles.container, { backgroundColor: colors.bgPrimary }]}>
        <Text style={{ color: colors.textPrimary }}>Token not found</Text>
      </View>
    );
  }

  const handleCopyAddress = () => {
    // Copy to clipboard functionality
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.bgPrimary }]}>
      {Platform.OS === 'web' && <FakeStatusBar />}
      
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={24} color={colors.textPrimary} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>{token.symbol}</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Balance Section */}
        <View style={styles.balanceSection}>
          <View style={[styles.tokenIconLarge, { backgroundColor: token.iconColor }]}>
            <Text style={styles.tokenIconText}>
              {token.symbol === 'USDT' ? '₮' : token.symbol.charAt(0)}
            </Text>
          </View>
          <Text style={[styles.balanceAmount, { color: colors.textPrimary }]}>
            {token.balance.toFixed(2)} {token.symbol}
          </Text>
          <Text style={[styles.balanceUsd, { color: colors.textMuted }]}>
            ${token.usdValue.toFixed(2)}
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsRow}>
          <ActionButton
            icon={<ArrowDownLeft size={24} color={colors.textPrimary} strokeWidth={1.5} />}
            label="Top Up"
            onPress={() => {}}
          />
          <ActionButton
            icon={<ArrowUpRight size={24} color={colors.textPrimary} strokeWidth={1.5} />}
            label="Send"
            onPress={() => {}}
          />
          <ActionButton
            icon={<ArrowLeftRight size={24} color={colors.textPrimary} strokeWidth={1.5} />}
            label="Swap"
            onPress={() => {}}
          />
        </View>

        {/* Info Card */}
        <View style={[styles.infoCard, { backgroundColor: colors.bgElevated }]}>
          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: colors.textMuted }]}>Network</Text>
            <Text style={[styles.infoValue, { color: colors.textPrimary }]}>{token.network}</Text>
          </View>
          <View style={[styles.infoRow, styles.infoRowLast]}>
            <Text style={[styles.infoLabel, { color: colors.textMuted }]}>Address</Text>
            <Pressable style={({ pressed }) => [styles.addressRow, pressed && styles.pressed]} onPress={handleCopyAddress}>
              <Text style={[styles.infoValue, { color: colors.textPrimary }]}>{token.address}</Text>
              <Copy size={16} color={colors.textMuted} strokeWidth={1.5} />
            </Pressable>
          </View>
        </View>

        {/* Transactions Section */}
        <View style={styles.transactionsSection}>
          <Text style={[styles.sectionTitle, { color: colors.textMuted }]}>Transactions</Text>
          <View style={styles.transactionsList}>
            {token.transactions.map((tx) => (
              <TransactionRow
                key={tx.id}
                type={tx.type}
                amount={tx.amount}
                symbol={token.symbol}
                date={tx.date}
                time={tx.time}
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
  pressed: {
    opacity: 0.7,
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
  headerSpacer: {
    width: spacing['4xl'],
  },
  
  // Scroll
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing['4xl'],
  },
  
  // Balance Section
  balanceSection: {
    alignItems: 'center',
    paddingVertical: spacing['2xl'],
  },
  tokenIconLarge: {
    width: 56,
    height: 56,
    borderRadius: radius.full,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  tokenIconText: {
    fontFamily: fontFamily.base,
    fontSize: 24,
    fontWeight: fontWeight.bold,
    color: '#FFFFFF',
  },
  balanceAmount: {
    fontFamily: fontFamily.base,
    fontSize: 28,
    fontWeight: fontWeight.semibold,
    marginBottom: spacing.xs,
  },
  balanceUsd: {
    fontFamily: fontFamily.base,
    fontSize: fontSize.bodySecondary,
    fontWeight: fontWeight.regular,
  },
  
  // Action Buttons
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing['3xl'],
    marginBottom: spacing['2xl'],
  },
  actionButtonWrapper: {
    alignItems: 'center',
    gap: spacing.sm,
  },
  actionButton: {
    width: 56,
    height: 56,
    borderRadius: radius.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionLabel: {
    fontFamily: fontFamily.base,
    fontSize: fontSize.bodySecondary,
    fontWeight: fontWeight.medium,
  },
  
  // Info Card
  infoCard: {
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing['2xl'],
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  infoRowLast: {
    borderBottomWidth: 0,
  },
  infoLabel: {
    fontFamily: fontFamily.base,
    fontSize: fontSize.body,
    fontWeight: fontWeight.regular,
  },
  infoValue: {
    fontFamily: fontFamily.base,
    fontSize: fontSize.body,
    fontWeight: fontWeight.medium,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  
  // Transactions
  transactionsSection: {
    marginTop: spacing.sm,
  },
  sectionTitle: {
    fontFamily: fontFamily.base,
    fontSize: fontSize.body,
    fontWeight: fontWeight.medium,
    marginBottom: spacing.md,
  },
  transactionsList: {
    gap: 0,
  },
  transactionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  transactionIcon: {
    width: 36,
    height: 36,
    borderRadius: radius.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  transactionType: {
    fontFamily: fontFamily.base,
    fontSize: fontSize.body,
    fontWeight: fontWeight.medium,
  },
  transactionDate: {
    fontFamily: fontFamily.base,
    fontSize: fontSize.caption,
    fontWeight: fontWeight.regular,
    marginTop: 2,
  },
  transactionAmount: {
    fontFamily: fontFamily.base,
    fontSize: fontSize.body,
    fontWeight: fontWeight.medium,
  },
});
