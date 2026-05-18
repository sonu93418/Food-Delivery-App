import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { restaurants } from '../data/restaurants';

export default function SearchScreen({ navigation }) {
  const [query, setQuery] = React.useState('');

  const filteredRestaurants = query
    ? restaurants.filter(
        (r) =>
          r.name.toLowerCase().includes(query.toLowerCase()) ||
          r.cuisine.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.title}>Search</Text>
        <Text style={styles.subtitle}>Find your favourite restaurants & dishes</Text>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="rgba(255,255,255,0.4)" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search restaurants, cuisines..."
          placeholderTextColor="rgba(255,255,255,0.3)"
          value={query}
          onChangeText={setQuery}
          autoFocus
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={() => setQuery('')}>
            <Ionicons name="close-circle" size={20} color="rgba(255,255,255,0.4)" />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.results}>
        {query.length === 0 && (
          <View style={styles.suggestionsContainer}>
            <Text style={styles.suggestionsTitle}>Popular Searches</Text>
            {['Biryani', 'Pizza', 'Burger', 'Chinese', 'South Indian', 'Japanese'].map((item) => (
              <TouchableOpacity
                key={item}
                style={styles.suggestionItem}
                onPress={() => setQuery(item)}
              >
                <Ionicons name="trending-up" size={18} color="rgba(255,255,255,0.3)" />
                <Text style={styles.suggestionText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {query.length > 0 && filteredRestaurants.length === 0 && (
          <View style={styles.noResults}>
            <Ionicons name="search-outline" size={48} color="rgba(255,255,255,0.15)" />
            <Text style={styles.noResultsText}>No restaurants found</Text>
          </View>
        )}

        {filteredRestaurants.map((restaurant) => (
          <TouchableOpacity
            key={restaurant.id}
            style={styles.resultCard}
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
              <Text style={styles.resultName}>{restaurant.name}</Text>
              <Text style={styles.resultCuisine}>{restaurant.cuisine}</Text>
            </View>
            <View style={styles.resultRating}>
              <Ionicons name="star" size={12} color="#FFD700" />
              <Text style={styles.resultRatingText}>{restaurant.rating}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 10,
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
    marginHorizontal: 20,
    borderRadius: 14,
    paddingHorizontal: 16,
    height: 50,
    marginVertical: 16,
    gap: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  searchInput: {
    flex: 1,
    color: '#ffffff',
    fontSize: 15,
  },
  results: {
    flex: 1,
    paddingHorizontal: 20,
  },
  suggestionsContainer: {
    marginTop: 10,
  },
  suggestionsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.6)',
    marginBottom: 14,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
    gap: 12,
  },
  suggestionText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 15,
  },
  noResults: {
    alignItems: 'center',
    marginTop: 60,
    gap: 12,
  },
  noResultsText: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 16,
  },
  resultCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    gap: 12,
  },
  resultIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 107, 53, 0.12)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultInfo: {
    flex: 1,
  },
  resultName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 2,
  },
  resultCuisine: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.4)',
  },
  resultRating: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 215, 0, 0.12)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  resultRatingText: {
    color: '#FFD700',
    fontSize: 13,
    fontWeight: '700',
  },
});
