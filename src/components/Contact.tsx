import useScrollReveal from "../hooks/useScrollReveal";

/**
 * Contact section — footer-style closing area.
 *
 * Displays email, GitHub, and location as a compact horizontal row with a
 * small copyright line underneath. No longer consumes a full viewport.
 */
function Contact(): JSX.Element {
  const sectionRef = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      className="contact reveal"
      id="contact"
      aria-label="Contact information"
    >
      <div className="contact__container">
        <h2 className="contact__title">Get In Touch</h2>

        <div className="contact__list">
          <a
            href="mailto:yanping@example.com"
            className="contact__item"
            aria-label="Send email to yanping@example.com"
          >
            <span className="contact__icon" aria-hidden="true">
              📧
            </span>
            <span className="contact__text">yanping@example.com</span>
            <span className="contact__arrow" aria-hidden="true">
              →
            </span>
          </a>

          <a
            href="https://github.com/yanping"
            className="contact__item"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit GitHub profile github.com/yanping"
          >
            <span className="contact__icon" aria-hidden="true">
              🐙
            </span>
            <span className="contact__text">github.com/yanping</span>
            <span className="contact__arrow" aria-hidden="true">
              →
            </span>
          </a>

          <div className="contact__item" aria-label="Location: 中国">
            <span className="contact__icon" aria-hidden="true">
              📍
            </span>
            <span className="contact__text">中国</span>
            <span className="contact__arrow" aria-hidden="true" />
          </div>
        </div>

        <p className="contact__footer">
          © {new Date().getFullYear()} Yan Ping. All rights reserved.
        </p>
      </div>
    </section>
  );
}

export default Contact;
