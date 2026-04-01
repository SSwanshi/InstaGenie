"use client";

import React, { useState } from "react";
import { MessageSquare, Image as ImageIcon, AlignLeft, Sparkles, Copy, ArrowLeft, Send, PenTool } from "lucide-react";

type ServiceType = "comment" | "reply" | null;

const COMMENT_TONES = [
  "Friendly", "Casual", "Funny", "Playful", "Flirty", "Sarcastic", "Polite",
  "Supportive", "Encouraging", "Appreciative", "Confident", "Chill",
  "Energetic", "Teasing", "Formal"
];

const REPLY_TONES = [
  "Friendly", "Casual", "Funny", "Playful", "Polite", "Appreciative",
  "Grateful", "Supportive", "Encouraging", "Confident", "Chill",
  "Energetic", "Teasing", "Respectful", "Professional", "Roast"
];

export default function CommentServicePage() {
  const [activeService, setActiveService] = useState<ServiceType>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [results, setResults] = useState<string[]>([]);
  
  // States for Comment on Post/Story
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [commentContext, setCommentContext] = useState("");
  const [commentTone, setCommentTone] = useState("Friendly");

  // States for Reply to Comment
  const [commentText, setCommentText] = useState("");
  const [contextText, setContextText] = useState("");
  const [replyTone, setReplyTone] = useState("Friendly");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    }
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // Optional: Add a toast notification here
      alert("Copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleIncrement = async () => {
    try {
      const res = await fetch("/api/increment-usage", {
        method: "POST",
        body: JSON.stringify({
          type: "comments",
          field: "commentGenerated"
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
          type: "comments",
          field: "commentGenerated"
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
    setIsGenerating(true);
    try {
      if (activeService === "comment") {
        // For comment service
        if (!imageFile) {
          alert("Please upload an image");
          setIsGenerating(false);
          return;
        }

        // Convert image to base64
        const reader = new FileReader();
        reader.onload = async () => {
          const base64Image = (reader.result as string).split(",")[1];
          
          const response = await fetch("/api/generate-comments", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              image: base64Image,
              tone: commentTone,
              prompt: commentContext,
            }),
          });

          const data = await response.json();
          
          if (response.ok) {
            // Split comments by newlines or filter empty lines
            const commentsList = data.comments
              .split("\n")
              .map((comment: string) => comment.trim())
              .filter((comment: string) => comment.length > 0);
            setResults(commentsList);
            handleIncrement();
            handleCredits();
          } else {
            alert(data.error || "Failed to generate comments");
          }
          setIsGenerating(false);
        };
        
        reader.onerror = () => {
          alert("Error reading image");
          setIsGenerating(false);
        };
        
        reader.readAsDataURL(imageFile);
      } else if (activeService === "reply") {
        // For reply service
        const response = await fetch("/api/generate-reply", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: commentText,
            tone: replyTone,
            context: contextText,
          }),
        });

        const data = await response.json();
        
        if (response.ok) {
          // Split replies by newlines or filter empty lines
          const repliesList = data.reply
            .split("\n")
            .map((reply: string) => reply.trim())
            .filter((reply: string) => reply.length > 0);
          setResults(repliesList);
          handleIncrement();
          handleCredits();
        } else {
          alert(data.error || "Failed to generate reply");
        }
        setIsGenerating(false);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred");
      setIsGenerating(false);
    }
  };

  // Selector View
  if (!activeService) {
    return (
      <div className="min-h-screen bg-transparent relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
              Choose Your <span className="text-primary">Comment Service</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Select a service below to generate engaging comments or smart replies using AI.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Comment on Post/Story Card */}
            <button
              onClick={() => setActiveService("comment")}
              className="group block text-left w-full transform hover:-translate-y-2 transition-all duration-500"
            >
              <div className="relative h-full bg-card rounded-[2.5rem] p-8 shadow-lg overflow-hidden border border-border hover:border-primary/40 transition-colors duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>
                
                <div className="relative mb-8">
                  <div className="inline-flex p-5 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-md">
                    <ImageIcon className="w-8 h-8" />
                  </div>
                </div>

                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-all duration-300">
                    Comment on a post or story
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    Upload a screenshot and let AI generate the perfect reaction perfectly tailored to the image tone.
                  </p>
                  <div className="flex items-center text-sm font-semibold text-primary group-hover:text-primary/80 transition-colors duration-300">
                    Start Creating <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                  </div>
                </div>
              </div>
            </button>

            {/* Reply a Comment Card */}
            <button
              onClick={() => setActiveService("reply")}
              className="group block text-left w-full transform hover:-translate-y-2 transition-all duration-500"
            >
              <div className="relative h-full bg-card rounded-[2.5rem] p-8 shadow-lg overflow-hidden border border-border hover:border-primary/40 transition-colors duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-600 opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>
                
                <div className="relative mb-8">
                  <div className="inline-flex p-5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-md">
                    <MessageSquare className="w-8 h-8" />
                  </div>
                </div>

                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-all duration-300">
                    Reply a comment
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    Paste the comment you want to reply to, add optional context, and get AI-generated smart replies.
                  </p>
                  <div className="flex items-center text-sm font-semibold text-primary group-hover:text-primary/80 transition-colors duration-300">
                    Start Creating <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Common Layout for Both Services
  return (
    <div className="min-h-screen bg-transparent py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <button
        onClick={() => {
          setActiveService(null);
          setResults([]);
        }}
        className="flex items-center text-muted-foreground hover:text-foreground transition-colors mb-8 group"
      >
        <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
        Back to Services
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Form Panel */}
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-[2rem] p-6 sm:p-8 shadow-sm relative overflow-hidden">
            <h2 className="text-2xl font-bold flex items-center gap-3 mb-6">
              {activeService === "comment" ? (
                <><ImageIcon className="text-primary" /> Comment on Post / Story</>
              ) : (
                <><MessageSquare className="text-primary" /> Reply a Comment</>
              )}
            </h2>

            {/* Comment Service - Image Upload */}
            {activeService === "comment" && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Upload the screenshot of the post or story</label>
                  <div className="w-full flex justify-center px-6 pt-5 pb-6 border-2 border-border border-dashed rounded-xl hover:border-primary/50 transition-colors bg-muted/30">
                    <div className="space-y-1 text-center">
                      {imagePreview ? (
                        <div className="relative mx-auto w-32 h-32 mb-4">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={imagePreview} alt="Preview" className="rounded-lg object-cover w-full h-full" />
                        </div>
                      ) : (
                        <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
                      )}
                      <div className="flex text-sm text-muted-foreground justify-center">
                        <label className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary/80 focus-within:outline-none">
                          <span>{imagePreview ? 'Change Image' : 'Upload a file'}</span>
                          <input type="file" className="sr-only" accept="image/*" onChange={handleImageChange} />
                        </label>
                      </div>
                      <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 5MB</p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                    <AlignLeft className="w-4 h-4 text-primary" /> Context (Optional)
                  </label>
                  <textarea
                    value={commentContext}
                    onChange={(e) => setCommentContext(e.target.value)}
                    className="w-full bg-muted/50 border border-border rounded-xl p-4 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all placeholder:text-muted-foreground resize-none h-24"
                    placeholder="Any additional context about the post?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" /> Select Tone
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {COMMENT_TONES.map(t => (
                      <button
                        key={t}
                        onClick={() => setCommentTone(t)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                          commentTone === t 
                            ? "bg-primary text-primary-foreground shadow-md scale-105" 
                            : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Reply Service - Text Inputs */}
            {activeService === "reply" && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-primary" /> Comment to reply to
                  </label>
                  <textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="w-full bg-muted/50 border border-border rounded-xl p-4 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all placeholder:text-muted-foreground resize-none h-32"
                    placeholder="Paste the comment here..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                    <AlignLeft className="w-4 h-4 text-primary" /> Context (Optional)
                  </label>
                  <textarea
                    value={contextText}
                    onChange={(e) => setContextText(e.target.value)}
                    className="w-full bg-muted/50 border border-border rounded-xl p-4 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all placeholder:text-muted-foreground resize-none h-24"
                    placeholder="Any context about the conversation?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" /> Select Tone
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {REPLY_TONES.map(t => (
                      <button
                        key={t}
                        onClick={() => setReplyTone(t)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                          replyTone === t 
                            ? "bg-primary text-primary-foreground shadow-md scale-105" 
                            : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={handleGenerate}
              disabled={isGenerating || (activeService === 'comment' && !imageFile) || (activeService === 'reply' && !commentText.trim())}
              className="mt-8 w-full flex items-center justify-center gap-2 py-4 px-6 bg-primary text-primary-foreground rounded-xl font-bold text-lg hover:bg-primary/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(var(--primary),0.3)] hover:shadow-[0_0_30px_rgba(var(--primary),0.5)]"
            >
              {isGenerating ? (
                <div className="w-6 h-6 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              ) : (
                <><PenTool className="w-5 h-5" /> Generate Reply</>
              )}
            </button>
          </div>
        </div>

        {/* Results Panel */}
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-[2rem] p-6 sm:p-8 shadow-sm h-full flex flex-col">
            <h3 className="text-xl font-bold flex items-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-primary" /> Generated Results
            </h3>
            
            <div className="flex-1 space-y-4">
              {results.length > 0 ? (
                results.map((res, index) => (
                  <div key={index} className="group relative bg-muted/30 border border-border rounded-xl p-5 hover:border-primary/30 transition-all duration-300">
                    <p className="text-foreground text-sm leading-relaxed pr-10 whitespace-pre-wrap">{res}</p>
                    <button
                      onClick={() => handleCopy(res)}
                      className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
                      title="Copy to clipboard"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                ))
              ) : (
                <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-muted-foreground border-2 border-dashed border-border rounded-xl bg-muted/10">
                  <Send className="w-12 h-12 mb-4 text-muted-foreground/50" />
                  <p className="text-center font-medium">Your generated replies</p>
                  <p className="text-sm text-center px-4 mt-2 opacity-70">
                    Fill out the form and click generate to see AI suggestions here.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
