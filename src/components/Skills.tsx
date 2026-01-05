import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Brain, Code2, Globe, Cpu, Database, Smartphone } from "lucide-react";

const skills = [
  { icon: Brain, title: "AI/ML & Data Science", subtitle: "NumPy, Pandas, Scikit-Learn" },
  { icon: Code2, title: "Frontend", subtitle: "React.js, Tailwind CSS" },
  { icon: Globe, title: "Backend", subtitle: "Node.js, Express.js" },
  { icon: Cpu, title: "Programming", subtitle: "C, C++, Python, JS" },
  { icon: Database, title: "Databases", subtitle: "MySQL, MongoDB" },
  { icon: Smartphone, title: "API Integration", subtitle: "REST, OAuth2, JWT" },
];

const Skills = () => {
  const titleRef = useScrollReveal<HTMLDivElement>("bottom");
  const gridRef = useScrollReveal<HTMLDivElement>("bottom", 0.2);

  return (
    <section id="skills" className="section-padding bg-alice-blue">
      <div className="container mx-auto">
        <div ref={titleRef} className="reveal reveal-bottom text-center mb-16">
          <p className="text-verdigris font-medium uppercase tracking-wider mb-2">
            Skills & Expertise
          </p>
          <h2 className="headline-md">Browse by Expertise</h2>
        </div>

        <div
          ref={gridRef}
          className="reveal reveal-bottom grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6"
        >
          {skills.map((skill, index) => (
            <div
              key={index}
              className="listing-card-border bg-white rounded-xl p-6 flex flex-col items-start gap-4 hover:border-verdigris transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-full bg-alice-blue flex items-center justify-center">
                <skill.icon className="text-verdigris" size={28} />
              </div>
              <div>
                <h3 className="font-oswald font-bold text-midnight-green text-[1.6rem]">
                  {skill.title}
                </h3>
                <p className="text-midnight-green text-[1.3rem]">{skill.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
