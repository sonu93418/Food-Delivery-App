const linking = {
  prefixes: ['foodapp://'],
  config: {
    screens: {
      // Auth screens
      Login: 'login',
      // Main app screens
      Onboarding: 'onboarding',
      MainTabs: {
        screens: {
          HomeTab: {
            screens: {
              Home: 'home',
              RestaurantDetail: 'restaurant/:restaurantId',
              Cart: 'cart',
            },
          },
          SearchTab: 'search',
          OrdersTab: 'orders',
          ProfileTab: {
            screens: {
              ProfileMain: 'profile',
              MyOrders: 'my-orders',
              Settings: 'settings',
              Help: 'help',
            },
          },
        },
      },
    },
  },
};

export default linking;
