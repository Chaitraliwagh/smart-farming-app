import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Sprout, Loader, CheckCircle, AlertCircle, TrendingUp, Beaker, CloudRain, ThermometerSun, Percent } from 'lucide-react';
import { getCropRecommendation } from '../services/api';

const CropRecommendation = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    nitrogen: '', phosphorus: '', potassium: '',
    temperature: '', humidity: '', ph: '', rainfall: ''
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requiredFields = ['nitrogen', 'phosphorus', 'potassium', 'temperature', 'humidity', 'ph', 'rainfall'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    if (missingFields.length > 0) {
      setError('Please fill in all fields');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await getCropRecommendation({
        nitrogen: parseFloat(formData.nitrogen),
        phosphorus: parseFloat(formData.phosphorus),
        potassium: parseFloat(formData.potassium),
        temperature: parseFloat(formData.temperature),
        humidity: parseFloat(formData.humidity),
        ph: parseFloat(formData.ph),
        rainfall: parseFloat(formData.rainfall)
      });
      setResult(data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to get recommendation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({ nitrogen: '', phosphorus: '', potassium: '', temperature: '', humidity: '', ph: '', rainfall: '' });
    setResult(null);
    setError(null);
  };

  const getSuitabilityColor = (score) => {
    if (score >= 80) return 'bg-emerald-600';
    if (score >= 60) return 'bg-amber-500';
    return 'bg-orange-500';
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="mb-10">
        <div className="flex items-center gap-4 mb-2">
          <div className="p-3 bg-emerald-600 rounded-2xl shadow-lg shadow-emerald-100">
            <Sprout className="h-7 w-7 text-white" />
          </div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">
            {t('cropRecommendation')}
          </h2>
        </div>
        <p className="text-slate-500 font-medium ml-16">{t('enterSoilData')}</p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Input Terminal */}
        <form onSubmit={handleSubmit} className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            
            {/* Group 1: Soil Composition */}
            <div className="p-8">
              <div className="flex items-center gap-2 mb-8 border-l-4 border-emerald-500 pl-4">
                <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">Soil Analytics (NPK)</h3>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-3">{t('soilNitrogen')} (0-140)</label>
                  <input
                    type="number" name="nitrogen" value={formData.nitrogen} onChange={handleChange}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none font-bold text-slate-600"
                    placeholder="e.g., 40"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-3">{t('soilPhosphorus')} (0-145)</label>
                  <input
                    type="number" name="phosphorus" value={formData.phosphorus} onChange={handleChange}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none font-bold text-slate-600"
                    placeholder="e.g., 45"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-3">{t('soilPotassium')} (0-205)</label>
                  <input
                    type="number" name="potassium" value={formData.potassium} onChange={handleChange}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none font-bold text-slate-600"
                    placeholder="e.g., 50"
                  />
                </div>
              </div>
            </div>

            {/* Group 2: Environment Conditions */}
            <div className="p-8 bg-slate-50/50 border-t border-slate-100">
              <div className="flex items-center gap-2 mb-8 border-l-4 border-blue-500 pl-4">
                <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">Climate Parameters</h3>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <label className="block text-xs font-black text-slate-500 mb-3 uppercase tracking-tighter">{t('avgTemperature')}</label>
                  <input
                    type="number" step="0.1" name="temperature" value={formData.temperature} onChange={handleChange}
                    className="w-full px-4 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none font-bold text-slate-600"
                    placeholder="e.g., 25"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-500 mb-3 uppercase tracking-tighter">{t('avgHumidity')}</label>
                  <input
                    type="number" name="humidity" value={formData.humidity} onChange={handleChange}
                    className="w-full px-4 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none font-bold text-slate-600"
                    placeholder="e.g., 75"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-500 mb-3 uppercase tracking-tighter">{t('soilPH')}</label>
                  <input
                    type="number" step="0.1" name="ph" value={formData.ph} onChange={handleChange}
                    className="w-full px-4 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none font-bold text-slate-600"
                    placeholder="e.g., 6.5"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-500 mb-3 uppercase tracking-tighter">{t('rainfall')}</label>
                  <input
                    type="number" step="0.1" name="rainfall" value={formData.rainfall} onChange={handleChange}
                    className="w-full px-4 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none font-bold text-slate-600"
                    placeholder="e.g., 100"
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="p-8 border-t border-slate-100 bg-white flex flex-col sm:flex-row gap-4">
              <button
                type="submit" disabled={loading}
                className="flex-[2] bg-slate-900 text-white py-5 px-8 rounded-2xl font-black text-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-slate-200 disabled:opacity-50"
              >
                {loading ? <Loader className="animate-spin" /> : <><CheckCircle size={22} /> {t('getRecommendation')}</>}
              </button>
              <button
                type="button" onClick={handleReset}
                className="flex-1 px-8 py-5 border-2 border-slate-200 text-slate-500 rounded-2xl font-black hover:bg-slate-50 transition-all uppercase tracking-widest text-xs"
              >
                {t('reset')}
              </button>
            </div>
          </div>
        </form>

        {/* Intelligence Sidebar */}
        <div className="lg:col-span-4 lg:sticky lg:top-8">
          {error && (
            <div className="bg-rose-50 border border-rose-100 rounded-3xl p-6 flex gap-4 text-rose-800 mb-6 animate-shake">
              <AlertCircle className="shrink-0 text-rose-500" />
              <p className="text-sm font-bold">{error}</p>
            </div>
          )}

          {!result && !loading && (
            <div className="bg-white border-2 border-dashed border-slate-200 rounded-[2.5rem] p-12 text-center">
              <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Beaker className="text-slate-200 h-10 w-10" />
              </div>
              <h4 className="text-slate-900 font-black mb-3 text-xl tracking-tight">System Idle</h4>
              <p className="text-slate-400 text-sm leading-relaxed font-medium">Please enter the NPK and climate data points to activate the AI analysis engine.</p>
            </div>
          )}

          {result && result.recommendations && (
            <div className="space-y-6">
              <div className="flex items-center justify-between px-2">
                <h3 className="font-black text-slate-900 uppercase tracking-tighter text-2xl">{t('recommendedCrops')}</h3>
              </div>

              {result.recommendations.map((crop, index) => (
                <div key={index} className={`bg-white rounded-[2rem] border-2 ${index === 0 ? 'border-emerald-600' : 'border-slate-100'} p-8 shadow-sm transition-all hover:shadow-xl`}>
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded mb-2 inline-block tracking-widest uppercase">
                        {t('season')} {crop.season}
                      </span>
                      <h4 className="text-3xl font-black text-slate-900 tracking-tighter leading-none">{crop.crop_name}</h4>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-black text-slate-400 uppercase block mb-1 tracking-widest">{t('suitability')}</span>
                      <div className={`inline-block px-3 py-1 text-white font-black rounded-lg text-sm ${getSuitabilityColor(crop.suitability_score)}`}>
                        {crop.suitability_score}%
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp size={16} className="text-emerald-600" />
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{t('expectedYield')}</span>
                    </div>
                    <span className="text-slate-900 font-black text-xl">{crop.expected_yield || 'N/A'}</span>
                  </div>

                  {crop.notes && (
                    <p className="text-slate-400 text-xs font-bold leading-relaxed italic border-t border-slate-50 pt-4 px-2">
                      “{crop.notes}”
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CropRecommendation;