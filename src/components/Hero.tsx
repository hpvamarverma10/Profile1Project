import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Eye, Download, Mail, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "@/components/ui/sonner";

type SelectionType = "resume" | "linkedin" | "github" | "contact";

const Hero = () => {
  const subtitleRef = useScrollReveal<HTMLParagraphElement>("left");
  const titleRef = useScrollReveal<HTMLHeadingElement>("bottom", 0.2);
  const cardRef = useScrollReveal<HTMLDivElement>("bottom", 0.4);

  const [selection, setSelection] = useState<SelectionType>("resume");
  const [resumeAvailable, setResumeAvailable] = useState(false);

  useEffect(() => {
    const checkResume = async () => {
      try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
        const response = await fetch(`${backendUrl}/v1/ankitverma969/getResume`);
        if (response.ok) {
          setResumeAvailable(true);
        } else {
          setResumeAvailable(false);
        }
      } catch (err) {
        setResumeAvailable(false);
      }
    };

    checkResume();
  }, []);

  const links = {
    linkedin: "https://www.linkedin.com/in/ankitverma969",
    github: "https://github.com/ankitverma969",
    contact: "mailto:hpvankitverma@gmail.com"
  };

  const handleViewResume = () => {
    if (!resumeAvailable) {
      toast.error('Resume not available. Please upload a resume from the admin dashboard.');
      return;
    }
    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
    window.open(`${backendUrl}/v1/ankitverma969/viewResume`, '_blank');
  };

  const handleDownloadResume = () => {
    if (!resumeAvailable) {
      toast.error('Resume not available. Please upload a resume from the admin dashboard.');
      return;
    }
    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
    window.location.href = `${backendUrl}/v1/ankitverma969/downloadResume`;
  };

  const renderButtons = () => {
    switch (selection) {
      case "resume":
        return (
          <>
            <button
              onClick={handleViewResume}
              className="btn-primary justify-center whitespace-nowrap"
            >
              <Eye size={18} />
              View
            </button>
            <button
              onClick={handleDownloadResume}
              className="btn-primary justify-center whitespace-nowrap"
            >
              <Download size={18} />
              Download
            </button>
          </>
        );
      case "linkedin":
        return (
          <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="btn-primary justify-center whitespace-nowrap">
            <Eye size={18} />
            View
          </a>
        );
      case "github":
        return (
          <a href={links.github} target="_blank" rel="noopener noreferrer" className="btn-primary justify-center whitespace-nowrap">
            <Eye size={18} />
            View
          </a>
        );
      case "contact":
        return (
          <a href={links.contact} className="btn-primary justify-center whitespace-nowrap">
            <Mail size={18} />
            Mail Me
          </a>
        );
    }
  };

  return (
    <section id="home" className="hero-bg" style={{ padding: "200px 0 120px" }}>
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div>
            <p
              ref={subtitleRef}
              className="reveal reveal-left text-white font-medium pl-20 relative hero-subtitle-line"
            >
              Welcome To My Portfolio
            </p>

            <h1
              ref={titleRef}
              className="reveal reveal-bottom headline-lg mt-5 mb-8"
            >
              Find Your Ideal{" "}
              <span className="text-eerie-black">Developer.</span>
            </h1>

            <div
              ref={cardRef}
              className="reveal reveal-bottom bg-white rounded-xl p-5"
            >
              <p className="text-eerie-black border-b border-midnight-green/25 pb-3 mb-4">
                Looking for an AI/ML specialist or Full-Stack developer?
              </p>

              <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
                <div className="w-full sm:w-48 relative flex-shrink-0">
                  <select
                    value={selection}
                    onChange={(e) => setSelection(e.target.value as SelectionType)}
                    className="w-full border-b-2 border-gainsboro py-2 pr-8 text-space-cadet font-medium focus:outline-none focus:border-verdigris bg-transparent cursor-pointer appearance-none text-sm"
                  >
                    <option value="resume">Resume / CV</option>
                    <option value="linkedin">LinkedIn Profile</option>
                    <option value="github">GitHub Profile</option>
                    <option value="contact">Contact</option>
                  </select>
                  <ChevronDown
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-verdigris pointer-events-none"
                    size={20}
                  />
                </div>

                <div className="flex gap-3 flex-shrink-0">
                  {renderButtons()}
                </div>
              </div>
            </div>
          </div>

          <div className="hidden lg:block">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=700&fit=crop&crop=face"
              alt="Ankit Verma"
              className="rounded-xl shadow-card max-w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
