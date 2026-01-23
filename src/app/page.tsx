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
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
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

  return (
    <div className="dark min-h-screen relative overflow-hidden bg-black">

      {/* Animated Background Elements */}
      {/* Purple Glow Accents */}
<div className="absolute inset-0 pointer-events-none">
  {/* Top-left glow */}
  <div className="absolute -top-48 -left-48 w-[700px] h-[700px] bg-purple-700/30 rounded-full blur-[180px]" />

  {/* Right-side glow */}
  <div className="absolute top-1/4 right-[-300px] w-[900px] h-[900px] bg-indigo-600/25 rounded-full blur-[220px]" />

  {/* Bottom glow */}
  <div className="absolute bottom-[-350px] left-1/3 w-[900px] h-[900px] bg-fuchsia-700/20 rounded-full blur-[260px]" />
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
                <span className="block text-white mb-2">Let AI Handle</span>
              </h1>
              <h1 className={`text-6xl md:text-7xl lg:text-7xl font-bold leading-tight transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <span className="block bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
                  The Aesthetic
                </span>
              </h1>
            </div>

            {/* Subtitle */}
            <p className={`text-xl text-white/80 max-w-xl mb-12 leading-relaxed transition-all duration-1000 delay-1100 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              InstaGenie&apos;s got your back. Get badass AI-powered captions, hashtags, and music to make your posts look premium.
            </p>

            {/* CTA Buttons */}
            <div className={`flex flex-col sm:flex-row gap-4 mb-8 transition-all duration-1000 delay-1300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <Link
                href="/dashboard"
                className="group relative px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-2xl hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-indigo-500/25 hover:scale-105 transform"
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
                  className={`group p-6 bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 transition-all duration-500 hover:scale-105 cursor-pointer ${currentFeature === index ? 'bg-white/15 border-purple-400/50 shadow-lg shadow-purple-500/25' : 'hover:bg-white/10'
                    }`}
                  onClick={() => setCurrentFeature(index)}
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${index === 0 ? 'from-indigo-500 to-purple-500' :
                    index === 1 ? 'from-purple-500 to-pink-500' :
                      'from-pink-500 to-rose-500'
                    } rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-white/70">{feature.description}</p>
                </div>
              ))}
            </div>

            {/* Feature Indicator */}
            <div className="flex justify-center mt-8 space-x-2">
              {features.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${currentFeature === index ? 'bg-purple-400' : 'bg-white/30'
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
            <button className="w-14 h-14 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 group">
              <svg className="w-6 h-6 text-white group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </button>
            <button className="w-14 h-14 bg-white/10 backdrop-blur-lg rounded-full flex items-center justify-center border border-white/20 hover:bg-white/20 hover:scale-110 transition-all duration-300 group">
              <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
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
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
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