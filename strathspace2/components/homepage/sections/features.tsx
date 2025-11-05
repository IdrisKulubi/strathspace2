import { useRef } from 'react';
import { MessageCircle, Calendar, ShieldCheck } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import Card from '@/components/ui/Cards';

const Features = () => {
  const featuresRef = useRef<HTMLElement>(null);
  const isVisible = useScrollAnimation(featuresRef as React.RefObject<HTMLElement>);

  const features = [
    {
      icon: MessageCircle,
      title: 'Swipe, Match, Chat',
      description:
        'Discover profiles, swipe right on people you like, and start meaningful conversations instantly when you match.',
      gradient: 'from-pink-500 to-rose-500',
      delay: '0s',
    },
    {
      icon: Calendar,
      title: 'Events & Campus Challenges',
      description:
        'Join exclusive campus events, participate in fun challenges, and meet new people in real life through organized activities.',
      gradient: 'from-blue-500 to-cyan-500',
      delay: '0.2s',
    },
    {
      icon: ShieldCheck,
      title: 'Safe, Verified & Student-Only',
      description:
        'Every user is verified with their university email. Connect safely within an exclusive community of real students.',
      gradient: 'from-purple-500 to-pink-500',
      delay: '0.4s',
    },
  ];

  return (
    <section ref={featuresRef} className="py-24 bg-brand-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-16 ${
            isVisible ? 'animate-fade-up' : 'opacity-0'
          }`}
        >
          <div className="inline-block px-4 py-2 bg-brand-blue/10 rounded-full text-brand-blue font-semibold text-sm mb-6">
            Everything You Need
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-brand-dark mb-6">
            Features That <span className="text-gradient">Bring You Together</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            StrathSpace 2.0 combines the best of social networking with powerful features
            designed exclusively for campus life.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`${isVisible ? 'animate-fade-up' : 'opacity-0'}`}
              style={{ animationDelay: feature.delay }}
            >
              <Card
                variant="hover-lift"
                padding="lg"
                className="h-full group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-300 from-brand-pink to-brand-blue"></div>

                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-brand-dark mb-4 group-hover:text-brand-pink transition-colors duration-300">
                  {feature.title}
                </h3>

                <p className="text-gray-600 leading-relaxed">{feature.description}</p>

                <div className="mt-6 flex items-center text-brand-pink font-semibold group-hover:translate-x-2 transition-transform duration-300">
                  <span className="text-sm">Learn More</span>
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </Card>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-lg">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-rose-400 border-2 border-white"></div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 border-2 border-white"></div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 border-2 border-white"></div>
            </div>
            <span className="text-sm font-medium text-gray-700">
              Join <span className="text-brand-pink font-bold">2,500+</span> students
              already using StrathSpace
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
