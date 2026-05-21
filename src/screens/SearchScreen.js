import React from 'react';
import {
  View, Text, StyleSheet, TextInput,
  ScrollView, TouchableOpacity, StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { restaurants } from '../data/restaurants';
import { useTheme } from '../context/ThemeContext';

export default function SearchScreen({ navigation }) {
  const [query, setQuery] = React.useState('');
  const { theme } = useTheme();

  const filteredRestaurants = query
    ? restaurants.filter(
        (r) =>
          r.name.toLowerCase().includes(query.toLowerCase()) ||
          r.cuisine.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]}>
      <StatusBar barStyle={theme.statusBar} backgroundColor={theme.statusBarBg} translucent={false} />
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>Search</Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>Find your favourite restaurants & dishes</Text>
      </View>

      <View style={[styles.searchContainer, { backgroundColor: theme.inputBg, borderColor: theme.inputBorder }]}>
        <Ionicons name="search" size={20} color={theme.textSecondary} />
        <TextInput
          style={[styles.searchInput, { color: theme.text }]}
          placeholder="Search restaurants, cuisines..."
          placeholderTextColor={theme.textMuted}
          value={query}
          onChangeText={setQuery}
          autoFocus
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={() => setQuery('')}>
            <Ionicons name="close-circle" size={20} color={theme.textSecondary} />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.results}>
        {query.length === 0 && (
          <View style={styles.suggestionsContainer}>
            <Text style={[styles.suggestionsTitle, { color: theme.textSecondary }]}>Popular Searches</Text>
            {['Biryani', 'Pizza', 'Burger', 'Chinese', 'South Indian', 'Japanese'].map((item) => (
              <TouchableOpacity
                key={item}
                style={[styles.suggestionItem, { borderBottomColor: theme.divider }]}
                onPress={() => setQuery(item)}
              >
                <Ionicons name="trending-up" size={18} color={theme.textMuted} />
                <Text style={[styles.suggestionText, { color: theme.textSecondary }]}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {query.length > 0 && filteredRestaurants.length === 0 && (
          <View style={styles.noResults}>
            <Ionicons name="search-outline" size={48} color={theme.textMuted} />
            <Text style={[styles.noResultsText, { color: theme.textMuted }]}>No restaurants found</Text>
          </View>
        )}

        {filteredRestaurants.map((restaurant) => (
          <TouchableOpacity
            key={restaurant.id}
            style={[styles.resultCard, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}
            onPress={() =>
              navigation.navigate('HomeTab', {
                screen: 'RestaurantDetail',
                params: {
                  restaurantId: restaurant.id,
                  restaurantName: restaurant.name,
                  avgPrice: Math.round(
                    restaurant.menu.reduce((sum, item) => sum + item.price, 0) /
                      restaurant.menu.length
                  ),
                },
              })
            }
          >
            <View style={styles.resultIcon}>
              <Ionicons name="restaurant" size={20} color="#FF6B35" />
            </View>
            <View style={styles.resultInfo}>
              <Text style={[styles.resultName, { color: theme.text }]}>{restaurant.name}</Text>
              <Text style={[styles.resultCuisine, { color: theme.textSecondary }]}>{restaurant.cuisine}</Text>
            </View>
            <View style={styles.resultRating}>
              <Ionicons name="star" size={12} color="#FFD700" />
              <Text style={styles.resultRatingText}>{restaurant.rating}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingTop: 10, paddingHorizontal: 20, paddingBottom: 10 },
  title: { fontSize: 28, fontWeight: '800', marginBottom: 4 },
  subtitle: { fontSize: 14 },
  searchContainer: {
    flexDirection: 'row', alignItems: 'center',
    marginHorizontal: 20, borderRadius: 14,
    paddingHorizontal: 16, height: 50,
    marginVertical: 16, gap: 10, borderWidth: 1,
  },
  searchInput: { flex: 1, fontSize: 15 },
  results: { flex: 1, paddingHorizontal: 20 },
  suggestionsContainer: { marginTop: 10 },
  suggestionsTitle: { fontSize: 16, fontWeight: '700', marginBottom: 14 },
  suggestionItem: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 14, borderBottomWidth: 1, gap: 12,
  },
  suggestionText: { fontSize: 15 },
  noResults: { alignItems: 'center', marginTop: 60, gap: 12 },
  noResultsText: { fontSize: 16 },
  resultCard: {
    flexDirection: 'row', alignItems: 'center',
    borderRadius: 14, padding: 14,
    marginBottom: 10, borderWidth: 1, gap: 12,
  },
  resultIcon: {
    width: 44, height: 44, borderRadius: 12,
    backgroundColor: 'rgba(255,107,53,0.12)',
    justifyContent: 'center', alignItems: 'center',
  },
  resultInfo: { flex: 1 },
  resultName: { fontSize: 16, fontWeight: '600', marginBottom: 2 },
  resultCuisine: { fontSize: 13 },
  resultRating: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: 'rgba(255,215,0,0.12)',
    paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, gap: 4,
  },
  resultRatingText: { color: '#FFD700', fontSize: 13, fontWeight: '700' },
});
