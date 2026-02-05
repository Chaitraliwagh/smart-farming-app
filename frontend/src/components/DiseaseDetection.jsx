import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Upload, Loader, CheckCircle, AlertCircle, Camera, X, RefreshCw, Image as ImageIcon, ScanSearch } from 'lucide-react';
import { detectDisease } from '../services/api';

const DiseaseDetection = () => {
  const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // Camera States
  const [showCamera, setShowCamera] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const startCamera = async () => {
    setShowCamera(true);
    setResult(null);
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "environment" } 
      });
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch (err) {
      setError("Camera access denied. Please check permissions.");
      setShowCamera(false);
    }
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (video && canvas) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0);
      canvas.toBlob((blob) => {
        const file = new File([blob], "capture.jpg", { type: "image/jpeg" });
        setSelectedImage(file);
        setPreviewUrl(URL.createObjectURL(file));
        stopCamera();
      }, 'image/jpeg');
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
    }
    setShowCamera(false);
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResult(null);
      setError(null);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage) {
      setError('Please select or capture an image first');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await detectDisease(selectedImage);
      setResult(data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to analyze image.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
    setResult(null);
    setError(null);
    stopCamera();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-emerald-600 rounded-lg shadow-lg shadow-emerald-200">
              <Camera className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              {t('diseaseDetection')}
            </h2>
          </div>
          <p className="text-slate-500 font-medium ml-12 italic">AI-Powered Pathogen Analysis</p>
        </div>
      </div>

      {/* Camera Overlay */}
      {showCamera && (
        <div className="fixed inset-0 z-[60] bg-slate-900/95 backdrop-blur-sm flex flex-col items-center justify-center p-4">
          <div className="relative w-full max-w-2xl bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/10">
            <video ref={videoRef} autoPlay playsInline className="w-full h-auto" />
            <div className="absolute bottom-8 left-0 right-0 flex justify-center items-center gap-10">
              <button onClick={stopCamera} className="p-4 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-all">
                <X size={28} />
              </button>
              <button onClick={capturePhoto} className="p-8 bg-emerald-500 text-white rounded-full border-4 border-white shadow-xl hover:scale-105 active:scale-95 transition-all">
                <Camera size={36} />
              </button>
            </div>
          </div>
          <p className="text-white/60 mt-6 font-medium tracking-wide uppercase text-xs">Align plant leaf within frame</p>
        </div>
      )}

      <canvas ref={canvasRef} className="hidden" />

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Left Section: Capture/Upload */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Gallery Card */}
                <label className="group cursor-pointer">
                  <div className="h-full border-2 border-dashed border-slate-200 rounded-3xl p-8 text-center hover:border-emerald-500 hover:bg-emerald-50/30 transition-all flex flex-col items-center justify-center gap-4">
                    <div className="p-4 bg-slate-50 rounded-2xl group-hover:bg-emerald-100 transition-colors">
                      <Upload className="h-8 w-8 text-slate-400 group-hover:text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-slate-900 font-bold">{t('selectImage')}</p>
                      <p className="text-slate-400 text-xs mt-1 font-medium italic">Upload from gallery</p>
                    </div>
                  </div>
                  <input type="file" accept="image/*" onChange={handleImageSelect} className="hidden" />
                </label>

                {/* Live Camera Card */}
                <button onClick={startCamera} className="group h-full border-2 border-dashed border-slate-200 rounded-3xl p-8 text-center hover:border-emerald-500 hover:bg-emerald-50/30 transition-all flex flex-col items-center justify-center gap-4">
                  <div className="p-4 bg-slate-50 rounded-2xl group-hover:bg-emerald-100 transition-colors">
                    <Camera className="h-8 w-8 text-slate-400 group-hover:text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-slate-900 font-bold">Open Live Camera</p>
                    <p className="text-slate-400 text-xs mt-1 font-medium italic">Capture direct photo</p>
                  </div>
                </button>
              </div>

              {/* Preview Display */}
              {previewUrl && (
                <div className="mt-8 relative group">
                  <div className="rounded-[2rem] overflow-hidden border-4 border-slate-50 shadow-inner bg-slate-100">
                    <img src={previewUrl} alt="Preview" className="w-full max-h-[400px] object-contain mx-auto" />
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-[10px] font-black text-slate-900 shadow-sm border border-slate-100">
                    READY FOR ANALYSIS
                  </div>
                </div>
              )}
            </div>

            {/* Action Footer */}
            <div className="p-8 bg-slate-50 border-t border-slate-100 flex gap-4">
              <button
                onClick={handleAnalyze}
                disabled={!selectedImage || loading}
                className="flex-[2] bg-slate-900 text-white py-5 px-8 rounded-2xl font-black text-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-3 shadow-xl shadow-slate-200 disabled:opacity-50"
              >
                {loading ? <Loader className="animate-spin" size={24} /> : <><ScanSearch size={24} /> {t('analyze')}</>}
              </button>
              
              <button
                onClick={handleReset}
                className="flex-1 px-8 py-5 border-2 border-slate-200 text-slate-500 rounded-2xl font-black hover:bg-white hover:border-rose-200 hover:text-rose-500 transition-all uppercase tracking-widest text-xs"
              >
                {t('reset')}
              </button>
            </div>
          </div>
        </div>

        {/* Right Section: Intelligence Results */}
        <div className="lg:col-span-5 lg:sticky lg:top-8">
          {!result && !error && !loading && (
            <div className="bg-white border-2 border-dashed border-slate-200 rounded-[2.5rem] p-12 text-center">
              <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <ImageIcon className="text-slate-200 h-10 w-10" />
              </div>
              <h4 className="text-slate-900 font-black mb-3 text-xl tracking-tight uppercase">System Idle</h4>
              <p className="text-slate-400 text-sm leading-relaxed font-medium">Capture or upload an image of the plant leaf to initiate visual pathogen diagnosis.</p>
            </div>
          )}

          {error && (
            <div className="bg-rose-50 border border-rose-100 rounded-3xl p-6 flex gap-4 text-rose-800 animate-in fade-in zoom-in">
              <AlertCircle className="shrink-0 text-rose-500" />
              <p className="text-sm font-bold">{error}</p>
            </div>
          )}

          {result && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-center justify-between px-2">
                <h3 className="font-black text-slate-900 uppercase tracking-tighter text-2xl">{t('diseaseResult')}</h3>
                <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md tracking-widest">DIAGNOSIS COMPLETE</span>
              </div>

              <div className={`bg-white rounded-[2rem] border-2 ${result.is_healthy ? 'border-emerald-500 ring-4 ring-emerald-500/5' : 'border-rose-500 ring-4 ring-rose-500/5'} p-8 shadow-sm transition-all`}>
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-3 rounded-2xl ${result.is_healthy ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                    <CheckCircle size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Status</p>
                    <p className={`text-xl font-black ${result.is_healthy ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {result.is_healthy ? t('healthyPlant') : t('disease')}
                    </p>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Identification</p>
                  <p className="text-2xl font-black text-slate-900 tracking-tight leading-tight">{result.disease_name}</p>
                </div>

                {result.treatment && (
                  <div className="mt-6 pt-6 border-t border-slate-100">
                    <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                      <RefreshCw size={12} /> {t('treatment')}
                    </p>
                    <div className="bg-emerald-50/50 p-5 rounded-2xl border border-emerald-100/50">
                      <p className="text-slate-700 text-sm font-medium leading-relaxed italic">
                        “{result.treatment}”
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiseaseDetection;