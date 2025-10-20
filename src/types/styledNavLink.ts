import { IconType } from 'react-icons';
import { To } from 'react-router-dom';

/**
 * A StyledNavLink type definition
 */
export type StyledNavLink = {
  name: React.Key;
  href: To;
  icon: IconType;
};

/**
 * Properties for links array that can be passed
 * through to StyledNav
 */
export type LinkProps = {
  links: StyledNavLink[];
};
