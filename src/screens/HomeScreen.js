import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Animated,
  Dimensions,
  StatusBar,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { restaurants, categories } from '../data/restaurants';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  const { user } = useAuth();
  const { getCartCount } = useCart();
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnims = useRef(restaurants.map(() => new Animated.Value(40))).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();

    const anims = slideAnims.map((anim, index) =>
      Animated.timing(anim, {
        toValue: 0,
        duration: 500,
        delay: index * 100,
        useNativeDriver: true,
      })
    );
    Animated.stagger(80, anims).start();
  }, []);

  const renderRestaurantCard = (restaurant, index) => (
    <Animated.View
      key={restaurant.id}
      style={{
        opacity: fadeAnim,
        transform: [{ translateY: slideAnims[index] || new Animated.Value(0) }],
      }}
    >
      <TouchableOpacity
        style={[styles.restaurantCard, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}
        activeOpacity={0.85}
        onPress={() =>
          navigation.navigate('RestaurantDetail', {
            restaurantId: restaurant.id,
            restaurantName: restaurant.name,
            avgPrice: Math.round(
              restaurant.menu.reduce((sum, item) => sum + item.price, 0) / restaurant.menu.length
            ),
          })
        }
      >
        <Image source={{ uri: restaurant.image }} style={styles.restaurantImage} />
        {restaurant.featured && (
          <View style={styles.featuredBadge}>
            <Ionicons name="star" size={10} color="#fff" />
            <Text style={styles.featuredText}>Featured</Text>
          </View>
        )}
        <View style={styles.cardContent}>
          <View style={styles.cardHeader}>
            <Text style={[styles.restaurantName, { color: theme.text }]}>{restaurant.name}</Text>
            <View style={styles.ratingBadge}>
              <Ionicons name="star" size={12} color="#FFD700" />
              <Text style={styles.ratingText}>{restaurant.rating}</Text>
            </View>
          </View>
          <Text style={[styles.cuisineText, { color: theme.textSecondary }]}>{restaurant.cuisine}</Text>
          <View style={styles.cardFooter}>
            <View style={styles.deliveryInfo}>
              <Ionicons name="time-outline" size={14} color={theme.textSecondary} />
              <Text style={[styles.deliveryText, { color: theme.textSecondary }]}>{restaurant.deliveryTime}</Text>
            </View>
            <View style={styles.deliveryInfo}>
              <Ionicons name="bicycle-outline" size={14} color={theme.textSecondary} />
              <Text style={[styles.deliveryText, { color: theme.textSecondary }]}>₹{restaurant.deliveryFee}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      <StatusBar barStyle={theme.statusBar} backgroundColor={theme.statusBarBg} translucent={false} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 16 }]}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={[styles.greeting, { color: theme.text }]}>Hello, {user?.name?.split(' ')[0] || 'there'} 👋</Text>
            <Text style={[styles.headerSubtitle, { color: theme.textSecondary }]}>What would you like to eat?</Text>
          </View>
          <TouchableOpacity
            style={[styles.cartButton, { backgroundColor: theme.iconBg }]}
            onPress={() => navigation.navigate('Cart')}
          >
            <Ionicons name="cart-outline" size={24} color={theme.text} />
            {getCartCount() > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{getCartCount()}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={[styles.searchContainer, { backgroundColor: theme.inputBg, borderColor: theme.inputBorder }]}>
          <Ionicons name="search" size={20} color={theme.textSecondary} />
          <TextInput
            style={[styles.searchInput, { color: theme.text }]}
            placeholder="Search restaurants or dishes..."
            placeholderTextColor={theme.textMuted}
          />
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="options-outline" size={18} color="#FF6B35" />
          </TouchableOpacity>
        </View>

        {/* Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >
          {categories.map((cat, index) => (
            <TouchableOpacity
              key={cat.id}
              style={[
                styles.categoryChip,
                { backgroundColor: theme.inputBg, borderColor: theme.inputBorder },
                index === 0 && styles.categoryChipActive,
              ]}
            >
              <Ionicons
                name={cat.icon}
                size={18}
                color={index === 0 ? '#fff' : theme.textSecondary}
              />
              <Text
                style={[
                  styles.categoryText,
                  { color: theme.textSecondary },
                  index === 0 && styles.categoryTextActive,
                ]}
              >
                {cat.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Featured Section */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Featured Restaurants</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.featuredContainer}
        >
          {restaurants
            .filter((r) => r.featured)
            .map((restaurant, index) => (
              <TouchableOpacity
                key={restaurant.id}
                style={styles.featuredCard}
                activeOpacity={0.85}
                onPress={() =>
                  navigation.navigate('RestaurantDetail', {
                    restaurantId: restaurant.id,
                    restaurantName: restaurant.name,
                    avgPrice: Math.round(
                      restaurant.menu.reduce((sum, item) => sum + item.price, 0) /
                        restaurant.menu.length
                    ),
                  })
                }
              >
                <Image source={{ uri: restaurant.image }} style={styles.featuredImage} />
                <View style={styles.featuredOverlay}>
                  <Text style={styles.featuredName}>{restaurant.name}</Text>
                  <View style={styles.featuredRating}>
                    <Ionicons name="star" size={12} color="#FFD700" />
                    <Text style={styles.featuredRatingText}>{restaurant.rating}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
        </ScrollView>

        {/* All Restaurants */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>All Restaurants</Text>
        </View>
        {restaurants.map((restaurant, index) => renderRestaurantCard(restaurant, index))}
        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingBottom: 20 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  greeting: { fontSize: 26, fontWeight: '800', marginBottom: 4 },
  headerSubtitle: { fontSize: 14 },
  cartButton: {
    width: 48, height: 48, borderRadius: 16,
    justifyContent: 'center', alignItems: 'center',
  },
  cartBadge: {
    position: 'absolute', top: -4, right: -4,
    backgroundColor: '#e94560', borderRadius: 10,
    minWidth: 20, height: 20, justifyContent: 'center',
    alignItems: 'center', paddingHorizontal: 4,
  },
  cartBadgeText: { color: '#fff', fontSize: 11, fontWeight: '700' },
  searchContainer: {
    flexDirection: 'row', alignItems: 'center',
    marginHorizontal: 20, borderRadius: 14,
    paddingHorizontal: 16, height: 50, marginBottom: 20, gap: 10,
    borderWidth: 1,
  },
  searchInput: { flex: 1, fontSize: 14 },
  filterButton: {
    width: 36, height: 36, borderRadius: 10,
    backgroundColor: 'rgba(255,107,53,0.15)',
    justifyContent: 'center', alignItems: 'center',
  },
  categoriesContainer: { paddingHorizontal: 20, gap: 10, marginBottom: 24 },
  categoryChip: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 10,
    borderRadius: 12, gap: 6, borderWidth: 1,
  },
  categoryChipActive: { backgroundColor: '#FF6B35', borderColor: '#FF6B35' },
  categoryText: { fontSize: 13, fontWeight: '600' },
  categoryTextActive: { color: '#ffffff' },
  sectionHeader: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', paddingHorizontal: 20, marginBottom: 16,
  },
  sectionTitle: { fontSize: 20, fontWeight: '700' },
  seeAll: { fontSize: 14, color: '#FF6B35', fontWeight: '600' },
  featuredContainer: { paddingHorizontal: 20, gap: 14, marginBottom: 28 },
  featuredCard: { width: 200, height: 140, borderRadius: 16, overflow: 'hidden' },
  featuredImage: { width: '100%', height: '100%' },
  featuredOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end', padding: 12,
  },
  featuredName: { color: '#fff', fontSize: 16, fontWeight: '700', marginBottom: 4 },
  featuredRating: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  featuredRatingText: { color: '#FFD700', fontSize: 13, fontWeight: '600' },
  restaurantCard: {
    marginHorizontal: 20, marginBottom: 16, borderRadius: 16,
    overflow: 'hidden', borderWidth: 1,
  },
  restaurantImage: { width: '100%', height: 160 },
  featuredBadge: {
    position: 'absolute', top: 12, left: 12,
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#FF6B35', paddingHorizontal: 10,
    paddingVertical: 4, borderRadius: 8, gap: 4,
  },
  featuredText: { color: '#fff', fontSize: 11, fontWeight: '700' },
  cardContent: { padding: 14 },
  cardHeader: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 4,
  },
  restaurantName: { fontSize: 17, fontWeight: '700' },
  ratingBadge: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: 'rgba(255,215,0,0.12)',
    paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, gap: 4,
  },
  ratingText: { color: '#FFD700', fontSize: 13, fontWeight: '700' },
  cuisineText: { fontSize: 13, marginBottom: 10 },
  cardFooter: { flexDirection: 'row', gap: 16 },
  deliveryInfo: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  deliveryText: { fontSize: 12 },
});
