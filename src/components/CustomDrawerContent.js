import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export default function CustomDrawerContent(props) {
  const { user, logout } = useAuth();
  const { theme } = useTheme();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => logout(),
        },
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.drawerBg }]}>
      <DrawerContentScrollView {...props} contentContainerStyle={styles.scrollContent}>
        {/* User Profile Header */}
        <View style={styles.profileSection}>
          <Image
            source={{
              uri: user?.avatar || 'https://ui-avatars.com/api/?name=User&background=FF6B35&color=fff&size=128',
            }}
            style={styles.avatar}
          />
          <Text style={[styles.userName, { color: theme.text }]}>{user?.name || 'Guest User'}</Text>
          <Text style={[styles.userEmail, { color: theme.textSecondary }]}>{user?.email || 'guest@example.com'}</Text>
          <View style={styles.memberBadge}>
            <Ionicons name="diamond" size={12} color="#fbbf24" />
            <Text style={styles.memberText}>Gold Member</Text>
          </View>
        </View>

        {/* Divider */}
        <View style={[styles.divider, { backgroundColor: theme.divider }]} />

        {/* Drawer Items */}
        <View style={styles.drawerItems}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        <View style={[styles.divider, { backgroundColor: theme.divider }]} />
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={22} color="#e94560" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
        <Text style={[styles.versionText, { color: theme.textMuted }]}>FoodExpress v1.0.0</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingTop: 0 },
  profileSection: {
    paddingHorizontal: 20, paddingTop: 20,
    paddingBottom: 20, alignItems: 'center',
  },
  avatar: {
    width: 80, height: 80, borderRadius: 28, marginBottom: 12,
    borderWidth: 3, borderColor: 'rgba(255,107,53,0.3)',
  },
  userName: { fontSize: 20, fontWeight: '700', marginBottom: 4 },
  userEmail: { fontSize: 13, marginBottom: 10 },
  memberBadge: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: 'rgba(251,191,36,0.1)',
    paddingHorizontal: 12, paddingVertical: 6,
    borderRadius: 20, gap: 4,
  },
  memberText: { color: '#fbbf24', fontSize: 12, fontWeight: '600' },
  divider: { height: 1, marginHorizontal: 20, marginVertical: 4 },
  drawerItems: { paddingTop: 8 },
  bottomSection: { paddingHorizontal: 20, paddingBottom: 30 },
  logoutButton: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 14, gap: 12, marginTop: 8,
  },
  logoutText: { color: '#e94560', fontSize: 16, fontWeight: '600' },
  versionText: { fontSize: 12, textAlign: 'center', marginTop: 8 },
});
