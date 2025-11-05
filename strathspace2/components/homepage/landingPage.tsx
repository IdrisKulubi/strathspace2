import About from "./sections/about";
import AppShowcase from "./sections/app-showcase";
import Community from "./sections/community";
import CTASection from "./sections/cta-section";
import Features from "./sections/features";
import Hero from "./sections/hero";
import Testimonials from "./sections/testimonial";
import Footer from "./sections/footer";
import Navigation from "./sections/navigation";


const LandingPage = () => {

  return (
    <>
      <Navigation />
      <Hero />
      <About />
      <Features />
      <AppShowcase />
      <Community />
      <Testimonials />
      <CTASection  />
      <Footer />
     
    </>
  );
};

export default LandingPage;
