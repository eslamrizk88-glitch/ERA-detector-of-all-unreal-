
import React from 'react';
import { AnalysisResult } from '../types';
import { ShieldCheck, ShieldAlert, Cpu, Activity, Fingerprint, Target, Zap, Globe, ExternalLink, Link as LinkIcon, Box } from 'lucide-react';

interface Props {
  result: AnalysisResult;
  lang: 'en' | 'ar';
}

const AnalysisReport: React.FC<Props> = ({ result, lang }) => {
  const isFake = result.confidenceScore > 50 || result.label === 'SYNTHETIC';
  
  const translations = {
    en: {
      fake: "QUANTUM DEEPFAKE DETECTED",
      real: "AUTHENTIC NEURAL PROFILE",
      suspicious: "ANOMALOUS ACTIVITY",
      verdict: "QUANTUM VERDICT",
      confidence: "Accuracy Conf.",
      reasoning: "Neural Forensic Breakdown",
      artifacts: "Atomic Artifact Log",
      source: "Engine Protocol",
      sources_title: "GLOBAL ARCHIVAL EVIDENCE"
    },
    ar: {
      fake: "تم كشف تزييف عميق (كوانتي)",
      real: "ملف عصبي أصيل",
      suspicious: "نشاط غير طبيعي",
      verdict: "الحكم الكوانتي النهائي",
      confidence: "دقة التحقق",
      reasoning: "الانهيار الجنائي العصبي",
      artifacts: "سجل الثغرات الذرية",
      source: "بروتوكول المحرك",
      sources_title: "أدلة الأرشيف العالمي"
    }
  }[lang];

  return (
    <div className="w-full space-y-12 animate-in fade-in zoom-in-95 duration-700">
      <div 
        className={`relative overflow-hidden p-16 rounded-[4rem] border-4 transition-all duration-1000 ${
          isFake ? 'alert-fake' : 'alert-real'
        }`}
      >
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <Fingerprint className="w-64 h-64" />
        </div>

        <div className="flex flex-col items-center text-center gap-8 relative z-10">
          <div className={`p-8 rounded-full bg-black/40 border-2 ${isFake ? 'border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.5)]' : 'border-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.5)]'}`}>
            {isFake ? <ShieldAlert className="w-20 h-20 text-red-500 animate-glitch" /> : <ShieldCheck className="w-20 h-20 text-emerald-500" />}
          </div>
          
          <div className="space-y-4">
            <p className="text-xs font-orbitron font-bold tracking-[0.8em] text-white/40 uppercase">{translations.verdict}</p>
            <h2 className={`text-5xl md:text-8xl font-orbitron font-black tracking-tighter uppercase leading-none ${isFake ? 'text-white' : 'text-emerald-400'}`}>
              {result.label === 'AUTHENTIC' ? translations.real : isFake ? translations.fake : translations.suspicious}
            </h2>
          </div>

          <div className="flex gap-6 mt-4">
            <div className="px-10 py-5 rounded-3xl bg-black/50 backdrop-blur-xl border border-white/10 flex items-center gap-4 shadow-2xl">
              <div className="w-3 h-3 rounded-full bg-sky-500 animate-pulse" />
              <span className="font-orbitron font-black text-3xl text-white">{result.confidenceScore}%</span>
              <span className="text-[10px] text-slate-500 uppercase tracking-[0.4em] border-l border-white/10 pl-4">{translations.confidence}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="nexus-glass rounded-[3rem] p-12 border border-white/5 flex flex-col gap-8 shadow-2xl">
          <div className="flex items-center gap-5 border-b border-white/5 pb-8">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/10 flex items-center justify-center text-sky-400 shadow-inner">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="font-orbitron font-bold text-base tracking-[0.3em] uppercase text-white">{translations.reasoning}</h3>
          </div>
          <p className="text-slate-300 text-xl leading-relaxed font-light italic opacity-90">
            "{result.reasoning}"
          </p>
        </div>

        <div className="space-y-10">
          <div className="nexus-glass rounded-[3rem] p-12 border border-white/5 flex flex-col gap-8 shadow-2xl">
            <div className="flex items-center gap-5 border-b border-white/5 pb-8">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 shadow-inner">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-orbitron font-bold text-base tracking-[0.3em] uppercase text-white">{translations.artifacts}</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[200px] overflow-y-auto custom-scrollbar">
              {result.artifactsFound.map((item, i) => (
                <div key={i} className="px-5 py-4 rounded-2xl bg-white/5 border border-white/5 text-[11px] font-mono text-slate-400 uppercase tracking-tight flex items-center gap-4 group hover:bg-white/10 transition-all">
                  <Box className={`w-4 h-4 ${isFake ? 'text-red-500' : 'text-emerald-500'}`} />
                  <span className="group-hover:text-white transition-colors">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {result.groundingSources && result.groundingSources.length > 0 && (
            <div className="nexus-glass rounded-[3rem] p-12 border border-sky-500/20 flex flex-col gap-8 bg-sky-500/5 shadow-[0_0_50px_rgba(14,165,233,0.1)]">
              <div className="flex items-center gap-5 border-b border-white/5 pb-8">
                <div className="w-12 h-12 rounded-2xl bg-sky-500/20 flex items-center justify-center text-sky-400 shadow-inner">
                  <Globe className="w-6 h-6" />
                </div>
                <h3 className="font-orbitron font-bold text-base tracking-[0.3em] uppercase text-white">{translations.sources_title}</h3>
              </div>
              <div className="flex flex-col gap-4">
                {result.groundingSources.map((source, i) => (
                  <a 
                    key={i} 
                    href={source.uri} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between p-5 rounded-2xl bg-black/40 border border-white/5 hover:border-sky-500/50 hover:bg-sky-500/20 transition-all"
                  >
                    <div className="flex items-center gap-5">
                      <div className="p-3 rounded-xl bg-sky-500/10 group-hover:bg-sky-500/30 transition-all">
                        <LinkIcon className="w-5 h-5 text-sky-400" />
                      </div>
                      <span className="text-sm text-slate-300 font-bold tracking-wide truncate max-w-[220px] group-hover:text-white">{source.title}</span>
                    </div>
                    <ExternalLink className="w-5 h-5 text-slate-500 group-hover:text-white group-hover:scale-110 transition-all" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-10 pt-10 opacity-30">
         <div className="flex items-center gap-4 text-slate-400">
            <Globe className="w-5 h-5" />
            <span className="text-[10px] font-bold uppercase tracking-[0.4em]">Node: V5.0-QUANTUM-OMEGA</span>
         </div>
         <div className="flex items-center gap-4 text-slate-400">
            <Activity className="w-5 h-5" />
            <span className="text-[10px] font-bold uppercase tracking-[0.4em]">Processing: Parallel Neural Cluster</span>
         </div>
      </div>
    </div>
  );
};

export default AnalysisReport;
