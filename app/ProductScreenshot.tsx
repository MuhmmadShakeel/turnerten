type ProductScreenshotProps = {
  src: string;
  title: string;
  caption?: string;
  className?: string;
  darkFrame?: boolean;
};

export default function ProductScreenshot({ src, title, caption, className = '', darkFrame = false }: ProductScreenshotProps) {
  const name = src.split('/').pop()?.replace(/\.webp$/, '') ?? '';
  return (
    <figure className={`product-screenshot ${darkFrame ? 'is-dark-frame' : ''} ${className}`}>
      <div className="product-screenshot-image">
        <img className="product-screenshot-light" src={`/product-screens/polished/${name}-light.webp`} alt={`${title} in the Turner 10 application`} loading="lazy" />
        <img className="product-screenshot-dark" src={`/product-screens/polished/${name}-dark.webp`} alt="" aria-hidden="true" loading="lazy" />
      </div>
      {caption && <figcaption className="product-screenshot-caption"><strong>{title}</strong><span>{caption}</span></figcaption>}
    </figure>
  );
}
