import type { ForecastDay } from '../types/weather';

interface Props {
  day: ForecastDay;
}

export const ForecastCard = ({ day }: Props) => (
  <div className="forecast-card">
    <p className="forecast-date">{day.date}</p>
    <img
      src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
      alt={day.description}
    />
    <p className="forecast-desc">{day.description}</p>
    <div className="forecast-temps">
      <span className="temp-max">{day.temp_max}°C</span>
      <span className="temp-min">{day.temp_min}°C</span>
    </div>
  </div>
);