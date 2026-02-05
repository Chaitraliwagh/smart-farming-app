import React from 'react';
import { useTranslation } from 'react-i18next';
import { Leaf, Droplets, Cloud, Sprout, ArrowRight, ShieldCheck, Globe, Zap, Users, BarChart3, ChevronRight } from 'lucide-react';

const Home = ({ setActiveTab }) => {
  const { t } = useTranslation();

  const features = [
    {
      id: 'disease',
      icon: Leaf,
      title: t('diseaseDetection'),
      description: 'Upload leaf images to detect diseases and get treatment recommendations',
      color: 'bg-emerald-500',
      shadow: 'shadow-emerald-100',
      tag: 'AI Vision'
    },
    {
      id: 'fertilizer',
      icon: Droplets,
      title: t('fertilizerRecommendation'),
      description: 'Get smart fertilizer recommendations based on soil analysis',
      color: 'bg-blue-500',
      shadow: 'shadow-blue-100',
      tag: 'Soil Lab'
    },
    {
      id: 'weather',
      icon: Cloud,
      title: t('weatherForecast'),
      description: 'View real-time weather updates and 5-day forecasts',
      color: 'bg-sky-500',
      shadow: 'shadow-sky-100',
      tag: 'Meteorology'
    },
    {
      id: 'crop',
      icon: Sprout,
      title: t('cropRecommendation'),
      description: 'Get AI-powered crop recommendations for optimal yields',
      color: 'bg-amber-500',
      shadow: 'shadow-amber-100',
      tag: 'Yield Engine'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 pb-20">
      
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-[3rem] bg-slate-900 mt-6 mb-16 shadow-2xl">
        <div className="absolute inset-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&h=600&fit=crop" 
            alt="Farming" 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="400"%3E%3Crect fill="%2310b981" width="800" height="400"/%3E%3Ctext fill="%23fff" font-size="40" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3ESmart Farming%3C/text%3E%3C/svg%3E';
            }}
          />
        </div>
        <div className="relative z-10 px-8 py-20 md:px-16 md:py-32 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 px-4 py-2 rounded-full mb-6">
            <Zap size={16} className="text-emerald-400" />
            <span className="text-xs font-black text-emerald-100 uppercase tracking-widest">Next-Gen Agriculture</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter leading-none">
            {t('welcomeTitle')}
          </h2>
          <p className="text-xl text-slate-300 font-medium leading-relaxed mb-10">
            {t('welcomeSubtitle')}
          </p>
          <button 
            onClick={() => setActiveTab('crop')}
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-900 px-8 py-4 rounded-2xl font-black text-lg transition-all flex items-center gap-3 shadow-xl shadow-emerald-500/20"
          >
            Start Analysis <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Trust Bar / Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
        {[
          { label: 'Accuracy', val: '95%', icon: ShieldCheck },
          { label: 'Diseases', val: '50+', icon: BarChart3 },
          { label: 'Crops', val: '30+', icon: Sprout },
          { label: 'Languages', val: '3', icon: Globe }
        ].map((stat, i) => (
          <div key={i} className="bg-white border border-slate-100 rounded-[2rem] p-8 text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="inline-flex p-3 bg-slate-50 rounded-2xl text-emerald-600 mb-4">
              <stat.icon size={24} />
            </div>
            <div className="text-4xl font-black text-slate-900 tracking-tighter mb-1">{stat.val}</div>
            <div className="text-xs font-black text-slate-400 uppercase tracking-widest">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Features Grid Section */}
      <div className="mb-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 px-2">
          <div className="max-w-xl">
            <h3 className="text-sm font-black text-emerald-600 uppercase tracking-[0.3em] mb-3">Core Engine</h3>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight leading-none">Intelligence Solutions</h2>
          </div>
          <p className="text-slate-500 font-medium mt-4 md:mt-0 italic">Select a module to begin diagnosis</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                onClick={() => setActiveTab(feature.id)}
                className="group relative bg-white rounded-[2.5rem] border border-slate-200 p-8 hover:border-slate-900 transition-all cursor-pointer overflow-hidden"
              >
                <div className="flex items-start justify-between relative z-10">
                  <div className="flex flex-col h-full">
                    <div className="mb-6 flex items-center gap-3">
                      <div className={`p-4 rounded-2xl text-white ${feature.color} shadow-2xl ${feature.shadow}`}>
                        <Icon size={32} />
                      </div>
                      <span className="text-[10px] font-black text-slate-400 bg-slate-50 px-2 py-1 rounded uppercase tracking-widest">{feature.tag}</span>
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-slate-500 font-medium leading-relaxed mb-8 max-w-sm">
                      {feature.description}
                    </p>
                    <div className="mt-auto flex items-center text-slate-900 font-black text-xs uppercase tracking-widest">
                      {t('getStarted')}
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                  <div className="hidden md:block opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
                    <Icon size={180} strokeWidth={1} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Website Content: Professional Info Sections */}
      <div className="grid md:grid-cols-2 gap-16 items-center border-t border-slate-100 pt-24 mb-24">
        <div>
          <h3 className="text-sm font-black text-emerald-600 uppercase tracking-[0.3em] mb-4">The Methodology</h3>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-6">Scientific precision meet intuitive design.</h2>
          <p className="text-slate-500 font-medium text-lg leading-relaxed mb-8">
            Our platform leverages deep learning models trained on millions of agricultural data points. 
            By combining real-time meteorological data with localized soil composition, we provide 
            recommendations that are both scientifically backed and locally relevant.
          </p>
          <div className="space-y-4">
            {[
              { t: 'Secure Data Handling', d: 'Your farm data is encrypted and private.' },
              { t: 'Offline Compatibility', d: 'Basic features accessible in low-network areas.' },
              { t: 'Expert Verified', d: 'Models validated by agricultural scientists.' }
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="mt-1"><ShieldCheck size={20} className="text-emerald-500" /></div>
                <div>
                  <h4 className="font-black text-slate-900 uppercase tracking-tighter text-sm">{item.t}</h4>
                  <p className="text-slate-400 text-sm font-medium">{item.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="h-64 bg-slate-100 rounded-[2rem] overflow-hidden">
               <img src="https://images.unsplash.com/photo-1592982537447-6f2a6a0c3023?w=400&h=600&fit=crop" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="Tech" />
            </div>
            <div className="h-40 bg-emerald-500 rounded-[2rem] p-8 flex items-end">
              <Users size={40} className="text-white opacity-40" />
            </div>
          </div>
          <div className="space-y-4 pt-12">
            <div className="h-40 bg-slate-900 rounded-[2rem] p-8 flex items-end">
               <Globe size={40} className="text-white opacity-40" />
            </div>
            <div className="h-64 bg-slate-100 rounded-[2rem] overflow-hidden">
               <img src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=400&h=600&fit=crop" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="Plant" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-emerald-600 rounded-[3rem] p-12 text-center text-white shadow-2xl shadow-emerald-200">
        <h2 className="text-4xl font-black tracking-tight mb-4">Ready to optimize your harvest?</h2>
        <p className="text-emerald-100 font-medium mb-8 max-w-2xl mx-auto italic">
          Join thousands of farmers using Smart Farming to increase their efficiency and ensure sustainable food production.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button onClick={() => setActiveTab('crop')} className="bg-white text-emerald-600 px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-slate-50 transition-colors">
            Get Recommendation
          </button>
          <button className="bg-emerald-700 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs border border-emerald-500">
            View Documentation
          </button>
        </div>
      </div>

    </div>
  );
};

export default Home;