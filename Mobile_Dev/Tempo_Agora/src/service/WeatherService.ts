export interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  condition: string;
  location: string;
}

const mockWeatherData: WeatherData = {
  temperature: 24,
  humidity: 65,
  windSpeed: 12,
  condition: 'Parcialmente Nublado',
  location: 'São Paulo, SP'
};

export const fetchWeatherData = async (): Promise<WeatherData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Add some randomness to make it feel more real
      const randomTemp = mockWeatherData.temperature + Math.floor(Math.random() * 6) - 3;
      const randomHumidity = mockWeatherData.humidity + Math.floor(Math.random() * 20) - 10;
      const randomWind = mockWeatherData.windSpeed + Math.floor(Math.random() * 8) - 4;
      
      resolve({
        ...mockWeatherData,
        temperature: Math.max(15, Math.min(35, randomTemp)), 
        humidity: Math.max(30, Math.min(90, randomHumidity)),
        windSpeed: Math.max(0, Math.min(25, randomWind)),
      });
    }, 1000);
  });
};


export const WEATHER_FORECAST_URL = 'https://www.climatempo.com.br/previsao-do-tempo/15-dias/cidade/558/saopaulo-sp';