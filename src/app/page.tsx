"use client";

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Link from "next/link";
import Scene3D from '@/components/Scene3D';
import React, { useState, useEffect } from 'react';


const ModernLandingPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);

  useEffect(() => {
    setIsVisible(true);

    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % 3);
    }, 3000);

    return () => clearInterval(interval);
  }, []);


  const features = [
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 10h8M8 14h6m-2 6l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
          />
        </svg>


      ),
      title: "AI Captions",
      description: "Generate engaging captions that match your brand voice and audience"
    },
    {
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
        </svg>
      ),
      title: "Smart Hashtags",
      description: "Discover trending hashtags that boost your reach and engagement"
    },
    {
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
        </svg>
      ),
      title: "Music & Audio",
      description: "Find perfect soundtracks and audio that match your content mood"
    }
  ];

  const mailing = () => {
    window.location.href = "mailto:sarvjeetswanshi25@gmail.com";
  };


  return (
    <div className="min-h-screen relative overflow-hidden bg-background transition-colors duration-300">

      {/* Animated Background Elements */}
      {/* Animated Background Elements - Removed for simple clean UI */}
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_24px,var(--border)_25px,var(--border)_26px,transparent_27px,transparent_74px,var(--border)_75px,var(--border)_76px,transparent_77px),linear-gradient(var(--border)_1px,transparent_1px)] bg-[length:100px_100px]"></div>
      </div>


      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_24px,rgba(255,255,255,0.03)_25px,rgba(255,255,255,0.03)_26px,transparent_27px,transparent_74px,rgba(255,255,255,0.03)_75px,rgba(255,255,255,0.03)_76px,transparent_77px),linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:100px_100px]"></div>
      </div>

      {/* Hero Section */}
      <main className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-32 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-150px)]">
          {/* Left Content */}
          <div className="flex flex-col items-start text-left z-20">


            {/* Main Heading with Staggered Animation */}
            <div className="mb-6">
              <h1 className={`mt-[-90px] text-6xl md:text-7xl lg:text-7xl font-bold leading-tight transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <span className="block text-foreground mb-2">Let AI Handle</span>
              </h1>
              <h1 className={`text-6xl md:text-7xl lg:text-7xl font-bold leading-tight transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <span className="block text-primary animate-pulse">
                  The Aesthetic
                </span>
              </h1>
            </div>

            {/* Subtitle */}
            <p className={`text-xl text-muted-foreground max-w-xl mb-12 leading-relaxed transition-all duration-1000 delay-1100 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              InstaGenie&apos;s got your back. Get badass AI-powered captions, hashtags, and music to make your posts look premium.
            </p>

            {/* CTA Buttons */}
            <div className={`flex flex-col sm:flex-row gap-4 mb-8 transition-all duration-1000 delay-1300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <Link
                href="/dashboard"
                className="group relative px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-2xl hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Start for Free
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>

          {/* Right Content: 3D Model */}
          <div className={`relative w-full h-[500px] lg:h-[700px] transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <Scene3D />
          </div>
        </div>

        {/* Interactive Feature Showcase - Moved below */}
        <div className={`max-w-6xl w-full mx-auto mt-20 mb-20 transition-all duration-1000 delay-1500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="relative">
            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`group p-6 bg-card rounded-3xl border border-border transition-all duration-500 hover:scale-105 cursor-pointer ${currentFeature === index ? 'bg-muted border-primary/50 shadow-md' : 'hover:bg-muted/50'
                    }`}
                  onClick={() => setCurrentFeature(index)}
                >
                  <div className={`w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <div className="text-primary">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>

            {/* Feature Indicator */}
            <div className="flex justify-center mt-8 space-x-2">
              {features.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${currentFeature === index ? 'bg-primary' : 'bg-muted'
                    }`}
                  onClick={() => setCurrentFeature(index)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Floating Action Elements */}
        <div className="fixed bottom-8 right-8 z-50">
          <div className={`flex flex-col space-y-4 transition-all duration-1000 delay-2000 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
            <button onClick={() => mailing()} className="w-14 h-14 bg-card rounded-full flex items-center justify-center border border-border hover:bg-muted hover:scale-110 transition-all duration-300 group">
              <svg
                className="w-6 h-6 text-foreground group-hover:scale-110 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 8l9 6 9-6M4 6h16a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V7a1 1 0 011-1z"
                />
              </svg>

            </button>
          </div>
        </div>
      </main>

      {/* Particle Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
      <Navbar />
      <Footer />
    </div>
  );
};

export default ModernLandingPage;