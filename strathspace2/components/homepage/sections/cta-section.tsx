import { useRef } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import Button from '@/components/ui/Buttons';


interface CTASectionProps {
  onWaitlistClick?: () => void;
}

const CTASection = ({ onWaitlistClick }: CTASectionProps) => {
  const ctaRef = useRef<HTMLElement>(null);
  const isVisible = useScrollAnimation(ctaRef as React.RefObject<HTMLElement>);

  return (
    <section
      ref={ctaRef}
      className="py-32 relative overflow-hidden bg-gradient-to-br from-brand-pink via-brand-blue to-brand-pink"
    >
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: '1s' }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl"
        ></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className={`${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white font-semibold text-sm mb-8">
            <Sparkles className="w-4 h-4" />
            Limited Early Access
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Be Part of the Future
            <br />
            of Campus Life
          </h2>

          <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
            Join thousands of students already experiencing the next generation of campus
            connections. Sign up now and get exclusive early access perks!
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="bg-white text-brand-pink hover:bg-white hover:shadow-2xl hover:scale-110"
              icon={<ArrowRight className="w-5 h-5" />}
              onClick={onWaitlistClick}
            >
              Get Early Access
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="text-white border-2 border-white hover:bg-white hover:text-brand-pink"
            >
              Watch Demo Video
            </Button>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-white">
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm">Free to join</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm">No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm">Exclusive rewards for early users</span>
            </div>
          </div>

          <div className="mt-12 inline-block bg-white/10 backdrop-blur-sm rounded-2xl px-8 py-4 border border-white/20">
            <p className="text-white/80 text-sm mb-2">Launching in</p>
            <div className="flex gap-6 justify-center">
              <div>
                <div className="text-3xl font-bold text-white">12</div>
                <div className="text-xs text-white/70">Days</div>
              </div>
              <div className="text-2xl text-white/50">:</div>
              <div>
                <div className="text-3xl font-bold text-white">05</div>
                <div className="text-xs text-white/70">Hours</div>
              </div>
              <div className="text-2xl text-white/50">:</div>
              <div>
                <div className="text-3xl font-bold text-white">23</div>
                <div className="text-xs text-white/70">Minutes</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
