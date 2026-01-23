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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">

        {/* Content Type Cards */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Choose content type</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">Choose what type of content you want to create with AI assistance</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {contentTypes.map((type) => (
            <a
              key={type.title}
              href={type.href}
              className="group block transform hover:scale-105 transition-all duration-300 hover:shadow-2xl"
            >
              <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg overflow-hidden">
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${type.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>

                {/* Icon */}
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${type.gradient} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {type.icon}
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-pink-500 transition-all duration-300">
                    {type.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    {type.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2 mb-6">
                    {type.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <div className="w-1.5 h-1.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-3"></div>
                        {feature}
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="flex items-center text-sm font-medium text-gray-600 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-500/10 to-cyan-500/10 rounded-full translate-y-12 -translate-x-12 group-hover:scale-150 transition-transform duration-700"></div>
              </div>
            </a>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">More to come...</h2>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <LayoutDashboard />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Layout suggestions</h3>
              <p className="text-gray-500 dark:text-gray-400">New Layout suggestions and templates. Feature coming soon...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}