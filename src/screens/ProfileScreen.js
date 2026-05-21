import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  Image, StatusBar, ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export default function ProfileScreen({ navigation }) {
  const { user } = useAuth();
  const { theme } = useTheme();

  const menuItems = [
    { icon: 'person-outline', label: 'Edit Profile', color: '#FF6B35' },
    { icon: 'location-outline', label: 'Saved Addresses', color: '#4ade80' },
    { icon: 'card-outline', label: 'Payment Methods', color: '#60a5fa' },
    { icon: 'notifications-outline', label: 'Notifications', color: '#fbbf24' },
    { icon: 'heart-outline', label: 'Favourites', color: '#f472b6' },
    { icon: 'gift-outline', label: 'Offers & Rewards', color: '#c084fc' },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]}>
      <StatusBar barStyle={theme.statusBar} backgroundColor={theme.statusBarBg} translucent={false} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]}>Profile</Text>
          <TouchableOpacity
            style={[styles.drawerButton, { backgroundColor: theme.iconBg }]}
            onPress={() => navigation.openDrawer()}
          >
            <Ionicons name="menu" size={24} color={theme.text} />
          </TouchableOpacity>
        </View>

        {/* Profile Card */}
        <View style={[styles.profileCard, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
          <Image
            source={{
              uri: user?.avatar || 'https://ui-avatars.com/api/?name=User&background=FF6B35&color=fff&size=128',
            }}
            style={styles.avatar}
          />
          <View style={styles.profileInfo}>
            <Text style={[styles.userName, { color: theme.text }]}>{user?.name || 'Guest User'}</Text>
            <Text style={[styles.userEmail, { color: theme.textSecondary }]}>{user?.email || 'guest@example.com'}</Text>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Ionicons name="create-outline" size={18} color="#FF6B35" />
          </TouchableOpacity>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsRow}>
          <View style={[styles.statCard, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Orders</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
            <Text style={styles.statNumber}>3</Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Favourites</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
            <Text style={styles.statNumber}>₹150</Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Rewards</Text>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          {menuItems.map((item, index) => (
            <TouchableOpacity key={index} style={[styles.menuItem, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
              <View style={[styles.menuIcon, { backgroundColor: `${item.color}15` }]}>
                <Ionicons name={item.icon} size={20} color={item.color} />
              </View>
              <Text style={[styles.menuLabel, { color: theme.text }]}>{item.label}</Text>
              <Ionicons name="chevron-forward" size={18} color={theme.textMuted} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Drawer Access Hint */}
        <View style={styles.drawerHint}>
          <Ionicons name="information-circle-outline" size={18} color="#FF6B35" />
          <Text style={[styles.drawerHintText, { color: theme.textSecondary }]}>
            Tap the menu icon above or swipe from the right to open the drawer with My Orders, Settings, Help & Logout
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingTop: 10, paddingBottom: 30 },
  header: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', paddingHorizontal: 20, marginBottom: 24,
  },
  title: { fontSize: 28, fontWeight: '800' },
  drawerButton: {
    width: 44, height: 44, borderRadius: 14,
    justifyContent: 'center', alignItems: 'center',
  },
  profileCard: {
    flexDirection: 'row', alignItems: 'center',
    marginHorizontal: 20, borderRadius: 16,
    padding: 16, marginBottom: 20, borderWidth: 1, gap: 14,
  },
  avatar: {
    width: 60, height: 60, borderRadius: 20,
    borderWidth: 2, borderColor: 'rgba(255,107,53,0.3)',
  },
  profileInfo: { flex: 1 },
  userName: { fontSize: 18, fontWeight: '700', marginBottom: 2 },
  userEmail: { fontSize: 13 },
  editButton: {
    width: 36, height: 36, borderRadius: 10,
    backgroundColor: 'rgba(255,107,53,0.12)',
    justifyContent: 'center', alignItems: 'center',
  },
  statsRow: { flexDirection: 'row', paddingHorizontal: 20, gap: 10, marginBottom: 24 },
  statCard: {
    flex: 1, borderRadius: 14, paddingVertical: 16,
    alignItems: 'center', borderWidth: 1,
  },
  statNumber: { fontSize: 20, fontWeight: '800', color: '#FF6B35', marginBottom: 4 },
  statLabel: { fontSize: 12 },
  menuSection: { paddingHorizontal: 20, gap: 6, marginBottom: 20 },
  menuItem: {
    flexDirection: 'row', alignItems: 'center',
    borderRadius: 14, padding: 14, gap: 12, borderWidth: 1,
  },
  menuIcon: {
    width: 40, height: 40, borderRadius: 10,
    justifyContent: 'center', alignItems: 'center',
  },
  menuLabel: { flex: 1, fontSize: 15, fontWeight: '500' },
  drawerHint: {
    flexDirection: 'row', marginHorizontal: 20,
    backgroundColor: 'rgba(255,107,53,0.08)',
    borderRadius: 12, padding: 14, gap: 10,
    borderWidth: 1, borderColor: 'rgba(255,107,53,0.15)',
  },
  drawerHintText: { flex: 1, fontSize: 12, lineHeight: 18 },
});
