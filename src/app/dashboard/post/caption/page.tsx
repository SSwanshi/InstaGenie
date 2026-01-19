"use client";

import { useState } from "react";
import Image from "next/image";
import { Upload, Image as ImageIcon, Sparkles, Copy, Check, Wand2, FileText, Palette } from "lucide-react";

const tones = [
  { name: "Witty", icon: Sparkles },
  { name: "Emotional", icon: FileText },
  { name: "Motivational", icon: Wand2 },
  { name: "Funny", icon: Sparkles },
  { name: "Professional", icon: FileText },
  { name: "Casual", icon: Palette }
];

export default function PostCaptionPage() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [textPrompt, setTextPrompt] = useState("");
  const [tone, setTone] = useState("Witty");
  const [caption, setCaption] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  setFile(file);
  setPreviewUrl(URL.createObjectURL(file));

  const reader = new FileReader();
  reader.onloadend = () => {
    const base64String = reader.result?.toString().split(",")[1]; // remove data:image/...
    setImageBase64(base64String || null);
  };
  reader.readAsDataURL(file);
};

  const handleGenerate = async () => {
  setLoading(true);
  setCaption(null);

  try {
    const res = await fetch("/api/generate-caption", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: textPrompt,
        tone,
        image: imageBase64, // null if no image uploaded
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setCaption(data.caption);
    } else {
      console.error(data.error || "API error");
      setCaption("⚠️ Failed to generate caption. Please try again.");
    }
  } catch (error) {
    console.error("Request failed:", error);
    setCaption("⚠️ Something went wrong.");
  }

  setLoading(false);
};


  const copyToClipboard = async () => {
    if (caption) {
      await navigator.clipboard.writeText(caption);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-3">
            <Wand2 className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
            AI Caption Generator
          </h1>
          <p className="text-base text-gray-300 max-w-xl mx-auto">
            Transform your posts with AI-powered captions that capture the perfect tone
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
          <div className="p-8 space-y-8">
            
            {/* Upload and Text Input Section */}
            <div className="grid lg:grid-cols-2 gap-8">
              
              {/* Image Upload */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-lg font-semibold text-gray-200 mb-4">
                  <ImageIcon className="w-5 h-5" />
                  Upload Image (Optional)
                </label>
                
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="group cursor-pointer block w-full h-57 border-2 border-dashed border-purple-400/50 rounded-xl hover:border-purple-400 transition-all duration-300 bg-gradient-to-br from-purple-500/10 to-blue-500/10 hover:from-purple-500/20 hover:to-blue-500/20"
                  >
                    {previewUrl ? (
                      <div className="relative w-full h-full overflow-hidden rounded-xl">
                        <Image
                          src={previewUrl}
                          alt="Preview"
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-gray-400 group-hover:text-purple-400 transition-colors duration-300">
                        <Upload className="w-8 h-8 mb-2" />
                        <p className="text-sm font-medium">Click to upload image</p>
                        <p className="text-xs">PNG, JPG, GIF up to 10MB</p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* Text Input */}
              <div className="space-y-4">
                <label className="flex items-center gap-2 text-lg font-semibold text-gray-200">
                  <FileText className="w-5 h-5" />
                  Describe Your Post
                </label>
                
                <div className="relative">
                  <textarea
                    rows={8}
                    placeholder="Tell us about your post... What's the mood? What happened? What do you want to share?"
                    value={textPrompt}
                    onChange={(e) => setTextPrompt(e.target.value)}
                    className="w-full bg-white/10 backdrop-blur-sm text-white p-4 rounded-2xl border border-white/20 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 resize-none placeholder-gray-400 transition-all duration-300"
                  />
                  <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                    {textPrompt.length}/500
                  </div>
                </div>
              </div>
            </div>

            {/* Tone Selection */}
            <div className="space-y-6">
              <label className="flex items-center gap-2 text-lg font-semibold text-gray-200">
                <Palette className="w-5 h-5" />
                Choose Your Tone
              </label>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {tones.map((t) => {
                  const IconComponent = t.icon;
                  return (
                    <button
                      key={t.name}
                      className={`group relative p-4 rounded-2xl border-2 transition-all duration-300 ${
                        tone === t.name
                          ? "bg-gradient-to-br from-purple-500 to-blue-500 border-purple-400 text-white shadow-lg shadow-purple-500/25"
                          : "bg-white/5 border-white/20 text-gray-300 hover:border-purple-400/50 hover:bg-white/10"
                      }`}
                      onClick={() => setTone(t.name)}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <IconComponent className="w-6 h-6" />
                        <span className="font-medium text-sm">{t.name}</span>
                      </div>
                      {tone === t.name && (
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Generate Button */}
            <div className="flex justify-center">
              <button
                onClick={handleGenerate}
                disabled={loading || (!textPrompt && !file)}
                className="group relative px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-2xl hover:from-purple-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-105 min-w-[200px]"
              >
                <div className="flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      <span>Generate Caption</span>
                    </>
                  )}
                </div>
              </button>
            </div>

            {/* Generated Caption */}
            {caption && (
              <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 backdrop-blur-sm rounded-2xl border border-purple-400/30 p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-purple-300 flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Your Generated Caption
                  </h3>
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300 text-gray-300 hover:text-white"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-green-400" />
                        <span className="text-green-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <p className="text-gray-100 leading-relaxed text-lg">{caption}</p>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                    {tone} Tone
                  </span>
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
                    AI Generated
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}