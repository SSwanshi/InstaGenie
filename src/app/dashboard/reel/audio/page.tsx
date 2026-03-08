"use client";

import { useState } from "react";
import Image from "next/image";
import { Upload, Image as ImageIcon, Sparkles, Wand2, Music, PlayCircle, Plus, Video } from "lucide-react";

// Mock music data
const musicSuggestions = [
    { id: 1, title: "Trending Challenge", artist: "Viral Sound", mood: "Energetic", duration: "0:15", tags: ["Viral", "Dance"] },
    { id: 2, title: "Cinematic Build", artist: "Epic Scores", mood: "Dramatic", duration: "0:30", tags: ["Transition", "Hooks"] },
    { id: 3, title: "Aesthetic Vlog", artist: "Chill Beats", mood: "Chill", duration: "0:45", tags: ["Vlog", "Soft"] },
];

const moods = [
    { name: "Viral", icon: Sparkles },
    { name: "Upbeat", icon: Music },
    { name: "Vlog", icon: Video },
    { name: "Funny", icon: Sparkles },
    { name: "Dark", icon: Music },
    { name: "Intense", icon: Wand2 }
];

export default function ReelAudioPage() {
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [textPrompt, setTextPrompt] = useState("");
    const [mood, setMood] = useState("Viral");
    const [results, setResults] = useState<typeof musicSuggestions | null>(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setFile(file);
        setPreviewUrl(URL.createObjectURL(file));
    };

    const handleGenerate = async () => {
        setLoading(true);
        setResults(null);

        // Simulate API call
        setTimeout(() => {
            setResults(musicSuggestions);
            setLoading(false);
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-transparent p-4 relative">
            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-6 shadow-lg rotate-3">
                        <Music className="w-8 h-8 text-primary" />
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold text-primary mb-4 tracking-tight">
                        Reel Audio Matcher
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
                        Discover viral audio tracks to boost your reel&apos;s engagement
                    </p>
                </div>

                {/* Main Content */}
                <div className="bg-card rounded-[2.5rem] border border-border shadow-xl overflow-hidden mb-12">
                    <div className="p-8 md:p-12 space-y-12">

                        {/* Upload and Text Input Section */}
                        <div className="grid lg:grid-cols-2 gap-12">

                            {/* Image Upload */}
                            <div className="space-y-4">
                                <label className="flex items-center gap-3 text-xl font-bold text-foreground mb-2">
                                    <div className="p-2 bg-primary/10 rounded-lg">
                                        <ImageIcon className="w-6 h-6 text-primary" />
                                    </div>
                                    Upload Reel Frame <span className="text-sm font-normal text-muted-foreground ml-2">(Optional)</span>
                                </label>

                                <div className="relative group">
                                    <input
                                        type="file"
                                        accept="image/*,video/*"
                                        onChange={handleFileChange}
                                        className="hidden"
                                        id="file-upload"
                                    />
                                    <label
                                        htmlFor="file-upload"
                                        className="cursor-pointer block w-full h-80 border-2 border-dashed border-primary/30 rounded-3xl hover:border-primary/60 transition-all duration-500 bg-muted/30 hover:bg-primary/5 relative overflow-hidden"
                                    >
                                        {previewUrl ? (
                                            <div className="relative w-full h-full">
                                                <Image
                                                    src={previewUrl}
                                                    alt="Preview"
                                                    fill
                                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
                                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                    <div className="bg-background/80 backdrop-blur-md px-6 py-3 rounded-full border border-border text-foreground font-medium">
                                                        Change File
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center justify-center h-full text-muted-foreground group-hover:text-primary transition-all duration-500">
                                                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-500">
                                                    <Upload className="w-8 h-8" />
                                                </div>
                                                <p className="text-lg font-semibold mb-2">Drop reel video/image</p>
                                                <p className="text-sm text-muted-foreground">or click to browse files</p>
                                            </div>
                                        )}
                                    </label>
                                </div>
                            </div>

                            {/* Text Context */}
                            <div className="space-y-4">
                                <label className="flex items-center gap-3 text-xl font-bold text-foreground mb-2">
                                    <div className="p-2 bg-secondary/10 rounded-lg">
                                        <Wand2 className="w-6 h-6 text-secondary" />
                                    </div>
                                    Describe Reel Vibe
                                </label>

                                <div className="relative h-80">
                                    <textarea
                                        placeholder="Describe the energy and content. is it a fast-paced transition? A slow cinematic shot? A funny skit?"
                                        value={textPrompt}
                                        onChange={(e) => setTextPrompt(e.target.value)}
                                        className="w-full h-full bg-background text-foreground p-6 rounded-3xl border border-primary/30 focus:border-primary focus:ring-4 focus:ring-primary/10 resize-none placeholder:text-muted-foreground transition-all duration-500 text-lg leading-relaxed"
                                    />
                                    <div className="absolute bottom-6 right-6 px-3 py-1 bg-background/80 rounded-full border border-border text-sm text-muted-foreground">
                                        {textPrompt.length}/500
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Mood Selection */}
                        <div className="space-y-8">
                            <label className="flex items-center gap-3 text-xl font-bold text-foreground">
                                <div className="p-2 bg-primary/10 rounded-lg">
                                    <Video className="w-6 h-6 text-primary" />
                                </div>
                                Reel Style
                            </label>

                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                                {moods.map((m) => {
                                    const IconComponent = m.icon;
                                    return (
                                        <button
                                            key={m.name}
                                            onClick={() => setMood(m.name)}
                                            className={`group relative p-6 rounded-[2rem] border-2 transition-all duration-500 ${mood === m.name
                                                    ? "bg-primary border-primary text-primary-foreground shadow-md"
                                                    : "bg-muted border-border text-muted-foreground hover:border-primary/40 hover:bg-primary/5 hover:text-foreground"
                                                }`}
                                        >
                                            <div className="flex flex-col items-center gap-3 relative z-10 transition-transform duration-300 group-active:scale-95">
                                                <IconComponent className={`w-6 h-6 ${mood === m.name ? "text-primary-foreground" : "text-primary"}`} />
                                                <span className="font-bold text-sm tracking-wide">{m.name}</span>
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
                                className="group relative px-12 py-5 bg-primary text-primary-foreground font-bold text-lg rounded-[2rem] hover:opacity-90 transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 overflow-hidden"
                            >
                                <div className="flex items-center justify-center gap-3">
                                    {loading ? (
                                        <>
                                            <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                                            <span className="tracking-wide">Scanning Trends...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Music className="w-6 h-6 animate-pulse" />
                                            <span className="tracking-wide text-3xl">Find Reel Audio</span>
                                        </>
                                    )}
                                </div>
                            </button>
                        </div>

                        {/* Results */}
                        {results && (
                            <div className="relative mt-12 bg-muted/30 rounded-[2.5rem] border border-primary/20 p-8 shadow-inner overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-700">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

                                <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                                    <Sparkles className="w-6 h-6 text-primary" />
                                    Trending for You
                                </h3>

                                <div className="grid gap-4">
                                    {results.map((track) => (
                                        <div key={track.id} className="group flex items-center justify-between p-4 bg-background border border-border rounded-2xl hover:border-primary/40 transition-all duration-300">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                                                    <PlayCircle className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <h4 className="text-foreground font-bold">{track.title}</h4>
                                                    <p className="text-sm text-muted-foreground">{track.artist} • {track.duration}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                {track.tags.map((tag, i) => (
                                                    <span key={i} className="hidden md:inline-block px-3 py-1 bg-muted rounded-full text-xs text-muted-foreground border border-border">
                                                        {tag}
                                                    </span>
                                                ))}
                                                <button className="p-2 bg-primary text-primary-foreground rounded-xl hover:opacity-80 transition-colors">
                                                    <Plus className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}