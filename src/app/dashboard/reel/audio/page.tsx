"use client";

import { useState } from "react";
import {
  Sparkles,
  Copy,
  Check,
  Wand2,
  FileText,
  Palette,
  Video,
  Music,
} from "lucide-react";

const tones = [
  { name: "Energetic", icon: Sparkles },
  { name: "Chill", icon: Music },
  { name: "Dramatic", icon: Wand2 },
  { name: "Happy", icon: Sparkles },
  { name: "Dark", icon: Music },
  { name: "Romantic", icon: Wand2 },
];

export default function ReelAudioPage() {
  const [context, setContext] = useState("");
  const [style, setStyle] = useState("Viral");
  const [audio, setAudio] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const onCategorySelect = (category: string) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  const handleIncrement = async () => {
    try {
      const res = await fetch("/api/increment-usage", {
        method: "POST",
        body: JSON.stringify({
          type: "reel",
          field: "musicSuggested",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (res.ok) {
        console.log(`Count incremented to: ${data}`);
      }
    } catch (error) {
      console.error("Request failed:", error);
    }
  };

  const handleCredits = async () => {
    try{
      const res = await fetch("/api/credits-used", {
        method: "POST",
        body: JSON.stringify({
          type: "reel",
          field: "musicSuggested",
        }),
        headers:{
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if(res.ok){
        console.log(`Credits used till now: ${data}`);
      }
    }catch (error) {
      console.error("Request failed:", error);
    }
  }

  const handleGenerate = async () => {
    setLoading(true);
    setAudio(null);

    try {
      const res = await fetch("/api/reels/generate-audio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          context: context,
          style: style,
          category: selectedCategory,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setAudio(data.audio);
        handleIncrement();
        handleCredits();
      } else {
        console.error(data.error || "API error");
        setAudio("Failed to suggest audio. Please try again.");
      }
      setLoading(false);
    } catch (error) {
      console.error("Request failed:", error);
      setAudio("Something went wrong.");
    }

    setLoading(false);
  };

    const audioList = audio
    ? audio
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
    : [];

  return (
    <div className="min-h-screen bg-transparent p-4 relative">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-6 shadow-lg rotate-3">
            <Video className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-primary mb-4 tracking-tight">
            Reel Music Suggestions
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Discover trending music that makes reels go viral
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-card rounded-[2.5rem] border border-border shadow-xl overflow-hidden mb-12">
          <div className="p-8 md:p-12 space-y-12">
            <div className="flex flex-col md:flex-row md:space-x-8 space-y-8 md:space-y-0">
              {/* Text Context */}
              <div className="flex-1 space-y-4">
                <label className="flex items-center gap-3 text-xl font-bold text-foreground mb-2">
                  <div className="p-2 bg-secondary/10 rounded-lg">
                    <FileText className="w-6 h-6 text-secondary" />
                  </div>
                  Give short context of your reel
                </label>
                <div className="relative h-130">
                  <textarea
                    placeholder="What's happening in your reel? What's the hook? Add short context for the main action..."
                    value={context}
                    onChange={(e) => setContext(e.target.value)}
                    className="w-full h-full bg-background text-foreground p-6 rounded-3xl border border-primary/30 focus:border-primary focus:ring-4 focus:ring-primary/10 resize-none placeholder:text-muted-foreground transition-all duration-500 text-lg leading-relaxed"
                  />
                  <div className="absolute bottom-6 right-6 px-3 py-1 bg-background/80 rounded-full border border-border text-sm text-muted-foreground">
                    {context.length}/250
                  </div>
                </div>
              </div>

              {/* Reel Category Selection */}
              <div className="flex-1 space-y-4">
                <label className="flex items-center gap-3 text-xl font-bold text-foreground mb-2">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Palette className="w-6 h-6 text-primary" />
                  </div>
                  Choose Reel Category
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-3">
                  {[
                    "Education",
                    "Comedy",
                    "Fashion",
                    "Food / Cooking",
                    "Fitness / Health",
                    "Travel",
                    "Beauty / Makeup",
                    "Music / Dance",
                    "Technology",
                    "Business / Marketing",
                    "Lifestyle",
                    "Motivation",
                    "Photography / Videography",
                    "Gaming",
                    "DIY / Crafts",
                    "Pets / Animals",
                    "Sports",
                    "Reviews / Unboxing",
                    "News / Awareness",
                    "Memes / Relatable Content",
                  ].map((category) => (
                    <button
                      key={category}
                      className={`reel-category-btn${selectedCategory === category ? " selected" : ""}`}
                      onClick={() => onCategorySelect(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Tone Selection */}
            <div className="space-y-8">
              <label className="flex items-center gap-3 text-xl font-bold text-foreground">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Palette className="w-6 h-6 text-primary" />
                </div>
                Choose Your Mood
              </label>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {tones.map((t) => {
                  const IconComponent = t.icon;
                  return (
                    <button
                      key={t.name}
                      onClick={() => setStyle(t.name)}
                      className={`group relative p-6 rounded-[2rem] border-2 transition-all duration-500 ${
                        style === t.name
                          ? "bg-primary border-primary text-primary-foreground shadow-md"
                          : "bg-muted border-border text-muted-foreground hover:border-primary/40 hover:bg-primary/5 hover:text-foreground"
                      }`}
                    >
                      <div className="flex flex-col items-center gap-3 relative z-10 transition-transform duration-300 group-active:scale-95">
                        <IconComponent
                          className={`w-6 h-6 ${style === t.name ? "text-primary-foreground" : "text-primary"}`}
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
                disabled={loading || !context || !selectedCategory || !style}
                className="group relative px-12 py-5 bg-primary text-primary-foreground font-bold text-lg rounded-[2rem] hover:opacity-90 transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 overflow-hidden"
              >
                <div className="flex items-center justify-center gap-3">
                  {loading ? (
                    <>
                      <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                      <span className="tracking-wide">Generating Magic...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-6 h-6 animate-pulse" />
                      <span className="tracking-wide text-3xl">
                        Suggest Audio
                      </span>
                    </>
                  )}
                </div>
              </button>
            </div>

            {/* Generated Hastags */}
            {audio && (
              <div className="relative mt-12 bg-muted/30 rounded-[2.5rem] border border-border p-8 shadow-inner overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-700">
                <h3 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-3">
                  <Sparkles className="w-6 h-6 text-primary" />
                  Top Picks for You
                </h3>

                {/* Audio rows */}
                <div className="space-y-3">
                  {audioList.map((track, idx) => (
                    <div
                      key={idx}
                      className="
        group flex items-center gap-6
        px-6 py-4
        rounded-2xl
        bg-muted/50 hover:bg-primary/5
        border border-transparent hover:border-primary/20
        transition-all duration-300
      "
                    >
                      {/* Track name */}
                      <span
                        className="
          flex-1
          text-lg font-semibold tracking-wide
          text-foreground
          group-hover:text-primary
          transition-colors duration-300
        "
                      >
                        {track}
                      </span>

                      {/* Copy button */}
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(track);
                          setCopiedIndex(idx);
                          setTimeout(() => setCopiedIndex(null), 1500);
                        }}
                        className="
          shrink-0
          flex items-center gap-2
          px-4 py-2
          rounded-xl border
          transition-all duration-300
          font-bold
          bg-primary/10 hover:bg-primary/20
          border-primary/20
          text-primary hover:text-primary/80
        "
                      >
                        {copiedIndex === idx ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span className="text-sm">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            <span className="text-sm">Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-3 mt-10">
                  <span className="px-5 py-2 bg-primary/10 text-primary rounded-full text-sm font-bold border border-primary/10">
                    {style} Mood
                  </span>
                  <span className="px-5 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-bold border border-secondary/10">
                    AI Analysis
                  </span>
                  <span className="px-5 py-2 bg-primary/10 text-primary rounded-full text-sm font-bold border border-primary/10">
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
