import {
  Camera,
  Bell,
  BarChart3,
  Shield,
  Zap,
  Users,
  Lock,
  Cloud,
} from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: Camera,
      title: 'Real-time Detection',
      description:
        'Advanced AI algorithms detect helmet compliance in real-time with 99.8% accuracy.',
      color: 'bg-blue-100 text-blue-600',
    },
    {
      icon: Bell,
      title: 'Instant Alerts',
      description:
        'Get immediate notifications when non-compliance is detected, ensuring quick response.',
      color: 'bg-amber-100 text-amber-600',
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description:
        'Comprehensive insights and reports to track safety compliance across your organization.',
      color: 'bg-green-100 text-green-600',
    },
    {
      icon: Shield,
      title: 'Safety First',
      description:
        'Reduce workplace accidents and ensure regulatory compliance with automated monitoring.',
      color: 'bg-red-100 text-red-600',
    },
    {
      icon: Zap,
      title: 'Fast Processing',
      description:
        'Process multiple video streams simultaneously with minimal latency for instant results.',
      color: 'bg-purple-100 text-purple-600',
    },
    {
      icon: Users,
      title: 'Multi-site Support',
      description:
        'Monitor multiple locations and sites from a single centralized dashboard.',
      color: 'bg-cyan-100 text-cyan-600',
    },
    {
      icon: Lock,
      title: 'Secure & Private',
      description:
        'Enterprise-grade security with encrypted data storage and privacy-first design.',
      color: 'bg-gray-100 text-gray-600',
    },
    {
      icon: Cloud,
      title: 'Cloud-based',
      description:
        'Access your system from anywhere with our reliable cloud infrastructure.',
      color: 'bg-sky-100 text-sky-600',
    },
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Powerful Features for Complete Safety
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to maintain a safe workplace and ensure helmet compliance
            across your organization.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group p-6 rounded-xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-200"
              >
                <div className={`${feature.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-20 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-12 text-center text-white">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Enhance Workplace Safety?
          </h3>
          <p className="text-xl mb-8 text-blue-100">
            Join hundreds of companies already using HelmetGuard to protect their workforce.
          </p>
          <button className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors">
            Start Free Trial
          </button>
        </div>
      </div>
    </section>
  );
}
