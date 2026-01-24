import { FileText, Music, ArrowRight, Sparkles, TrendingUp, Target, Zap, Brain, BookOpen, Hash, Text, CircleFadingPlus } from "lucide-react";

export default async function StoryPage() {

  const storyFeatures = [
    {
      title: "Caption",
      description: "Create compelling reel video captions that capture attention and drive engagement in seconds",
      icon: <FileText className="w-8 h-8" />,
      features: ["Quick Captions", "Story Hooks", "Question Starters", "Engagement Drivers"],
      gradient: "from-pink-500 to-rose-600",
      glowColor: "pink-500/20",
      href: "/dashboard/story/caption",
    },
    {
      title: "Music / Audio",
      description: "Find the perfect trending audio and music to make your reel stand out and look aesthetic",
      icon: <Music className="w-8 h-8" />,
      features: ["Trending Audio", "Mood Sync", "Viral Sounds", "Story Beats"],
      gradient: "from-cyan-500 to-blue-600",
      glowColor: "cyan-500/20",
      href: "/dashboard/story/audio",
    },
    {
      title: "Hashtags",
      description: "Get strategic hashtag suggestions to maximize your reach and connect with your target audience and followers.",
      icon: <Hash className="w-8 h-8" />,
      features: ["Trending Tags", "Niche Targeting", "Reach Optimization", "Competition Analysis"],
      gradient: "from-orange-500 to-red-500",
      glowColor: "orange-500/20",
      href: "/dashboard/post/hashtags",
    },
    {
      title: "Description",
      description: "Craft a compelling description that teases the value, emotion, or surprise in your reel hook your viewers before they hit play!",
      icon: <Text className="w-8 h-8" />,
      features: ["Quick Captions", "Story Hooks", "Question Starters", "Engagement Drivers"],
      gradient: "from-pink-500 to-rose-600",
      glowColor: "pink-500/20",
      href: "/dashboard/story/caption",
    },
    {
      title: "Trendy Topics",
      description: "Leverage viral trends by picking a hot topic that aligns with your niche ride the wave while it’s still rising!",
      icon: <CircleFadingPlus className="w-8 h-8" />,
      features: ["Quick Captions", "Story Hooks", "Question Starters", "Engagement Drivers"],
      gradient: "from-pink-500 to-rose-600",
      glowColor: "pink-500/20",
      href: "/dashboard/story/caption",
    },
  ];

  return (
    <div className="min-h-screen bg-transparent relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Choose Your <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">Reel Element</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Select what you want to create for your Instagram story and let AI do the magic
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {storyFeatures.map((feature) => (
            <a
              key={feature.title}
              href={feature.href}
              className="group block transform hover:-translate-y-2 transition-all duration-500"
            >
              <div className="relative h-full bg-[#130b24]/50 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-2xl overflow-hidden border border-purple-500/20 hover:border-purple-500/40 transition-colors duration-500">
                {/* Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                <div className="absolute -top-24 -left-24 w-48 h-48 bg-purple-600/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>

                {/* Icon */}
                <div className="relative mb-8">
                  <div className={`inline-flex p-5 rounded-2xl bg-gradient-to-r ${feature.gradient} text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-[0_0_20px_rgba(168,85,247,0.4)]`}>
                    {feature.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-indigo-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 mb-8 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-3 mb-8">
                    {feature.features.map((item, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-sm text-gray-400">
                        <div className={`w-1.5 h-1.5 bg-gradient-to-r ${feature.gradient} rounded-full mr-2 shadow-[0_0_8px_rgba(168,85,247,0.6)]`}></div>
                        {item}
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <div className="flex items-center text-sm font-semibold text-purple-400 group-hover:text-purple-300 transition-colors duration-300">
                      Start Creating
                      <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                    <div className="flex items-center text-[10px] uppercase tracking-wider text-gray-500">
                      <Sparkles className="w-3 h-3 mr-1 text-purple-500" />
                      AI Powered
                    </div>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Tips Section */}
        <div className="relative bg-[#0f0720]/40 backdrop-blur-md rounded-[3rem] p-8 md:p-16 border border-white/5 overflow-hidden shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)]">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 blur-[80px] -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-600/10 blur-[80px] -ml-32 -mb-32" />

          <div className="relative text-center mb-16">
            <div className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl mb-6 shadow-lg shadow-purple-500/20">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">Pro Tips for Better Reels</h3>
            <p className="text-gray-400 text-lg">Maximize your reel performance with these AI-powered insights</p>
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group text-center p-8 bg-black/20 rounded-[2rem] border border-white/5 hover:border-pink-500/30 transition-all duration-300">
              <div className="w-12 h-12 text-pink-400 mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Target className="w-full h-full" />
              </div>
              <h4 className="text-xl font-bold text-white mb-3">Keep It Short</h4>
              <p className="text-sm text-gray-400 leading-relaxed">Reels are meant to be quick - use concise, impactful content.</p>
            </div>
            <div className="group text-center p-8 bg-black/20 rounded-[2rem] border border-white/5 hover:border-cyan-500/30 transition-all duration-300">
              <div className="w-12 h-12 text-cyan-400 mx-auto mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-full h-full" />
              </div>
              <h4 className="text-xl font-bold text-white mb-3">Interactive Elements</h4>
              <p className="text-sm text-gray-400 leading-relaxed">Add polls, questions, and stickers to boost engagement.</p>
            </div>
            <div className="group text-center p-8 bg-black/20 rounded-[2rem] border border-white/5 hover:border-yellow-500/30 transition-all duration-300">
              <div className="w-12 h-12 text-yellow-400 mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-full h-full" />
              </div>
              <h4 className="text-xl font-bold text-white mb-3">Post Consistently</h4>
              <p className="text-sm text-gray-400 leading-relaxed">Regular reel posting keeps your audience engaged.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
