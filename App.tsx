import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Problem from "./components/Problem";
import Transformation from "./components/Transformation";
import Work from "./components/Work";
import Services from "./components/Services";
import Testimonials from "./components/Testimonials";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import Loader from './components/Loader';

// Pages
import ServicesPage from './pages/ServicesPage';
import WorkPage from './pages/WorkPage';
import AboutPage from './pages/AboutPage';

gsap.registerPlugin(ScrollTrigger);

export type ViewType = 'home' | 'services' | 'work' | 'about';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const mainRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const transitionOverlayRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Scroll & Motion System
  useEffect(() => {
    // 1. Initialize Lenis with optimized settings for "Apple-like" feel
    const lenis = new Lenis({
      duration: 1.2, // Slightly shorter for more responsive feel
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1, // Standardized for consistency
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    // 2. synchronize Lenis with ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // 3. Integrate with GSAP Ticker for single source of truth (60fps lock)
    // using lagSmoothing(0) ensures animations don't jump when main thread is heavy
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // 4. Velocity-based Skew/Scale Effect (Optimized)
    // We use gsap.set/quickTo inside the ticker to avoid garbage collection overhead of creating new Tweens every frame
    const updateVelocityEffects = () => {
      if (!contentRef.current || isTransitioning) return;
      
      const velocity = lenis.velocity;
      const absVelocity = Math.abs(velocity);
      
      // Gentle clamping to prevent visual breakage
      const normalizedVelocity = Math.min(absVelocity / 4000, 1);
      
      const blurVal = normalizedVelocity * 5; // Reduced max blur for clarity
      const scaleVal = 1 - (normalizedVelocity * 0.015); // Subtle breathing
      const skewVal = velocity / 250; // Gentle skew

      // Direct style manipulation or gsap.set is faster than .to() for per-frame updates
      gsap.set(contentRef.current, {
        filter: `blur(${blurVal}px)`,
        scale: scaleVal,
        skewY: `${Math.min(Math.max(skewVal, -1.5), 1.5)}deg`, // Hard clamp skew
        force3D: true // Ensure GPU layer
      });
    };

    gsap.ticker.add(updateVelocityEffects);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(updateVelocityEffects);
    };
  }, [isTransitioning]);

  useLayoutEffect(() => {
    if (loading) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.refresh();
      
      // Reset scroll to top on view change
      if (lenisRef.current) lenisRef.current.scrollTo(0, { immediate: true });

      // -- CINEMATIC SCROLL PHYSICS --
      // Targets all key structural elements across the app (excluding Hero)
      // Creates a "soft falling" effect where elements settle into place
      
      const isMobile = window.innerWidth < 768;
      
      // Select sections and footer, but exclude #home (Hero) as it has its own intro
      const sections = document.querySelectorAll('section:not(#home), footer');

      sections.forEach((section) => {
        // Broadly select UI elements within these sections
        // We use :where() specificity to not override critical internal styles, 
        // but GSAP inline styles usually take precedence anyway.
        const targets = section.querySelectorAll('h1, h2, h3, h4, p, span.reveal-text, .reveal-item, button, img, .side-testimonial, .process-card-content');
        
        // Deduplicate elements
        const uniqueTargets = Array.from(new Set(targets));

        uniqueTargets.forEach((el) => {
           // Skip elements that might be visually sensitive to overrides (like the comparison slider internals)
           if (el.closest('.no-scroll-anim')) return;

           gsap.fromTo(el, 
             { 
               y: isMobile ? -30 : -60, // Negative Y = "Falling" from above
               opacity: 0,
               filter: isMobile ? 'blur(0px)' : 'blur(10px)', // Motion blur
               willChange: 'transform, opacity, filter'
             },
             { 
               y: 0,
               opacity: 1,
               filter: 'blur(0px)',
               ease: 'power2.out', // Smooth settling curve
               scrollTrigger: {
                 trigger: el,
                 start: "top 95%", // Start animating just as it enters viewport
                 end: "center 55%", // Finish just after it crosses center
                 scrub: 1.5, // Fluid, reversible playback linked to scroll
               }
             }
           );
        });
      });

    }, mainRef);

    return () => ctx.revert();
  }, [loading, currentView]);

  const handleNavigate = (view: ViewType) => {
    if (view === currentView || isTransitioning) return;
    setIsTransitioning(true);

    // Reset styles before transition to prevent stuck skew
    if (contentRef.current) {
        gsap.set(contentRef.current, { clearProps: "all" });
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setIsTransitioning(false);
        ScrollTrigger.refresh();
        // Ensure we are at top
        lenisRef.current?.scrollTo(0, { immediate: true });
      }
    });

    // 1. Phase 1: Outgoing Depth & Overlay Sweep
    tl.to(mainRef.current, {
      opacity: 0.3,
      y: -60,
      scale: 0.94,
      filter: 'blur(30px)',
      duration: 0.8,
      ease: "expo.inOut"
    })
    .fromTo(transitionOverlayRef.current,
      { yPercent: 100 },
      { 
        yPercent: 0, 
        duration: 0.9, 
        ease: "expo.inOut",
        display: 'block'
      },
      "-=0.7"
    )
    
    // 2. Phase 2: State Change & Reset
    .add(() => {
      setCurrentView(view);
      window.scrollTo(0, 0);
    })

    // 3. Phase 3: Reveal Content & Clear Overlay
    .to(transitionOverlayRef.current, {
      yPercent: -100,
      duration: 0.9,
      ease: "expo.inOut"
    })
    .fromTo(mainRef.current, 
      { 
        opacity: 0, 
        y: 100, 
        scale: 1.05, 
        filter: 'blur(40px)' 
      },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        filter: 'blur(0px)', 
        duration: 1.2, 
        ease: "expo.out",
        clearProps: "all"
      },
      "-=0.6"
    )
    .set(transitionOverlayRef.current, { display: 'none', yPercent: 100 });
  };

  const renderViewContent = () => {
    switch(currentView) {
      case 'services': return <ServicesPage />;
      case 'work': return <WorkPage />;
      case 'about': return <AboutPage />;
      default: return (
        <>
          <Hero />
          <Problem />
          <Transformation />
          <Services />
          <Work />
          <Testimonials />
          <FinalCTA />
        </>
      );
    }
  };

  return (
    <div className="relative bg-black text-white selection:bg-white/20">
      <Loader onComplete={() => setLoading(false)} />
      <CustomCursor />
      
      {/* Premium Cinematic Transition Overlay */}
      <div 
        ref={transitionOverlayRef}
        className="fixed inset-0 z-[100] bg-black hidden pointer-events-none transform-gpu"
        style={{ willChange: 'transform' }}
      >
        {/* Leading Glint Edge */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/40 to-transparent shadow-[0_0_30px_rgba(255,255,255,0.3)]"></div>
        {/* Depth Blur Layer */}
        <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-3xl"></div>
        {/* Center Logo Glint */}
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 border border-white/10 rotate-45 flex items-center justify-center">
                <div className="w-2 h-2 bg-white rotate-45 animate-pulse"></div>
            </div>
        </div>
      </div>

      <Navbar onNavigate={handleNavigate} currentView={currentView} />
      
      <main 
        ref={mainRef}
        className={`relative z-10 w-full transform-gpu ${loading ? 'opacity-0' : 'opacity-100'}`}
        style={{ willChange: 'transform, opacity, filter' }}
      >
        <div ref={contentRef} className="w-full">
          {renderViewContent()}
        </div>
      </main>
      
      <Footer onNavigate={handleNavigate} />
    </div>
  );
};

export default App;
