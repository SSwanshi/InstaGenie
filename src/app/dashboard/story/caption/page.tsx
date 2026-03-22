"use client";

import { useState } from "react";
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
} from "lucide-react";

const tones = [
  { name: "Casual", icon: Smile },
  { name: "Question", icon: FileText },
  { name: "Poll", icon: Wand2 },
  { name: "Countdown", icon: Sparkles },
  { name: "Aesthetic", icon: Palette },
  { name: "Urgent", icon: Sparkles },
  { name: "Emotional", icon: FileText },
  { name: "Motivational", icon: Wand2 },
  { name: "Funny", icon: Sparkles },
  { name: "Professional", icon: FileText },
];

export default function StoryCaptionPage() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [textPrompt, setTextPrompt] = useState("");
  const [tone, setTone] = useState("Casual");
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

  const handleIncrement = async () => {
    try {
      const res = await fetch("/api/increment-usage", {
        method: "POST",
        body: JSON.stringify({
          type: "story",
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
          type: "story",
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

    try{
        const res = await fetch("/api/generate-caption", {
            method : "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                prompt: textPrompt,
                tone,
                image: imageBase64, 
            }),
        });

        const data = await res.json();

        if(res.ok){
            setCaption(data.caption);
            handleIncrement();
            handleCredits();
        }else{
            console.error(data.error || "API error");
            setCaption("Failed to generate caption. Please try again.");
        }
    } catch(error){
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
            <Smile className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-primary mb-4 tracking-tight">
            Story Caption Generator
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Craft engaging story captions that drive interaction
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
                  Upload Story Image{" "}
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
                          Drop your story image here
                        </p>
                        <p className="text-sm text-muted-foreground">
                          or click to browse files
                        </p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* Text Context */}
              <div className="space-y-4">
                <label className="flex items-center gap-3 text-xl font-bold text-foreground mb-2">
                  <div className="p-2 bg-secondary/10 rounded-lg">
                    <FileText className="w-6 h-6 text-secondary" />
                  </div>
                  Describe Your Story
                </label>

                <div className="relative h-80">
                  <textarea
                    placeholder="What's this story about? Are you asking a question? Sharing a moment? Promoting something?"
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

            {/* Tone Selection */}
            <div className="space-y-8">
              <label className="flex items-center gap-3 text-xl font-bold text-foreground">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Palette className="w-6 h-6 text-primary" />
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
                      className={`group relative p-6 rounded-[2rem] border-2 transition-all duration-500 ${
                        tone === t.name
                          ? "bg-primary border-primary text-primary-foreground shadow-md"
                          : "bg-muted border-border text-muted-foreground hover:border-primary/40 hover:bg-primary/5 hover:text-foreground"
                      }`}
                    >
                      <div className="flex flex-col items-center gap-3 relative z-10 transition-transform duration-300 group-active:scale-95">
                        <IconComponent
                          className={`w-6 h-6 ${tone === t.name ? "text-primary-foreground" : "text-primary"}`}
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
                disabled={loading || (!textPrompt && !file)}
                className="group relative px-12 py-5 bg-primary text-primary-foreground font-bold text-lg rounded-[2rem] hover:opacity-90 transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 overflow-hidden"
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
                        Your Story Caption
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Short &amp; snappy for stories
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
                    {tone} Vibe
                  </span>
                  <span className="px-5 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-bold border border-secondary/10">
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
