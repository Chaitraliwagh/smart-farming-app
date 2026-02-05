import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Cloud, Droplets, Thermometer, Wind, Loader, AlertCircle, Search, MapPin, CalendarDays, Navigation } from 'lucide-react';
import { getWeatherForecast } from '../services/api';

const WeatherForecast = () => {
  const { t } = useTranslation();
  const [city, setCity] = useState('Pune');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWeather();
  }, []);

  const fetchWeather = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await getWeatherForecast(city);
      setWeather(data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleSearch = () => {
    fetchWeather();
  };

  const getWeatherIcon = (condition) => {
    if (condition?.toLowerCase().includes('rain')) return '🌧️';
    if (condition?.toLowerCase().includes('cloud')) return '☁️';
    if (condition?.toLowerCase().includes('sun') || condition?.toLowerCase().includes('clear')) return '☀️';
    return '🌤️';
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center">
        <div className="bg-white rounded-[3rem] border border-slate-100 p-16 shadow-xl inline-block">
          <Loader className="animate-spin h-14 w-14 text-emerald-600 mx-auto mb-6" />
          <p className="text-slate-900 font-black text-xl tracking-tight uppercase">{t('loading')}</p>
          <p className="text-slate-400 text-sm mt-2 font-medium">Syncing with meteorological satellites...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-4 mb-2">
            <div className="p-3 bg-emerald-600 rounded-2xl shadow-lg shadow-emerald-100">
              <Cloud className="h-7 w-7 text-white" />
            </div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">
              {t('weatherForecast')}
            </h2>
          </div>
          <p className="text-slate-500 font-medium ml-16 italic uppercase text-xs tracking-widest">Real-time Agricultural Intelligence</p>
        </div>

        {/* Professional Search Terminal */}
        <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm w-full md:w-96">
          <div className="pl-3 text-slate-400">
            <MapPin size={18} />
          </div>
          <input
            type="text"
            value={city}
            onChange={handleCityChange}
            placeholder="Enter city name"
            className="flex-1 px-2 py-2 bg-transparent outline-none font-bold text-slate-700 placeholder:text-slate-300"
          />
          <button
            onClick={handleSearch}
            className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-black text-sm hover:bg-slate-800 transition-all flex items-center gap-2"
          >
            <Search size={16} /> SEARCH
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-8 bg-rose-50 border border-rose-100 rounded-[2rem] p-6 flex items-center gap-4 text-rose-800 animate-in fade-in zoom-in">
          <AlertCircle className="h-6 w-6 text-rose-500 shrink-0" />
          <p className="font-bold">{error}</p>
        </div>
      )}

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Current Weather Card */}
        {weather && weather.current && (
          <div className="lg:col-span-12">
            <div className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-sm flex flex-col md:flex-row">
              {/* Left Side: Temperature Hero */}
              <div className="bg-slate-900 p-10 text-white flex flex-col justify-between md:w-1/3">
                <div>
                  <div className="flex items-center gap-2 text-emerald-400 mb-2">
                    <Navigation size={14} fill="currentColor" />
                    <span className="text-xs font-black tracking-widest uppercase">Live Station</span>
                  </div>
                  <h3 className="text-5xl font-black tracking-tighter mb-1">{city}</h3>
                  <p className="text-slate-400 font-bold uppercase tracking-tight text-sm uppercase">{weather.current.description}</p>
                </div>
                <div className="mt-10 flex items-center gap-6">
                  <div className="text-8xl">{getWeatherIcon(weather.current.description)}</div>
                  <div className="text-6xl font-black tracking-tighter">
                    {weather.current.temperature}<span className="text-emerald-500">°</span>
                  </div>
                </div>
              </div>

              {/* Right Side: Metrics Grid */}
              <div className="flex-1 p-10 bg-white grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { icon: <Thermometer />, label: t('temperature'), val: `${weather.current.temperature}°C`, color: 'text-orange-500' },
                  { icon: <Droplets />, label: t('humidity'), val: `${weather.current.humidity}%`, color: 'text-blue-500' },
                  { icon: <Wind />, label: 'Wind Speed', val: `${weather.current.wind_speed} m/s`, color: 'text-slate-400' },
                  { icon: <Cloud />, label: t('rainProbability'), val: `${weather.current.rain_probability || 0}%`, color: 'text-emerald-500' }
                ].map((item, i) => (
                  <div key={i} className="border border-slate-100 rounded-3xl p-6 hover:border-emerald-200 transition-all group">
                    <div className={`${item.color} mb-4 group-hover:scale-110 transition-transform`}>{item.icon}</div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{item.label}</p>
                    <p className="text-2xl font-black text-slate-900 tracking-tighter">{item.val}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 5-Day Forecast Terminal */}
        {weather && weather.forecast && weather.forecast.length > 0 && (
          <div className="lg:col-span-12 space-y-6">
            <div className="flex items-center gap-3 px-2">
              <CalendarDays className="text-emerald-600" size={24} />
              <h3 className="text-2xl font-black text-slate-900 tracking-tighter uppercase">
                {t('dayForecast')}
              </h3>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {weather.forecast.map((day, index) => (
                <div key={index} className="bg-white border border-slate-200 rounded-[2rem] p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all group">
                  <p className="text-xs font-black text-slate-400 mb-4 uppercase tracking-widest">{day.day}</p>
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {getWeatherIcon(day.description)}
                  </div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase mb-4 h-8 flex items-center justify-center leading-tight">
                    {day.description}
                  </p>
                  
                  <div className="bg-slate-50 rounded-2xl py-3 px-2 flex justify-center items-center gap-2 mb-4">
                    <span className="text-xl font-black text-slate-900">{day.temp_max}°</span>
                    <span className="w-[2px] h-4 bg-slate-200"></span>
                    <span className="text-sm font-bold text-slate-400">{day.temp_min}°</span>
                  </div>
                  
                  <div className="flex items-center justify-center gap-1 text-[10px] font-black text-emerald-600 bg-emerald-50 py-1 rounded-full">
                    <Droplets size={10} /> {day.humidity}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherForecast;