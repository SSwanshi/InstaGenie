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
    <div className="min-h-screen bg-transparent p-4 relative">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl mb-6 shadow-lg shadow-purple-500/20 rotate-3">
            <Wand2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent mb-4 tracking-tight">
            AI Caption Generator
          </h1>
          <p className="text-lg text-gray-400 max-w-xl mx-auto leading-relaxed">
            Transform your posts with AI-powered captions that capture the perfect tone
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-[#130b24]/60 backdrop-blur-xl rounded-[2.5rem] border border-purple-500/20 shadow-2xl overflow-hidden mb-12">
          <div className="p-8 md:p-12 space-y-12">

            {/* Upload and Text Input Section */}
            <div className="grid lg:grid-cols-2 gap-12">

              {/* Image Upload */}
              <div className="space-y-4">
                <label className="flex items-center gap-3 text-xl font-bold text-white mb-2">
                  <div className="p-2 bg-purple-500/10 rounded-lg">
                    <ImageIcon className="w-6 h-6 text-purple-400" />
                  </div>
                  Upload Image <span className="text-sm font-normal text-gray-500 ml-2">(Optional)</span>
                </label>

                <div className="relative group">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer block w-full h-80 border-2 border-dashed border-purple-500/30 rounded-3xl hover:border-purple-500/60 transition-all duration-500 bg-black/40 hover:bg-purple-500/5 relative overflow-hidden"
                  >
                    {previewUrl ? (
                      <div className="relative w-full h-full">
                        <Image
                          src={previewUrl}
                          alt="Preview"
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-transparent to-transparent opacity-60" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 text-white font-medium">
                            Change Image
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-gray-400 group-hover:text-purple-400 transition-all duration-500">
                        <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-purple-500/20 transition-all duration-500">
                          <Upload className="w-8 h-8" />
                        </div>
                        <p className="text-lg font-semibold mb-2">Drop your image here</p>
                        <p className="text-sm text-gray-500">or click to browse files</p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* Text Context */}
              <div className="space-y-4">
                <label className="flex items-center gap-3 text-xl font-bold text-white mb-2">
                  <div className="p-2 bg-indigo-500/10 rounded-lg">
                    <FileText className="w-6 h-6 text-indigo-400" />
                  </div>
                  Describe Your Post
                </label>

                <div className="relative h-80">
                  <textarea
                    placeholder="Describe the mood, event, or specific details you want in your caption..."
                    value={textPrompt}
                    onChange={(e) => setTextPrompt(e.target.value)}
                    className="w-full h-full bg-black/40 backdrop-blur-sm text-white p-6 rounded-3xl border border-purple-500/30 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 resize-none placeholder-gray-600 transition-all duration-500 text-lg leading-relaxed"
                  />
                  <div className="absolute bottom-6 right-6 px-3 py-1 bg-black/60 rounded-full border border-white/5 text-sm text-gray-500">
                    {textPrompt.length}/500
                  </div>
                </div>
              </div>
            </div>

            {/* Tone Selection */}
            <div className="space-y-8">
              <label className="flex items-center gap-3 text-xl font-bold text-white">
                <div className="p-2 bg-pink-500/10 rounded-lg">
                  <Palette className="w-6 h-6 text-pink-400" />
                </div>
                Choose Your Vibe
              </label>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {tones.map((t) => {
                  const IconComponent = t.icon;
                  return (
                    <button
                      key={t.name}
                      onClick={() => setTone(t.name)}
                      className={`group relative p-6 rounded-[2rem] border-2 transition-all duration-500 ${tone === t.name
                          ? "bg-purple-600 border-purple-400 text-white shadow-[0_0_30px_rgba(168,85,247,0.4)]"
                          : "bg-black/40 border-purple-500/10 text-gray-400 hover:border-purple-500/40 hover:bg-purple-500/5 hover:text-gray-200"
                        }`}
                    >
                      <div className="flex flex-col items-center gap-3 relative z-10 transition-transform duration-300 group-active:scale-95">
                        <IconComponent className={`w-6 h-6 ${tone === t.name ? "text-white" : "text-purple-400"}`} />
                        <span className="font-bold text-sm tracking-wide">{t.name}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Generate Button */}
            <div className="flex justify-center pt-8">
              <button
                onClick={handleGenerate}
                disabled={loading || (!textPrompt && !file)}
                className="group relative px-12 py-5 bg-gradient-to-r from-purple-500 via-indigo-600 to-purple-500 bg-[length:200%_auto] text-white font-bold text-lg rounded-[2rem] hover:bg-right transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_40px_rgba(168,85,247,0.3)] hover:shadow-[0_0_60px_rgba(168,85,247,0.5)] hover:scale-105 active:scale-95 overflow-hidden"
              >
                <div className="flex items-center justify-center gap-3">
                  {loading ? (
                    <>
                      <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                      <span className="tracking-wide">Creating Magic...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-6 h-6 animate-pulse" />
                      <span className="tracking-wide text-3xl">Generate Caption</span>
                    </>
                  )}
                </div>
              </button>
            </div>

            {/* Generated Caption */}
            {caption && (
              <div className="relative mt-12 bg-black/40 rounded-[2.5rem] border border-purple-500/30 p-8 md:p-10 shadow-inner overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-700">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50" />

                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">Your Caption</h3>
                      <p className="text-sm text-gray-500">Curated by AI to match your vibe</p>
                    </div>
                  </div>

                  <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 px-6 py-3 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 hover:text-purple-300 rounded-2xl border border-purple-500/20 transition-all duration-300 font-bold"
                  >
                    {copied ? (
                      <>
                        <Check className="w-5 h-5" />
                        <span>Copied to Clipboard</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-5 h-5" />
                        <span>Copy Caption</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="bg-[#030014] rounded-3xl p-8 border border-white/5 relative group">
                  <p className="text-gray-200 leading-relaxed text-xl md:text-2xl font-medium">{caption}</p>
                </div>

                <div className="flex flex-wrap gap-3 mt-8">
                  <span className="px-5 py-2 bg-purple-500/10 text-purple-400 rounded-full text-sm font-bold border border-purple-500/10">
                    {tone} Tone
                  </span>
                  <span className="px-5 py-2 bg-indigo-500/10 text-indigo-400 rounded-full text-sm font-bold border border-indigo-500/10">
                    AI Analysis
                  </span>
                  <span className="px-5 py-2 bg-pink-500/10 text-pink-400 rounded-full text-sm font-bold border border-pink-500/10">
                    Social Ready
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
