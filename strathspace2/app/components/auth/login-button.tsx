"use client";

import { useState, useEffect, useRef } from "react";
import { authClient } from "../../lib/auth-client";
import useAuthError from "../../hooks/use-auth-error";
import AuthError from "./auth-error";
import gsap from "gsap";

export function LoginButton() {
  const [isLoading, setIsLoading] = useState(false);
  const { hasError, error, email, setError, clearError, retry } =
    useAuthError();

  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const termsRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const floatingRef1 = useRef<HTMLDivElement>(null);
  const floatingRef2 = useRef<HTMLDivElement>(null);
  const floatingRef3 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Floating background elements animation
      gsap.to(floatingRef1.current, {
        y: -30,
        x: 20,
        rotation: 5,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });

      gsap.to(floatingRef2.current, {
        y: 20,
        x: -15,
        rotation: -5,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });

      gsap.to(floatingRef3.current, {
        y: -25,
        x: -20,
        rotation: 8,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });

      // Initial entrance animations
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        cardRef.current,
        {
          scale: 0.8,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
        }
      )
        .fromTo(
          titleRef.current,
          {
            y: 30,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
          },
          "-=0.4"
        )
        .fromTo(
          subtitleRef.current,
          {
            y: 20,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
          },
          "-=0.4"
        )
        .fromTo(
          buttonRef.current,
          {
            y: 20,
            scale: 0.95,
          },
          {
            y: 0,
            scale: 1,
            duration: 0.6,
          },
          "-=0.3"
        )
        .fromTo(
          termsRef.current,
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 0.5,
          },
          "-=0.3"
        )
        .fromTo(
          infoRef.current,
          {
            y: 20,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
          },
          "-=0.3"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      clearError();

      // Button click animation
      gsap.to(buttonRef.current, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
      });

      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
      });
    } catch (err) {
      console.error("Sign in error:", err);
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    if (retry()) {
      handleGoogleSignIn();
    }
  };

  if (hasError) {
    return (
      <AuthError
        error={error ?? undefined}
        email={email}
        onRetry={handleRetry}
        onBack={clearError}
      />
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center justify-center min-h-screen bg-linear-to-b from-pink-50 to-white dark:from-pink-950 dark:to-background p-4 overflow-hidden"
    >
      {/* Animated floating background elements */}
      <div
        ref={floatingRef1}
        className="absolute top-20 left-10 w-72 h-72 bg-pink-200/20 dark:bg-pink-500/10 rounded-full blur-3xl"
      />
      <div
        ref={floatingRef2}
        className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200/20 dark:bg-purple-500/10 rounded-full blur-3xl"
      />
      <div
        ref={floatingRef3}
        className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-300/15 dark:bg-pink-400/10 rounded-full blur-3xl"
      />

      {/* Main card */}
      <div
        ref={cardRef}
        className="relative w-full max-w-md bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-pink-100 dark:border-pink-900/50"
      >
        {/* Gradient accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-pink-500 via-purple-500 to-pink-600 rounded-t-3xl" />

        <div className="text-center mb-8">
          <h1
            ref={titleRef}
            className="text-4xl font-bold bg-linear-to-r from-pink-600 to-purple-600 dark:from-pink-400 dark:to-purple-400 bg-clip-text text-transparent mb-3"
          >
            Welcome to StrathSpace
          </h1>
          <p
            ref={subtitleRef}
            className="text-gray-600 dark:text-gray-400 text-lg"
          >
            Connect with your university community
          </p>
        </div>

        <div className="space-y-6">
          <button
            ref={buttonRef}
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="group relative w-full flex items-center justify-center px-6 py-4 bg-pink-600 hover:bg-pink-700 dark:bg-pink-500 dark:hover:bg-pink-600 text-white rounded-xl shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-pink-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 overflow-hidden"
          >
            {/* Button hover effect */}
            <div className="absolute inset-0 bg-linear-to-r from-purple-600/20 to-pink-700/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {isLoading ? (
              <div className="flex items-center relative z-10">
                <div className="animate-spin rounded-full h-6 w-6 border-3 border-white border-t-transparent mr-3"></div>
                <span className="font-semibold">Signing in...</span>
              </div>
            ) : (
              <div className="flex items-center relative z-10">
               <svg
                className="mr-2 h-5 w-5"
                aria-hidden="true"
                viewBox="0 0 24 24"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
                <span className="font-semibold text-lg">
                  Continue with Google
                </span>
              </div>
            )}
          </button>

          <div ref={termsRef} className="text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              By signing in, you agree to our{" "}
              <span className="text-pink-600 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300 cursor-pointer font-medium">
                Terms of Service
              </span>{" "}
              and{" "}
              <span className="text-pink-600 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300 cursor-pointer font-medium">
                Privacy Policy
              </span>
            </p>
          </div>

          <div
            ref={infoRef}
            className="relative bg-linear-to-br from-purple-50/90 to-pink-50/80 dark:from-purple-900/60 dark:to-pink-900/40 border-2 border-purple-200 dark:border-purple-700 rounded-2xl p-5 overflow-hidden"
          >
            {/* Decorative corner accent */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-linear-to-br from-purple-400/20 to-transparent rounded-bl-full" />

            <div className="flex relative z-10">
              <div className="shrink-0">
                <div className="h-10 w-10 rounded-full bg-purple-600 dark:bg-purple-500 flex items-center justify-center shadow-md">
                  <svg
                    className="h-6 w-6 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm text-purple-900 dark:text-purple-200 leading-relaxed">
                  <strong className="font-bold">New Policy:</strong> We now
                  accept all email addresses! You can sign up with any valid
                  email, not just university emails.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom decorative text */}
      <div className="mt-8 text-center">
        <p className="text-pink-600 dark:text-pink-400 text-sm font-medium">
          Join the community today ✨
        </p>
      </div>
    </div>
  );
}

export default LoginButton;
