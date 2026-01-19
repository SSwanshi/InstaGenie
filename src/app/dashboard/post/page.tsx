
import { FileText, Music, Hash, ArrowRight, Sparkles, TrendingUp, Target, Zap, Brain, PenTool, ArrowDown } from "lucide-react";

export default async function PostPage() {
  

  const postFeatures = [
    {
      title: "Caption",
      description: "Generate engaging, AI-powered captions that connect with your audience and boost engagement.",
      icon: <PenTool className="w-8 h-8" />,
      features: ["Smart Writing", "Tone Adjustment", "Emoji Integration", "Call-to-Action"],
      gradient: "from-violet-500 to-purple-600",
      glowColor: "violet-500/20",
      href: "/dashboard/post/caption",
      stats: { generated: "12.5K", engagement: "+45%" }
    },
    {
      title: "Music / Audio",
      description: "Discover trending audio clips and music that perfectly match your post's mood and style.",
      icon: <Music className="w-8 h-8" />,
      features: ["Trending Audio", "Mood Matching", "Copyright Free", "Viral Sounds"],
      gradient: "from-emerald-500 to-teal-600",
      glowColor: "emerald-500/20",
      href: "/dashboard/post/audio",
      stats: { generated: "8.2K", engagement: "+62%" }
    },
    {
      title: "Hashtags",
      description: "Get strategic hashtag suggestions to maximize your reach and connect with your target audience and followers.",
      icon: <Hash className="w-8 h-8" />,
      features: ["Trending Tags", "Niche Targeting", "Reach Optimization", "Competition Analysis"],
      gradient: "from-orange-500 to-red-500",
      glowColor: "orange-500/20",
      href: "/dashboard/post/hashtags",
      stats: { generated: "15.8K", engagement: "+38%" }
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 min-h-[50vh] flex items-center">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-indigo-500/15 to-cyan-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-56 h-56 bg-gradient-to-r from-purple-500/25 to-pink-500/25 rounded-full blur-2xl animate-pulse delay-500"></div>
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }}></div>
          </div>
        </div>

        {/* Header Content */}
        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-lg opacity-75 animate-pulse"></div>
                <div className="relative p-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-2xl">
                  <FileText className="w-10 h-10 text-white" />
                </div>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-6 tracking-tight">
              Post Creator
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 font-medium leading-relaxed max-w-3xl mx-auto">
              Create stunning Instagram posts with AI-powered captions, music, and hashtags
            </p>
          </div>

                    <div className="mt-12">
            <button className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-semibold text-lg shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300">
              <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative flex items-center">
                Choose a Service
                <ArrowDown className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </button>
          </div>
        </div>

        
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Choose Your Post Element
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Select what you want to create for your Instagram post and let AI do the magic
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {postFeatures.map((feature) => (
            <a
              key={feature.title}
              href={feature.href}
              className="group block transform hover:scale-105 transition-all duration-500 hover:shadow-2xl"
            >
              <div className="relative bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl overflow-hidden border border-gray-100 dark:border-slate-700">
                {/* Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                <div className={`absolute -top-2 -left-2 w-32 h-32 bg-${feature.glowColor} rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                {/* Icon */}
                <div className="relative mb-6">
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.gradient} text-white group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    {feature.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-500 group-hover:to-purple-500 transition-all duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {feature.features.map((item, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <div className={`w-2 h-2 bg-gradient-to-r ${feature.gradient} rounded-full mr-2`}></div>
                        {item}
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                      Start Creating
                      <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                    <div className="flex items-center text-xs text-gray-400">
                      <Sparkles className="w-3 h-3 mr-1" />
                      AI Powered
                    </div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full -translate-y-12 translate-x-12 group-hover:scale-150 transition-transform duration-700"></div>
                <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-blue-500/10 to-cyan-500/10 rounded-full translate-y-10 -translate-x-10 group-hover:scale-150 transition-transform duration-700"></div>
              </div>
            </a>
          ))}
        </div>

        {/* Tips Section */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-slate-800 dark:to-slate-700 rounded-3xl p-8 md:p-12">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mb-4">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Pro Tips for Better Posts</h3>
            <p className="text-gray-600 dark:text-gray-300">Maximize your post performance with these AI-powered insights</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm">
              <Target className="w-8 h-8 text-indigo-500 mx-auto mb-4" />
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Describe the background</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">In briefly explain the context of your post and mood of the content.</p>
            </div>
            <div className="text-center p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm">
              <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-4" />
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Follow Trends</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">Stay updated with trending hashtags and audio to boost visibility</p>
            </div>
            <div className="text-center p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm">
              <Zap className="w-8 h-8 text-orange-500 mx-auto mb-4" />
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Optimize Color scheme</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">Maintain the mood by mentioning your color scheme while choosing the audio.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}