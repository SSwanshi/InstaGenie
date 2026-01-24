import { currentUser } from "@clerk/nextjs/server";
import { Camera, Video, FileText, Sparkles, ArrowRight, ArrowDown, LayoutDashboard } from "lucide-react";

export default async function DashboardPage() {
  const user = await currentUser();

  const contentTypes = [
    {
      title: "Post",
      description: "Generate AI-powered captions, hashtags, and descriptions for your Instagram posts",
      icon: <Camera className="w-8 h-8" />,
      features: ["Smart Captions", "Trending Hashtags", "Engagement Boost"],
      gradient: "from-purple-500 to-pink-500",
      href: "/dashboard/post"
    },
    {
      title: "Story",
      description: "Create engaging story content with AI-generated captions and music suggestions",
      icon: <FileText className="w-8 h-8" />,
      features: ["Story Captions", "Music Matching", "Audience Targeting"],
      gradient: "from-blue-500 to-cyan-500",
      href: "/dashboard/story"
    },
    {
      title: "Reel",
      description: "Craft viral reels with AI-suggested scripts, hashtags, and audio recommendations",
      icon: <Video className="w-8 h-8" />,
      features: ["Viral Scripts", "Audio Suggestions", "Trending Topics"],
      gradient: "from-orange-500 to-red-500",
      href: "/dashboard/reel"
    }
  ];

  return (
    <div className="min-h-screen bg-transparent relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 relative z-10">

        {/* Content Type Cards */}
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Create Your <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">Content</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl">
            Choose what type of content you want to create with AI assistance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {contentTypes.map((type) => (
            <a
              key={type.title}
              href={type.href}
              className="group block transform hover:-translate-y-2 transition-all duration-500"
            >
              <div className="relative h-full bg-[#130b24]/50 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-2xl overflow-hidden border border-purple-500/20 hover:border-purple-500/40 transition-colors duration-500">
                {/* Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${type.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                <div className="absolute -top-24 -left-24 w-48 h-48 bg-purple-600/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>

                {/* Icon */}
                <div className="relative mb-8">
                  <div className={`inline-flex p-5 rounded-2xl bg-gradient-to-r ${type.gradient} text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-[0_0_20px_rgba(168,85,247,0.4)]`}>
                    {type.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-indigo-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                    {type.title}
                  </h3>
                  <p className="text-gray-400 mb-8 leading-relaxed">
                    {type.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-3 mb-8">
                    {type.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-sm text-gray-400">
                        <div className={`w-1.5 h-1.5 bg-gradient-to-r ${type.gradient} rounded-full mr-3 shadow-[0_0_8px_rgba(168,85,247,0.6)]`}></div>
                        {feature}
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <div className="flex items-center text-sm font-semibold text-purple-400 group-hover:text-purple-300 transition-colors duration-300">
                      Get Started
                      <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                    <div className="flex items-center text-[10px] uppercase tracking-wider text-gray-500">
                      <Sparkles className="w-3 h-3 mr-1 text-purple-500" />
                      AI
                    </div>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-white mb-8 tracking-tight">More to come...</h2>
          <div className="bg-[#130b24]/40 backdrop-blur-md rounded-[2.5rem] p-1 border border-purple-500/20 shadow-2xl">
            <div className="bg-[#030014]/50 rounded-[2.25rem] p-12 text-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <div className="relative z-10">
                <div className="w-20 h-20 bg-purple-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:bg-purple-500/20 transition-all duration-500">
                  <LayoutDashboard className="w-10 h-10 text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Layout suggestions</h3>
                <p className="text-gray-400 text-lg max-w-md mx-auto">New Layout suggestions and templates. Feature coming soon...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}