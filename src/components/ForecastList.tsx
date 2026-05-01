import type { ForecastDay } from '../types/weather';
import { ForecastCard } from './ForecastCard';

interface Props {
  days: ForecastDay[];
}

export const ForecastList = ({ days }: Props) => (
  <div className="forecast-section">
    <h3>5 Günlük Proqnoz</h3>
    <div className="forecast-grid">
      {days.map((day, i) => (
        <ForecastCard key={i} day={day} />
      ))}
    </div>
  </div>
);