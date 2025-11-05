import { useRef } from 'react';
import { Brain, Shield, Zap } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

const About = () => {
  const aboutRef = useRef<HTMLElement>(null!);
  const isVisible = useScrollAnimation(aboutRef);

  return (
    <section ref={aboutRef} className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-pink/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div
            className={`${
              isVisible ? 'animate-slide-in-left' : 'opacity-0'
            } order-2 lg:order-1`}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-primary rounded-3xl blur-2xl opacity-20"></div>
              <div className="relative bg-gradient-to-br from-brand-pink to-brand-blue rounded-3xl p-8 text-white">
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                    <div className="text-4xl font-bold mb-2">2.5K+</div>
                    <div className="text-sm opacity-90">Active Students</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                    <div className="text-4xl font-bold mb-2">95%</div>
                    <div className="text-sm opacity-90">Match Rate</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                    <div className="text-4xl font-bold mb-2">50+</div>
                    <div className="text-sm opacity-90">Campus Events</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                    <div className="text-4xl font-bold mb-2">100%</div>
                    <div className="text-sm opacity-90">Verified Users</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`${
              isVisible ? 'animate-slide-in-right' : 'opacity-0'
            } order-1 lg:order-2`}
          >
            <div className="inline-block px-4 py-2 bg-brand-pink/10 rounded-full text-brand-pink font-semibold text-sm mb-6">
              The Smart Way to Connect
            </div>

            <h2 className="text-4xl sm:text-5xl font-bold text-brand-dark mb-6 leading-tight">
              Built for Students.{' '}
              <span className="text-gradient">Powered by AI.</span>
            </h2>

            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              StrathSpace 2.0 uses intelligent matching algorithms and your authentic
              campus vibes to help you connect meaningfully with other students nearby.
              No fake profiles, no bots—just real connections.
            </p>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-primary flex items-center justify-center">
                  <Brain className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-brand-dark mb-2">
                    AI-Powered Matching
                  </h3>
                  <p className="text-gray-600">
                    Our smart algorithm learns your preferences and connects you with
                    compatible students based on interests, vibes, and campus activities.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-primary flex items-center justify-center">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-brand-dark mb-2">
                    Safe & Verified
                  </h3>
                  <p className="text-gray-600">
                    Every user is verified with their university email. Your safety and
                    privacy are our top priorities.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-primary flex items-center justify-center">
                  <Zap className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-brand-dark mb-2">
                    Instant Connections
                  </h3>
                  <p className="text-gray-600">
                    Match, chat, and meet up in real-time. Join campus events, study
                    groups, and social gatherings effortlessly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
