import { useState, useEffect } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { User, Award, ExternalLink } from "lucide-react";

interface Project {
  _id: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
}

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const titleRef = useScrollReveal<HTMLDivElement>("bottom");
  const gridRef = useScrollReveal<HTMLDivElement>("bottom", 0.2);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
        const response = await fetch(`${backendUrl}/v1/ankitverma969/projects`);
        const data = await response.json();

        if (response.ok) {
          setProjects(data.projects);
        }
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const shouldScroll = projects.length > 3;

  if (loading) {
    return (
      <section
        id="projects"
        className="pb-[120px]"
        style={{
          background: "linear-gradient(to bottom, hsl(187 25% 94%) 60%, hsl(0 0% 100%) 60%)",
        }}
      >
        <div className="container mx-auto">
          <div className="text-center">
            <p className="text-verdigris font-medium">Loading projects...</p>
          </div>
        </div>
      </section>
    );
  }

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

        {projects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-foreground text-lg">No projects available yet.</p>
          </div>
        ) : (
          <div
            ref={gridRef}
            className={`reveal reveal-bottom ${
              shouldScroll
                ? "overflow-x-auto pb-4"
                : "grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            }`}
            style={shouldScroll ? { scrollbarWidth: 'thin' } : {}}
          >
            <div
              className={
                shouldScroll
                  ? "flex gap-8 w-max"
                  : "contents"
              }
            >
              {projects.map((project) => (
                <article
                  key={project._id}
                  className={`blog-card rounded-xl p-12 cursor-pointer group border-2 border-alice-blue ${
                    shouldScroll ? "min-w-[350px] md:min-w-[400px]" : ""
                  }`}
                >
                  <div className="flex flex-wrap gap-4 mb-3">
                    <div className="flex items-center gap-2 blog-card-text text-midnight-green transition-colors duration-500">
                      <User size={18} />
                      <span className="uppercase text-[1.3rem]">By Ankit</span>
                    </div>
                    {project.featured && (
                      <div className="flex items-center gap-2 blog-card-text text-midnight-green transition-colors duration-500">
                        <Award size={18} />
                        <span className="text-[1.3rem]">Featured Project</span>
                      </div>
                    )}
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
                    {project.githubUrl && project.githubUrl !== '#' && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 blog-card-text text-verdigris font-medium transition-colors duration-500"
                      >
                        GitHub
                        <ExternalLink size={16} />
                      </a>
                    )}
                    {project.liveUrl && project.liveUrl !== '#' && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 blog-card-text text-verdigris font-medium transition-colors duration-500"
                      >
                        Live Demo
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
