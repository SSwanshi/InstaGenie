"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Upload,
  Image as ImageIcon,
  Sparkles,
  Copy,
  Check,
  Wand2,
  FileText,
  Palette,
  Smile,
  Heart,
  Leaf,
  Laugh,
  Droplet,
  TrendingUp,
  Flame,
} from "lucide-react";

const expressions = [
  { name: "Happy", icon: Smile },
  { name: "Excited", icon: Sparkles },
  { name: "Playful", icon: Wand2 },
  { name: "Romantic", icon: Heart },
  { name: "Calm", icon: Leaf },
  { name: "Funny", icon: Laugh },
  { name: "Emotional", icon: Droplet },
  { name: "Confident", icon: TrendingUp },
  { name: "Aesthetic", icon: Palette },
  { name: "Hype", icon: Flame },
];

export default function StoryCaptionPage() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [textPrompt, setTextPrompt] = useState("");
  const [expression, setExpression] = useState<string | null>(null);
  const [generatedEmoji, setGeneratedEmoji] = useState<string | null>(null);

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
    setGeneratedEmoji(null);

    try {
      const res = await fetch("/api/stories/generate-emoji", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: textPrompt,
          expression,
          image: imageBase64,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setGeneratedEmoji(data.emojis);
      } else {
        setGeneratedEmoji("Failed to generate emojis.");
      }
    } catch (error) {
      console.log(error);
      setGeneratedEmoji("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    if (generatedEmoji) {
      await navigator.clipboard.writeText(generatedEmoji);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  useEffect(() => {
  setGeneratedEmoji(null);
}, [expression]);


  return (
    <div className="min-h-screen bg-transparent p-4 relative">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-400 to-pink-600 rounded-2xl mb-6 shadow-lg shadow-orange-500/20 rotate-3">
            <Smile className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-orange-400 via-pink-500 to-orange-400 bg-clip-text text-transparent mb-4 tracking-tight">
            Smart Emoji Suggestions
          </h1>
          <p className="text-lg text-gray-400 max-w-xl mx-auto leading-relaxed">
            Add emojis that elevate your story
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
                  <div className="p-2 bg-orange-500/10 rounded-lg">
                    <ImageIcon className="w-6 h-6 text-orange-400" />
                  </div>
                  Upload Story Image{" "}
                  <span className="text-sm font-normal text-gray-500 ml-2">
                    (Optional)
                  </span>
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
                    className="cursor-pointer block w-full h-80 border-2 border-dashed border-orange-500/30 rounded-3xl hover:border-orange-500/60 transition-all duration-500 bg-black/40 hover:bg-orange-500/5 relative overflow-hidden"
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
                      <div className="flex flex-col items-center justify-center h-full text-gray-400 group-hover:text-orange-400 transition-all duration-500">
                        <div className="w-16 h-16 bg-orange-500/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-orange-500/20 transition-all duration-500">
                          <Upload className="w-8 h-8" />
                        </div>
                        <p className="text-lg font-semibold mb-2">
                          Drop your story image here
                        </p>
                        <p className="text-sm text-gray-500">
                          or click to browse files
                        </p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* Expression Context */}
              <div className="space-y-4">
                <label className="flex items-center gap-3 text-xl font-bold text-white mb-2">
                  <div className="p-2 bg-pink-500/10 rounded-lg">
                    <FileText className="w-6 h-6 text-pink-400" />
                  </div>
                  Describe Your Story
                </label>

                <div className="relative h-80">
                  <textarea
                    placeholder="What's this story about? Are you asking a question? Sharing a moment? Promoting something?"
                    value={textPrompt}
                    onChange={(e) => setTextPrompt(e.target.value)}
                    className="w-full h-full bg-black/40 backdrop-blur-sm text-white p-6 rounded-3xl border border-orange-500/30 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 resize-none placeholder-gray-600 transition-all duration-500 text-lg leading-relaxed"
                  />
                  <div className="absolute bottom-6 right-6 px-3 py-1 bg-black/60 rounded-full border border-white/5 text-sm text-gray-500">
                    {textPrompt.length}/500
                  </div>
                </div>
              </div>
            </div>

            {/* Expression Selection */}
            <div className="space-y-8">
              <label className="flex items-center gap-3 text-xl font-bold text-white">
                <div className="p-2 bg-orange-500/10 rounded-lg">
                  <Palette className="w-6 h-6 text-orange-400" />
                </div>
                Choose Your Expression
              </label>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {expressions.map((t) => {
                  const IconComponent = t.icon;
                  return (
                    <button
                      key={t.name}
                      onClick={() => setExpression(t.name)}
                      className={`group relative p-6 rounded-[2rem] border-2 transition-all duration-500 ${
                        expression === t.name
                          ? "bg-orange-500 border-orange-400 text-white shadow-[0_0_30px_rgba(249,115,22,0.4)]"
                          : "bg-black/40 border-orange-500/10 text-gray-400 hover:border-orange-500/40 hover:bg-orange-500/5 hover:text-gray-200"
                      }`}
                    >
                      <div className="flex flex-col items-center gap-3 relative z-10 transition-transform duration-300 group-active:scale-95">
                        <IconComponent
                          className={`w-6 h-6 ${expression === t.name ? "text-white" : "text-orange-400"}`}
                        />

                        <span className="font-bold text-sm tracking-wide">
                          {t.name}
                        </span>
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
                disabled={loading || (!textPrompt && !file) || !expression}
                className="group relative px-12 py-5 bg-gradient-to-r from-orange-500 via-pink-600 to-orange-500 bg-[length:200%_auto] text-white font-bold text-lg rounded-[2rem] hover:bg-right transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_40px_rgba(249,115,22,0.3)] hover:shadow-[0_0_60px_rgba(249,115,22,0.5)] hover:scale-105 active:scale-95 overflow-hidden"
              >
                <div className="flex items-center justify-center gap-3">
                  {loading ? (
                    <>
                      <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                      <span className="tracking-wide">Dropping Magic...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-6 h-6 animate-pulse" />
                      <span className="tracking-wide text-3xl">
                        Suggesting Emojis
                      </span>
                    </>
                  )}
                </div>
              </button>
            </div>

            {/* Generated Emoji */}
            {generatedEmoji && (
              <div className="relative mt-12 bg-black/40 rounded-[2.5rem] border border-orange-500/30 p-8 md:p-10 shadow-inner overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-700">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-50" />

                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-500/20 rounded-xl flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-orange-400" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">
                        Your Emojis
                      </h3>
                      <p className="text-sm text-gray-500">
                        Emojis that direct your feelings
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 px-6 py-3 bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 hover:text-orange-300 rounded-2xl border border-orange-500/20 transition-all duration-300 font-bold"
                  >
                    {copied ? (
                      <>
                        <Check className="w-5 h-5" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-5 h-5" />
                        <span>Copy Emojis</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="bg-[#030014] rounded-3xl p-8 border border-white/5 relative group">
                  <p className="text-gray-200 leading-relaxed text-4xl md:text-5xl font-medium tracking-widest">
                    {generatedEmoji}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 mt-8">
                  <span className="px-5 py-2 bg-orange-500/10 text-orange-400 rounded-full text-sm font-bold border border-orange-500/10">
                    Expression: {expression}

                  </span>
                  <span className="px-5 py-2 bg-pink-500/10 text-pink-400 rounded-full text-sm font-bold border border-pink-500/10">
                    Story Optimized
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
