import useScrollReveal from "../hooks/useScrollReveal";
import { projectsData } from "../data/projects";

/**
 * Featured Works section — three cards in a single row on the light
 * Screen-2 background. Each card links to the project's external
 * repository / demo, shows a minimal SVG icon, title, description,
 * and tech-stack tags.
 */
function Projects(): JSX.Element {
  const sectionRef = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      className="projects reveal"
      aria-label="Featured works"
    >
      <h2 className="section-title">
        <span aria-hidden="true">🚀</span>
        <span>
          Featured{" "}
          <span className="section-title__accent">Works</span>
        </span>
      </h2>

      <div className="projects__list">
        {projectsData.map((project) => (
          <a
            key={project.id}
            href={project.url}
            className="project-card"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} — ${project.description}`}
            style={{ ["--card-accent" as string]: project.accent }}
          >
            <div className="project-card__icon" aria-hidden="true">
              {project.icon}
            </div>

            <div className="project-card__content">
              <h3 className="project-card__title">{project.title}</h3>
              <p className="project-card__desc">{project.description}</p>

              <div className="project-card__tags">
                {project.tags.map((tag) => (
                  <span
                    key={tag.label}
                    className={`tag tag--${tag.variant}`}
                  >
                    {tag.label}
                  </span>
                ))}
              </div>

              <span className="project-card__arrow" aria-hidden="true">
                →
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

export default Projects;