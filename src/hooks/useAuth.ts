import { useState, useEffect } from "react";

type PlanType = "free" | "genie" | "geniepro";

interface StoryService {
  captionGenerated: number;
  musicSuggested: number;
  emojiSuggested: number;
}

interface PostService {
  captionGenerated: number;
  musicSuggested: number;
  hashtagGenerated: number;
}

interface ReelService {
  captionGenerated: number;
  musicSuggested: number;
  hashtagGenerated: number;
  descriptionGenerated: number;
  topicSuggested: number;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  credits: number;
  isPremium: boolean;
  plan: PlanType;
  planExpiryDays: number;
  avatar: string;

  storyService: StoryService;
  postService: PostService;
  reelService: ReelService;

  creditsUsed: number;

  createdAt: string;
  updatedAt: string;
}

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/protected", {
          credentials: "include",
          cache: "no-store",
        });
        
        if (res.ok) {
          const data = await res.json();
          setIsAuthenticated(true);
          setUser(data.user); 
        } else {
          setIsAuthenticated(false);
        }
      } catch {
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  return { isAuthenticated, user, isLoading };
}