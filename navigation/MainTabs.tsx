import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import HomeScreen from '../screens/HomeScreen';
import DonateScreen from '../screens/DonateScreen';
import BonusesScreen from '../screens/BonusesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import PlasmaNewsScreen from '../screens/PlasmaNewsScreen';
import MyDonationsScreen from '../screens/MyDonationsScreen';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          const icons: Record<string, string> = {
            Головна: '🏠',
            Запис: '📅',
            Бонуси: '🎁',
            Профіль: '👤',
            Новини: '📰',
            МоїДонації: '📦',
          };
          return <Text style={{ fontSize: 24, color }}>{icons[route.name]}</Text>;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
          height: 70,
          paddingBottom: 8,
          paddingTop: 8
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Головна" component={HomeScreen} />
      <Tab.Screen name="Запис" component={DonateScreen} />
      <Tab.Screen name="Бонуси" component={BonusesScreen} />
      <Tab.Screen name="Профіль" component={ProfileScreen} />
      <Tab.Screen name="Новини" component={PlasmaNewsScreen} />
      <Tab.Screen name="МоїДонації" component={MyDonationsScreen} options={{ title: 'Мої донації' }} />
    </Tab.Navigator>
  );
}