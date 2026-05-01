import type { WeatherData } from '../types/weather';

interface Props {
  data: WeatherData;
  isDark: boolean;
}

const formatTime = (unix: number) =>
  new Date(unix * 1000).toLocaleTimeString('az-AZ', {
    hour: '2-digit', minute: '2-digit'
  });

export const CurrentWeather = ({ data }: Props) => (
  <div className="current-weather">
    <div className="city-info">
      <h2>{data.city}, {data.country}</h2>
      <p className="description">{data.description}</p>
    </div>

    <div className="temp-section">
      <img
        src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`}
        alt={data.description}
      />
      <span className="temperature">{data.temp}°C</span>
    </div>

    <div className="details-grid">
      <div className="detail">
        <span className="label">Hiss olunur</span>
        <span className="value">{data.feels_like}°C</span>
      </div>
      <div className="detail">
        <span className="label">Rütubət</span>
        <span className="value">{data.humidity}%</span>
      </div>
      <div className="detail">
        <span className="label">Külək</span>
        <span className="value">{data.wind_speed} m/s</span>
      </div>
      <div className="detail">
        <span className="label">Gün doğumu</span>
        <span className="value">{formatTime(data.sunrise)}</span>
      </div>
      <div className="detail">
        <span className="label">Gün batımı</span>
        <span className="value">{formatTime(data.sunset)}</span>
      </div>
    </div>
  </div>
);