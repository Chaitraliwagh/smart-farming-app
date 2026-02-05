import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import FarmerChatbot from './components/FarmerChatbot';
import { 
  Home as HomeIcon, 
  Leaf, 
  Droplets, 
  Cloud, 
  Sprout,
  Globe,
  Layout
} from 'lucide-react';
import Home from './components/Home';
import DiseaseDetection from './components/DiseaseDetection';
import FertilizerRecommendation from './components/FertilizerRecommendation';
import WeatherForecast from './components/WeatherForecast';
import CropRecommendation from './components/CropRecommendation';
import './i18n/config';

function App() {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिंदी' },
    { code: 'mr', name: 'मराठी' }
  ];

  const tabs = [
    { id: 'home', icon: HomeIcon, label: t('home') },
    { id: 'disease', icon: Leaf, label: t('diseaseDetection') },
    { id: 'fertilizer', icon: Droplets, label: t('fertilizerRecommendation') },
    { id: 'weather', icon: Cloud, label: t('weatherForecast') },
    { id: 'crop', icon: Sprout, label: t('cropRecommendation') }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return <Home setActiveTab={setActiveTab} />;
      case 'disease': return <DiseaseDetection />;
      case 'fertilizer': return <FertilizerRecommendation />;
      case 'weather': return <WeatherForecast />;
      case 'crop': return <CropRecommendation />;
      default: return <Home setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 font-sans antialiased">
      
      {/* SIDEBAR DRAWER (Optional side menu) */}
      <div className={`fixed inset-0 z-[100] transition-all duration-300 ${isSidebarOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)} />
        <aside className={`absolute left-0 top-0 h-full w-72 bg-white shadow-2xl transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Navigation</span>
            <button onClick={() => setIsSidebarOpen(false)} className="text-slate-400 hover:text-red-500">✕</button>
          </div>
          <nav className="p-4 space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setIsSidebarOpen(false); }}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${activeTab === tab.id ? 'bg-emerald-600 text-white font-bold' : 'text-slate-600 hover:bg-emerald-50'}`}
              >
                <tab.icon size={18} />
                <span className="text-sm font-semibold">{tab.label}</span>
              </button>
            ))}
          </nav>
        </aside>
      </div>

      {/* HEADER SECTION */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-green-100">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          
          {/* Highlighted Title Section */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 hover:bg-green-50 rounded-lg text-emerald-700 transition-colors"
            >
              <Layout size={22} />
            </button>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-600 rounded-xl shadow-lg shadow-emerald-200">
                <Sprout className="text-white h-6 w-6" />
              </div>
              <div className="leading-none">
                <h1 className="text-2xl font-black tracking-tighter text-slate-900 uppercase">
                  Smart <span className="text-emerald-600">Farming</span>
                </h1>
                <p className="text-[10px] font-black text-emerald-600/60 tracking-[0.2em] uppercase">Agricultural Intelligence</p>
              </div>
            </div>
          </div>

          {/* Nav Links (Horizontal) */}
          <nav className="hidden lg:flex items-center gap-2">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                    isActive 
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-100' 
                    : 'text-slate-500 hover:text-emerald-600 hover:bg-emerald-50'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </nav>

          {/* Locale Selector */}
          <div className="flex items-center gap-3 bg-white border border-green-100 px-3 py-1.5 rounded-xl shadow-sm">
            <Globe size={16} className="text-emerald-600" />
            <select
              value={i18n.language}
              onChange={(e) => i18n.changeLanguage(e.target.value)}
              className="bg-transparent text-xs font-black text-slate-700 outline-none cursor-pointer uppercase tracking-tighter"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>{lang.name}</option>
              ))}
            </select>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT AREA - No box, original gradient background */}
      <main className="container mx-auto px-4 py-10">
        {renderContent()}
      </main>

      {/* FOOTER */}
      <footer className="container mx-auto px-4 pb-12 border-t border-green-100 pt-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
             <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
               {t('poweredBy')} | {t('forFarmers')}
             </p>
          </div>
          <div className="flex gap-6 text-[11px] font-black text-slate-400 uppercase tracking-widest">
            <span className="hover:text-emerald-600 cursor-pointer transition-colors">Digital Agriculture v2.0</span>
          </div>
        </div>
      </footer>

      <FarmerChatbot />
    </div>
  );
}

export default App;