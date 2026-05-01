import { useState } from 'react';
import { useWeather } from './hooks/useWeather';
import { SearchBar } from './components/SearchBar';
import { CurrentWeather } from './components/CurrentWeather';
import { ForecastList } from './components/ForecastList';
import './App.css';

function App() {
  const [isDark, setIsDark] = useState(true);
  const { weather, forecast, loading, error, fetchWeather } = useWeather();

  return (
    <div className={`app ${isDark ? 'dark' : 'light'}`}>
      <header>
        <h1>🌤 Hava Durumu</h1>
        <button className="theme-toggle" onClick={() => setIsDark(!isDark)}>
          {isDark ? '☀️ İşıqlı' : '🌙 Qaranlıq'}
        </button>
      </header>

      <main>
        <SearchBar onSearch={fetchWeather} loading={loading} />

        {error && <div className="error-msg">{error}</div>}

        {loading && <div className="loading">Yüklənir...</div>}

        {weather && !loading && (
          <>
            <CurrentWeather data={weather} isDark={isDark} />
            {forecast.length > 0 && <ForecastList days={forecast} />}
          </>
        )}

        {!weather && !loading && !error && (
          <div className="welcome">
            <p>🌍 Şəhər adı daxil edib hava durumunu öyrənin</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;