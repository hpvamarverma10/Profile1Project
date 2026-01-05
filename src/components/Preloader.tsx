import { useEffect, useState } from "react";

interface PreloaderProps {
  onLoaded: () => void;
}

const Preloader = ({ onLoaded }: PreloaderProps) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const handleLoad = () => {
      setLoaded(true);
      document.body.classList.add("loaded");
      onLoaded();
    };

    // Check if document is already loaded
    if (document.readyState === "complete") {
      // Small delay to show preloader animation
      const timer = setTimeout(handleLoad, 800);
      return () => clearTimeout(timer);
    }

    window.addEventListener("load", handleLoad);
    return () => window.removeEventListener("load", handleLoad);
  }, [onLoaded]);

  return (
    <div className={`preloader ${loaded ? "loaded" : ""}`}>
      <div className="preloader-circle" />
    </div>
  );
};

export default Preloader;
