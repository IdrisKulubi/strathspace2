import { useRef } from 'react';
import { Heart, Sparkles, Users } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import Button from '@/components/ui/Buttons';
import Avatar from '@/components/ui/Avatars';


interface HeroProps {
  onWaitlistClick?: () => void;
}

const Hero = ({ onWaitlistClick }: HeroProps) => {
  const heroRef = useRef<HTMLElement>(null);
  const isVisible = useScrollAnimation(heroRef as React.RefObject<HTMLElement>);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-brand-pink/10 via-brand-blue/10 to-brand-yellow/10"
    >
      <div className="absolute inset-0 bg-gradient-glow opacity-50 animate-glow-pulse"></div>

      <div className="absolute top-20 left-10 animate-float">
        <div className="w-16 h-16 bg-brand-yellow/30 rounded-full blur-xl"></div>
      </div>
      <div className="absolute bottom-20 right-10 animate-float" style={{ animationDelay: '1s' }}>
        <div className="w-24 h-24 bg-brand-pink/30 rounded-full blur-xl"></div>
      </div>
      <div className="absolute top-1/2 left-1/4 animate-float" style={{ animationDelay: '2s' }}>
        <div className="w-20 h-20 bg-brand-blue/30 rounded-full blur-xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className={`space-y-8 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-brand-pink animate-pulse" />
            <span className="text-brand-pink font-semibold uppercase tracking-wider text-sm">
              The New Era of Campus Connection
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
            <span className="text-gradient">Connect. Match.</span>
            <br />
            <span className="text-brand-dark">Discover Campus Life —</span>
            <br />
            <span className="text-gradient">Reimagined.</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            StrathSpace 2.0 uses AI and your vibes to help you connect meaningfully with
            verified university students. Swipe, match, and build your campus community.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button size="lg" variant="primary" onClick={onWaitlistClick}>
              Join the Waitlist
            </Button>
            <Button size="lg" variant="secondary">
              See How It Works
            </Button>
          </div>

          <div className="flex items-center justify-center gap-4 pt-8">
            <div className="flex -space-x-3">
              <Avatar
                name="Sarah K"
                size="md"
                online
                src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100"
              />
              <Avatar
                name="Mike T"
                size="md"
                online
                src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100"
              />
              <Avatar
                name="Jane D"
                size="md"
                online
                src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100"
              />
              <Avatar
                name="Alex M"
                size="md"
                src="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100"
              />
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1 text-brand-yellow">
                {[...Array(5)].map((_, i) => (
                  <Heart key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-sm text-gray-600 font-medium">
                <span className="text-brand-pink font-bold">2,500+</span> students already connected
              </p>
            </div>
          </div>
        </div>

        <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
          <div className="w-6 h-10 border-2 border-brand-pink rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-brand-pink rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      <div className="absolute top-10 right-10 hidden lg:block">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-primary rounded-3xl blur-xl opacity-50 animate-glow-pulse"></div>
          <div className="relative bg-white rounded-3xl p-6 shadow-2xl transform rotate-6 hover:rotate-0 transition-transform duration-500">
            <div className="flex items-center gap-3 mb-3">
              <Avatar name="Emma S" size="md" online />
              <div>
                <p className="font-bold text-brand-dark">Emma, 21</p>
                <p className="text-sm text-gray-500">Business Student</p>
              </div>
            </div>
            <p className="text-sm text-gray-600">Loves coffee, books, and late-night study sessions</p>
            <div className="flex gap-2 mt-3">
              <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-white hover:scale-110 transition-transform cursor-pointer">
                <Heart className="w-5 h-5" />
              </div>
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:scale-110 transition-transform cursor-pointer">
                <Users className="w-5 h-5 text-gray-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-32 left-10 hidden lg:block">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-primary rounded-3xl blur-xl opacity-50 animate-glow-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="relative bg-white rounded-3xl p-6 shadow-2xl transform -rotate-6 hover:rotate-0 transition-transform duration-500">
            <div className="flex items-center gap-3 mb-3">
              <Avatar name="David K" size="md" online />
              <div>
                <p className="font-bold text-brand-dark">David, 22</p>
                <p className="text-sm text-gray-500">Engineering</p>
              </div>
            </div>
            <p className="text-sm text-gray-600">Tech enthusiast, gaming, and campus events</p>
            <div className="flex gap-2 mt-3">
              <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-white hover:scale-110 transition-transform cursor-pointer">
                <Heart className="w-5 h-5" />
              </div>
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:scale-110 transition-transform cursor-pointer">
                <Users className="w-5 h-5 text-gray-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
