import useScrollReveal from "../hooks/useScrollReveal";

/**
 * Hero section — first screen of the portfolio.
 *
 * Includes the main headline with a rainbow gradient glow on the name,
 * a subtitle, and the primary CTA.
 */
function Hero(): JSX.Element {
  const sectionRef = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      className="hero reveal"
      id="home"
      aria-label="Introduction"
    >
      <div className="ambient-bg" aria-hidden="true">
        <div className="ambient-bg__orb ambient-bg__orb--1" />
        <div className="ambient-bg__orb ambient-bg__orb--2" />
        <div className="ambient-bg__orb ambient-bg__orb--3" />
      </div>

      <div className="hero-dynamic-bg" aria-hidden="true">
        <div className="hero-grid" />
        <div className="hero-particle hero-particle--1" />
        <div className="hero-particle hero-particle--2" />
        <div className="hero-particle hero-particle--3" />
        <div className="hero-particle hero-particle--4" />
        <div className="hero-particle hero-particle--5" />
        <div className="hero-shooting-star hero-shooting-star--1" />
        <div className="hero-shooting-star hero-shooting-star--2" />
        <div className="hero-shooting-star hero-shooting-star--3" />
      </div>

      <div className="hero__content">
        <h1 className="hero__title">
          Hey, I&apos;m <span className="hero__name">Yan Ping</span>
        </h1>
        <p className="hero__subtitle">Specializing in full-stack engineering</p>
      </div>
    </section>
  );
}

export default Hero;
