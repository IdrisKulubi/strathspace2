'use client';

import LandingPage from '@/components/homepage/landingPage';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();

  return (
    <div className="min-h-screen relative">
      <LandingPage />
      <button
        onClick={() => router.push('/style-guide')}
        className="fixed bottom-6 right-6 w-12 h-12 bg-gradient-primary rounded-full shadow-glow-pink flex items-center justify-center text-white font-bold hover:scale-110 transition-transform z-50"
        title="View Style Guide"
      >
        ?
      </button>
    </div>
  );
}
