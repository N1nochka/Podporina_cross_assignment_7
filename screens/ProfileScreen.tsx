import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';
import Card from '../components/Card';
import OutlineButton from '../components/OutlineButton';
import PlasmaIcon from '../components/PlasmaIcon';
import CustomHeader from '../components/CustomHeader';

export default function ProfileScreen({ navigation }: any) {
  const { colors } = useTheme();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const handleLogout = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Auth' }],  // ← 'Auth' замість SCREENS.AUTH
      })
    );
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <CustomHeader title="Мій профіль" onBack={() => navigation.goBack()} />
      <PlasmaIcon size={60} />
      <Text style={[styles.welcome, { color: colors.textPrimary }]}>Вітаємо, User!</Text>

      <Card>
        <Text style={[styles.cardTitle, { color: colors.textSecondary }]}>👤 ОСОБИСТІ ДАНІ</Text>
        <View style={styles.infoRow}>
          <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Номер донора:</Text>
          <Text style={[styles.infoValue, { color: colors.textPrimary }]}>101090</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Дата народження:</Text>
          <Text style={[styles.infoValue, { color: colors.textPrimary }]}>01.01.2000</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Email:</Text>
          <Text style={[styles.infoValue, { color: colors.textPrimary }]}>user@gmail.com</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Телефон:</Text>
          <Text style={[styles.infoValue, { color: colors.textPrimary }]}>+491712345678</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Адреса:</Text>
          <Text style={[styles.infoValue, { color: colors.textPrimary }]}>Schloßstraße 1, 36030 Fulda</Text>
        </View>
      </Card>

      <Card>
        <Text style={[styles.cardTitle, { color: colors.textSecondary }]}>📜 ІСТОРІЯ ЗДАЧ</Text>
        <View style={styles.historyRow}>
          <Text style={{ color: colors.textPrimary }}>1) 01.03.2025</Text>
          <Text style={[styles.boldText, { color: colors.textPrimary }]}>25€</Text>
        </View>
        <View style={styles.historyRow}>
          <Text style={{ color: colors.textPrimary }}>2) 29.03.2025</Text>
          <Text style={[styles.boldText, { color: colors.textPrimary }]}>25€</Text>
        </View>
        <Text style={[styles.historyLink, { color: colors.primary }]}>ВСЯ ІСТОРІЯ →</Text>
      </Card>

      <OutlineButton title="РЕДАГУВАТИ ПРОФІЛЬ" onPress={() => {}} />
      <OutlineButton title="ВИЙТИ" onPress={handleLogout} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16 },
  contentContainer: { paddingTop: 10, paddingBottom: 20 },
  welcome: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  cardTitle: { fontSize: 12, fontWeight: 'bold', marginBottom: 8 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  infoLabel: { fontSize: 14, fontWeight: 'bold' },
  infoValue: { fontSize: 14, fontWeight: 'bold' },
  historyRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  historyLink: { fontSize: 14, fontWeight: 'bold', marginTop: 8 },
  boldText: { fontWeight: 'bold' },
});