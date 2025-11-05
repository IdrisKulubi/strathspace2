import React, { useRef } from 'react';
import { Trophy, Star, Zap } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import Card from '@/components/ui/Cards';
import Badge from '@/components/ui/Badges';
import Avatar from '@/components/ui/Avatars';


const Community = () => {
  const communityRef = useRef<HTMLElement>(null);
  const isVisible = useScrollAnimation(communityRef as React.RefObject<HTMLElement>);

  const topUsers = [
    {
      name: 'Sarah Johnson',
      campus: 'Business School',
      matches: 127,
      events: 15,
      image:
        'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200',
      badge: 'gold',
    },
    {
      name: 'Michael Chen',
      campus: 'Engineering',
      matches: 98,
      events: 12,
      image:
        'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200',
      badge: 'silver',
    },
    {
      name: 'Emma Davis',
      campus: 'Arts & Design',
      matches: 85,
      events: 10,
      image:
        'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
      badge: 'bronze',
    },
  ];

  return (
    <section ref={communityRef} className="py-24 bg-brand-light relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-yellow/5 via-transparent to-brand-pink/5"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          className={`text-center mb-16 ${
            isVisible ? 'animate-fade-up' : 'opacity-0'
          }`}
        >
          <div className="inline-block px-4 py-2 bg-brand-yellow/20 rounded-full text-yellow-700 font-semibold text-sm mb-6">
            Community Stars
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-brand-dark mb-6">
            <span className="text-gradient">Campus Stars</span> of the Week
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Meet the most active and engaging members of our community. Be a campus star
            and win exclusive rewards!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {topUsers.map((user, index) => (
            <div
              key={index}
              className={`${isVisible ? 'animate-fade-up' : 'opacity-0'}`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <Card
                variant="hover-lift"
                padding="lg"
                className="text-center relative group overflow-hidden"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-primary opacity-5"></div>
                  <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-brand-yellow/20 to-transparent"></div>
                </div>

                <div className="relative">
                  <div className="absolute -top-3 -right-3 z-10">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        user.badge === 'gold'
                          ? 'bg-gradient-to-br from-yellow-400 to-yellow-600'
                          : user.badge === 'silver'
                          ? 'bg-gradient-to-br from-gray-300 to-gray-500'
                          : 'bg-gradient-to-br from-orange-400 to-orange-600'
                      }`}
                    >
                      <Trophy className="w-5 h-5 text-white" />
                    </div>
                  </div>

                  <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Avatar src={user.image} name={user.name} size="xl" online />
                  </div>

                  <h3 className="text-xl font-bold text-brand-dark mb-1">{user.name}</h3>
                  <Badge variant="blue" className="mb-4">
                    {user.campus}
                  </Badge>

                  <div className="flex justify-center gap-6 mt-6 pt-6 border-t border-gray-100">
                    <div>
                      <div className="flex items-center justify-center gap-1 text-brand-pink mb-1">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-2xl font-bold">{user.matches}</span>
                      </div>
                      <p className="text-xs text-gray-600">Matches</p>
                    </div>
                    <div>
                      <div className="flex items-center justify-center gap-1 text-brand-blue mb-1">
                        <Zap className="w-4 h-4 fill-current" />
                        <span className="text-2xl font-bold">{user.events}</span>
                      </div>
                      <p className="text-xs text-gray-600">Events</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block bg-white rounded-3xl px-8 py-6 shadow-xl">
            <p className="text-gray-600 mb-4">
              Want to become a Campus Star and win amazing prizes?
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-brand-pink/10 rounded-full">
                <Star className="w-4 h-4 text-brand-pink" />
                <span className="text-sm font-semibold text-brand-pink">
                  Be Active Daily
                </span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-brand-blue/10 rounded-full">
                <Trophy className="w-4 h-4 text-brand-blue" />
                <span className="text-sm font-semibold text-brand-blue">
                  Join Campus Events
                </span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-brand-yellow/20 rounded-full">
                <Zap className="w-4 h-4 text-yellow-700" />
                <span className="text-sm font-semibold text-yellow-700">
                  Make Meaningful Connections
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Community;
