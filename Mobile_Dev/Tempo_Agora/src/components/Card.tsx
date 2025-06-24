import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface WeatherCardProps {
  title: string;
  value: string;
  iconName: keyof typeof Ionicons.glyphMap;
  unit?: string;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ title, value, iconName, unit }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Ionicons name={iconName} size={32} color="#3498DB" style={styles.icon} />
      <Text style={styles.value}>
        {value}
        {unit && <Text style={styles.unit}>{unit}</Text>}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#5D6D7E',
    borderRadius: 12,
    padding: 20,
    margin: 8,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  title: {
    fontSize: 14,
    color: '#ECF0F1',
    marginBottom: 8,
    textAlign: 'center',
  },
  icon: {
    marginBottom: 8,
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  unit: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#ECF0F1',
  },
});

export default WeatherCard;