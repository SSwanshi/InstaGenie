
import { FileText, Music, Smile, ArrowRight, Sparkles, TrendingUp, Target, Zap, Brain, BookOpen } from "lucide-react";

export default async function StoryPage() {

  const storyFeatures = [
    {
      title: "Caption",
      description: "Create compelling story captions that capture attention and drive engagement in seconds.",
      icon: <FileText className="w-8 h-8" />,
      features: ["Quick Captions", "Story Hooks", "Question Starters", "Engagement Drivers"],
      color: "pink",
      href: "/dashboard/story/caption",
    },
    {
      title: "Music / Audio",
      description: "Find the perfect trending audio and music to make your stories stand out and look aesthetic.",
      icon: <Music className="w-8 h-8" />,
      features: ["Trending Audio", "Mood Sync", "Viral Sounds", "Story Beats"],
      color: "cyan",
      href: "/dashboard/story/audio",
    },
    {
      title: "Emoji",
      description: "Enhance your stories with perfectly selected emojis that express emotions and boost interaction.",
      icon: <Smile className="w-8 h-8" />,
      features: ["Emoji Sets", "Emotion Match", "Trending Emojis", "Story Reactions"],
      color: "yellow",
      href: "/dashboard/story/emoji",
    }
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
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
            Choose Your <span className="text-primary">Story Element</span>
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
              className="group block transform hover:-translate-y-2 transition-all duration-300"
            >
              <div className="relative h-full bg-card rounded-[2.5rem] p-8 shadow-xl overflow-hidden border border-border hover:border-primary/40 transition-colors duration-300">

                {/* Icon */}
                <div className="relative mb-8">
                  <div className={`inline-flex p-5 rounded-2xl bg-muted text-foreground group-hover:scale-110 group-hover:bg-primary/10 group-hover:text-primary transition-all duration-300`}>
                    {feature.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-foreground mb-4 transition-all duration-300 group-hover:text-primary">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground mb-8 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-3 mb-8">
                    {feature.features.map((item, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                        <div className={`w-1.5 h-1.5 bg-primary rounded-full mr-2`}></div>
                        {item}
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center text-sm font-semibold text-primary group-hover:text-primary/70 transition-colors duration-300">
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
        <div className="relative bg-card rounded-[3rem] p-8 md:p-16 border border-border overflow-hidden shadow-lg">

          <div className="relative text-center mb-16">
            <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-2xl mb-6">
              <Brain className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-3xl font-bold text-foreground mb-4">Pro Tips for Better Stories</h3>
            <p className="text-muted-foreground text-lg">Maximize your story performance with these AI-powered insights</p>
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group text-center p-8 bg-black/5 dark:bg-black/20 rounded-[2rem] border border-border hover:border-pink-500/30 transition-all duration-300">
              <div className="w-12 h-12 text-pink-400 mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Target className="w-full h-full" />
              </div>
              <h4 className="text-xl font-bold text-foreground mb-3">Keep It Short</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">Stories are meant to be quick - use concise, impactful content.</p>
            </div>
            <div className="group text-center p-8 bg-black/5 dark:bg-black/20 rounded-[2rem] border border-border hover:border-cyan-500/30 transition-all duration-300">
              <div className="w-12 h-12 text-cyan-400 mx-auto mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-full h-full" />
              </div>
              <h4 className="text-xl font-bold text-foreground mb-3">Interactive Elements</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">Add polls, questions, and stickers to boost engagement.</p>
            </div>
            <div className="group text-center p-8 bg-black/5 dark:bg-black/20 rounded-[2rem] border border-border hover:border-yellow-500/30 transition-all duration-300">
              <div className="w-12 h-12 text-yellow-400 mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-full h-full" />
              </div>
              <h4 className="text-xl font-bold text-foreground mb-3">Post Consistently</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">Regular story posting keeps your audience engaged.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
