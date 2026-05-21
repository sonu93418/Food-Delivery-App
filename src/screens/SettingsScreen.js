import React from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';

export default function SettingsScreen({ navigation }) {
  const { theme, isDark, toggleTheme } = useTheme();
  const [notifications, setNotifications] = React.useState(true);
  const [locationAccess, setLocationAccess] = React.useState(true);

  const settingsSections = [
    {
      title: 'Preferences',
      items: [
        { icon: 'notifications-outline', label: 'Push Notifications', color: '#fbbf24', toggle: true, value: notifications, onToggle: setNotifications },
        { icon: 'moon-outline', label: 'Dark Mode', color: '#818cf8', toggle: true, value: isDark, onToggle: toggleTheme },
        { icon: 'location-outline', label: 'Location Access', color: '#4ade80', toggle: true, value: locationAccess, onToggle: setLocationAccess },
      ],
    },
    {
      title: 'General',
      items: [
        { icon: 'language-outline', label: 'Language', color: '#60a5fa', subtitle: 'English' },
        { icon: 'cash-outline', label: 'Currency', color: '#34d399', subtitle: 'INR (₹)' },
        { icon: 'shield-checkmark-outline', label: 'Privacy Policy', color: '#f472b6' },
        { icon: 'document-text-outline', label: 'Terms of Service', color: '#fb923c' },
        { icon: 'information-circle-outline', label: 'About', color: '#a78bfa', subtitle: 'v1.0.0' },
      ],
    },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]}>
      <StatusBar barStyle={theme.statusBar} backgroundColor={theme.statusBarBg} translucent={false} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.backButton, { backgroundColor: theme.iconBg }]}>
          <Ionicons name="arrow-back" size={22} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.text }]}>Settings</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        {settingsSections.map((section, sIndex) => (
          <View key={sIndex} style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.sectionLabel }]}>{section.title}</Text>
            {section.items.map((item, iIndex) => (
              <View key={iIndex} style={[styles.settingItem, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
                <View style={[styles.settingIcon, { backgroundColor: `${item.color}15` }]}>
                  <Ionicons name={item.icon} size={20} color={item.color} />
                </View>
                <View style={styles.settingInfo}>
                  <Text style={[styles.settingLabel, { color: theme.text }]}>{item.label}</Text>
                  {item.subtitle && <Text style={[styles.settingSubtitle, { color: theme.textMuted }]}>{item.subtitle}</Text>}
                </View>
                {item.toggle ? (
                  <Switch
                    value={item.value}
                    onValueChange={item.onToggle}
                    trackColor={{ false: theme.inputBg, true: 'rgba(255,107,53,0.4)' }}
                    thumbColor={item.value ? '#FF6B35' : (isDark ? '#666' : '#bbb')}
                  />
                ) : (
                  <Ionicons name="chevron-forward" size={18} color={theme.textMuted} />
                )}
              </View>
            ))}
          </View>
        ))}
        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingTop: 10, paddingHorizontal: 20, paddingBottom: 16, gap: 14,
  },
  backButton: {
    width: 40, height: 40, borderRadius: 12,
    justifyContent: 'center', alignItems: 'center',
  },
  title: { fontSize: 22, fontWeight: '700' },
  content: { paddingHorizontal: 20 },
  section: { marginBottom: 24 },
  sectionTitle: {
    fontSize: 13, fontWeight: '700',
    textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10,
  },
  settingItem: {
    flexDirection: 'row', alignItems: 'center',
    borderRadius: 14, padding: 14, marginBottom: 6, gap: 12,
    borderWidth: 1,
  },
  settingIcon: {
    width: 40, height: 40, borderRadius: 10,
    justifyContent: 'center', alignItems: 'center',
  },
  settingInfo: { flex: 1 },
  settingLabel: { fontSize: 15, fontWeight: '500' },
  settingSubtitle: { fontSize: 12, marginTop: 2 },
});
