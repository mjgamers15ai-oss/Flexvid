
import React from 'react';
import TiltCard from '../components/TiltCard';

const ServicesPage: React.FC = () => {
  const details = [
    {
      title: "Cinematic Brand Films",
      detail: "We create immersive 4K HDR narratives that define brand legacies. From high-fashion to tech innovation, our films are built to withstand time.",
      specs: ["Scripting", "Direction", "12-Bit Color", "Mastering"]
    },
    {
      title: "Performance Advertising",
      detail: "Precision-cut ads designed for the scrolling generation. We optimize for the first 3 seconds to ensure maximum hook-rate and conversion.",
      specs: ["A/B Hooks", "UGC Hybrid", "Viral-Pacing", "Dynamic CTAs"]
    },
    {
      title: "Creator Ecosystems",
      detail: "Empowering global creators with a dedicated editing desk. We manage everything from raw ingest to multi-platform horizontal and vertical exports.",
      specs: ["Retention Edits", "Storytelling", "SEO-Metadata", "Thumbnails"]
    },
    {
      title: "Visual Identity & Motion",
      detail: "Custom kinetic typography and visual effects that give your brand a unique motion signature. We don't use templates; we build assets.",
      specs: ["VFX Design", "Kinetic Typography", "Soundscapes", "Logo Animation"]
    }
  ];

  return (
    <div className="pt-40 pb-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24 reveal-item">
          <span className="text-[11px] uppercase tracking-[0.5em] text-white/30 font-bold">The Catalog</span>
          <h1 className="text-6xl md:text-[9rem] font-black tracking-tightest leading-none mt-4 uppercase font-sync glow-text">
            PRECISION <br /> SERVICES.
          </h1>
        </div>

        <div className="grid gap-12">
          {details.map((service, i) => (
            <div key={i} className="group border-t border-white/10 pt-16 pb-16 grid lg:grid-cols-2 gap-12 reveal-item">
              <div className="space-y-6">
                <span className="text-5xl font-sync font-bold text-white/10 group-hover:text-white/100 transition-colors duration-700">0{i+1}</span>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight glow-text-soft">{service.title}</h2>
                <p className="text-lg text-white/40 leading-relaxed max-w-md">
                  {service.detail}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 h-fit pt-4 lg:pt-0">
                {service.specs.map((spec, j) => (
                  <div key={j} className="bg-white/5 border border-white/5 p-6 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all">
                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/30">{spec}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-32 p-16 bg-white/[0.02] border border-white/10 rounded-[3rem] text-center reveal-item">
          <h3 className="text-3xl font-sync font-bold mb-8 glow-text-soft">THE TECH STACK</h3>
          <div className="flex flex-wrap justify-center gap-12 opacity-30">
            {['12-BIT LOG', 'SPATIAL AUDIO', '4K HDR', 'DA VINCI RESOLVE', 'PREMIERE PRO', 'AFTER EFFECTS'].map((tech) => (
              <span key={tech} className="text-[10px] uppercase tracking-[0.5em] font-black">{tech}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
