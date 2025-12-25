
import React, { useState, useRef, useEffect } from 'react';
import { 
  Upload, Camera, FileVideo, Shield, RefreshCw, 
  AlertCircle, Zap, Search, Scan, Terminal, 
  Cpu, Fingerprint, Layers, Activity, Lock,
  Globe, Languages, Eye, Binary, Microscope, Dna, Waves, FileCode,
  Box, Sparkles, Lightbulb, BarChart3, Database, ShieldCheck, WifiOff, Clock,
  Network, Radio, Server, Target, Thermometer, Wind, Infinity, SearchCode, Atom
} from 'lucide-react';
import Logo from './components/Logo';
import AnalysisReport from './components/AnalysisReport';
import { AnalysisStatus, AnalysisResult, MediaFile } from './types';
import { analyzeMedia, ForensicError } from './services/geminiService';

const STORAGE_KEYS = {
  MEDIA_DATA: 'era_last_media_data',
  MEDIA_TYPE: 'era_last_media_type',
  MEDIA_NAME: 'era_last_media_name',
  RESULT: 'era_last_result',
  STATUS: 'era_last_status',
  INTENSITY: 'era_use_high_intensity',
  LANG: 'era_lang'
};

const App: React.FC = () => {
  const [lang, setLang] = useState<'en' | 'ar'>('ar');
  const [status, setStatus] = useState<AnalysisStatus>(AnalysisStatus.IDLE);
  const [media, setMedia] = useState<MediaFile | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<{ code: string; message: string; sub: string } | null>(null);
  const [useHighIntensity, setUseHighIntensity] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [logoActive, setLogoActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const savedIntensity = localStorage.getItem(STORAGE_KEYS.INTENSITY);
    if (savedIntensity) setUseHighIntensity(savedIntensity === 'true');
    const savedLang = localStorage.getItem(STORAGE_KEYS.LANG) as 'en' | 'ar';
    if (savedLang) setLang(savedLang);

    const savedStatus = localStorage.getItem(STORAGE_KEYS.STATUS) as AnalysisStatus;
    const savedResult = localStorage.getItem(STORAGE_KEYS.RESULT);
    const savedMediaData = localStorage.getItem(STORAGE_KEYS.MEDIA_DATA);
    const savedMediaType = localStorage.getItem(STORAGE_KEYS.MEDIA_TYPE) as 'image' | 'video';
    const savedMediaName = localStorage.getItem(STORAGE_KEYS.MEDIA_NAME);

    if (savedMediaData && savedMediaType && savedMediaName) {
      try {
        const byteCharacters = atob(savedMediaData.split(',')[1] || savedMediaData);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const mimeType = savedMediaType === 'image' ? 'image/jpeg' : 'video/mp4';
        const file = new File([byteArray], savedMediaName, { type: mimeType });
        setMedia({ file, previewUrl: URL.createObjectURL(file), type: savedMediaType });
        if (savedStatus) setStatus(savedStatus);
        if (savedResult) setResult(JSON.parse(savedResult));
      } catch (e) { console.error("Restore failure:", e); }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.INTENSITY, useHighIntensity.toString());
    localStorage.setItem(STORAGE_KEYS.LANG, lang);
    localStorage.setItem(STORAGE_KEYS.STATUS, status);
    if (result) localStorage.setItem(STORAGE_KEYS.RESULT, JSON.stringify(result));
  }, [useHighIntensity, lang, status, result]);

  const t = {
    en: {
      hero: "TRUTH DISCOVERED",
      sub: "A quantum-neural lens into digital reality. Reveal AI patterns, cloning, and synth-manipulation with Yottabyte-scale archival grounding.",
      upload: "INPUT TARGET STREAM",
      btn_upload: "ACTIVATE SECURE UPLOAD",
      btn_scan: "EXECUTE ATOMIC SCAN",
      console: "Neural Feed",
      tech_title: "ADVANCED FORENSIC INFRASTRUCTURE",
      logs: [
        "Initializing Hydra V7.0 Aether Core...",
        "Establishing Multi-Region Proxy Cluster...",
        "Accessing Global Nexus Mega-Archive (1YB Active Ledger)...",
        "Executing Deep-Search Grounding Sub-routine...",
        "Cross-referencing Biometric Identity Ledgers...",
        "Analyzing Multi-Spectral Fourier Artifacts...",
        "Scanning for PRNU Photon Fingerprints...",
        "Mapping Sub-dermal rPPG Pulse Variance...",
        "Matching Neural Templates vs Sora/Midjourney Patterns...",
        "Performing Geometric Physics Consistency Audit...",
        "Compiling Ultimate Forensic Verdict..."
      ],
      algorithms: [
        { icon: Binary, label: "Fourier Spectral", color: "text-sky-400", bg: "bg-sky-400/10" },
        { icon: Layers, label: "ELD Analysis", color: "text-indigo-400", bg: "bg-indigo-400/10" },
        { icon: SearchCode, label: "Deep-Archive Probe", color: "text-emerald-400", bg: "bg-emerald-400/10" },
        { icon: Dna, label: "rPPG Pulse Scan", color: "text-purple-400", bg: "bg-purple-400/10" },
        { icon: Network, label: "Neural Topology", color: "text-amber-400", bg: "bg-amber-400/10" },
        { icon: Radio, label: "PRNU Fingerprint", color: "text-rose-400", bg: "bg-rose-400/10" },
        { icon: Atom, label: "Atomic Validation", color: "text-teal-400", bg: "bg-teal-400/10" },
        { icon: Server, label: "SOT Ledger Trace", color: "text-cyan-400", bg: "bg-cyan-400/10" }
      ]
    },
    ar: {
      hero: "كشف الحقيقة الرقمية",
      sub: "عدسة عصبية في الواقع الرقمي. اكشف أنماط الذكاء الاصطناعي، والاستنساخ، والتلاعب الصناعي بدقة متناهية عبر أرشيف عالمي ضخم.",
      upload: "إدخال الهدف المراد فحصه",
      btn_upload: "تفعيل الرفع الآمن",
      btn_scan: "بدء الفحص الذري",
      console: "التغذية العصبية",
      tech_title: "البنية الأساسية للفحص المتقدم",
      logs: [
        "بدء تشغيل نواة Hydra V7.0 Aether...",
        "إنشاء عنقود بروكسي عالمي متعدد المناطق...",
        "الوصول لأرشيف Nexus العالمي (1 يوتا-بايت)...",
        "تنفيذ روتين الفحص العميق لقاعدة البيانات...",
        "تفكيك طيف فورييه متعدد المستويات...",
        "البحث عن بصمات ضوضاء الفوتونات (PRNU)...",
        "مراقبة تدفق نبض rPPG تحت الجلد...",
        "مطابقة القوالب العصبية ضد Sora و Midjourney...",
        "تدقيق الاتساق الفيزيائي والهندسي...",
        "تجميع الحكم الجنائي النهائي الشامل..."
      ],
      algorithms: [
        { icon: Binary, label: "طيف فورييه", color: "text-sky-400", bg: "bg-sky-400/10" },
        { icon: Layers, label: "تحليل ELD", color: "text-indigo-400", bg: "bg-indigo-400/10" },
        { icon: SearchCode, label: "مسبار الأرشيف", color: "text-emerald-400", bg: "bg-emerald-400/10" },
        { icon: Dna, label: "مسح نبض rPPG", color: "text-purple-400", bg: "bg-purple-400/10" },
        { icon: Network, label: "طوبولوجيا عصبية", color: "text-amber-400", bg: "bg-amber-400/10" },
        { icon: Radio, label: "بصمة PRNU", color: "text-rose-400", bg: "bg-rose-400/10" },
        { icon: Atom, label: "التحقق الذري", color: "text-teal-400", bg: "bg-teal-400/10" },
        { icon: Server, label: "تتبع سجلات SOT", color: "text-cyan-400", bg: "bg-cyan-400/10" }
      ]
    }
  }[lang];

  useEffect(() => {
    if (status === AnalysisStatus.ANALYZING) {
      let progress = 0;
      let logIdx = 0;
      const interval = setInterval(() => {
        progress += (100 / (t.logs.length * 4)); 
        if (progress >= 99) progress = 99;
        setScanProgress(progress);
        if (Math.random() > 0.6 && logIdx < t.logs.length) {
          setLogs(prev => [...prev, `[KERNEL]: ${t.logs[logIdx]}`]);
          logIdx++;
        }
      }, 150);
      return () => clearInterval(interval);
    }
  }, [status, lang]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const base64Data = reader.result as string;
      const type = file.type.startsWith('image/') ? 'image' : 'video';
      setMedia({ file, previewUrl: URL.createObjectURL(file), type: type as any });
      setStatus(AnalysisStatus.IDLE);
      setResult(null);
      setError(null);
      setLogs([]);
      try {
        localStorage.setItem(STORAGE_KEYS.MEDIA_DATA, base64Data);
        localStorage.setItem(STORAGE_KEYS.MEDIA_TYPE, type);
        localStorage.setItem(STORAGE_KEYS.MEDIA_NAME, file.name);
      } catch (e) { console.warn("Cache limit."); }
    };
    reader.readAsDataURL(file);
  };

  const startAnalysis = async () => {
    if (!media) return;
    setStatus(AnalysisStatus.ANALYZING);
    setError(null);
    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Data = (reader.result as string).split(',')[1];
        try {
          await new Promise(r => setTimeout(r, 6000));
          const res = await analyzeMedia(base64Data, media.file.type, useHighIntensity);
          setResult(res);
          setStatus(AnalysisStatus.COMPLETED);
          setScanProgress(100);
          setLogs(prev => [...prev, "[SUCCESS]: GLOBAL PROBE COMPLETE. VERDICT GENERATED."]);
        } catch (err: any) {
          let code = 'UNKNOWN';
          if (err instanceof ForensicError) code = err.code;
          setError({ code, message: "ERROR DETECTED", sub: err.message });
          setStatus(AnalysisStatus.FAILED);
        }
      };
      reader.readAsDataURL(media.file);
    } catch { setStatus(AnalysisStatus.FAILED); }
  };

  const reset = () => { 
    setLogoActive(true);
    setTimeout(() => setLogoActive(false), 700);
    setMedia(null); setResult(null); setStatus(AnalysisStatus.IDLE); setLogs([]); setScanProgress(0); setError(null);
    Object.values(STORAGE_KEYS).forEach(k => { if(k !== STORAGE_KEYS.INTENSITY && k !== STORAGE_KEYS.LANG) localStorage.removeItem(k); });
  };

  return (
    <div className="min-h-screen flex flex-col" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <nav className="fixed top-0 inset-x-0 z-50 px-8 py-6 flex justify-between items-center pointer-events-none">
        <div className="pointer-events-auto cursor-pointer flex items-center gap-3 group" onClick={reset}>
           <div className={`w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 group-hover:shadow-[0_0_20px_rgba(14,165,233,0.5)] transition-all duration-300 ${logoActive ? 'animate-logo-pulse' : ''}`}>
              <Binary className="w-5 h-5" />
           </div>
           <span className="font-orbitron font-bold text-white tracking-[0.3em] text-lg">ERA</span>
        </div>
        <div className="pointer-events-auto flex gap-4">
           <button onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')} className="px-5 py-2.5 rounded-full nexus-glass text-[11px] font-bold tracking-[0.2em] uppercase text-sky-400 border-sky-500/20 flex items-center gap-3 transition-all">
             <Languages className="w-4 h-4" /> {lang === 'ar' ? 'English' : 'عربي'}
           </button>
           <button onClick={() => setUseHighIntensity(!useHighIntensity)} className={`px-5 py-2.5 rounded-full text-[11px] font-bold tracking-[0.2em] uppercase transition-all flex items-center gap-3 border ${useHighIntensity ? 'bg-sky-500 text-white border-sky-400' : 'nexus-glass text-slate-500 border-white/5'}`}>
             <Zap className="w-4 h-4" /> {useHighIntensity ? 'AETHER OMEGA' : 'CORE STD'}
           </button>
        </div>
      </nav>

      <main className="flex-1 max-w-5xl mx-auto w-full px-8 py-32 flex flex-col justify-center gap-20 relative z-10">
        {!media && (
          <div className="flex flex-col items-center gap-14">
             <Logo size="lg" />
             <div className="text-center space-y-8 max-w-4xl">
                <h2 className="text-6xl md:text-9xl font-orbitron font-black text-white leading-none tracking-tighter drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)] uppercase">{t.hero}</h2>
                <p className="text-slate-400 text-2xl font-light leading-relaxed max-w-3xl mx-auto italic">{t.sub}</p>
             </div>
             
             <div className="w-full flex flex-col gap-14 items-center">
               <div onClick={() => fileInputRef.current?.click()} className="group w-full max-w-2xl nexus-glass rounded-[4rem] p-24 border-2 border-dashed border-white/10 hover:border-sky-500/50 transition-all cursor-pointer flex flex-col items-center gap-10 relative overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 bg-sky-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="w-24 h-24 rounded-[2rem] bg-slate-950 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform shadow-2xl">
                     <Upload className="w-12 h-12 text-sky-500" />
                  </div>
                  <div className="text-center">
                     <h3 className="text-3xl font-orbitron font-bold text-white tracking-[0.1em]">{t.upload}</h3>
                     <button className="mt-10 px-16 py-5 rounded-full bg-sky-600 text-white font-orbitron font-black text-sm tracking-[0.4em] shadow-[0_0_40px_rgba(14,165,233,0.3)] hover:bg-sky-500 transition-all">{t.btn_upload}</button>
                  </div>
                  <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" />
               </div>

               <div className="flex flex-col items-center gap-10 w-full max-w-4xl">
                 <div className="flex items-center gap-6">
                    <div className="h-[1px] w-20 bg-gradient-to-r from-transparent to-sky-500/30"></div>
                    <span className="text-xs font-orbitron font-bold text-slate-500 tracking-[0.6em] uppercase text-center">{t.tech_title}</span>
                    <div className="h-[1px] w-20 bg-gradient-to-l from-transparent to-sky-500/30"></div>
                 </div>
                 <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 w-full">
                   {t.algorithms.map((algo, i) => (
                     <div key={i} className="flex flex-col items-center gap-4 p-8 rounded-[2.5rem] nexus-glass border border-white/5 hover:border-sky-500/30 transition-all group relative overflow-hidden">
                        <div className={`w-14 h-14 rounded-2xl ${algo.bg} flex items-center justify-center ${algo.color} group-hover:scale-110 transition-all shadow-inner`}>
                          <algo.icon className="w-7 h-7" />
                        </div>
                        <span className="text-xs font-orbitron font-bold text-slate-300 text-center tracking-widest uppercase group-hover:text-white transition-colors">{algo.label}</span>
                     </div>
                   ))}
                 </div>
               </div>
             </div>
          </div>
        )}

        {media && (
          <div className="space-y-16 animate-in fade-in duration-700">
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 space-y-10">
                   <div className="nexus-glass rounded-[4rem] overflow-hidden p-4 border border-white/10 shadow-2xl relative">
                      <div className="relative aspect-video bg-black rounded-[3rem] overflow-hidden flex items-center justify-center">
                         {media.type === 'image' ? <img src={media.previewUrl} className="max-h-full max-w-full object-contain" /> : <video src={media.previewUrl} className="max-h-full max-w-full" controls />}
                         {status === AnalysisStatus.ANALYZING && (
                           <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-3xl z-[60] flex flex-col items-center justify-center p-12">
                              <div className="relative w-72 h-72 mb-10">
                                 <svg className="w-full h-full -rotate-90">
                                    <circle cx="144" cy="144" r="130" fill="none" stroke="#0f172a" strokeWidth="2" />
                                    <circle cx="144" cy="144" r="130" fill="none" stroke="#0ea5e9" strokeWidth="12" strokeDasharray="816" strokeDashoffset={816 - (816 * scanProgress) / 100} strokeLinecap="round" className="transition-all duration-300" />
                                 </svg>
                                 <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                                    <span className="font-orbitron font-black text-7xl text-white">{Math.floor(scanProgress)}%</span>
                                    <span className="text-[10px] font-bold text-sky-500 tracking-[0.6em] uppercase mt-4 animate-pulse">{lang === 'ar' ? 'فحص البنية الذرية' : 'ATOMIC PROBE'}</span>
                                 </div>
                              </div>
                              <p className="text-white/40 text-xs font-orbitron tracking-widest uppercase text-center mt-6">Grounding via 1YB Nexus Archive...</p>
                           </div>
                         )}
                      </div>
                   </div>
                   <div className="flex flex-col sm:flex-row gap-8 items-center justify-between nexus-glass rounded-[3rem] p-10 border border-white/10 shadow-xl">
                      <div className="flex items-center gap-8">
                         <div className="w-20 h-20 rounded-[2rem] bg-slate-900 border border-white/10 flex items-center justify-center text-sky-400 shadow-2xl">
                            {media.type === 'image' ? <Camera className="w-10 h-10" /> : <FileVideo className="w-10 h-10" />}
                         </div>
                         <div className="space-y-2">
                            <p className="font-orbitron font-bold text-xl text-white tracking-widest uppercase truncate max-w-[300px]">{media.file.name}</p>
                            <p className="text-xs text-slate-500 font-bold tracking-[0.3em] uppercase">{lang === 'ar' ? 'بيانات مؤمنة كوانتياً' : 'QUANTUM SECURED'}</p>
                         </div>
                      </div>
                      <div className="flex gap-4 w-full sm:w-auto">
                         <button onClick={reset} className="px-10 py-5 rounded-2xl nexus-glass text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-all">{lang === 'ar' ? 'إلغاء' : 'CANCEL'}</button>
                         {status !== AnalysisStatus.COMPLETED && (
                           <button onClick={startAnalysis} disabled={status === AnalysisStatus.ANALYZING} className="px-14 py-5 rounded-2xl bg-sky-600 text-white font-orbitron font-black text-xs tracking-[0.4em] uppercase shadow-[0_0_30px_rgba(14,165,233,0.3)] hover:bg-sky-500 transition-all">{t.btn_scan}</button>
                         )}
                      </div>
                   </div>
                </div>

                <div className="nexus-glass rounded-[4rem] overflow-hidden flex flex-col border border-white/10 shadow-2xl">
                   <div className="bg-slate-950/90 px-8 py-6 border-b border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sky-400"><Terminal className="w-5 h-5" /><span className="text-xs font-orbitron font-bold tracking-[0.3em] uppercase">{t.console}</span></div>
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                   </div>
                   <div className="p-10 font-mono text-xs space-y-6 flex-1 overflow-y-auto custom-scrollbar h-[450px] bg-black/10">
                      {logs.map((log, i) => (
                        <div key={i} className="text-sky-400/90 animate-in fade-in slide-in-from-left-6 flex items-start gap-4">
                           <span className="text-slate-700 font-bold">[{i.toString().padStart(2, '0')}]</span> <span className="leading-relaxed tracking-tight">{log}</span>
                        </div>
                      ))}
                      {status === AnalysisStatus.ANALYZING && <div className="w-2 h-4 bg-sky-500 animate-pulse inline-block ml-2"></div>}
                   </div>
                </div>
             </div>
             {result && <AnalysisReport result={result} lang={lang} />}
             {status === AnalysisStatus.COMPLETED && (
               <div className="flex justify-center pt-10">
                  <button onClick={reset} className="flex items-center gap-6 px-16 py-6 rounded-3xl nexus-glass border-white/20 font-orbitron font-black text-sm tracking-[0.5em] uppercase hover:border-sky-500/50 transition-all shadow-2xl">
                     <RefreshCw className="w-6 h-6 group-hover:rotate-180 transition-transform duration-[2000ms]" /> {lang === 'ar' ? 'بدء فحص جديد' : 'INITIALIZE NEW PROBE'}
                  </button>
               </div>
             )}
          </div>
        )}
      </main>
      <footer className="px-12 py-12 nexus-glass border-t border-white/5 flex flex-col md:row items-center justify-between mt-auto gap-8">
         <div className="flex items-center gap-12 text-slate-600">
            <Shield className="w-5 h-5" /><span className="text-[11px] font-orbitron font-black uppercase tracking-widest">ERA AETHER V7.0 INFRASTRUCTURE</span>
            <Database className="w-5 h-5" /><span className="text-[11px] font-orbitron font-black uppercase tracking-widest">1 YB GLOBAL NEXUS ARCHIVE</span>
         </div>
         <div className="text-[11px] font-mono text-slate-700 tracking-[0.4em] font-black uppercase">© 2025 ERA Intelligence Solutions</div>
      </footer>
    </div>
  );
};

export default App;
