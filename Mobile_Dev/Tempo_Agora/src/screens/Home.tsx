import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import WeatherCard from '../components/Card';
import LinkButton from '../components/Button';
import { fetchWeatherData, WeatherData, WEATHER_FORECAST_URL } from '../service/WeatherService';

const WeatherScreen: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadWeatherData();
  }, []);

  const loadWeatherData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchWeatherData();
      setWeatherData(data);
    } catch (err) {
      setError('Failed to load weather data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#3498DB" />
        <Text style={styles.loadingText}>Carregando Dados</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>TEMPO AGORA</Text>
        <Text style={styles.location}>{weatherData?.location}</Text>
      </View>

      <View style={styles.cardsContainer}>
        <View style={styles.cardRow}>
          <WeatherCard
            title="Temperatura"
            value={weatherData?.temperature.toString() || '0'}
            unit="°C"
            iconName="thermometer-outline"
          />
          <WeatherCard
            title="Umidade"
            value={weatherData?.humidity.toString() || '0'}
            unit="%"
            iconName="water-outline"
          />
        </View>
        
        <View style={styles.cardRow}>
          <WeatherCard
            title="Velocidade do vento"
            value={weatherData?.windSpeed.toString() || '0'}
            unit=" km/h"
            iconName="leaf-outline"
          />
          <WeatherCard
            title="Condição"
            value={weatherData?.condition || 'Unknown'}
            iconName="cloud-outline"
          />
        </View>
      </View>

      <LinkButton
        title="Veja Previsão Completa"
        url={WEATHER_FORECAST_URL}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent', 
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent', 
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF', 
    marginBottom: 4,
  },
  location: {
    fontSize: 16,
    color: '#BDC3C7', 
  },
  cardsContainer: {
    paddingHorizontal: 8,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#BDC3C7', 
  },
  errorText: {
    fontSize: 16,
    color: '#E74C3C',
    textAlign: 'center',
  },
});

export default WeatherScreen;