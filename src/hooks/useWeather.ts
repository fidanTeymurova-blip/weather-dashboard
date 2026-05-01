import { useState } from 'react';
import axios from 'axios';
import type { WeatherData, ForecastDay } from '../types/weather';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const useWeather = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async (city: string) => {
    setLoading(true);
    setError(null);

    try {
      const [currentRes, forecastRes] = await Promise.all([
        axios.get(`${BASE_URL}/weather`, {
          params: { q: city, appid: API_KEY, units: 'metric', lang: 'az' }
        }),
        axios.get(`${BASE_URL}/forecast`, {
          params: { q: city, appid: API_KEY, units: 'metric', lang: 'az' }
        })
      ]);

      const c = currentRes.data;
      setWeather({
        city: c.name,
        country: c.sys.country,
        temp: Math.round(c.main.temp),
        feels_like: Math.round(c.main.feels_like),
        humidity: c.main.humidity,
        wind_speed: c.wind.speed,
        description: c.weather[0].description,
        icon: c.weather[0].icon,
        sunrise: c.sys.sunrise,
        sunset: c.sys.sunset,
      });

      // 5 günlük proqnoz — hər günün saat 12:00 məlumatı
      const daily = forecastRes.data.list
        .filter((item: any) => item.dt_txt.includes('12:00:00'))
        .slice(0, 5)
        .map((item: any) => ({
          date: new Date(item.dt * 1000).toLocaleDateString('az-AZ', {
            weekday: 'short', month: 'short', day: 'numeric'
          }),
          temp_min: Math.round(item.main.temp_min),
          temp_max: Math.round(item.main.temp_max),
          description: item.weather[0].description,
          icon: item.weather[0].icon,
        }));

      setForecast(daily);
    } catch (err: any) {
      if (err.response?.status === 404) {
        setError('Şəhər tapılmadı. Yenidən yoxlayın.');
      } else {
        setError('Xəta baş verdi. API açarınızı yoxlayın.');
      }
    } finally {
      setLoading(false);
    }
  };

  return { weather, forecast, loading, error, fetchWeather };
};