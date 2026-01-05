import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Brain, Code2, Globe, Cpu, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Brain,
    title: "AI & ML",
    description:
      "Expertise in machine learning algorithms, neural networks, and AI-powered solutions for complex problem-solving.",
  },
  {
    icon: Code2,
    title: "Full-Stack Dev",
    description:
      "Building end-to-end web applications with modern frameworks like React, Node.js, and cloud technologies.",
  },
  {
    icon: Globe,
    title: "Web Design",
    description:
      "Creating responsive, user-friendly interfaces with attention to detail and modern design principles.",
  },
  {
    icon: Cpu,
    title: "Data Science",
    description:
      "Analyzing complex datasets, building predictive models, and extracting actionable insights for decision-making.",
  },
];

const Services = () => {
  const containerRef = useScrollReveal<HTMLDivElement>("bottom");

  return (
    <section className="relative -mt-16 z-10">
      <div className="container mx-auto">
        <div
          ref={containerRef}
          className="reveal reveal-bottom grid sm:grid-cols-2 lg:grid-cols-4 gap-8 bg-white rounded-xl py-16 px-8 md:px-12"
          style={{ boxShadow: "var(--shadow-1)" }}
        >
          {services.map((service, index) => (
            <div key={index} className="text-center group">
              <div className="mx-auto mb-6">
                <img
                  src={`https://img.icons8.com/color/96/${
                    index === 0 ? "brain" : 
                    index === 1 ? "source-code" : 
                    index === 2 ? "web-design" : "electronics"
                  }.png`}
                  alt={service.title}
                  className="mx-auto w-24 h-24 object-contain"
                />
              </div>

              <h3 className="title-lg font-oswald font-bold text-midnight-green mb-5">
                {service.title}
              </h3>

              <p className="text-foreground mb-4 text-[1.4rem] leading-relaxed">
                {service.description}
              </p>

              <button className="btn-circle mx-auto flex items-center justify-center w-14 h-14 bg-white">
                <ArrowRight size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
