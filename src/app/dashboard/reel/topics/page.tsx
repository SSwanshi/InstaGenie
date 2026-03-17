"use client";

import { useState } from "react";
import {
  Sparkles,
  Copy,
  Check,
  FileText,
  Palette,
  Video,
} from "lucide-react";

const genreOptions = [
  "Funny",
"Inspirational",
"Educational",
"Cinematic",
"Aesthetic",
"Relatable",
"Tutorial",
"Review",
"Trendy",
"Motivational",
];

const targetAudienceOptions = [
  "Students",
  "Working Professionals",
  "Entrepreneurs",
  "Content Creators",
  "Influencers",
  "Fitness Enthusiasts",
  "Travel Lovers",
  "Food Lovers",
  "Fashion Enthusiasts",
  "Tech Enthusiasts",
  "Gamers",
  "Business Owners",
  "Job Seekers",
  "Teenagers (13–17)",
  "Young Adults (18–25)",
  "Adults (25–40)",
  "Parents",
  "General Audience",
];

export default function ReelAudioPage() {
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [selectedTargetAudience, setSelectedTargetAudience] = useState<string[]>([]);
  const [audio, setAudio] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const onCategorySelect = (category: string) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  const onGenreSelect = (genre: string) => {
    setSelectedGenre(genre === selectedGenre ? null : genre);
  };

  const onTargetAudienceToggle = (audience: string) => {
    setSelectedTargetAudience((prev) =>
      prev.includes(audience)
        ? prev.filter((a) => a !== audience)
        : [...prev, audience]
    );
  };

  const handleGenerate = async () => {
    setLoading(true);
    setAudio(null);

    try {
      const res = await fetch("/api/reels/generate-topics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          genre: selectedGenre,
          targetAudience: selectedTargetAudience,
          category: selectedCategory,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setAudio(data.audio);
      } else {
        console.error(data.error || "API error");
        setAudio("Failed to suggest topics. Please try again.");
      }
      setLoading(false);
    } catch (error) {
      console.error("Request failed:", error);
      setAudio("Something went wrong.");
    }

    setLoading(false);
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
            Trending Topics
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Discover trending topics that make reels go viral
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-card rounded-[2.5rem] border border-border shadow-xl overflow-hidden mb-12">
          <div className="p-8 md:p-12 space-y-8">
            {/* Top Row: Target Audience (Left) and Reel Category (Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Target Audience Selection */}
              <div className="bg-muted/30 rounded-2xl border border-border p-6 space-y-4">
                <label className="flex items-center gap-3 text-xl font-bold text-foreground">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Palette className="w-6 h-6 text-primary" />
                  </div>
                  Choose Target Audience (Multi-select)
                </label>

                <div className="grid grid-cols-2 gap-3">
                  {targetAudienceOptions.map((audience) => (
                    <button
                      key={audience}
                      onClick={() => onTargetAudienceToggle(audience)}
                      className={`group relative p-4 rounded-[1.5rem] border-2 transition-all duration-500 text-center font-bold text-sm ${
                        selectedTargetAudience.includes(audience)
                          ? "bg-primary border-primary text-primary-foreground shadow-md"
                          : "bg-muted border-border text-muted-foreground hover:border-primary/40 hover:bg-primary/5 hover:text-foreground"
                      }`}
                    >
                      {audience}
                    </button>
                  ))}
                </div>
              </div>

              {/* Reel Category Selection */}
              <div className="bg-muted/30 rounded-2xl border border-border p-6 space-y-4">
                <label className="flex items-center gap-3 text-xl font-bold text-foreground">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Palette className="w-6 h-6 text-primary" />
                  </div>
                  Choose Reel Category
                </label>
                <div className="grid grid-cols-2 gap-3">
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
                      onClick={() => onCategorySelect(category)}
                      className={`group relative p-4 rounded-[1.5rem] border-2 transition-all duration-500 text-center font-bold text-sm ${
                        selectedCategory === category
                          ? "bg-primary border-primary text-primary-foreground shadow-md"
                          : "bg-muted border-border text-muted-foreground hover:border-primary/40 hover:bg-primary/5 hover:text-foreground"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom: Genre Selection */}
            <div className="bg-muted/30 rounded-2xl border border-border p-6 space-y-4">
              <label className="flex items-center gap-3 text-xl font-bold text-foreground mb-2">
                <div className="p-2 bg-secondary/10 rounded-lg">
                  <FileText className="w-6 h-6 text-secondary" />
                </div>
                Choose Genre
              </label>
              <div className="grid grid-cols-2 gap-3">
                {genreOptions.map((genre) => (
                  <button
                    key={genre}
                    onClick={() => onGenreSelect(genre)}
                    className={`group relative p-4 rounded-[1.5rem] border-2 transition-all duration-500 text-center font-bold text-sm ${
                      selectedGenre === genre
                        ? "bg-primary border-primary text-primary-foreground shadow-md"
                        : "bg-muted border-border text-muted-foreground hover:border-primary/40 hover:bg-primary/5 hover:text-foreground"
                    }`}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <div className="flex justify-center pt-8">
              <button
                onClick={handleGenerate}
                disabled={loading || !selectedGenre || !selectedCategory || selectedTargetAudience.length === 0}
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
                        Suggest Topics
                      </span>
                    </>
                  )}
                </div>
              </button>
            </div>

            {/* Generated Topics */}
            {audio && (
              <div className="relative mt-12 bg-muted/30 rounded-[2.5rem] border border-border p-8 shadow-inner overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-700">
                <h3 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-3">
                  <Sparkles className="w-6 h-6 text-primary" />
                  Top Picks for You
                </h3>

                {/* Topics rows */}
                <div className="space-y-3">
                  {audio.split("\n").map((topic, idx) => {
                    const trimmedTopic = topic.trim();
                    return trimmedTopic ? (
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
                        {/* Topic name */}
                        <span
                          className="
          flex-1
          text-lg font-semibold tracking-wide
          text-foreground
          group-hover:text-primary
          transition-colors duration-300
        "
                        >
                          {trimmedTopic}
                        </span>

                        {/* Copy button */}
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(trimmedTopic);
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
                    ) : null;
                  })}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-3 mt-10">
                  <span className="px-5 py-2 bg-primary/10 text-primary rounded-full text-sm font-bold border border-primary/10">
                    {selectedGenre} Genre
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
