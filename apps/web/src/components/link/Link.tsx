import type { LinkProps } from 'next/link';
import NextLink from 'next/link';
import { AnchorHTMLAttributes } from 'react';

export const Link = ({ href, ...rest }: LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const isInternalLink = href && href.startsWith('/');
  const isAnchorLink = href && href.startsWith('#');

  if (isInternalLink) {
    return <NextLink href={href} {...rest} />;
  }

  if (isAnchorLink) {
    return <a href={href} {...rest} />;
  }

  return <a target="_blank" rel="noopener noreferrer" href={href} {...rest} />;
};
