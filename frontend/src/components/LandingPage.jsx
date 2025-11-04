import React, { useEffect } from 'react';
import { Code2, Trophy, TrendingUp, BarChart3, Users, Zap, ArrowRight, CheckCircle } from 'lucide-react';
import logo from '../assets/logo.png';
import dashImg from '../assets/dashboard_img.png';
const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="p-1 rounded-lg bg-blue-100 mr-2">
              <img src={logo} alt="CodeProfile Logo" className="w-10 h-10" />
            </div>
            <h1
              className="text-3xl text-black-600 tracking-tight mt-2"
              style={{ fontFamily: "'Audiowide', sans-serif" }}
            >
              CodeProfile
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <a href="/login" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
              Login
            </a>
            <a href="/signup" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all font-medium shadow-sm hover:shadow-md">
              Get Started
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
<section className="pt-28 sm:pt-32 pb-16 px-4 sm:px-6">
  <div className="max-w-7xl mx-auto">
    <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
      
      {/* Text Section */}
      <div className="text-center lg:text-left mt-10">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-blue-600 leading-tight mb-4 sm:mb-6">
          Level Up
          <span className="text-gray-900"> Your Coding Skills</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-600  leading-relaxed max-w-xl mx-auto lg:mx-0">
          Track your progress across LeetCode, Codeforces, and CodeChef.
          Visualize your growth and compete with developers worldwide.
        </p>
      </div>
      {/* Image Section */}
      <div className="flex justify-center lg:justify-end">
        <img
          src={dashImg}
          alt="Dashboard"
          className="w-full max-w-sm sm:max-w-md lg:max-w-lg object-contain"
        />
      </div>
    </div>
  </div>
</section>


      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Everything You Need to Excel</h2>
            <p className="text-xl text-gray-600">Powerful features to track and improve your coding skills</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: BarChart3,
                title: 'Unified Dashboard',
                desc: 'View all your stats from LeetCode, Codeforces, and CodeChef in one place.',
                color: 'blue'
              },
              {
                icon: Trophy,
                title: 'Contest Analytics',
                desc: 'Track your contest performance and rating changes over time.',
                color: 'purple'
              },
              {
                icon: TrendingUp,
                title: 'Progress Tracking',
                desc: 'Visualize your growth with beautiful charts and insights.',
                color: 'green'
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1"
              >
                <div className={`w-14 h-14 bg-${feature.color}-100 rounded-xl flex items-center justify-center mb-5`}>
                  <feature.icon className={`w-7 h-7 text-${feature.color}-600`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;