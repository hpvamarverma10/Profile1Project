import { useScrollReveal } from "@/hooks/useScrollReveal";
import { User, Award, ExternalLink } from "lucide-react";

const projects = [
  {
    title: "Intelligent WhatsApp Reply Engine",
    date: "Jan 2024 - Present",
    description:
      "MERN-based WhatsApp automation with 99% session stability, intent detection (95% accuracy), and NLP tone-matching that boosted multilingual response correctness by ~60%.",
    tags: ["React.js", "Node.js", "MongoDB", "NLP"],
    github: "https://github.com/ankitverma969",
    live: "#",
  },
  {
    title: "InternshipHub Platform",
    date: "Jun 2025 - Aug 2025",
    description:
      "Secure multi-role platform (Admin, Supervisor, Student) with real-time messaging, cutting manual work by 40% and communication delays by 50%.",
    tags: ["React.js", "Express.js", "Socket.io"],
    github: "https://github.com/ankitverma969",
    live: "#",
  },
  {
    title: "Freelance MERN Applications",
    date: "Jan 2024 - Present",
    description:
      "Delivered 5+ MERN applications, improving load times by 40%, engineered 10+ reusable React components, and integrated APIs like OAuth & Razorpay.",
    tags: ["React.js", "Node.js", "MongoDB", "JWT"],
    github: "https://github.com/ankitverma969",
    live: "#",
  },
];

const Projects = () => {
  const titleRef = useScrollReveal<HTMLDivElement>("bottom");
  const gridRef = useScrollReveal<HTMLDivElement>("bottom", 0.2);

  return (
    <section
      id="projects"
      className="pb-[120px]"
      style={{
        background: "linear-gradient(to bottom, hsl(187 25% 94%) 60%, hsl(0 0% 100%) 60%)",
      }}
    >
      <div className="container mx-auto">
        <div ref={titleRef} className="reveal reveal-bottom text-center mb-16">
          <p className="text-verdigris font-medium uppercase tracking-wider mb-2">
            My Projects
          </p>
          <h2 className="headline-md">Latest Work</h2>
        </div>

        <div
          ref={gridRef}
          className="reveal reveal-bottom grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <article
              key={index}
              className="blog-card rounded-xl p-12 cursor-pointer group border-2 border-alice-blue"
            >
              <div className="flex flex-wrap gap-4 mb-3">
                <div className="flex items-center gap-2 blog-card-text text-midnight-green transition-colors duration-500">
                  <User size={18} />
                  <span className="uppercase text-[1.3rem]">By Ankit</span>
                </div>
                <div className="flex items-center gap-2 blog-card-text text-midnight-green transition-colors duration-500">
                  <Award size={18} />
                  <span className="text-[1.3rem]">Featured Project</span>
                </div>
              </div>

              <h3 className="headline-sm font-oswald blog-card-text text-midnight-green transition-colors duration-500 mb-4">
                {project.title}
              </h3>

              <time className="block blog-card-text text-space-cadet font-bold uppercase opacity-50 mb-4 transition-colors duration-500">
                {project.date}
              </time>

              <p className="blog-card-text text-foreground leading-relaxed mb-4 transition-colors duration-500">
                {project.description}
              </p>

              <div className="flex gap-4">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 blog-card-text text-verdigris font-medium transition-colors duration-500"
                >
                  GitHub
                  <ExternalLink size={16} />
                </a>
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 blog-card-text text-verdigris font-medium transition-colors duration-500"
                >
                  Live Demo
                  <ExternalLink size={16} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
