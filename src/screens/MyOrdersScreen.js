import React from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';

export default function MyOrdersScreen({ navigation }) {
  const { theme } = useTheme();
  const orders = [
    { id: '1', restaurant: 'Biryani House', items: 'Chicken Biryani, Raita', total: 298, date: 'May 15, 2026', status: 'Delivered' },
    { id: '2', restaurant: 'Pizza Paradise', items: 'Margherita Pizza, Garlic Bread', total: 448, date: 'May 12, 2026', status: 'Delivered' },
    { id: '3', restaurant: 'Burger Barn', items: 'Cheese Burger, Fries, Milkshake', total: 497, date: 'May 10, 2026', status: 'Delivered' },
    { id: '4', restaurant: 'Dragon Wok', items: 'Hakka Noodles, Spring Rolls', total: 308, date: 'May 7, 2026', status: 'Delivered' },
    { id: '5', restaurant: 'Dosa Corner', items: 'Masala Dosa, Filter Coffee', total: 178, date: 'May 3, 2026', status: 'Delivered' },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]}>
      <StatusBar barStyle={theme.statusBar} backgroundColor={theme.statusBarBg} translucent={false} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.backButton, { backgroundColor: theme.iconBg }]}>
          <Ionicons name="arrow-back" size={22} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.text }]}>My Orders</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        {orders.map((order) => (
          <View key={order.id} style={[styles.orderCard, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
            <View style={styles.orderTop}>
              <View style={styles.orderIcon}>
                <Ionicons name="restaurant" size={18} color="#FF6B35" />
              </View>
              <View style={styles.orderInfo}>
                <Text style={[styles.orderName, { color: theme.text }]}>{order.restaurant}</Text>
                <Text style={[styles.orderItems, { color: theme.textSecondary }]}>{order.items}</Text>
              </View>
              <View style={styles.statusBadge}>
                <Ionicons name="checkmark-circle" size={14} color="#4ade80" />
                <Text style={styles.statusText}>{order.status}</Text>
              </View>
            </View>
            <View style={[styles.orderBottom, { borderTopColor: theme.divider }]}>
              <Text style={[styles.orderDate, { color: theme.textSecondary }]}>{order.date}</Text>
              <Text style={styles.orderTotal}>₹{order.total}</Text>
            </View>
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
  orderCard: {
    borderRadius: 14, padding: 16, marginBottom: 10, borderWidth: 1,
  },
  orderTop: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginBottom: 12 },
  orderIcon: {
    width: 40, height: 40, borderRadius: 10,
    backgroundColor: 'rgba(255,107,53,0.12)',
    justifyContent: 'center', alignItems: 'center',
  },
  orderInfo: { flex: 1 },
  orderName: { fontSize: 16, fontWeight: '600', marginBottom: 2 },
  orderItems: { fontSize: 12 },
  statusBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: 'rgba(74,222,128,0.1)',
    paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8,
  },
  statusText: { color: '#4ade80', fontSize: 11, fontWeight: '600' },
  orderBottom: {
    flexDirection: 'row', justifyContent: 'space-between',
    borderTopWidth: 1, paddingTop: 10,
  },
  orderDate: { fontSize: 13 },
  orderTotal: { color: '#FF6B35', fontSize: 16, fontWeight: '700' },
});
