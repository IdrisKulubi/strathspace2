import { useRef } from 'react';
import { Quote } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import Card from '@/components/ui/Cards';
import Avatar from '@/components/ui/Avatars';
import Badge from '@/components/ui/Badges';


const Testimonials = () => {
  const testimonialsRef = useRef<HTMLElement>(null);
  const isVisible = useScrollAnimation(testimonialsRef as React.RefObject<HTMLElement>);

  const testimonials = [
    {
      name: 'Alex Martinez',
      campus: 'Computer Science',
      image:
        'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=200',
      rating: 5,
      text: "StrathSpace changed my entire campus experience! I've met so many amazing people and found my study group. The AI matching is incredibly accurate.",
    },
    {
      name: 'Priya Patel',
      campus: 'Business Admin',
      image:
        'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=200',
      rating: 5,
      text: 'Finally, an app that gets student life. The events feature helped me discover so many cool campus activities I never knew existed!',
    },
    {
      name: 'James Wilson',
      campus: 'Engineering',
      image:
        'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=200',
      rating: 5,
      text: 'Safe, verified, and actually fun to use. I met my current girlfriend here and made friends I hang out with every week. 10/10 recommend!',
    },
    {
      name: 'Sofia Rodriguez',
      campus: 'Arts & Design',
      image:
        'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=200',
      rating: 5,
      text: 'The verification process made me feel so much safer. Everyone here is real, and the community vibe is unmatched. Love it!',
    },
    {
      name: 'David Kim',
      campus: 'Medicine',
      image:
        'https://images.pexels.com/photos/1121796/pexels-photo-1121796.jpeg?auto=compress&cs=tinysrgb&w=200',
      rating: 5,
      text: 'As someone who was shy about meeting new people, StrathSpace made it so easy. The interface is smooth, and matching feels natural.',
    },
    {
      name: 'Amara Johnson',
      campus: 'Law School',
      image:
        'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=200',
      rating: 5,
      text: "Best campus app ever! I've attended events, made study buddies, and even found my bestie. This is what university connection should be.",
    },
  ];

  return (
    <section
      ref={testimonialsRef}
      className="py-24 bg-white relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-pink/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          className={`text-center mb-16 ${
            isVisible ? 'animate-fade-up' : 'opacity-0'
          }`}
        >
          <div className="inline-block px-4 py-2 bg-brand-pink/10 rounded-full text-brand-pink font-semibold text-sm mb-6">
            Student Stories
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-brand-dark mb-6">
            Loved by <span className="text-gradient">Thousands of Students</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Real experiences from real students who found their community through
            StrathSpace.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`${isVisible ? 'animate-fade-up' : 'opacity-0'}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Card
                variant="glass"
                padding="lg"
                className="h-full bg-white/60 backdrop-blur-xl border-2 border-white hover:shadow-card-hover hover:border-brand-pink/20 transition-all duration-300 group"
              >
                <div className="flex items-start gap-4 mb-4">
                  <Avatar src={testimonial.image} name={testimonial.name} size="md" />
                  <div className="flex-1">
                    <h4 className="font-bold text-brand-dark group-hover:text-brand-pink transition-colors duration-300">
                      {testimonial.name}
                    </h4>
                    <Badge variant="blue" size="sm">
                      {testimonial.campus}
                    </Badge>
                  </div>
                  <Quote className="w-8 h-8 text-brand-pink/20" />
                </div>

                <div className="flex gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 text-brand-yellow fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>

                <p className="text-gray-700 leading-relaxed italic">
                  "{testimonial.text}"
                </p>
              </Card>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex flex-col items-center gap-4 bg-gradient-primary rounded-3xl px-12 py-8 text-white shadow-glow-pink">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-6 h-6 text-brand-yellow fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <span className="text-3xl font-bold">4.9/5</span>
            </div>
            <p className="text-white/90">
              Average rating from <span className="font-bold">2,500+</span> students
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
