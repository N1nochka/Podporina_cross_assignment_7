import React, { useState, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, useWindowDimensions } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import Card from '../components/Card';
import PrimaryButton from '../components/PrimaryButton';
import CustomHeader from '../components/CustomHeader';

export default function DonateScreen({ navigation }: any) {
  const { colors, isDarkMode } = useTheme();
  const { width } = useWindowDimensions();
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'];
  // Сітка дат (пусті клітинки на початку для вирівнювання)
  const dates = [null, null, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, null, null, null];
  const times = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00'];

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);


  const cellSize = 44;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <CustomHeader title="Запис на здачу плазми" onBack={() => navigation.goBack()} />

      <Card>
        <Text style={[styles.cardTitle, { color: colors.textSecondary }]}>📅 ОБЕРІТЬ ДАТУ:</Text>

        <View style={styles.calendarHeader}>
          <TouchableOpacity>
            <Text style={[styles.arrow, { color: colors.textPrimary }]}>{'      <'}</Text>
          </TouchableOpacity>
          <Text style={[styles.monthTitle, { color: colors.textPrimary }]}>КВІТЕНЬ 2026</Text>
          <TouchableOpacity>
            <Text style={[styles.arrow, { color: colors.textPrimary }]}>{'>       '}</Text>
          </TouchableOpacity>
        </View>

        {/* Дні тижня */}
        <View style={styles.weekDaysRow}>
          {weekDays.map(day => (
            <Text key={day} style={[styles.weekDayText, { color: colors.textSecondary }]}>
              {day}
            </Text>
          ))}
        </View>

        {/* Дати місяця - сіра рамка, великі числа */}
        <View style={styles.datesGrid}>
          {dates.map((date, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.dateBox,
                { borderColor: colors.border }, // ← СІРА РАМКА
                date !== null && selectedDate === date && [styles.selectedDateBox, { borderColor: colors.primary, backgroundColor: colors.primary + '20' }],
                date === null && styles.emptyDateBox
              ]}
              onPress={() => date !== null && setSelectedDate(date)}
              disabled={date === null}
            >
              {date !== null && (
                <Text style={[
                  styles.dateText,
                  { color: colors.textPrimary },
                  selectedDate === date && { color: colors.primary }
                ]}>
                  {date}
                </Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </Card>

      <Card>
        <Text style={[styles.cardTitle, { color: colors.textSecondary }]}>⏰ ОБЕРІТЬ ЧАС:</Text>
        <View style={styles.timeGrid}>
          {times.map(time => (
            <TouchableOpacity
              key={time}
              style={[
                styles.timeBox,
                { borderColor: colors.border },
                selectedTime === time && [styles.selectedTimeBox, { borderColor: colors.primary, backgroundColor: colors.primary + '20' }]
              ]}
              onPress={() => setSelectedTime(time)}
            >
              <Text style={[styles.timeText, { color: colors.textPrimary }, selectedTime === time && { color: colors.primary }]}>
                {time}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Card>

      <PrimaryButton title="ПІДТВЕРДИТИ ЗАПИС" onPress={() => { }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  contentContainer: {
    paddingTop: 10,
    paddingBottom: 20,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 6,
    marginLeft: 40,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  arrow: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  monthTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 6,
  },
  weekDaysRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  weekDayText: {
    fontSize: 16,
    fontWeight: 'bold',
    width: 48,
    textAlign: 'center',
  },
  datesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateBox: {
    width: 44,
    height: 44,
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
  },
  selectedDateBox: {
    borderWidth: 2,
  },
  emptyDateBox: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  dateText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeBox: {
    width: 90,
    height: 44,
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 4,
  },
  selectedTimeBox: {
    borderWidth: 2,
  },
  timeText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});