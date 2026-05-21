import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { CommonActions } from '@react-navigation/native';

export default function CartScreen({ navigation }) {
  const { cartItems, updateQuantity, removeFromCart, clearCart, getCartTotal, getCartCount } = useCart();
  const { theme } = useTheme();

  const handlePlaceOrder = () => {
    Alert.alert(
      'Order Placed! 🎉',
      `Your order of ₹${getCartTotal() + 40} has been placed successfully.`,
      [
        {
          text: 'OK',
          onPress: () => {
            clearCart();
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'MainTabs' }],
              })
            );
          },
        },
      ]
    );
  };

  if (cartItems.length === 0) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]}>
        <StatusBar barStyle={theme.statusBar} backgroundColor={theme.statusBarBg} translucent={false} />
        <View style={styles.emptyContainer}>
          <View style={[styles.emptyIcon, { backgroundColor: theme.card }]}>
            <Ionicons name="cart-outline" size={64} color={theme.textMuted} />
          </View>
          <Text style={[styles.emptyTitle, { color: theme.text }]}>Your cart is empty</Text>
          <Text style={[styles.emptySubtitle, { color: theme.textSecondary }]}>Add items from a restaurant to get started</Text>
          <TouchableOpacity
            style={styles.browseButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.browseButtonText}>Browse Restaurants</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]}>
      <StatusBar barStyle={theme.statusBar} backgroundColor={theme.statusBarBg} translucent={false} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.backButton, { backgroundColor: theme.iconBg }]}>
          <Ionicons name="arrow-back" size={22} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Your Cart</Text>
        <TouchableOpacity onPress={clearCart} style={styles.clearButton}>
          <Text style={styles.clearText}>Clear</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.cartList}>
        {cartItems.map((item) => (
          <View key={item.id} style={[styles.cartItem, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
            <View style={styles.itemInfo}>
              <View style={styles.vegIndicator}>
                <View style={styles.vegDot} />
              </View>
              <View style={styles.itemDetails}>
                <Text style={[styles.itemName, { color: theme.text }]}>{item.name}</Text>
                <Text style={[styles.itemRestaurant, { color: theme.textSecondary }]}>{item.restaurantName}</Text>
                <Text style={styles.itemPrice}>₹{item.price}</Text>
              </View>
            </View>
            <View style={styles.quantityControls}>
              <TouchableOpacity
                style={styles.qtyButton}
                onPress={() => updateQuantity(item.id, item.quantity - 1)}
              >
                <Ionicons name="remove" size={16} color="#FF6B35" />
              </TouchableOpacity>
              <Text style={[styles.qtyText, { color: theme.text }]}>{item.quantity}</Text>
              <TouchableOpacity
                style={styles.qtyButton}
                onPress={() => updateQuantity(item.id, item.quantity + 1)}
              >
                <Ionicons name="add" size={16} color="#FF6B35" />
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {/* Bill Details */}
        <View style={[styles.billSection, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
          <Text style={[styles.billTitle, { color: theme.text }]}>Bill Details</Text>
          <View style={styles.billRow}>
            <Text style={[styles.billLabel, { color: theme.textSecondary }]}>Item Total</Text>
            <Text style={[styles.billValue, { color: theme.text }]}>₹{getCartTotal()}</Text>
          </View>
          <View style={styles.billRow}>
            <Text style={[styles.billLabel, { color: theme.textSecondary }]}>Delivery Fee</Text>
            <Text style={[styles.billValue, { color: theme.text }]}>₹25</Text>
          </View>
          <View style={styles.billRow}>
            <Text style={[styles.billLabel, { color: theme.textSecondary }]}>Taxes & Charges</Text>
            <Text style={[styles.billValue, { color: theme.text }]}>₹15</Text>
          </View>
          <View style={[styles.billDivider, { backgroundColor: theme.divider }]} />
          <View style={styles.billRow}>
            <Text style={[styles.billTotal, { color: theme.text }]}>Grand Total</Text>
            <Text style={styles.billTotalValue}>₹{getCartTotal() + 40}</Text>
          </View>
        </View>

        {/* Navigation Demo Buttons */}
        <View style={[styles.navDemoSection, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
          <Text style={styles.navDemoTitle}>Programmatic Navigation Demo</Text>
          <TouchableOpacity
            style={[styles.navDemoButton, { backgroundColor: theme.inputBg }]}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back-outline" size={16} color="#FF6B35" />
            <Text style={[styles.navDemoText, { color: theme.textSecondary }]}>goBack() - Go Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.navDemoButton, { backgroundColor: theme.inputBg }]}
            onPress={() => navigation.navigate('Home')}
          >
            <Ionicons name="home-outline" size={16} color="#FF6B35" />
            <Text style={[styles.navDemoText, { color: theme.textSecondary }]}>navigate('Home') - Go to Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.navDemoButton, { backgroundColor: theme.inputBg }]}
            onPress={() =>
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: 'MainTabs' }],
                })
              )
            }
          >
            <Ionicons name="refresh-outline" size={16} color="#FF6B35" />
            <Text style={[styles.navDemoText, { color: theme.textSecondary }]}>reset() - Reset to MainTabs</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Place Order Button */}
      <View style={[styles.checkoutBar, { backgroundColor: theme.checkoutBar, borderTopColor: theme.divider }]}>
        <View style={styles.checkoutInfo}>
          <Text style={[styles.checkoutItems, { color: theme.textSecondary }]}>{getCartCount()} items</Text>
          <Text style={[styles.checkoutTotal, { color: theme.text }]}>₹{getCartTotal() + 40}</Text>
        </View>
        <TouchableOpacity style={styles.checkoutButton} onPress={handlePlaceOrder}>
          <Text style={styles.checkoutButtonText}>Place Order</Text>
          <Ionicons name="arrow-forward" size={18} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', paddingTop: 10,
    paddingHorizontal: 20, paddingBottom: 16,
  },
  backButton: {
    width: 40, height: 40, borderRadius: 12,
    justifyContent: 'center', alignItems: 'center',
  },
  headerTitle: { fontSize: 20, fontWeight: '700' },
  clearButton: { paddingHorizontal: 12, paddingVertical: 6 },
  clearText: { color: '#e94560', fontSize: 14, fontWeight: '600' },
  emptyContainer: {
    flex: 1, justifyContent: 'center',
    alignItems: 'center', paddingHorizontal: 40,
  },
  emptyIcon: {
    width: 120, height: 120, borderRadius: 60,
    justifyContent: 'center', alignItems: 'center', marginBottom: 24,
  },
  emptyTitle: { fontSize: 22, fontWeight: '700', marginBottom: 8 },
  emptySubtitle: { fontSize: 14, textAlign: 'center', marginBottom: 24 },
  browseButton: {
    backgroundColor: '#FF6B35', paddingHorizontal: 24,
    paddingVertical: 14, borderRadius: 14,
  },
  browseButtonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  cartList: { paddingHorizontal: 20 },
  cartItem: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', borderRadius: 14, padding: 14,
    marginBottom: 10, borderWidth: 1,
  },
  itemInfo: { flexDirection: 'row', flex: 1, gap: 10 },
  vegIndicator: {
    width: 16, height: 16, borderWidth: 1.5,
    borderColor: '#4ade80', borderRadius: 3,
    justifyContent: 'center', alignItems: 'center', marginTop: 2,
  },
  vegDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#4ade80' },
  itemDetails: { flex: 1 },
  itemName: { fontSize: 15, fontWeight: '600', marginBottom: 2 },
  itemRestaurant: { fontSize: 12, marginBottom: 4 },
  itemPrice: { fontSize: 15, fontWeight: '700', color: '#FF6B35' },
  quantityControls: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: 'rgba(255,107,53,0.1)',
    borderRadius: 10, borderWidth: 1,
    borderColor: 'rgba(255,107,53,0.2)', gap: 4,
  },
  qtyButton: { width: 32, height: 32, justifyContent: 'center', alignItems: 'center' },
  qtyText: { fontSize: 14, fontWeight: '700', minWidth: 20, textAlign: 'center' },
  billSection: {
    borderRadius: 14, padding: 16, marginTop: 10, borderWidth: 1,
  },
  billTitle: { fontSize: 16, fontWeight: '700', marginBottom: 14 },
  billRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  billLabel: { fontSize: 14 },
  billValue: { fontSize: 14, fontWeight: '500' },
  billDivider: { height: 1, marginVertical: 10 },
  billTotal: { fontSize: 16, fontWeight: '700' },
  billTotalValue: { fontSize: 16, fontWeight: '700', color: '#FF6B35' },
  navDemoSection: {
    borderRadius: 14, padding: 16, marginTop: 14, borderWidth: 1,
    borderColor: 'rgba(255,107,53,0.15)',
  },
  navDemoTitle: {
    fontSize: 12, fontWeight: '700', color: '#FF6B35',
    marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1,
  },
  navDemoButton: {
    flexDirection: 'row', alignItems: 'center',
    borderRadius: 10, paddingHorizontal: 14,
    paddingVertical: 12, marginBottom: 8, gap: 10,
  },
  navDemoText: { fontSize: 13, fontWeight: '500' },
  checkoutBar: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 20, paddingVertical: 16, paddingBottom: 30, borderTopWidth: 1,
  },
  checkoutInfo: {},
  checkoutItems: { fontSize: 12, marginBottom: 2 },
  checkoutTotal: { fontSize: 20, fontWeight: '800' },
  checkoutButton: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#FF6B35', paddingHorizontal: 24,
    paddingVertical: 14, borderRadius: 14, gap: 6,
    shadowColor: '#FF6B35', shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4, shadowRadius: 12, elevation: 6,
  },
  checkoutButtonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
