import { Camera, Video, FileText, Sparkles, ArrowRight, LayoutDashboard, MessageSquare, Image as ImageIcon } from "lucide-react";

export default function DashboardPage() {
  const mainContentTypes = [
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
    },
  ];

  const additionalContentTypes = [
    {
      title: "Comment Service",
      description: "Generate engaging comments and smart replies for Instagram posts and stories",
      icon: <MessageSquare className="w-8 h-8" />,
      features: ["Comment on a post or story", "Reply a comment", "Tone Customization"],
      gradient: "from-green-500 to-emerald-500",
      href: "/dashboard/comment-generator"
    },
    {
      title: "Photo Picker",
      description: "Choose the best photo among many with AI analysis based on mood and priorities",
      icon: <ImageIcon className="w-8 h-8" />,
      features: ["Choose Best Photo", "Mood Detection", "Quality Analysis"],
      gradient: "from-indigo-500 to-purple-500",
      href: "/dashboard/photo-picker"
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
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
            Create Your <span className="text-primary">Content</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Choose what type of content you want to create with AI assistance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mainContentTypes.map((type) => (
            <a
              key={type.title}
              href={type.href}
              className="group block transform hover:-translate-y-2 transition-all duration-500"
            >
              <div className="relative h-full bg-card rounded-[2.5rem] p-8 shadow-lg overflow-hidden border border-border hover:border-primary/40 transition-colors duration-500">
                {/* Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${type.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>

                {/* Icon */}
                <div className="relative mb-8">
                  <div className={`inline-flex p-5 rounded-2xl bg-gradient-to-r ${type.gradient} text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-md`}>
                    {type.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-all duration-300">
                    {type.title}
                  </h3>
                  <p className="text-muted-foreground mb-8 leading-relaxed">
                    {type.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-3 mb-8">
                    {type.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                        <div className={`w-1.5 h-1.5 bg-gradient-to-r ${type.gradient} rounded-full mr-3`}></div>
                        {feature}
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center text-sm font-semibold text-primary group-hover:text-primary/80 transition-colors duration-300">
                      Get Started
                      <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                    <div className="flex items-center text-[10px] uppercase tracking-wider text-muted-foreground">
                      <Sparkles className="w-3 h-3 mr-1 text-primary" />
                      AI
                    </div>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Additional Services - Centered */}
        <div className="mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {additionalContentTypes.map((type) => (
              <a
                key={type.title}
                href={type.href}
                className="group block transform hover:-translate-y-2 transition-all duration-500"
              >
                <div className="relative h-full bg-card rounded-[2.5rem] p-8 shadow-lg overflow-hidden border border-border hover:border-primary/40 transition-colors duration-500">
                  {/* Glow Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${type.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                  <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>

                  {/* Icon */}
                  <div className="relative mb-8">
                    <div className={`inline-flex p-5 rounded-2xl bg-gradient-to-r ${type.gradient} text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-md`}>
                      {type.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-all duration-300">
                      {type.title}
                    </h3>
                    <p className="text-muted-foreground mb-8 leading-relaxed">
                      {type.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-3 mb-8">
                      {type.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                          <div className={`w-1.5 h-1.5 bg-gradient-to-r ${type.gradient} rounded-full mr-3`}></div>
                          {feature}
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex items-center text-sm font-semibold text-primary group-hover:text-primary/80 transition-colors duration-300">
                        Get Started
                        <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                      <div className="flex items-center text-[10px] uppercase tracking-wider text-muted-foreground">
                        <Sparkles className="w-3 h-3 mr-1 text-primary" />
                        AI
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-foreground mb-8 tracking-tight">More to come...</h2>
          <div className="bg-card rounded-[2.5rem] p-1 border border-border shadow-lg">
            <div className="bg-background rounded-[2.25rem] p-12 text-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <div className="relative z-10">
                <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-500">
                  <LayoutDashboard className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3">Layout suggestions</h3>
                <p className="text-muted-foreground text-lg max-w-md mx-auto">New Layout suggestions and templates. Feature coming soon...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}