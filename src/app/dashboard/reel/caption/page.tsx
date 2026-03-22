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
} from "lucide-react";

const tones = [
  { name: "Viral", icon: Sparkles },
  { name: "Funny", icon: FileText },
  { name: "Motivational", icon: Wand2 },
  { name: "Educational", icon: FileText },
  { name: "Aesthetic", icon: Palette },
  { name: "Trending", icon: Sparkles },
];

export default function ReelCaptionPage() {
  const [description, setDescription] = useState("");
  const [style, setStyle] = useState("Viral");
  const [caption, setCaption] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
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
          field: "captionGenerated",
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
          field: "captionGenerated",
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
    setCaption(null);

    try {
      const res = await fetch("/api/reels/generate-caption", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description: description,
          style: style,
          category: selectedCategory,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setCaption(data.caption);
        handleIncrement();
        handleCredits();
      } else {
        console.error(data.error || "API error");
        setCaption("Failed to generate caption. Please try again.");
      }
      setLoading(false);
    } catch (error) {
      console.error("Request failed:", error);
      setCaption("Something went wrong.");
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
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-6 shadow-lg rotate-3">
            <Video className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-primary mb-4 tracking-tight">
            Reel Caption Generator
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Create viral-worthy captions for your reels in seconds
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
                  Describe Your Reel
                </label>
                <div className="relative h-130">
                  <textarea
                    placeholder="What's happening in your reel? What's the hook? Describe the main action..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full h-full bg-background text-foreground p-6 rounded-3xl border border-primary/30 focus:border-primary focus:ring-4 focus:ring-primary/10 resize-none placeholder:text-muted-foreground transition-all duration-500 text-lg leading-relaxed"
                  />
                  <div className="absolute bottom-6 right-6 px-3 py-1 bg-background/80 rounded-full border border-border text-sm text-muted-foreground">
                    {description.length}/500
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
                Choose Your Style
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
                disabled={loading || !description || !selectedCategory || !style}
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
                        Generate Caption
                      </span>
                    </>
                  )}
                </div>
              </button>
            </div>

            {/* Generated Caption */}
            {caption && (
              <div className="relative mt-12 bg-muted/30 rounded-[2.5rem] border border-primary/20 p-8 md:p-10 shadow-inner overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-700">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground">
                        Your Reel Caption
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Optimized for engagement
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 px-6 py-3 bg-primary/10 hover:bg-primary/20 text-primary hover:text-primary/80 rounded-2xl border border-primary/20 transition-all duration-300 font-bold"
                  >
                    {copied ? (
                      <>
                        <Check className="w-5 h-5" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-5 h-5" />
                        <span>Copy Caption</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="bg-background rounded-3xl p-8 border border-border relative group">
                  <p className="text-foreground leading-relaxed text-xl md:text-2xl font-medium">
                    {caption}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 mt-8">
                  <span className="px-5 py-2 bg-primary/10 text-primary rounded-full text-sm font-bold border border-primary/10">
                    {style} Style
                  </span>
                  <span className="px-5 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-bold border border-secondary/10">
                    Hashtags Included
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
