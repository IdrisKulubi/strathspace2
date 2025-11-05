import { Heart, Star, MessageCircle } from 'lucide-react';
import { Input } from '../ui/input';
import Card from '../ui/Cards';
import Button from '../ui/Buttons';
import Badge from '../ui/Badges';
import Avatar from '../ui/Avatars';


const StyleGuide = () => {
  return (
    <div className="min-h-screen bg-brand-light py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-brand-dark mb-4">
            StrathSpace 2.0 <span className="text-gradient">Style Guide</span>
          </h1>
          <p className="text-xl text-gray-600">
            Complete design system and UI component library
          </p>
        </div>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-brand-dark mb-8">Color Palette</h2>
          <div className="grid md:grid-cols-5 gap-6">
            <Card padding="md">
              <div className="w-full h-24 bg-brand-pink rounded-2xl mb-4"></div>
              <p className="font-bold text-brand-dark">Brand Pink</p>
              <p className="text-sm text-gray-600">#FF4F81</p>
              <p className="text-xs text-gray-500 mt-2">Primary brand color</p>
            </Card>
            <Card padding="md">
              <div className="w-full h-24 bg-brand-yellow rounded-2xl mb-4"></div>
              <p className="font-bold text-brand-dark">Soft Yellow</p>
              <p className="text-sm text-gray-600">#FFD700</p>
              <p className="text-xs text-gray-500 mt-2">Warm optimism</p>
            </Card>
            <Card padding="md">
              <div className="w-full h-24 bg-brand-blue rounded-2xl mb-4"></div>
              <p className="font-bold text-brand-dark">Electric Blue</p>
              <p className="text-sm text-gray-600">#4A90E2</p>
              <p className="text-xs text-gray-500 mt-2">Trust & tech</p>
            </Card>
            <Card padding="md">
              <div className="w-full h-24 bg-brand-dark rounded-2xl mb-4"></div>
              <p className="font-bold text-brand-dark">Neutral Dark</p>
              <p className="text-sm text-gray-600">#1A1A1A</p>
              <p className="text-xs text-gray-500 mt-2">Text & contrast</p>
            </Card>
            <Card padding="md">
              <div className="w-full h-24 bg-brand-light rounded-2xl mb-4 border-2 border-gray-200"></div>
              <p className="font-bold text-brand-dark">Neutral Light</p>
              <p className="text-sm text-gray-600">#F8F9FB</p>
              <p className="text-xs text-gray-500 mt-2">Background</p>
            </Card>
          </div>

          <div className="mt-8">
            <Card padding="lg">
              <h3 className="text-xl font-bold mb-4">Gradient Theme</h3>
              <div className="w-full h-24 bg-gradient-primary rounded-2xl mb-4"></div>
              <p className="text-gray-600">
                <code className="bg-gray-100 px-2 py-1 rounded">
                  linear-gradient(135deg, #FF4F81, #4A90E2)
                </code>
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Used for CTAs, banners, hero buttons, and hover animations
              </p>
            </Card>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-brand-dark mb-8">Typography</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card padding="lg">
              <h3 className="text-xl font-bold mb-6">Headings (Poppins)</h3>
              <div className="space-y-4">
                <div>
                  <h1 className="text-5xl font-bold">Heading 1</h1>
                  <p className="text-sm text-gray-500">64px / Bold</p>
                </div>
                <div>
                  <h2 className="text-4xl font-bold">Heading 2</h2>
                  <p className="text-sm text-gray-500">48px / Medium</p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Heading 3</h3>
                  <p className="text-sm text-gray-500">32px / Medium</p>
                </div>
              </div>
            </Card>

            <Card padding="lg">
              <h3 className="text-xl font-bold mb-6">Body Text (Inter)</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-lg">
                    Large paragraph text for important information and descriptions.
                  </p>
                  <p className="text-sm text-gray-500">18px / Regular / 160% line height</p>
                </div>
                <div>
                  <p className="text-base">
                    Regular body text for standard content and reading.
                  </p>
                  <p className="text-sm text-gray-500">16px / Regular / 160% line height</p>
                </div>
                <div>
                  <p className="text-sm">
                    Small text for captions, labels, and secondary information.
                  </p>
                  <p className="text-sm text-gray-500">14px / Regular / 150% line height</p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-brand-dark mb-8">Buttons</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card padding="lg">
              <h3 className="text-xl font-bold mb-6">Button Variants</h3>
              <div className="space-y-4">
                <div>
                  <Button variant="primary" size="lg">
                    Primary Button
                  </Button>
                  <p className="text-sm text-gray-500 mt-2">
                    Gradient background with glow effect
                  </p>
                </div>
                <div>
                  <Button variant="secondary" size="lg">
                    Secondary Button
                  </Button>
                  <p className="text-sm text-gray-500 mt-2">
                    Outlined with hover fill
                  </p>
                </div>
                <div>
                  <Button variant="ghost" size="lg">
                    Ghost Button
                  </Button>
                  <p className="text-sm text-gray-500 mt-2">
                    Transparent with subtle hover
                  </p>
                </div>
              </div>
            </Card>

            <Card padding="lg">
              <h3 className="text-xl font-bold mb-6">Button Sizes</h3>
              <div className="space-y-4">
                <div>
                  <Button variant="primary" size="sm">
                    Small Button
                  </Button>
                  <p className="text-sm text-gray-500 mt-2">Compact size for tight spaces</p>
                </div>
                <div>
                  <Button variant="primary" size="md">
                    Medium Button
                  </Button>
                  <p className="text-sm text-gray-500 mt-2">Default size</p>
                </div>
                <div>
                  <Button variant="primary" size="lg">
                    Large Button
                  </Button>
                  <p className="text-sm text-gray-500 mt-2">Hero CTAs and emphasis</p>
                </div>
                <div>
                  <Button variant="primary" size="md" icon={<Heart className="w-4 h-4" />}>
                    With Icon
                  </Button>
                  <p className="text-sm text-gray-500 mt-2">Button with leading icon</p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-brand-dark mb-8">Cards</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card variant="default" padding="md">
              <h4 className="font-bold text-brand-dark mb-2">Default Card</h4>
              <p className="text-sm text-gray-600">
                White background with shadow
              </p>
            </Card>
            <Card variant="glass" padding="md">
              <h4 className="font-bold text-brand-dark mb-2">Glass Card</h4>
              <p className="text-sm text-gray-600">
                Glassmorphism effect
              </p>
            </Card>
            <Card variant="gradient" padding="md">
              <h4 className="font-bold text-white mb-2">Gradient Card</h4>
              <p className="text-sm text-white/90">
                Primary gradient background
              </p>
            </Card>
            <Card variant="hover-lift" padding="md">
              <h4 className="font-bold text-brand-dark mb-2">Hover Lift</h4>
              <p className="text-sm text-gray-600">
                Lifts on hover interaction
              </p>
            </Card>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-brand-dark mb-8">Badges</h2>
          <Card padding="lg">
            <div className="flex flex-wrap gap-4">
              <Badge variant="pink">Pink Badge</Badge>
              <Badge variant="blue">Blue Badge</Badge>
              <Badge variant="yellow">Yellow Badge</Badge>
              <Badge variant="success">Success Badge</Badge>
              <Badge variant="default">Default Badge</Badge>
            </div>
            <p className="text-sm text-gray-600 mt-6">
              Used for status indicators, tags, and category labels
            </p>
          </Card>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-brand-dark mb-8">Avatars</h2>
          <Card padding="lg">
            <div className="flex flex-wrap items-end gap-6">
              <div>
                <Avatar name="John Doe" size="sm" />
                <p className="text-xs text-gray-500 mt-2 text-center">Small</p>
              </div>
              <div>
                <Avatar name="Jane Smith" size="md" online />
                <p className="text-xs text-gray-500 mt-2 text-center">Medium</p>
              </div>
              <div>
                <Avatar name="Alex Johnson" size="lg" />
                <p className="text-xs text-gray-500 mt-2 text-center">Large</p>
              </div>
              <div>
                <Avatar name="Sarah Williams" size="xl" online />
                <p className="text-xs text-gray-500 mt-2 text-center">Extra Large</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-6">
              Profile pictures with gradient fallback and online status indicator
            </p>
          </Card>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-brand-dark mb-8">Form Inputs</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card padding="lg">
              <Input
                type="email"
                placeholder="your.email@university.edu"
              />
            </Card>
            <Card padding="lg">
              <Input
                type="text"
                placeholder="Enter your name"
              />
            </Card>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-brand-dark mb-8">Icons</h2>
          <Card padding="lg">
            <div className="flex flex-wrap gap-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center mb-2">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <p className="text-sm text-gray-600">Heart</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center mb-2">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <p className="text-sm text-gray-600">Star</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center mb-2">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <p className="text-sm text-gray-600">Message</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-6">
              Using Lucide React icons with rounded, filled aesthetic
            </p>
          </Card>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-brand-dark mb-8">Animations</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card padding="lg">
              <div className="w-full h-32 bg-gradient-primary rounded-2xl animate-fade-up mb-4"></div>
              <h4 className="font-bold text-brand-dark mb-2">Fade Up</h4>
              <p className="text-sm text-gray-600">
                <code className="text-xs">animate-fade-up</code>
              </p>
            </Card>
            <Card padding="lg">
              <div className="w-full h-32 bg-gradient-primary rounded-2xl animate-glow-pulse mb-4"></div>
              <h4 className="font-bold text-brand-dark mb-2">Glow Pulse</h4>
              <p className="text-sm text-gray-600">
                <code className="text-xs">animate-glow-pulse</code>
              </p>
            </Card>
            <Card padding="lg">
              <div className="w-full h-32 bg-gradient-primary rounded-2xl animate-float mb-4"></div>
              <h4 className="font-bold text-brand-dark mb-2">Float</h4>
              <p className="text-sm text-gray-600">
                <code className="text-xs">animate-float</code>
              </p>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-brand-dark mb-8">Spacing System</h2>
          <Card padding="lg">
            <p className="text-gray-600 mb-6">
              Consistent 8px spacing system for layout harmony
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-brand-pink"></div>
                <span className="text-sm">8px (2 units)</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-16 h-8 bg-brand-blue"></div>
                <span className="text-sm">16px (4 units)</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-24 h-8 bg-brand-yellow"></div>
                <span className="text-sm">24px (6 units)</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-32 h-8 bg-brand-pink"></div>
                <span className="text-sm">32px (8 units)</span>
              </div>
            </div>
          </Card>
        </section>

        <div className="mt-16 text-center">
          <Card padding="lg" variant="gradient">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Build Something Amazing?
            </h3>
            <p className="text-white/90 mb-6">
              Use these components to create beautiful, consistent interfaces
            </p>
            <Button
              variant="ghost"
              size="lg"
              className="bg-white text-brand-pink hover:bg-white"
            >
              Start Building
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StyleGuide;
