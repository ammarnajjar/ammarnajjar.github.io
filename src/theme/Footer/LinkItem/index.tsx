import React, { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl'; // Import useBaseUrl for handling paths
import type { Props } from '@theme/Footer/LinkItem';
import styles from './index.module.css'; // Assuming you might want specific styles for image links

export default function FooterLinkItem({ item }: Props): ReactNode {
  const { href, to, label, prependBaseUrlToHref, imageSrc, alt } = item; // Destructure custom imageSrc and alt
  const ResolvedLink = href ? Link : Link; // Keeping Link for consistency

  let finalHref = href || to;
  if (prependBaseUrlToHref && href) {
    finalHref = useBaseUrl(href); // Use useBaseUrl for correct paths in production
  }

  return (
    <li key={label || finalHref} className="footer__item">
      <ResolvedLink
        className="footer__link-item"
        {...(href && {
          href: finalHref,
          target: '_blank', // Open external links in a new tab
          rel: 'noopener noreferrer', // Security best practice for target="_blank"
        })}
        {...(to && {
          to: finalHref,
        })}
      >
        {imageSrc ? (
          <img
            src={useBaseUrl(imageSrc as string)} // Ensure image path is correctly resolved
            alt={alt as string || label} // Use alt from prop or label as fallback
            className={styles.footerImageLink} // Apply custom styles for images
          />
        ) : (
          label
        )}
      </ResolvedLink>
    </li>
  );
}