import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Droplets, Loader, CheckCircle, AlertCircle, Beaker, Sprout, ClipboardCheck, Info } from 'lucide-react';
import { getFertilizerRecommendation } from '../services/api';

const FertilizerRecommendation = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    ph: '',
    crop_type: ''
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const crops = ['rice', 'wheat', 'corn', 'potato', 'tomato'];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.nitrogen || !formData.phosphorus || !formData.potassium || 
        !formData.ph || !formData.crop_type) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const data = await getFertilizerRecommendation({
        nitrogen: parseFloat(formData.nitrogen),
        phosphorus: parseFloat(formData.phosphorus),
        potassium: parseFloat(formData.potassium),
        ph: parseFloat(formData.ph),
        crop_type: formData.crop_type
      });
      setResult(data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to get recommendation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      nitrogen: '',
      phosphorus: '',
      potassium: '',
      ph: '',
      crop_type: ''
    });
    setResult(null);
    setError(null);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-10">
        <div className="flex items-center gap-4 mb-2">
          <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-100">
            <Droplets className="h-7 w-7 text-white" />
          </div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">
            {t('fertilizerRecommendation')}
          </h2>
        </div>
        <p className="text-slate-500 font-medium ml-16 italic">Precision Nutrient Optimization</p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Input Form Section */}
        <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
            
            {/* Soil Nutrients Section */}
            <div className="p-8">
              <div className="flex items-center gap-2 mb-8 border-l-4 border-blue-500 pl-4">
                <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
                  <Beaker size={16} /> Soil Composition
                </h3>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-black text-slate-500 mb-3 uppercase tracking-tighter">
                    {t('soilNitrogen')} (0-100)
                  </label>
                  <input
                    type="number"
                    name="nitrogen"
                    value={formData.nitrogen}
                    onChange={handleChange}
                    min="0"
                    max="100"
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none font-bold text-slate-600"
                    placeholder="e.g., 40"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-500 mb-3 uppercase tracking-tighter">
                    {t('soilPhosphorus')} (0-100)
                  </label>
                  <input
                    type="number"
                    name="phosphorus"
                    value={formData.phosphorus}
                    onChange={handleChange}
                    min="0"
                    max="100"
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none font-bold text-slate-600"
                    placeholder="e.g., 45"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-500 mb-3 uppercase tracking-tighter">
                    {t('soilPotassium')} (0-100)
                  </label>
                  <input
                    type="number"
                    name="potassium"
                    value={formData.potassium}
                    onChange={handleChange}
                    min="0"
                    max="100"
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none font-bold text-slate-600"
                    placeholder="e.g., 50"
                  />
                </div>
              </div>
            </div>

            {/* Target Crop & pH Section */}
            <div className="p-8 bg-slate-50/50 border-t border-slate-100">
              <div className="flex items-center gap-2 mb-8 border-l-4 border-emerald-500 pl-4">
                <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
                  <Sprout size={16} /> Crop Configuration
                </h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-3">{t('soilPH')} (4-9)</label>
                  <input
                    type="number"
                    name="ph"
                    value={formData.ph}
                    onChange={handleChange}
                    min="4"
                    max="9"
                    step="0.1"
                    className="w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none font-bold text-slate-600"
                    placeholder="e.g., 6.5"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-3">{t('cropType')}</label>
                  <select
                    name="crop_type"
                    value={formData.crop_type}
                    onChange={handleChange}
                    className="w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none font-bold text-slate-600 appearance-none"
                  >
                    <option value="">{t('selectCrop')}</option>
                    {crops.map((crop) => (
                      <option key={crop} value={crop}>
                        {t(crop)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="p-8 bg-white border-t border-slate-100 flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-[2] bg-slate-900 text-white py-5 px-8 rounded-2xl font-black text-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-slate-200 disabled:opacity-50"
              >
                {loading ? <Loader className="animate-spin" /> : <><CheckCircle size={22} /> {t('getRecommendation')}</>}
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="flex-1 px-8 py-5 border-2 border-slate-200 text-slate-500 rounded-2xl font-black hover:bg-slate-50 transition-all uppercase tracking-widest text-xs"
              >
                {t('reset')}
              </button>
            </div>
          </div>
        </form>

        {/* Results Sidebar Section */}
        <div className="lg:col-span-5 lg:sticky lg:top-8">
          {!result && !error && !loading && (
            <div className="bg-white border-2 border-dashed border-slate-200 rounded-[2.5rem] p-12 text-center">
              <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Droplets className="text-slate-200 h-10 w-10" />
              </div>
              <h4 className="text-slate-900 font-black mb-3 text-xl tracking-tight uppercase">System Idle</h4>
              <p className="text-slate-400 text-sm leading-relaxed font-medium">Define your soil's current NPK levels and target crop to generate a custom fertilizer roadmap.</p>
            </div>
          )}

          {error && (
            <div className="bg-rose-50 border border-rose-100 rounded-3xl p-6 flex gap-4 text-rose-800 animate-in fade-in zoom-in">
              <AlertCircle className="shrink-0 text-rose-500" />
              <p className="text-sm font-bold">{error}</p>
            </div>
          )}

          {result && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center justify-between px-2">
                <h3 className="font-black text-slate-900 uppercase tracking-tighter text-2xl">{t('fertilizerResult')}</h3>
              </div>

              <div className="bg-white rounded-[2.5rem] border-2 border-blue-500 p-8 shadow-sm ring-4 ring-blue-500/5 transition-all">
                <div className="mb-6">
                  <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-1 rounded mb-2 inline-block tracking-widest uppercase">
                    {t('recommendedFertilizer')}
                  </span>
                  <h4 className="text-3xl font-black text-slate-900 tracking-tighter leading-tight">
                    {result.fertilizer_name}
                  </h4>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {result.quantity && (
                    <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <ClipboardCheck className="text-blue-500" size={20} />
                        <span className="text-xs font-black text-slate-500 uppercase tracking-widest">{t('quantity')}</span>
                      </div>
                      <span className="text-slate-900 font-black text-lg">{result.quantity}</span>
                    </div>
                  )}

                  {result.application_method && (
                    <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                      <div className="flex items-center gap-2 mb-3 text-blue-500">
                        <Info size={16} />
                        <span className="text-xs font-black text-slate-500 uppercase tracking-widest">{t('applicationMethod')}</span>
                      </div>
                      <p className="text-slate-700 text-sm font-medium leading-relaxed italic">
                        {result.application_method}
                      </p>
                    </div>
                  )}

                  {result.notes && (
                    <div className="mt-4 pt-4 border-t border-slate-100">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Additional Notes</p>
                      <p className="text-slate-500 text-xs font-medium leading-relaxed">
                        “{result.notes}”
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FertilizerRecommendation;