import Hero from "./components/Hero";
import TechStack from "./components/TechStack";
import Projects from "./components/Projects";
import Articles from "./components/Articles";
import Contact from "./components/Contact";
import useScrollReveal from "./hooks/useScrollReveal";
import useSmoothScroll from "./hooks/useSmoothScroll";
import useActiveSection from "./hooks/useActiveSection";

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "works", label: "Works" },
  { id: "contact", label: "Contact" },
];

/**
 * Root application component.
 *
 * Renders the single-page portfolio in three coherent dark sections:
 * 1. Hero — introduction and primary CTA.
 * 2. Works screen — Tech radar, Featured Works, Articles (unified dark).
 * 3. Contact — contact information and footer.
 *
 * The fixed navigation lives here, outside any scroll-reveal section, so it
 * positions relative to the viewport rather than a transformed ancestor.
 */
function App(): JSX.Element {
  const worksRef = useScrollReveal<HTMLElement>();
  const activeSection = useActiveSection(NAV_ITEMS.map((item) => item.id));
  useSmoothScroll();

  return (
    <div className="app">
      <a href="#main-content" className="skip-link">
        跳转到主要内容
      </a>
      <nav className="hero__nav" aria-label="Primary navigation">
        {NAV_ITEMS.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={activeSection === item.id ? "is-active" : undefined}
            aria-current={activeSection === item.id ? "page" : undefined}
          >
            {item.label}
          </a>
        ))}
      </nav>
      <main id="main-content">
        <Hero />

        <section
          ref={worksRef}
          className="works-screen reveal"
          aria-label="Works and skills"
        >
          <div className="ambient-bg" aria-hidden="true">
            <div className="ambient-bg__orb ambient-bg__orb--1" />
            <div className="ambient-bg__orb ambient-bg__orb--2" />
            <div className="ambient-bg__orb ambient-bg__orb--3" />
          </div>
          <div className="works-screen__container">
            <TechStack />
            <Projects />
            <Articles />
          </div>
        </section>

        <Contact />
      </main>
    </div>
  );
}

export default App;
