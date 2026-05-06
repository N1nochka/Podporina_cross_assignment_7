import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, SafeAreaView } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import Card from '../components/Card';
import PrimaryButton from '../components/PrimaryButton';
import SmallButton from '../components/SmallButton';
import { fetchDonationNews } from '../api/newsApi';
import { COLORS } from '../constants/colors';

interface NewsItem {
  id: number;
  title: string;
  body: string;
}

export default function HomeScreen({ navigation }: any) {
  const { colors, isDarkMode } = useTheme();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchDonationNews();
      setNews(data.slice(0, 3));
    } catch (err) {
      setError('Не вдалося завантажити новини');
    } finally {
      setLoading(false);
    }
  }, []);

  const handlePressNews = useCallback((item: NewsItem) => {
    navigation.navigate('NewsDetails', { title: item.title, body: item.body });
  }, [navigation]);

  const handleCancel = useCallback(() => {
    // логіка скасування
  }, []);

  const handleReschedule = useCallback(() => {
    // логіка перенесення
  }, []);

  const handleDonatePress = useCallback(() => {
    navigation.navigate('Запис');
  }, [navigation]);

  const backgroundColor = isDarkMode ? '#121212' : COLORS.white;
  const textColor = isDarkMode ? '#FFFFFF' : COLORS.textPrimary;
  const textSecondaryColor = isDarkMode ? '#B0B0B0' : COLORS.textSecondary;
  const borderColor = isDarkMode ? '#333333' : COLORS.border;
  const primaryColor = isDarkMode ? '#E57373' : COLORS.primary;

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      <ScrollView style={styles.container}>
        <Text style={[styles.welcome, { color: textColor }]}>Вітаємо, User!</Text>

        <Text style={[styles.sectionTitle, { color: textSecondaryColor }]}>🎯 НАСТУПНА ЗДАЧА ПЛАЗМИ:</Text>
        <Card>
          <View style={styles.dateTimeRow}>
            <Text style={[styles.dateText, { color: textColor }]}>Пʼятниця, 25 квітня об 11:30</Text>
          </View>
          <View style={styles.row}>
            <SmallButton title="Скасувати" onPress={handleCancel} />
            <Text style={[styles.slash, { color: primaryColor }]}>/</Text>
            <SmallButton title="Перенести" onPress={handleReschedule} />
          </View>
        </Card>

        <Text style={[styles.sectionTitle, { color: textSecondaryColor }]}>📊 ВАША АКТИВНІСТЬ:</Text>
        <Card>
          <View style={styles.statRow}><Text style={[styles.statLabel, { color: textColor }]}>Всього здач:</Text><Text style={[styles.statValue, { color: textColor }]}>2</Text></View>
          <View style={styles.statRow}><Text style={[styles.statLabel, { color: textColor }]}>За 12 місяців:</Text><Text style={[styles.statValue, { color: textColor }]}>2</Text></View>
          <View style={styles.statRow}><Text style={[styles.statLabel, { color: textColor }]}>За цей рік:</Text><Text style={[styles.statValue, { color: textColor }]}>2</Text></View>
        </Card>

        <Text style={[styles.sectionTitle, { color: textSecondaryColor }]}>📰 НОВИНИ:</Text>
        <Card>
          {loading ? (
            <ActivityIndicator size="small" color={primaryColor} />
          ) : error ? (
            <Text style={[styles.errorText, { color: primaryColor }]}>{error}</Text>
          ) : (
            news.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[styles.newsItem, { borderBottomColor: borderColor }]}
                onPress={() => handlePressNews(item)}
              >
                <Text style={[styles.newsTitle, { color: textColor }]}>{item.title.substring(0, 40)}</Text>
                <Text style={[styles.readMore, { color: primaryColor }]}>→</Text>
              </TouchableOpacity>
            ))
          )}
        </Card>

        <View style={styles.centerInfo}>
          <Text style={[styles.centerName, { color: primaryColor }]}>🏥 Plasmaspende-Zentrum in Fulda</Text>
          <Text style={[styles.centerAddress, { color: textColor }]}>Адреса: Bahnhofstraße 2, 36037 Fulda</Text>
          <Text style={[styles.centerPhone, { color: textColor }]}>Номер телефону: 0661 4805000</Text>
        </View>

        <PrimaryButton title="ЗАПИСАТИСЯ НА ЗДАЧУ ПЛАЗМИ" onPress={handleDonatePress} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { flex: 1, paddingHorizontal: 16, paddingTop: 10 },
  welcome: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  sectionTitle: { fontSize: 12, fontWeight: 'bold', marginBottom: 8, marginTop: 4, marginLeft: 14 },
  dateTimeRow: { marginBottom: 12 },
  dateText: { fontSize: 18, fontWeight: 'bold' },
  row: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 16, marginTop: 8 },
  slash: { fontSize: 14, fontWeight: 'bold' },
  statRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  statLabel: { fontSize: 14, fontWeight: 'bold', flex: 1 },
  statValue: { fontSize: 16, fontWeight: 'bold' },
  newsItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8, borderBottomWidth: 1 },
  newsTitle: { fontSize: 14, flex: 1 },
  readMore: { fontSize: 18, marginLeft: 8 },
  errorText: { fontSize: 14, textAlign: 'center', padding: 20 },
  centerInfo: { marginTop: 20, marginBottom: 16, alignItems: 'center' },
  centerName: { fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
  centerAddress: { fontSize: 14, fontWeight: 'bold', marginBottom: 2 },
  centerPhone: { fontSize: 14, fontWeight: 'bold' },
});