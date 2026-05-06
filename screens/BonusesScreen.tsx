import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import Card from '../components/Card';
import CustomHeader from '../components/CustomHeader';

export default function BonusesScreen({ navigation }: any) {
  const { colors, isDarkMode } = useTheme();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <CustomHeader title="Бонуси та виплати" onBack={() => navigation.goBack()} />

      <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>💰 ВИПЛАТА ЗА ЗДАЧУ:</Text>
      <Card>
        <View style={styles.payoutRow}>
          <Text style={[styles.payoutLabel, { color: colors.textPrimary }]}>Одна здача:</Text>
          <Text style={[styles.amount, { color: colors.textPrimary }]}>25€</Text>
        </View>
      </Card>

      <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>🎯 БОНУСНІ ПРОГРАМИ:</Text>

      <Card>
        <Text style={[styles.bonusTitle, { color: colors.textPrimary }]}>📅 4 здачі за 28 днів</Text>
        <Text style={[styles.bonusAmount, { color: colors.textPrimary }]}>
          Бонус: <Text style={[styles.bonusRed, { color: colors.primary }]}>+20€</Text>
        </Text>
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { backgroundColor: colors.progressBackground }]}>
            <View style={[styles.progressFill, { width: '50%', backgroundColor: colors.primary }]} />
          </View>
          <Text style={[styles.progressText, { color: colors.textPrimary }]}>2/4</Text>
        </View>
        <Text style={[styles.bonusRemaining, { color: colors.textSecondary }]}>Ще 2 здачі до бонусу 20€</Text>
      </Card>

      <Card>
        <Text style={[styles.bonusTitle, { color: colors.textPrimary }]}>📅 6 здач за 90 днів</Text>
        <Text style={[styles.bonusAmount, { color: colors.textPrimary }]}>
          Бонус: <Text style={[styles.bonusRed, { color: colors.primary }]}>+30€</Text>
        </Text>
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { backgroundColor: colors.progressBackground }]}>
            <View style={[styles.progressFill, { width: '33%', backgroundColor: colors.primary }]} />
          </View>
          <Text style={[styles.progressText, { color: colors.textPrimary }]}>2/6</Text>
        </View>
        <Text style={[styles.bonusRemaining, { color: colors.textSecondary }]}>Ще 4 здачі до бонусу 30€</Text>
      </Card>

      <Card>
        <Text style={[styles.bonusTitle, { color: colors.textPrimary }]}>👥 ПРИВЕДИ ДРУГА</Text>
        <View style={styles.referralRow}>
          <Text style={[styles.referralText, { color: colors.textPrimary }]}>За реєстрацію:</Text>
          <Text style={[styles.referralAmount, { color: colors.primary }]}>10€</Text>
        </View>
        <View style={styles.referralRow}>
          <Text style={[styles.referralText, { color: colors.textPrimary }]}>За 5 здач друга:</Text>
          <Text style={[styles.referralAmount, { color: colors.primary }]}>40€</Text>
        </View>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16 },
  contentContainer: { paddingTop: 10, paddingBottom: 20 },
  sectionTitle: { fontSize: 12, fontWeight: 'bold', marginBottom: 8, marginTop: 16 },
  payoutRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  payoutLabel: { fontSize: 18, fontWeight: 'bold' },
  amount: { fontSize: 20, fontWeight: 'bold' },
  bonusTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
  bonusAmount: { fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
  bonusRed: {},
  progressContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 8 },
  progressBar: { flex: 1, height: 8, borderRadius: 4, marginRight: 12, overflow: 'hidden' },
  progressFill: { height: 8, borderRadius: 4 },
  progressText: { fontSize: 14, fontWeight: 'bold', width: 35, textAlign: 'right' },
  bonusRemaining: { fontSize: 14, fontWeight: 'bold', marginTop: 8 },
  referralRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 },
  referralText: { fontSize: 16, fontWeight: 'bold' },
  referralAmount: { fontSize: 18, fontWeight: 'bold' },
});