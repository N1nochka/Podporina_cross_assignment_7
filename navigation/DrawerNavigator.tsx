import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import MainTabs from './MainTabs';
import SupportScreen from '../screens/SupportScreen';
import { useTheme } from '../context/ThemeContext';

const Drawer = createDrawerNavigator();

function ThemeToggleHeader() {
  const { isDarkMode, toggleTheme, colors } = useTheme();
  
  return (
    <TouchableOpacity onPress={toggleTheme} style={styles.themeButton}>
      <Text style={{ fontSize: 24 }}>
        {isDarkMode ? '☀️' : '🌙'}
      </Text>
    </TouchableOpacity>
  );
}

function LogoutButton({ navigation }: any) {
  const { colors } = useTheme();
  
  const handleLogout = () => {
    // Скидаємо всю навігацію і йдемо на Auth
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Auth' }],  // ← ПРОСТО 'Auth'
      })
    );
  };

  return (
    <TouchableOpacity
      style={{ padding: 16, marginTop: 20 }}
      onPress={handleLogout}
    >
      <Text style={{ fontSize: 16, color: colors.primary, fontWeight: 'bold' }}>
        🚪 Вийти
      </Text>
    </TouchableOpacity>
  );
}

export default function DrawerNavigator() {
  const { colors } = useTheme();
  
  return (
    <Drawer.Navigator
      screenOptions={({ navigation }) => ({
        drawerStyle: {
          backgroundColor: colors.background,
          width: 280,
        },
        drawerActiveTintColor: colors.primary,
        drawerInactiveTintColor: colors.textSecondary,
        drawerLabelStyle: {
          fontSize: 16,
          fontWeight: '500',
        },
        headerShown: true,           
        headerTitle: '',             
        headerLeft: () => (          
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            style={{ marginLeft: 16 }}
          >
            <Text style={{ fontSize: 28, color: colors.textPrimary }}>☰</Text>
          </TouchableOpacity>
        ),
        headerRight: () => <ThemeToggleHeader />,
        headerStyle: {
          backgroundColor: colors.headerBackground,
          shadowOpacity: 0,
          elevation: 0,
        },
      })}
    >
      <Drawer.Screen name="Головна" component={MainTabs} />
      
      {/* Підтримка - без іконки, щоб не було знака питання */}
      <Drawer.Screen 
        name="Підтримка" 
        component={SupportScreen}
      />
      
      <Drawer.Screen name="Вийти" component={LogoutButton} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  themeButton: {
    marginRight: 16,
    padding: 8,
  },
});