import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet } from 'react-native';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import HomeStackNavigator from './HomeStackNavigator';
import SearchScreen from '../screens/SearchScreen';
import OrdersScreen from '../screens/OrdersScreen';
import ProfileDrawerNavigator from './ProfileDrawerNavigator';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

const Tab = createBottomTabNavigator();

function getTabBarVisibility(route) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';
  if (routeName === 'RestaurantDetail' || routeName === 'Cart') {
    return 'none';
  }
  return 'flex';
}

export default function BottomTabNavigator() {
  const { getCartCount } = useCart();
  const { theme } = useTheme();
  const cartCount = getCartCount();

  const tabBarStyle = {
    backgroundColor: theme.tabBarBg,
    borderTopColor: theme.tabBarBorder,
    borderTopWidth: 1,
    height: 65,
    paddingBottom: 8,
    paddingTop: 8,
    elevation: 0,
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle,
        tabBarActiveTintColor: '#FF6B35',
        tabBarInactiveTintColor: theme.tabBarInactive,
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
        tabBarIcon: ({ focused, color }) => {
          let iconName;
          if (route.name === 'HomeTab') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'SearchTab') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'OrdersTab') {
            iconName = focused ? 'receipt' : 'receipt-outline';
          } else if (route.name === 'ProfileTab') {
            iconName = focused ? 'person' : 'person-outline';
          }
          return (
            <View style={styles.iconContainer}>
              <Ionicons name={iconName} size={22} color={color} />
              {focused && <View style={styles.activeIndicator} />}
            </View>
          );
        },
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStackNavigator}
        options={({ route }) => ({
          tabBarLabel: 'Home',
          tabBarStyle: {
            display: getTabBarVisibility(route),
            ...tabBarStyle,
          },
        })}
      />
      <Tab.Screen
        name="SearchTab"
        component={SearchScreen}
        options={{ tabBarLabel: 'Search' }}
      />
      <Tab.Screen
        name="OrdersTab"
        component={OrdersScreen}
        options={{
          tabBarLabel: 'Orders',
          tabBarBadge: cartCount > 0 ? cartCount : undefined,
          tabBarBadgeStyle: {
            backgroundColor: '#e94560', color: '#fff',
            fontSize: 10, fontWeight: '700',
            minWidth: 18, height: 18, lineHeight: 18, borderRadius: 9,
          },
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileDrawerNavigator}
        options={{ tabBarLabel: 'Profile' }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  iconContainer: { alignItems: 'center', justifyContent: 'center' },
  activeIndicator: {
    width: 4, height: 4, borderRadius: 2,
    backgroundColor: '#FF6B35', marginTop: 4,
  },
});
