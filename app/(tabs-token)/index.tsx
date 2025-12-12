import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { HelpCircle, Settings, Plus, Wallet, ShoppingBag } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../../hooks/useTheme';
import Svg, { Path } from 'react-native-svg';
import { HomeIcon, ScanIcon, MenuIcon } from '../../components/ui/TabBarIcons';
import { FakeStatusBar } from '../../components/ui/FakeStatusBar';

// Yodl Logo Component - Two overlapping diamonds
function YodlLogo() {
  return (
    <Svg width={43} height={27} viewBox="0 0 47 31" fill="none">
      <Path
        d="M0 15.36L15.36 0L30.72 15.36L15.36 30.72L0 15.36Z"
        fill="#3C08AA"
      />
      <Path
        d="M15.36 15.36L30.72 0L46.08 15.36L30.72 30.72L15.36 15.36Z"
        fill="#E2D0FF"
      />
      <Path
        d="M16.7113 16.7114C15.9649 15.965 15.9649 14.7549 16.7113 14.0086L23.0399 7.67997L29.3685 14.0086C30.1148 14.7549 30.1148 15.965 29.3685 16.7114L23.0399 23.04L16.7113 16.7114Z"
        fill="#9071D2"
      />
    </Svg>
  );
}

// Mock Data
const mockUser = {
  balance: 125.00,
  currency: 'USD',
  secondaryCurrency: 'VND',
  secondaryBalance: 3293125.00,
};

const mockTransactions = [
  {
    id: '1',
    type: 'spend' as const,
    title: 'Spend',
    timestamp: '5 AUG 2025 • 17:35',
    amountLocal: '-475,000 VND',
    amountUSDT: '18.03 USDT',
  },
];

// Activity Row Component
interface ActivityRowProps {
  type: 'spend' | 'topup' | 'receive';
  title: string;
  timestamp: string;
  amountLocal: string;
  amountUSDT: string;
  onPress?: () => void;
}

function ActivityRow({ type, title, timestamp, amountLocal, amountUSDT, onPress }: ActivityRowProps) {
  const { colors } = useTheme();
  
  const getIcon = () => {
    switch (type) {
      case 'spend':
        return <ShoppingBag size={20} color={colors.textPrimary} strokeWidth={1.5} />;
      case 'topup':
        return <Plus size={20} color={colors.textPrimary} strokeWidth={1.5} />;
      default:
        return <Wallet size={20} color={colors.textPrimary} strokeWidth={1.5} />;
    }
  };

  return (
    <Pressable
      style={styles.activityRow}
      onPress={onPress}
    >
      <View style={styles.activityIcon}>
        {getIcon()}
      </View>
      <View style={styles.activityContent}>
        <Text style={[styles.activityTitle, { color: colors.textPrimary }]}>
          {title}
        </Text>
        <Text style={[styles.activityTimestamp, { color: colors.textMuted }]}>
          {timestamp}
        </Text>
      </View>
      <View style={styles.activityAmounts}>
        <Text style={[styles.activityAmountLocal, { color: colors.textPrimary }]}>
          {amountLocal}
        </Text>
        {amountUSDT ? (
          <Text style={[styles.activityAmountUSDT, { color: colors.textMuted }]}>
            {amountUSDT}
          </Text>
        ) : null}
      </View>
    </Pressable>
  );
}

export default function HomeScreen() {
  const { colors, gradient } = useTheme();
  const router = useRouter();

  const formatBalance = (amount: number) => {
    return `$${amount.toFixed(2)}`;
  };

  const formatSecondaryBalance = (currency: string, amount: number) => {
    return `${currency} ${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.bgPrimary }]}>
      {/* Header - Flat purple gradient band (106px) */}
      <LinearGradient
        colors={gradient.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        {/* Status Bar (web only) */}
        <FakeStatusBar />
        
        {/* Navigation Row */}
        <View style={styles.navRow}>
          <View style={styles.logoContainer}>
            <YodlLogo />
          </View>
          <View style={styles.navActions}>
            <Pressable style={styles.navIconCircle}>
              <HelpCircle size={20} color="#FFFFFF" strokeWidth={1.5} />
            </Pressable>
            <Pressable 
              style={styles.navIconCircle}
              onPress={() => router.push('/(tabs-token)/menu')}
            >
              <Settings size={20} color="#FFFFFF" strokeWidth={1.5} />
            </Pressable>
          </View>
        </View>
      </LinearGradient>

      {/* Balance Card - Rounded top corners overlap header */}
      <View style={styles.cardWrapper}>
        <LinearGradient
          colors={['#2D1B4E', '#231A2E', colors.bgPrimary]}
          locations={[0, 0.4, 1]}
          style={styles.balanceCard}
        >
          <View style={styles.balanceContent}>
            <Text style={[styles.balanceAmount, { color: colors.textPrimary }]}>
              {formatBalance(mockUser.balance)}
            </Text>
            <Text style={[styles.balanceSecondary, { color: colors.textSecondary }]}>
              {formatSecondaryBalance(mockUser.secondaryCurrency, mockUser.secondaryBalance)}
            </Text>

            {/* Quick Actions */}
            <View style={styles.quickActions}>
              <Pressable style={[styles.quickActionButton, { backgroundColor: colors.bgElevated }]}>
                <Plus size={18} color={colors.textPrimary} strokeWidth={2} />
                <Text style={[styles.quickActionLabel, { color: colors.textPrimary }]}>
                  Top Up
                </Text>
              </Pressable>
              <Pressable 
                style={[styles.quickActionButton, { backgroundColor: colors.bgElevated }]}
                onPress={() => router.push('/(tabs-token)/wallet')}
              >
                <Wallet size={18} color={colors.textPrimary} strokeWidth={1.5} />
                <Text style={[styles.quickActionLabel, { color: colors.textPrimary }]}>
                  Wallet
                </Text>
              </Pressable>
            </View>
          </View>
        </LinearGradient>
      </View>

      {/* Activity Section - Scrollable on dark background */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.activitySection}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
              Activity
            </Text>
            <Pressable>
              <Text style={[styles.sectionAction, { color: colors.textMuted }]}>
                View all
              </Text>
            </Pressable>
          </View>

          <View style={styles.activityList}>
            {mockTransactions.map((tx) => (
              <ActivityRow
                key={tx.id}
                type={tx.type}
                title={tx.title}
                timestamp={tx.timestamp}
                amountLocal={tx.amountLocal}
                amountUSDT={tx.amountUSDT}
              />
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Tab Bar */}
      <View style={[styles.tabBar, { backgroundColor: colors.bgSecondary, borderTopColor: '#332A42' }]}>
        <Pressable style={styles.tabItem}>
          <HomeIcon size={20} color={colors.iconActive} />
        </Pressable>
        
        <View style={styles.tabCenterContainer}>
          <Pressable style={styles.tabCenterButtonOuter}>
            <LinearGradient
              colors={['#303234', '#241A32']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0.1 }}
              style={styles.tabCenterButton}
            >
              <ScanIcon size={28} color="#8B60E6" />
            </LinearGradient>
          </Pressable>
        </View>
        
        <Pressable style={styles.tabItem}>
          <MenuIcon size={20} color={colors.iconDefault} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // Header - flat purple band
  header: {
    height: 126,
    minHeight: 126,
  },
  navRow: {
    height: 59,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logoContainer: {
    width: 43,
    height: 27,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  navIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(217, 217, 217, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Balance Card - overlaps header with rounded top
  cardWrapper: {
    marginTop: -20,
  },
  balanceCard: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 24,
  },
  balanceContent: {
    alignItems: 'center',
    paddingTop: 86,
    paddingHorizontal: 24,
  },
  balanceAmount: {
    fontSize: 35,
    fontFamily: 'Inter',
    fontWeight: '400',
  },
  balanceSecondary: {
    fontSize: 12,
    fontFamily: 'Inter',
    fontWeight: '500',
    marginTop: 8,
  },
  quickActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 44,
  },
  quickActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 22,
  },
  quickActionLabel: {
    fontSize: 13,
    fontFamily: 'Inter',
    fontWeight: '500',
  },
  // Activity Section
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  activitySection: {
    paddingHorizontal: 16,
    paddingTop: 124,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: 'Inter',
    fontWeight: '500',
  },
  sectionAction: {
    fontSize: 14,
    fontFamily: 'Inter',
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  activityList: {
    gap: 8,
  },
  activityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#262629',
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3F3F46',
  },
  activityContent: {
    flex: 1,
    marginLeft: 12,
  },
  activityTitle: {
    fontSize: 13,
    fontFamily: 'Inter',
    fontWeight: '500',
  },
  activityTimestamp: {
    fontSize: 10,
    fontFamily: 'Inter',
    fontWeight: '400',
    marginTop: 6,
  },
  activityAmounts: {
    alignItems: 'flex-end',
  },
  activityAmountLocal: {
    fontSize: 13,
    fontFamily: 'Inter',
    fontWeight: '500',
  },
  activityAmountUSDT: {
    fontSize: 10,
    fontFamily: 'Inter',
    fontWeight: '400',
    marginTop: 6,
  },
  // Tab Bar
  tabBar: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    height: 72,
    borderTopWidth: 1,
    paddingBottom: 8,
    paddingTop: 16,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  tabCenterContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -46,
  },
  tabCenterButtonOuter: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#1B1B1E',
    shadowColor: 'rgba(70, 18, 180, 1)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
    zIndex: 10,
  },
  tabCenterButton: {
    width: 60,
    height: 60,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(126, 74, 233, 0.40)',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
});
