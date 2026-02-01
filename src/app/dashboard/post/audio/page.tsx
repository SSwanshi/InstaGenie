"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
    Upload,
    Image as ImageIcon,
    Sparkles,
    Wand2,
    Music,
    Copy,
    Check
} from "lucide-react";

const moods = [
    { name: "Energetic", icon: Sparkles },
    { name: "Chill", icon: Music },
    { name: "Dramatic", icon: Wand2 },
    { name: "Happy", icon: Sparkles },
    { name: "Dark", icon: Music },
    { name: "Romantic", icon: Wand2 },
];

export default function PostAudioPage() {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [textPrompt, setTextPrompt] = useState("");
    const [mood, setMood] = useState("Energetic");
    const [audio, setAudio] = useState<string | null>(null);
    const [imageBase64, setImageBase64] = useState<string | null>(null);
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
    ;
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        return () => {
            if (previewUrl) URL.revokeObjectURL(previewUrl);
        };
    }, [previewUrl]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (!selectedFile) return;

        if (selectedFile.size > 5 * 1024 * 1024) {
            alert("Image must be under 5MB");
            return;
        }

        setPreviewUrl(URL.createObjectURL(selectedFile));

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result
                ?.toString()
                .split(",")[1];
            setImageBase64(base64String || null);
        };
        reader.readAsDataURL(selectedFile);
    };

    const handleGenerate = async () => {
        setLoading(true);
        setAudio(null);

        try {
            const res = await fetch("/api/generate-audio", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    prompt: textPrompt,
                    mood,
                    image: imageBase64,
                }),
            });

            const data = await res.json();

            if (res.ok) {
                setAudio(data.audio);
            } else {
                setAudio("Failed to generate audio. Please try again.");
            }
        } catch (error) {
            console.error(error);
            setAudio("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };


    const audioList = audio
        ? audio
            .split("\n")
            .map(line => line.trim())
            .filter(Boolean)
        : [];


    return (
        <div className="min-h-screen bg-transparent p-4 relative">
            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-6 rotate-3">
                        <Music className="w-8 h-8 text-primary" />
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
                        AI Music Matcher
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
                        Find the perfect viral audio for your post based on visual and context
                    </p>
                </div>

                {/* Main Content */}
                <div className="bg-card rounded-[2.5rem] border border-border shadow-xl overflow-hidden mb-12">
                    <div className="p-8 md:p-12 space-y-12">

                        {/* Upload and Text Input */}
                        <div className="grid lg:grid-cols-2 gap-12">

                            {/* Image Upload */}
                            <div className="space-y-4">
                                <label className="flex items-center gap-3 text-xl font-bold text-foreground mb-2">
                                    <div className="p-2 bg-primary/10 rounded-lg">
                                        <ImageIcon className="w-6 h-6 text-primary" />
                                    </div>
                                    Upload Post Image
                                    <span className="text-sm font-normal text-muted-foreground ml-2">
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
                                        className="cursor-pointer block w-full h-80 border-2 border-dashed border-primary/30 rounded-3xl hover:border-primary/60 transition-all duration-500 bg-black/5 dark:bg-black/40 hover:bg-primary/5 relative overflow-hidden"
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
                                            <div className="flex flex-col items-center justify-center h-full text-muted-foreground group-hover:text-primary transition-all duration-500">
                                                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-500">
                                                    <Upload className="w-8 h-8" />
                                                </div>
                                                <p className="text-lg font-semibold mb-2">
                                                    Drop your post image here
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    or click to browse files
                                                </p>
                                            </div>
                                        )}
                                    </label>
                                </div>
                            </div>

                            {/* Text Prompt */}
                            <div className="space-y-4">
                                <label className="flex items-center gap-3 text-xl font-bold text-foreground mb-2">
                                    <div className="p-2 bg-secondary/10 rounded-lg">
                                        <Wand2 className="w-6 h-6 text-secondary" />
                                    </div>
                                    Describe the Vibe
                                </label>

                                <div className="relative h-80">
                                    <textarea
                                        value={textPrompt}
                                        onChange={(e) =>
                                            e.target.value.length <= 500 &&
                                            setTextPrompt(e.target.value)
                                        }
                                        placeholder="Describe the mood you want. Melancholic? Upbeat? Background music for a tutorial?"
                                        className="w-full h-full bg-black/5 dark:bg-black/40 backdrop-blur-sm text-foreground p-6 rounded-3xl border border-primary/30 focus:border-primary focus:ring-4 focus:ring-primary/10 resize-none placeholder-muted-foreground transition-all duration-500 text-lg leading-relaxed"
                                    />
                                    <div className="absolute bottom-6 right-6 px-3 py-1 bg-black/60 rounded-full border border-border text-sm text-muted-foreground">
                                        {textPrompt.length}/500
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Mood */}
                        <div className="space-y-8">
                            <label className="flex items-center gap-3 text-xl font-bold text-foreground">
                                <div className="p-2 bg-primary/10 rounded-lg">
                                    <Music className="w-6 h-6 text-primary" />
                                </div>
                                Detailed Mood
                            </label>

                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                                {moods.map((m) => {
                                    const Icon = m.icon;
                                    return (
                                        <button
                                            key={m.name}
                                            onClick={() => setMood(m.name)}
                                            className={`group relative p-6 rounded-[2rem] border-2 transition-all duration-300 ${mood === m.name
                                                ? "bg-primary border-primary text-primary-foreground"
                                                : "bg-muted border-transparent text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                                                }`}
                                        >
                                            <div className="flex flex-col items-center gap-3">
                                                <Icon
                                                    className={`w-6 h-6 ${mood === m.name
                                                        ? "text-primary-foreground"
                                                        : "text-primary"
                                                        }`}
                                                />
                                                <span className="font-bold text-sm tracking-wide">
                                                    {m.name}
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
                                disabled={loading || (!textPrompt && !imageBase64)}
                                className="group relative px-12 py-5 bg-primary text-primary-foreground font-bold text-lg rounded-[2rem] hover:opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:scale-105 active:scale-95 overflow-hidden"
                            >
                                {loading ? "Finding Tracks..." : "Find Audio"}
                            </button>
                        </div>

                        {/* Result */}
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
        bg-black/30 hover:bg-purple-500/10
        border border-transparent hover:border-purple-500/30
        transition-all duration-300
      "
                                        >
                                            {/* Track name */}
                                            <span
                                                className="
          flex-1
          text-lg font-semibold tracking-wide
          text-foreground
          group-hover:text-purple-300
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
          bg-purple-500/10 hover:bg-purple-500/20
          border-purple-500/20
          text-purple-400 hover:text-purple-300
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
                                    <span className="px-5 py-2 bg-purple-500/10 text-purple-400 rounded-full text-sm font-bold border border-purple-500/10">
                                        {mood} Mood
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
