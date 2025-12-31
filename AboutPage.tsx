
import React from 'react';

const AboutPage: React.FC = () => {
  const vitals = [
    { label: "Views Generated", value: "500M+" },
    { label: "Global Partners", value: "40+" },
    { label: "Awards Won", value: "12" },
    { label: "Revision Rate", value: "0.1%" }
  ];

  return (
    <div className="pt-48 pb-40 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-32 items-end mb-48">
          <div className="reveal-item">
            <span className="text-[11px] uppercase tracking-[0.8em] text-white/20 font-black block mb-6">The Studio Manifesto</span>
            <h1 className="text-7xl md:text-[9rem] font-black tracking-tightest leading-[0.85] uppercase font-sync glow-text">
              THE <br /> <span className="text-white/40">FILTER.</span>
            </h1>
          </div>
          <div className="reveal-item">
            <p className="text-2xl md:text-3xl font-light leading-relaxed text-white/50 max-w-xl">
              FLEXVID is a boutique creative house dedicated to the elimination of generic noise. We partner with visionaries who demand precision, narrative depth, and absolute technical purity.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-16 mb-48 reveal-item">
          {vitals.map((vital, i) => (
            <div key={i} className="space-y-6 border-t border-white/5 pt-10">
              <h2 className="text-5xl md:text-6xl font-sync font-bold glow-text-intense">{vital.value}</h2>
              <p className="text-[10px] uppercase tracking-[0.6em] text-white/20 font-black">{vital.label}</p>
            </div>
          ))}
        </div>

        <div className="reveal-item relative overflow-hidden rounded-[4rem] aspect-[21/9] bg-white/[0.02] border border-white/10 flex items-center justify-center p-16 group">
          <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-1000">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(255,255,255,0.1)_0%,_transparent_70%)]"></div>
          </div>
          <div className="text-center relative z-10 max-w-3xl">
            <h3 className="text-3xl md:text-5xl font-sync font-bold mb-8 glow-text-soft">WE DO NOT EDIT. WE SCULPT.</h3>
            <p className="text-white/30 uppercase tracking-[0.3em] text-[12px] leading-[2.2] font-medium">
              Every frame is a calculation. Every cut is a pulse. Our methodology is rooted in the psychological impact of pacing and visual geometry. We are the architects of your digital legacy.
            </p>
          </div>
        </div>

        <div className="mt-48 grid md:grid-cols-3 gap-24 reveal-item">
          <div className="space-y-8">
            <div className="w-12 h-[1px] bg-white/20"></div>
            <h4 className="text-[11px] uppercase tracking-[0.6em] font-black text-white/20">Studio Philosophy</h4>
            <p className="text-sm text-white/40 leading-relaxed font-light italic">"We believe in quality over quantity. That is why we only accept three exclusive partnerships per quarter."</p>
          </div>
          <div className="space-y-8">
            <div className="w-12 h-[1px] bg-white/20"></div>
            <h4 className="text-[11px] uppercase tracking-[0.6em] font-black text-white/20">Technical Purity</h4>
            <p className="text-sm text-white/40 leading-relaxed font-light">No templates. No presets. Every grade and sound profile is tailored to the project's unique digital frequency.</p>
          </div>
          <div className="space-y-8">
            <div className="w-12 h-[1px] bg-white/20"></div>
            <h4 className="text-[11px] uppercase tracking-[0.6em] font-black text-white/20">Global Reach</h4>
            <p className="text-sm text-white/40 leading-relaxed font-light">Operating from New York, London, and Tokyo. We serve the world's most elite creative minds across all timezones.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
