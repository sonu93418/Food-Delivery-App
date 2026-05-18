import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCart } from '../context/CartContext';

export default function OrdersScreen({ navigation }) {
  const { cartItems, getCartTotal, getCartCount } = useCart();

  // Mock past orders
  const pastOrders = [
    {
      id: 'o1',
      restaurant: 'Biryani House',
      items: 3,
      total: 647,
      date: 'May 15, 2026',
      status: 'Delivered',
    },
    {
      id: 'o2',
      restaurant: 'Pizza Paradise',
      items: 2,
      total: 548,
      date: 'May 12, 2026',
      status: 'Delivered',
    },
    {
      id: 'o3',
      restaurant: 'Dragon Wok',
      items: 4,
      total: 676,
      date: 'May 8, 2026',
      status: 'Delivered',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" translucent={false} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Orders</Text>
          <Text style={styles.subtitle}>Track and manage your orders</Text>
        </View>

        {/* Active Cart Section */}
        {getCartCount() > 0 && (
          <View style={styles.activeSection}>
            <View style={styles.activeBadge}>
              <View style={styles.activeDot} />
              <Text style={styles.activeText}>Active Cart</Text>
            </View>
            <View style={styles.activeCard}>
              <View style={styles.activeInfo}>
                <Text style={styles.activeItemCount}>{getCartCount()} items in cart</Text>
                <Text style={styles.activeTotal}>₹{getCartTotal()}</Text>
              </View>
              <TouchableOpacity
                style={styles.viewCartButton}
                onPress={() =>
                  navigation.navigate('HomeTab', {
                    screen: 'Cart',
                  })
                }
              >
                <Text style={styles.viewCartText}>View Cart</Text>
                <Ionicons name="arrow-forward" size={16} color="#fff" />
              </TouchableOpacity>
            </View>
            <View style={styles.cartItemsList}>
              {cartItems.map((item) => (
                <View key={item.id} style={styles.cartItemRow}>
                  <Text style={styles.cartItemName}>
                    {item.quantity}x {item.name}
                  </Text>
                  <Text style={styles.cartItemPrice}>₹{item.price * item.quantity}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Past Orders */}
        <Text style={styles.sectionTitle}>Past Orders</Text>
        {pastOrders.map((order) => (
          <View key={order.id} style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <View style={styles.orderRestaurant}>
                <View style={styles.orderIcon}>
                  <Ionicons name="restaurant" size={18} color="#FF6B35" />
                </View>
                <View>
                  <Text style={styles.orderName}>{order.restaurant}</Text>
                  <Text style={styles.orderDate}>{order.date}</Text>
                </View>
              </View>
              <View style={styles.statusBadge}>
                <Ionicons name="checkmark-circle" size={14} color="#4ade80" />
                <Text style={styles.statusText}>{order.status}</Text>
              </View>
            </View>
            <View style={styles.orderFooter}>
              <Text style={styles.orderItems}>{order.items} items</Text>
              <Text style={styles.orderTotal}>₹{order.total}</Text>
            </View>
            <TouchableOpacity style={styles.reorderButton}>
              <Ionicons name="refresh-outline" size={16} color="#FF6B35" />
              <Text style={styles.reorderText}>Reorder</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  scrollContent: {
    paddingTop: 10,
    paddingBottom: 30,
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.5)',
  },
  activeSection: {
    marginHorizontal: 20,
    marginBottom: 28,
  },
  activeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 10,
  },
  activeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4ade80',
  },
  activeText: {
    color: '#4ade80',
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  activeCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 107, 53, 0.1)',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 53, 0.2)',
  },
  activeInfo: {},
  activeItemCount: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 14,
    marginBottom: 2,
  },
  activeTotal: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '800',
  },
  viewCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF6B35',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    gap: 4,
  },
  viewCartText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  cartItemsList: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 10,
    padding: 12,
    marginTop: 8,
  },
  cartItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  cartItemName: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 13,
  },
  cartItemPrice: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 13,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    paddingHorizontal: 20,
    marginBottom: 14,
  },
  orderCard: {
    marginHorizontal: 20,
    marginBottom: 12,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderRestaurant: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  orderIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 107, 53, 0.12)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  orderDate: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.4)',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(74, 222, 128, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    color: '#4ade80',
    fontSize: 12,
    fontWeight: '600',
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.06)',
  },
  orderItems: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 13,
  },
  orderTotal: {
    color: '#FF6B35',
    fontSize: 16,
    fontWeight: '700',
  },
  reorderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 107, 53, 0.08)',
  },
  reorderText: {
    color: '#FF6B35',
    fontSize: 14,
    fontWeight: '600',
  },
});
