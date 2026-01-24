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
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl mb-6 shadow-lg shadow-pink-500/20 rotate-3">
                        <Music className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-pink-400 via-rose-400 to-pink-400 bg-clip-text text-transparent mb-4 tracking-tight">
                        Reel Audio Matcher
                    </h1>
                    <p className="text-lg text-gray-400 max-w-xl mx-auto leading-relaxed">
                        Discover viral audio tracks to boost your reel's engagement
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
                                    <div className="p-2 bg-pink-500/10 rounded-lg">
                                        <ImageIcon className="w-6 h-6 text-pink-400" />
                                    </div>
                                    Upload Reel Frame <span className="text-sm font-normal text-gray-500 ml-2">(Optional)</span>
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
                                        className="cursor-pointer block w-full h-80 border-2 border-dashed border-pink-500/30 rounded-3xl hover:border-pink-500/60 transition-all duration-500 bg-black/40 hover:bg-pink-500/5 relative overflow-hidden"
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
                                                        Change File
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center justify-center h-full text-gray-400 group-hover:text-pink-400 transition-all duration-500">
                                                <div className="w-16 h-16 bg-pink-500/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-pink-500/20 transition-all duration-500">
                                                    <Upload className="w-8 h-8" />
                                                </div>
                                                <p className="text-lg font-semibold mb-2">Drop reel video/image</p>
                                                <p className="text-sm text-gray-500">or click to browse files</p>
                                            </div>
                                        )}
                                    </label>
                                </div>
                            </div>

                            {/* Text Context */}
                            <div className="space-y-4">
                                <label className="flex items-center gap-3 text-xl font-bold text-white mb-2">
                                    <div className="p-2 bg-rose-500/10 rounded-lg">
                                        <Wand2 className="w-6 h-6 text-rose-400" />
                                    </div>
                                    Describe Reel Vibe
                                </label>

                                <div className="relative h-80">
                                    <textarea
                                        placeholder="Describe the energy and content. is it a fast-paced transition? A slow cinematic shot? A funny skit?"
                                        value={textPrompt}
                                        onChange={(e) => setTextPrompt(e.target.value)}
                                        className="w-full h-full bg-black/40 backdrop-blur-sm text-white p-6 rounded-3xl border border-pink-500/30 focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10 resize-none placeholder-gray-600 transition-all duration-500 text-lg leading-relaxed"
                                    />
                                    <div className="absolute bottom-6 right-6 px-3 py-1 bg-black/60 rounded-full border border-white/5 text-sm text-gray-500">
                                        {textPrompt.length}/500
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Mood Selection */}
                        <div className="space-y-8">
                            <label className="flex items-center gap-3 text-xl font-bold text-white">
                                <div className="p-2 bg-pink-500/10 rounded-lg">
                                    <Video className="w-6 h-6 text-pink-400" />
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
                                                    ? "bg-pink-600 border-pink-400 text-white shadow-[0_0_30px_rgba(236,72,153,0.4)]"
                                                    : "bg-black/40 border-pink-500/10 text-gray-400 hover:border-pink-500/40 hover:bg-pink-500/5 hover:text-gray-200"
                                                }`}
                                        >
                                            <div className="flex flex-col items-center gap-3 relative z-10 transition-transform duration-300 group-active:scale-95">
                                                <IconComponent className={`w-6 h-6 ${mood === m.name ? "text-white" : "text-pink-400"}`} />
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
                                className="group relative px-12 py-5 bg-gradient-to-r from-pink-500 via-rose-600 to-pink-500 bg-[length:200%_auto] text-white font-bold text-lg rounded-[2rem] hover:bg-right transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_40px_rgba(236,72,153,0.3)] hover:shadow-[0_0_60px_rgba(236,72,153,0.5)] hover:scale-105 active:scale-95 overflow-hidden"
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
                            <div className="relative mt-12 bg-black/40 rounded-[2.5rem] border border-pink-500/30 p-8 shadow-inner overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-700">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-pink-500 to-transparent opacity-50" />

                                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                    <Sparkles className="w-6 h-6 text-pink-400" />
                                    Trending for You
                                </h3>

                                <div className="grid gap-4">
                                    {results.map((track) => (
                                        <div key={track.id} className="group flex items-center justify-between p-4 bg-[#030014] border border-white/5 rounded-2xl hover:border-pink-500/30 transition-all duration-300">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-pink-500/10 rounded-full flex items-center justify-center text-pink-400 group-hover:scale-110 group-hover:bg-pink-500/20 transition-all duration-300">
                                                    <PlayCircle className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <h4 className="text-white font-bold">{track.title}</h4>
                                                    <p className="text-sm text-gray-500">{track.artist} • {track.duration}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                {track.tags.map((tag, i) => (
                                                    <span key={i} className="hidden md:inline-block px-3 py-1 bg-white/5 rounded-full text-xs text-gray-400 border border-white/5">
                                                        {tag}
                                                    </span>
                                                ))}
                                                <button className="p-2 bg-pink-500 text-white rounded-xl hover:bg-pink-400 transition-colors">
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