import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { X, Globe, CircleDollarSign, Palette, Heart, HelpCircle, LogOut, ChevronRight } from 'lucide-react-native';
import { useTheme } from '../../hooks/useTheme';
import { FakeStatusBar } from '../../components/ui/FakeStatusBar';

// Progress Bar Component
interface ProgressBarProps {
  progress: number; // 0-1
  color: string;
}

function ProgressBar({ progress, color }: ProgressBarProps) {
  return (
    <View style={styles.progressBarContainer}>
      <View style={[styles.progressBarFill, { width: `${progress * 100}%`, backgroundColor: color }]} />
    </View>
  );
}

// Limit Row Component
interface LimitRowProps {
  label: string;
  current?: number;
  max: number;
  color: string;
  showProgress?: boolean;
}

function LimitRow({ label, current, max, color, showProgress = true }: LimitRowProps) {
  const { colors } = useTheme();
  const progress = current !== undefined ? current / max : 1;
  const displayValue = current !== undefined ? `$${current}/ $${max.toLocaleString()}` : `$${max}`;

  return (
    <View style={styles.limitRow}>
      <View style={styles.limitHeader}>
        <Text style={[styles.limitLabel, { color: colors.textMuted }]}>{label}</Text>
        <Text style={[styles.limitValue, { color: colors.textPrimary }]}>{displayValue}</Text>
      </View>
      {showProgress && <ProgressBar progress={progress} color={color} />}
    </View>
  );
}

// Menu Row Component
interface MenuRowProps {
  icon: React.ReactNode;
  label: string;
  subtitle?: string;
  showChevron?: boolean;
  onPress?: () => void;
  iconBgColor?: string;
}

function MenuRow({ icon, label, subtitle, showChevron = false, onPress, iconBgColor }: MenuRowProps) {
  const { colors } = useTheme();

  return (
    <Pressable
      style={[styles.menuRow, { backgroundColor: colors.bgElevated }]}
      onPress={onPress}
    >
      <View style={[styles.menuIconContainer, iconBgColor ? { backgroundColor: iconBgColor } : styles.menuIconBorder]}>
        {icon}
      </View>
      <View style={styles.menuContent}>
        <Text style={[styles.menuLabel, { color: colors.textPrimary }]}>{label}</Text>
        {subtitle && (
          <Text style={[styles.menuSubtitle, { color: colors.textMuted }]}>{subtitle}</Text>
        )}
      </View>
      {showChevron && (
        <ChevronRight size={20} color={colors.textMuted} strokeWidth={1.5} />
      )}
    </Pressable>
  );
}

// Section Header Component
interface SectionHeaderProps {
  title: string;
}

function SectionHeader({ title }: SectionHeaderProps) {
  const { colors } = useTheme();

  return (
    <Text style={[styles.sectionHeader, { color: colors.textMuted }]}>{title}</Text>
  );
}

export default function SettingsScreen() {
  const { colors, theme } = useTheme();
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.bgPrimary }]}>
      <FakeStatusBar />

      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={handleClose} style={styles.closeButton}>
          <X size={24} color={colors.textPrimary} strokeWidth={2} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Settings</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Quick Pay Card */}
        <View style={[styles.quickPayCard, { backgroundColor: colors.bgElevated }]}>
          <View style={styles.quickPayHeader}>
            <Text style={[styles.quickPayTitle, { color: colors.textPrimary }]}>Quick Pay</Text>
            <View style={styles.activeBadge}>
              <Text style={styles.activeBadgeText}>Active</Text>
            </View>
          </View>

          <View style={styles.limitsContainer}>
            <LimitRow
              label="Per transaction:"
              max={200}
              color="#22C55E"
            />
            <LimitRow
              label="Daily usage"
              current={230}
              max={500}
              color={colors.purpleSecondary}
            />
            <LimitRow
              label="Monthly usage"
              current={1200}
              max={5000}
              color={colors.purpleSecondary}
            />
          </View>

          <Pressable style={styles.upgradeButton}>
            <Text style={[styles.upgradeButtonText, { color: colors.purpleSecondary }]}>
              Upgrade for higher limits
            </Text>
          </Pressable>
        </View>

        {/* Account Section */}
        <SectionHeader title="Account" />
        <View style={styles.menuSection}>
          <MenuRow
            icon={<Globe size={20} color={colors.purpleSecondary} strokeWidth={1.5} />}
            label="Payment Networks"
            onPress={() => router.push('/(screens)/settings/payment-networks')}
          />
          <MenuRow
            icon={<CircleDollarSign size={20} color={colors.purpleSecondary} strokeWidth={1.5} />}
            label="Currency"
            onPress={() => {}}
          />
        </View>

        {/* Settings Section */}
        <SectionHeader title="Settings" />
        <View style={styles.menuSection}>
          <MenuRow
            icon={<Palette size={20} color={colors.purpleSecondary} strokeWidth={1.5} />}
            label="Theme"
            subtitle={theme === 'dark' ? 'Dark' : 'Light'}
            onPress={() => {}}
          />
          <MenuRow
            icon={<Heart size={20} color={colors.purpleSecondary} strokeWidth={1.5} />}
            label="About"
            showChevron
            onPress={() => {}}
          />
        </View>

        {/* Divider */}
        <View style={[styles.divider, { backgroundColor: colors.border }]} />

        {/* Support & Logout */}
        <View style={styles.menuSection}>
          <MenuRow
            icon={<HelpCircle size={20} color={colors.purpleSecondary} strokeWidth={1.5} />}
            label="Support"
            onPress={() => {}}
          />
          <MenuRow
            icon={<LogOut size={20} color={colors.purpleSecondary} strokeWidth={1.5} />}
            label="Logout"
            onPress={() => {}}
          />
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
  closeButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  headerTitle: {
    fontSize: 17,
    fontFamily: 'Inter',
    fontWeight: '600',
  },
  headerSpacer: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },

  // Quick Pay Card
  quickPayCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  quickPayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  quickPayTitle: {
    fontSize: 20,
    fontFamily: 'Inter',
    fontWeight: '600',
  },
  activeBadge: {
    backgroundColor: 'rgba(34, 197, 94, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  activeBadgeText: {
    color: '#22C55E',
    fontSize: 13,
    fontFamily: 'Inter',
    fontWeight: '500',
  },
  limitsContainer: {
    gap: 16,
    marginBottom: 20,
  },
  limitRow: {
    gap: 8,
  },
  limitHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  limitLabel: {
    fontSize: 13,
    fontFamily: 'Inter',
    fontWeight: '400',
  },
  limitValue: {
    fontSize: 13,
    fontFamily: 'Inter',
    fontWeight: '500',
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  upgradeButton: {
    backgroundColor: 'rgba(100, 48, 210, 0.2)',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  upgradeButtonText: {
    fontSize: 14,
    fontFamily: 'Inter',
    fontWeight: '500',
  },

  // Section Header
  sectionHeader: {
    fontSize: 13,
    fontFamily: 'Inter',
    fontWeight: '500',
    marginBottom: 12,
    marginTop: 8,
  },

  // Menu Section
  menuSection: {
    gap: 8,
    marginBottom: 16,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuIconBorder: {
    borderWidth: 1.5,
    borderColor: 'rgba(150, 98, 255, 0.4)',
  },
  menuContent: {
    flex: 1,
  },
  menuLabel: {
    fontSize: 15,
    fontFamily: 'Inter',
    fontWeight: '500',
  },
  menuSubtitle: {
    fontSize: 13,
    fontFamily: 'Inter',
    fontWeight: '400',
    marginTop: 2,
  },

  // Divider
  divider: {
    height: 1,
    marginVertical: 8,
  },
});
