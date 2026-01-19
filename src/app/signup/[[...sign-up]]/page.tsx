"use client";

import { SignUp } from "@clerk/nextjs";
import { UserPlus, Rocket, Shield, Crown, Heart, Gem, Sparkles, Star } from "lucide-react";

export default function SignUpPage() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating icons */}
        <div className="absolute top-16 left-24 text-purple-300/20 animate-bounce">
          <Rocket size={55} />
        </div>
        <div className="absolute top-32 right-28 text-purple-300/15 animate-pulse">
          <Crown size={48} />
        </div>
        <div className="absolute bottom-40 left-20 text-purple-300/20 animate-bounce">
          <Heart size={42} />
        </div>
        <div className="absolute bottom-24 right-24 text-purple-300/15 animate-pulse">
          <Gem size={50} />
        </div>
        <div className="absolute top-52 left-1/3 text-purple-300/10 animate-bounce">
          <Sparkles size={38} />
        </div>
        <div className="absolute bottom-52 right-1/4 text-purple-300/15 animate-pulse">
          <Star size={45} />
        </div>
        <div className="absolute top-72 right-16 text-purple-300/12 animate-bounce">
          <Shield size={40} />
        </div>
        
        {/* Gradient orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-purple-400/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-indigo-400/15 rounded-full blur-2xl animate-pulse"></div>
      </div>
      
      {/* Main content */}
      <div className="relative z-10 min-h-screen flex justify-center items-center p-4">
        <div className="w-full max-w-md">
          {/* Card container */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="bg-gradient-to-r from-purple-400 to-indigo-400 p-3 rounded-full animate-pulse">
                  <UserPlus className="text-white" size={24} />
                </div>
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">Join Us Today</h1>
              <p className="text-purple-200">Create your account and get started</p>
            </div>
            
            {/* Clerk SignUp component */}
            <div className="clerk-signup-container">
              <SignUp 
                path="/signup" 
                routing="path"
                appearance={{
                  elements: {
                    rootBox: "mx-auto",
                    card: "bg-transparent shadow-none",
                    headerTitle: "hidden",
                    headerSubtitle: "hidden",
                    formButtonPrimary: "bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white border-none rounded-xl py-3 font-medium transition-all duration-200 transform hover:scale-105",
                    formFieldInput: "bg-white/10 border-white/20 text-white placeholder-purple-200 rounded-xl py-3 focus:border-purple-400 focus:ring-purple-400 focus:ring-2 transition-all duration-200",
                    formFieldLabel: "text-purple-200 font-medium",
                    identityPreviewText: "text-purple-200",
                    identityPreviewEditButton: "text-purple-300 hover:text-purple-200",
                    formResendCodeLink: "text-purple-300 hover:text-purple-200 transition-colors duration-200",
                    footerActionLink: "text-purple-300 hover:text-purple-200 transition-colors duration-200",
                    footerActionText: "text-purple-200",
                    dividerLine: "bg-white/20",
                    dividerText: "text-purple-200",
                    socialButtonsIconButton: "bg-white/10 border-white/20 hover:bg-white/20 text-white rounded-xl transition-all duration-200 hover:scale-105",
                    otpCodeFieldInput: "bg-white/10 border-white/20 text-white rounded-xl focus:border-purple-400 focus:ring-purple-400",
                    alertText: "text-purple-200",
                    formFieldWarningText: "text-yellow-300",
                    formFieldErrorText: "text-red-300",
                    formFieldSuccessText: "text-green-300",
                    formFieldInputShowPasswordButton: "text-purple-300 hover:text-purple-200",
                    formFieldAction: "text-purple-300 hover:text-purple-200",
                    formFieldLabelRow: "text-purple-200"
                  }
                }}
              />
            </div>
          </div>
          
          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-purple-200/80 text-sm">
              By signing up, you&apos;re joining a community of innovators
            </p>
            <div className="flex justify-center items-center mt-4 space-x-2">
              <Shield className="text-purple-300/60" size={16} />
              <span className="text-purple-300/60 text-xs">Secure & Protected</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Animated background particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-purple-400/20 rounded-full animate-ping`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    </div>
  );
}