import { useRef, useState, useEffect } from 'react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
const AppShowcase = () => {
  const showcaseRef = useRef<HTMLElement>(null);
  const isVisible = useScrollAnimation(showcaseRef as React.RefObject<HTMLElement>);
  const [activeIndex, setActiveIndex] = useState(0);

  const screenshots = [
    {
      title: 'Discover Profiles',
      description: 'Browse through verified student profiles with smart recommendations',
      image: 'https://images.pexels.com/photos/4050320/pexels-photo-4050320.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      title: 'Match & Connect',
      description: 'Swipe right to like, match instantly, and start chatting',
      image: 'https://images.pexels.com/photos/7163619/pexels-photo-7163619.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      title: 'Campus Events',
      description: 'Join events, challenges, and meet-ups happening on campus',
      image: 'https://images.pexels.com/photos/1157557/pexels-photo-1157557.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % screenshots.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [screenshots.length]);

  return (
    <section ref={showcaseRef} className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand-yellow/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-brand-blue/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          className={`text-center mb-16 ${
            isVisible ? 'animate-fade-up' : 'opacity-0'
          }`}
        >
          <div className="inline-block px-4 py-2 bg-brand-pink/10 rounded-full text-brand-pink font-semibold text-sm mb-6">
            See It In Action
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-brand-dark mb-6">
            A Glimpse Into <span className="text-gradient">Your New Campus Life</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Experience the sleek, intuitive interface designed to make connecting with
            fellow students effortless and fun.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-primary rounded-3xl blur-2xl opacity-20 animate-glow-pulse"></div>

            <div className="relative bg-gradient-to-br from-brand-dark to-gray-800 rounded-[3rem] p-4 shadow-2xl">
              <div className="bg-black rounded-[2.5rem] overflow-hidden">
                <div className="bg-brand-dark px-6 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-white text-sm font-medium">StrathSpace 2.0</div>
                  <div className="w-16"></div>
                </div>

                <div className="relative h-[500px] bg-gradient-to-br from-brand-light to-white">
                  {screenshots.map((screenshot, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-opacity duration-700 ${
                        index === activeIndex ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      <img
                        src={screenshot.image}
                        alt={screenshot.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
                        <h3 className="text-2xl font-bold text-white mb-2">
                          {screenshot.title}
                        </h3>
                        <p className="text-white/90">{screenshot.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-3 mt-8">
            {screenshots.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === activeIndex
                    ? 'w-12 h-3 bg-gradient-primary'
                    : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to screenshot ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-4xl font-bold text-gradient mb-2">Fast</div>
            <p className="text-gray-600">Lightning-quick matching algorithm</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-gradient mb-2">Secure</div>
            <p className="text-gray-600">End-to-end encrypted conversations</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-gradient mb-2">Simple</div>
            <p className="text-gray-600">Intuitive interface, zero learning curve</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppShowcase;
