
import React from 'react';
import TiltCard from '../components/TiltCard';

const WorkPage: React.FC = () => {
  const projects = [
    { title: "Aether Motion", category: "Brand Film", year: "2024", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1600" },
    { title: "Vantage Point", category: "Commercial", year: "2023", img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1600" },
    { title: "Neon Pulse", category: "Short-Form", year: "2024", img: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=1600" },
    { title: "The Filter", category: "Documentary", year: "2024", img: "https://images.unsplash.com/photo-1492691523567-6170f0295da4?auto=format&fit=crop&q=80&w=2070" },
    { title: "Urban Zenith", category: "Brand Film", year: "2023", img: "https://images.unsplash.com/photo-1478720143907-28973b0a21d2?auto=format&fit=crop&q=80&w=1600" },
    { title: "Stellar Flow", category: "Motion", year: "2024", img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=1600" },
  ];

  return (
    <div className="pt-40 pb-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24 reveal-item">
          <span className="text-[11px] uppercase tracking-[0.5em] text-white/30 font-bold">The Archive</span>
          <h1 className="text-6xl md:text-[9rem] font-black tracking-tightest leading-none mt-4 uppercase font-sync glow-text">
            SELECTED <br /> WORKS.
          </h1>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
          {projects.map((project, i) => (
            <div key={i} className="group cursor-pointer reveal-item">
              <TiltCard>
                <div className="relative aspect-video rounded-[2.5rem] overflow-hidden bg-white/5 border border-white/10 group-hover:border-white/40 transition-all duration-700">
                  <img 
                    src={project.img} 
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000 ease-out" 
                    alt={project.title} 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity"></div>
                  
                  <div className="absolute bottom-10 left-10 space-y-2">
                    <span className="text-[9px] uppercase tracking-[0.4em] font-bold text-white/40">{project.category}</span>
                    <h3 className="text-3xl font-bold glow-text-soft">{project.title}</h3>
                  </div>
                  <div className="absolute top-10 right-10 text-[10px] font-mono tracking-widest text-white/20 group-hover:text-white/60 transition-colors">
                    /{project.year}
                  </div>
                </div>
              </TiltCard>
            </div>
          ))}
        </div>
        
        <div className="mt-40 text-center reveal-item">
          <p className="text-white/20 text-xs uppercase tracking-[0.8em] font-black">Archive Continued</p>
          <div className="w-[1px] h-20 bg-gradient-to-b from-white/20 to-transparent mx-auto mt-8"></div>
        </div>
      </div>
    </div>
  );
};

export default WorkPage;
