export interface WeatherData {
  city: string;
  country: string;
  temp: number;
  feels_like: number;
  humidity: number;
  wind_speed: number;
  description: string;
  icon: string;
  sunrise: number;
  sunset: number;
}

export interface ForecastDay {
  date: string;
  temp_min: number;
  temp_max: number;
  description: string;
  icon: string;
}