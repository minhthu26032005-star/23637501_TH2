import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ShopStack } from './ShopStack';
import { CartScreen } from '@screens/CartScreen';
import { MeScreen } from '@screens/MeScreen';
import { VARIANT } from '@constants/student';
import { useCartStore } from '@stores/cartStore';
import { THEME } from '@constants/theme';

const Tab = createBottomTabNavigator();

export const MainTabs: React.FC = () => {
  const totalQty = useCartStore((s) => s.totalQuantity());

  const shopTab = (
    <Tab.Screen
      key="ShopTab"
      name="ShopTab"
      component={ShopStack}
      options={{ title: 'Cửa hàng' }}
    />
  );

  const cartTab = (
    <Tab.Screen
      key="CartTab"
      name="CartTab"
      component={CartScreen}
      options={{
        title: 'Giỏ',
        tabBarBadge: totalQty > 0 ? totalQty : undefined,
      }}
    />
  );

  const meTab = (
    <Tab.Screen
      key="MeTab"
      name="MeTab"
      component={MeScreen}
      options={{ title: 'Tôi' }}
    />
  );

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: THEME.primary,
        tabBarInactiveTintColor: THEME.textLight,
      }}>
      {VARIANT.tabOrder === 'cartFirst'
        ? [cartTab, shopTab, meTab]
        : [shopTab, cartTab, meTab]}
    </Tab.Navigator>
  );
};