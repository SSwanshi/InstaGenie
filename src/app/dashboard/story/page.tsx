
import { FileText, Music, Smile, ArrowRight, Sparkles, TrendingUp, Target, Zap, Brain, BookOpen } from "lucide-react";

export default async function StoryPage() {

  const storyFeatures = [
    {
      title: "Caption",
      description: "Create compelling story captions that capture attention and drive engagement in seconds.",
      icon: <FileText className="w-8 h-8" />,
      features: ["Quick Captions", "Story Hooks", "Question Starters", "Engagement Drivers"],
      gradient: "from-pink-500 to-rose-600",
      glowColor: "pink-500/20",
      href: "/dashboard/story/caption",
    },
    {
      title: "Music / Audio",
      description: "Find the perfect trending audio and music to make your stories stand out and look aesthetic.",
      icon: <Music className="w-8 h-8" />,
      features: ["Trending Audio", "Mood Sync", "Viral Sounds", "Story Beats"],
      gradient: "from-cyan-500 to-blue-600",
      glowColor: "cyan-500/20",
      href: "/dashboard/story/audio",
    },
    {
      title: "Emoji",
      description: "Enhance your stories with perfectly selected emojis that express emotions and boost interaction.",
      icon: <Smile className="w-8 h-8" />,
      features: ["Emoji Sets", "Emotion Match", "Trending Emojis", "Story Reactions"],
      gradient: "from-yellow-500 to-orange-500",
      glowColor: "yellow-500/20",
      href: "/dashboard/story/emoji",
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-pink-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-pink-900 to-slate-900 min-h-[50vh] flex items-center">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-rose-500/15 to-cyan-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
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
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full blur-lg opacity-75 animate-pulse"></div>
                <div className="relative p-4 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full shadow-2xl">
                  <BookOpen className="w-10 h-10 text-white" />
                </div>
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-pink-200 to-purple-200 bg-clip-text text-transparent mb-6 tracking-tight">
              Story Creator
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 font-medium leading-relaxed max-w-3xl mx-auto">
              Create engaging Instagram stories with AI-powered captions, music, and emojis
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Choose Your Story Element
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Select what you want to create for your Instagram story and let AI do the magic
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {storyFeatures.map((feature) => (
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
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:to-purple-500 transition-all duration-300">
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
                    <div className="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors duration-300">
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
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-full -translate-y-12 translate-x-12 group-hover:scale-150 transition-transform duration-700"></div>
                <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-rose-500/10 to-cyan-500/10 rounded-full translate-y-10 -translate-x-10 group-hover:scale-150 transition-transform duration-700"></div>
              </div>
            </a>
          ))}
        </div>

        {/* Tips Section */}
        <div className="bg-gradient-to-r from-pink-50 to-purple-50 dark:from-slate-800 dark:to-slate-700 rounded-3xl p-8 md:p-12">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full mb-4">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Pro Tips for Better Stories</h3>
            <p className="text-gray-600 dark:text-gray-300">Maximize your story performance with these AI-powered insights</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm">
              <Target className="w-8 h-8 text-pink-500 mx-auto mb-4" />
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Keep It Short</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">Stories are meant to be quick - use concise, impactful content</p>
            </div>
            <div className="text-center p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm">
              <TrendingUp className="w-8 h-8 text-cyan-500 mx-auto mb-4" />
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Use Interactive Elements</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">Add polls, questions, and stickers to boost engagement</p>
            </div>
            <div className="text-center p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm">
              <Zap className="w-8 h-8 text-yellow-500 mx-auto mb-4" />
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Post Consistently</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">Regular story posting keeps your audience engaged</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}