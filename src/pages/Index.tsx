import { useState, useCallback } from "react";
import Preloader from "@/components/Preloader";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import BackToTop from "@/components/BackToTop";

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoaded = useCallback(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      <Preloader onLoaded={handleLoaded} />
      <Header />
      <main>
        <Hero />
        <Services />
        <About />
        <Skills />
        <Projects />
      </main>
      <Contact />
      <BackToTop />
    </>
  );
};

export default Index;
