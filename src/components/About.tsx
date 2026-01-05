import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { CheckCircle } from "lucide-react";

const tabs = ["Vision", "Mission", "Strategy"];

const tabContent = {
  Vision:
    "To become a leading AI/ML engineer, creating innovative solutions that bridge cutting-edge research with real-world applications, making technology accessible and impactful.",
  Mission:
    "Continuously learning and applying artificial intelligence and machine learning to solve complex problems while contributing to open-source projects and the developer community.",
  Strategy:
    "Combining academic excellence with hands-on project experience, building a strong foundation in both theoretical knowledge and practical implementation skills.",
};

const highlights = [
  "B.Tech CSE - AI & ML Specialization",
  "Freelance Full-Stack Developer",
  "INSPIRE-SHE Scholar (DST, Govt. of India)",
  "Data Structures & Algorithms",
];

const About = () => {
  const [activeTab, setActiveTab] = useState("Vision");
  const titleRef = useScrollReveal<HTMLDivElement>("left");
  const contentRef = useScrollReveal<HTMLDivElement>("left", 0.2);
  const imageRef = useScrollReveal<HTMLDivElement>("right");

  return (
    <section id="about" className="section-padding pb-0">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-[1fr_0.8fr] gap-5 items-end">
          {/* Content */}
          <div className="lg:pb-[120px]">
            <div ref={titleRef} className="reveal reveal-left">
              <p className="text-verdigris font-medium uppercase tracking-wider mb-2">
                About Me
              </p>
              <h2 className="headline-md">Experienced Developer</h2>
            </div>

            <div ref={contentRef} className="reveal reveal-left">
              <p className="text-foreground leading-relaxed mt-5 mb-9">
                I'm Ankit Verma, a passionate B.Tech student specializing in
                Artificial Intelligence and Machine Learning. With a strong
                foundation in computer science and hands-on experience in
                full-stack development, I create innovative solutions that make
                a difference.
              </p>

              {/* Tabs */}
              <div className="flex flex-wrap gap-4 mb-8">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`tab-btn ${activeTab === tab ? "active" : ""}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <p className="text-midnight-green mb-9">
                {tabContent[activeTab as keyof typeof tabContent]}
              </p>

              {/* Highlights */}
              <div className="grid sm:grid-cols-2 gap-3">
                {highlights.map((item, index) => (
                  <div key={index} className="flex items-center gap-3 mb-2">
                    <CheckCircle className="text-verdigris flex-shrink-0" size={20} />
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Image */}
          <div ref={imageRef} className="reveal reveal-right hidden lg:block lg:-mr-20">
            <img
              src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&h=600&fit=crop"
              alt="Ankit Verma - About"
              className="rounded-xl shadow-card"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
