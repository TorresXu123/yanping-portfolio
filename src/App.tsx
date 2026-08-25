import CustomCursor from "./components/CustomCursor";
import Hero from "./components/Hero";
import TechStack from "./components/TechStack";
import Projects from "./components/Projects";
import Articles from "./components/Articles";
import Contact from "./components/Contact";
import useScrollReveal from "./hooks/useScrollReveal";
import useSmoothScroll from "./hooks/useSmoothScroll";
import useActiveSection from "./hooks/useActiveSection";
import useMagnetic from "./hooks/useMagnetic";

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "works", label: "Works" },
  { id: "contact", label: "Contact" },
];

type NavLinkProps = {
  href: string;
  label: string;
  active: boolean;
};

/**
 * Single nav pill with magnetic attraction toward the cursor
 * (see `useMagnetic`). Kept as a component so each link owns its own ref.
 */
function NavLink({ href, label, active }: NavLinkProps): JSX.Element {
  const magneticRef = useMagnetic<HTMLAnchorElement>();

  return (
    <a
      ref={magneticRef}
      href={href}
      className={`magnetic${active ? " is-active" : ""}`}
      aria-current={active ? "page" : undefined}
    >
      {label}
    </a>
  );
}

/**
 * Root application component.
 *
 * Renders the single-page portfolio in three coherent dark sections:
 * 1. Hero — introduction and primary CTA (constellation edition).
 * 2. Works screen — Tech radar, Featured Works, Articles (unified dark).
 * 3. Contact — contact information and footer.
 *
 * The fixed navigation and the custom cursor live here, outside any
 * scroll-reveal section, so they position relative to the viewport rather
 * than a transformed ancestor.
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
          <NavLink
            key={item.id}
            href={`#${item.id}`}
            label={item.label}
            active={activeSection === item.id}
          />
        ))}
      </nav>
      <main id="main-content">
        <Hero />

        <section
          id="works"
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
      <CustomCursor />
    </div>
  );
}

export default App;
