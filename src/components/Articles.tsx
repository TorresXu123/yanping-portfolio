import useScrollReveal from "../hooks/useScrollReveal";

/**
 * Articles section — slim footer-style link on the dark Screen-2
 * background, leading out to the external dumi blog.
 */
function Articles(): JSX.Element {
  const sectionRef = useScrollReveal<HTMLElement>();

  return (
    <section ref={sectionRef} className="articles reveal" aria-label="Articles">
      <h2 className="section-title">
        <span aria-hidden="true">✍️</span>
        <span>
          <span className="section-title__accent">Articles</span>
        </span>
      </h2>
      <a
        href="https://TorresXu123.github.io/blog"
        className="article-link"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Visit my blog — Technical articles and tutorials"
      >
        <span className="article-link__icon" aria-hidden="true">
          📝
        </span>
        <span className="article-link__text">
          Visit my blog
          <span className="article-link__sub">
            技术文章 · 实战教程 · 踩坑记录
          </span>
        </span>
        <span className="article-link__arrow" aria-hidden="true">
          →
        </span>
      </a>
    </section>
  );
}

export default Articles;
