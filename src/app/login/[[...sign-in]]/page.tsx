"use client";
import { SignIn } from "@clerk/nextjs";
import { Shield, Zap, Globe, Lock, Star, Sparkles } from "lucide-react";

export default function SignInPage() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating icons */}
        <div className="absolute top-20 left-20 text-purple-300/20 animate-pulse">
          <Shield size={60} />
        </div>
        <div className="absolute top-40 right-32 text-purple-300/15 animate-bounce">
          <Zap size={45} />
        </div>
        <div className="absolute bottom-32 left-16 text-purple-300/20 animate-pulse">
          <Globe size={55} />
        </div>
        <div className="absolute bottom-20 right-20 text-purple-300/15 animate-bounce">
          <Lock size={40} />
        </div>
        <div className="absolute top-60 left-1/2 text-purple-300/10 animate-pulse">
          <Star size={35} />
        </div>
        <div className="absolute bottom-60 right-1/3 text-purple-300/15 animate-bounce">
          <Sparkles size={50} />
        </div>
        
        {/* Gradient orbs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-400/10 rounded-full blur-2xl animate-pulse"></div>
      </div>
      
      {/* Main content */}
      <div className="relative z-10 min-h-screen flex justify-center items-center p-4">
        <div className="w-full max-w-md">
          {/* Card container */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="bg-gradient-to-r from-purple-400 to-indigo-400 p-3 rounded-full">
                  <Lock className="text-white" size={24} />
                </div>
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
              <p className="text-purple-200">Sign in to your account</p>
            </div>
            
            {/* Clerk SignIn component */}
            <div className="clerk-signin-container">
              <SignIn 
                path="/login" 
                routing="path"
                appearance={{
                  elements: {
                    rootBox: "mx-auto",
                    card: "bg-transparent shadow-none",
                    headerTitle: "hidden",
                    headerSubtitle: "hidden",
                    formButtonPrimary: "bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white border-none rounded-xl py-3 font-medium transition-all duration-200",
                    formFieldInput: "bg-white/10 border-white/20 text-white placeholder-purple-200 rounded-xl py-3 focus:border-purple-400 focus:ring-purple-400",
                    formFieldLabel: "text-purple-200 font-medium",
                    identityPreviewText: "text-purple-200",
                    identityPreviewEditButton: "text-purple-300 hover:text-purple-200",
                    formResendCodeLink: "text-purple-300 hover:text-purple-200",
                    footerActionLink: "text-purple-300 hover:text-purple-200",
                    footerActionText: "text-purple-200",
                    dividerLine: "bg-white/20",
                    dividerText: "text-purple-200",
                    socialButtonsIconButton: "bg-white/10 border-white/20 hover:bg-white/20 text-white rounded-xl",
                    otpCodeFieldInput: "bg-white/10 border-white/20 text-white rounded-xl",
                    alertText: "text-purple-200",
                    formFieldWarningText: "text-yellow-300",
                    formFieldErrorText: "text-red-300",
                    formFieldSuccessText: "text-green-300"
                  }
                }}
              />
            </div>
          </div>
          
          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-purple-200/80 text-sm">
              Secure authentication powered by modern technology
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}