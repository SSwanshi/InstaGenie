"use client";

import { useState } from "react";
import Image from "next/image";
import { Upload, ImageIcon, Sparkles, Plus, X, Camera } from "lucide-react";

const moodOptions = [
  "Happy", "Excited", "Playful", "Chill", "Calm", "Aesthetic", 
  "Confident", "Cool", "Bold", "Cute", "Romantic", "Nostalgic", 
  "Travel", "Party", "Casual", "Fitness"
];

const priorityOptions = [
  "Face clarity", "Smile / expression", "Overall looks (how I look)", 
  "Aesthetic / vibes", "Background quality", "Lighting quality", 
  "Sharpness (no blur)", "Group photo quality", "Natural / candid feel", 
  "Pose / confidence"
];

export default function PhotoPickerPage() {
  const [files, setFiles] = useState<(File | null)[]>([null, null]);
  const [previewUrls, setPreviewUrls] = useState<(string | null)[]>([null, null]);
  const [base64Images, setBase64Images] = useState<(string | null)[]>([null, null]);
  const [selectedMood, setSelectedMood] = useState<string>("Aesthetic");
  const [selectedPriority, setSelectedPriority] = useState<string>("Face clarity");
  const [loading, setLoading] = useState(false);
  const [bestPhotoIndex, setBestPhotoIndex] = useState<number | null>(null);
  const [reason, setReason] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const addFileInput = () => {
    if (files.length < 5) {
      setFiles([...files, null]);
      setPreviewUrls([...previewUrls, null]);
      setBase64Images([...base64Images, null]);
    }
  };

  const removeFileInput = (index: number) => {
    if (files.length > 2) {
      const newFiles = [...files];
      const newPreviewUrls = [...previewUrls];
      const newBase64Images = [...base64Images];
      newFiles.splice(index, 1);
      newPreviewUrls.splice(index, 1);
      newBase64Images.splice(index, 1);
      setFiles(newFiles);
      setPreviewUrls(newPreviewUrls);
      setBase64Images(newBase64Images);
    }
  };

  const handleFileChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file.");
      return;
    }

    const newFiles = [...files];
    const newPreviewUrls = [...previewUrls];
    
    newFiles[index] = file;
    newPreviewUrls[index] = URL.createObjectURL(file);
    
    setFiles(newFiles);
    setPreviewUrls(newPreviewUrls);

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result?.toString().split(",")[1];
      if (base64String) {
        const newBase64Images = [...base64Images];
        newBase64Images[index] = base64String;
        setBase64Images(newBase64Images);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleIncrement = async () => {
    try {
      const res = await fetch("/api/increment-usage", {
        method: "POST",
        body: JSON.stringify({
          type: "post",
          field: "hashtagGenerated", // Or similar usage field if photo picker uses specific one, keeping similar to hashtag for now or change to photoPickerUsage based on model
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
    try {
      const res = await fetch("/api/credits-used", {
        method: "POST",
        body: JSON.stringify({
          type: "post",
          field: "hashtagGenerated", // Keeping consistent but recommend updating to mapped field for photo picker
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (res.ok) {
        console.log(`Credits used till now: ${data}`);
      }
    } catch (error) {
      console.error("Request failed:", error);
    }
  };

  const handleGenerate = async () => {
    const validFiles = files.filter(f => f !== null);
    if (validFiles.length < 2) {
      alert("Please upload at least 2 photos to compare.");
      return;
    }

    const validBase64Images = base64Images.filter(img => img !== null);

    setLoading(true);
    setBestPhotoIndex(null);
    setReason(null);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/photo-picker", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          images: validBase64Images,
          mood: selectedMood,
          priority: selectedPriority,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        // Map the API return best_index to the original files index
        // validBase64Images only contain non-null items, so their indices don't directly match files indices
        // Let's create a mapping of valid index to files array index
        const validIndexMap: number[] = [];
        files.forEach((f, i) => {
          if (f !== null) {
            validIndexMap.push(i);
          }
        });

        if (data.best_index !== undefined && data.best_index < validIndexMap.length) {
          setBestPhotoIndex(validIndexMap[data.best_index]);
        }
        if (data.reason) {
          setReason(data.reason);
        }

        handleIncrement();
        handleCredits();
      } else {
        console.error(data.error || "API error");
        setErrorMsg(data.error || "⚠️ Failed to analyze photos. Please try again.");
      }
    } catch (error) {
      console.error("Request failed:", error);
      setErrorMsg("⚠️ Something went wrong trying to connect to the server.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-transparent p-4 relative">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-6 shadow-lg rotate-3">
            <Camera className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-primary mb-4 tracking-tight">
            Photo Picker
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Upload up to 5 photos and let AI choose the best one for your social media based on your mood and priorities.
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-card rounded-[2.5rem] border border-border shadow-xl overflow-hidden mb-12">
          <div className="p-8 md:p-12 space-y-12">
            
            {/* Image Upload Grid */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-primary" />
                  Upload Photos ({files.filter(f => f).length}/{files.length})
                </h3>
                <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
                  Min: 2 • Max: 5
                </span>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {files.map((file, index) => (
                  <div key={index} className={`relative flex flex-col items-center justify-center border-2 border-dashed ${bestPhotoIndex === index ? 'border-green-500 bg-green-500/10' : 'border-border'} rounded-2xl p-4 transition-all duration-300 hover:border-primary/50 aspect-square group`}>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(index, e)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    
                    {previewUrls[index] ? (
                      <div className="absolute inset-0 w-full h-full p-2">
                        <div className="relative w-full h-full rounded-xl overflow-hidden">
                          <Image
                            src={previewUrls[index]!}
                            alt={`Preview ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                        {files.length > 2 && (
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              removeFileInput(index);
                            }}
                            className="absolute top-0 right-0 p-1 bg-destructive text-destructive-foreground rounded-full shadow-md z-20 hover:scale-110 transition-transform -translate-y-1/2 translate-x-1/2"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                        {bestPhotoIndex === index && (
                          <div className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-md z-20 flex items-center gap-1">
                            <Sparkles className="w-3 h-3" /> Best Match
                          </div>
                        )}
                      </div>
                    ) : (
                      <>
                        <Upload className="w-8 h-8 text-muted-foreground mb-3 group-hover:text-primary transition-colors" />
                        <span className="text-sm text-muted-foreground text-center">
                          Upload Photo {index + 1}
                        </span>
                      </>
                    )}
                  </div>
                ))}
                
                {files.length < 5 && (
                  <button
                    onClick={addFileInput}
                    className="flex flex-col items-center justify-center border-2 border-dashed border-border rounded-2xl p-4 transition-all duration-300 hover:border-primary/50 hover:bg-muted/50 aspect-square text-muted-foreground hover:text-primary"
                  >
                    <Plus className="w-8 h-8 mb-2" />
                    <span className="text-sm font-medium">Add More</span>
                  </button>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 pt-8 border-t border-border">
              {/* Mood Selection */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  Select Mood
                </h3>
                <div className="flex flex-wrap gap-2">
                  {moodOptions.map((mood) => (
                    <button
                      key={mood}
                      onClick={() => setSelectedMood(mood)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        selectedMood === mood
                          ? "bg-primary text-primary-foreground shadow-md scale-105"
                          : "bg-muted/50 text-muted-foreground hover:bg-primary/10 hover:text-primary border border-transparent hover:border-primary/20"
                      }`}
                    >
                      {mood}
                    </button>
                  ))}
                </div>
              </div>

              {/* Priority Selection */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Camera className="w-5 h-5 text-primary" />
                  Select Priority
                </h3>
                <div className="flex flex-wrap gap-2">
                  {priorityOptions.map((priority) => (
                    <button
                      key={priority}
                      onClick={() => setSelectedPriority(priority)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        selectedPriority === priority
                          ? "bg-primary text-primary-foreground shadow-md scale-105"
                          : "bg-muted/50 text-muted-foreground hover:bg-primary/10 hover:text-primary border border-transparent hover:border-primary/20"
                      }`}
                    >
                      {priority}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-8 flex flex-col items-center border-t border-border">
              {errorMsg && (
                <div className="mb-6 p-4 w-full max-w-xl bg-destructive/10 border border-destructive/30 rounded-xl flex items-center justify-center text-destructive">
                  <span className="font-medium text-sm">{errorMsg}</span>
                </div>
              )}

              <button
                onClick={handleGenerate}
                disabled={loading || files.filter(f => f).length < 2}
                className={`relative overflow-hidden group px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] ${
                  loading || files.filter(f => f).length < 2
                    ? "bg-muted text-muted-foreground cursor-not-allowed"
                    : "bg-primary text-primary-foreground shadow-xl hover:shadow-primary/25"
                }`}
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                <span className="relative flex items-center gap-2">
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Analyzing Photos...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Find the Best Photo
                    </>
                  )}
                </span>
              </button>

              {reason && (
                <div className="mt-8 p-6 bg-primary/5 rounded-2xl border border-primary/20 max-w-2xl text-center shadow-sm">
                  <h4 className="text-primary font-semibold mb-2 flex items-center justify-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Why this photo?
                  </h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{reason}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
