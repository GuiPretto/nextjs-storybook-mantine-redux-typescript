import { MantineThemeOverride } from '@mantine/core';

const theme: MantineThemeOverride = {
  // Some custom mantine properties
  shadows: {
    xs: '0 1px 3px rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px',
    sm: '0 1px 3px rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0px 28px 23px -7px, rgba(0, 0, 0, 0.04) 0px 12px 12px -7px',
    md: '0 1px 3px rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0px 36px 28px -7px, rgba(0, 0, 0, 0.04) 0px 17px 17px -7px',
    lg: `#A6A7AB 2px 2px 10px`,
    xl: `#A6A7AB 4px 4px 10px`,
  },
  primaryColor: 'yellow',
  primaryShade: 6,
  defaultGradient: {
    from: 'green.9',
    to: 'green.8',
  },
  breakpoints: {
    xs: 481,
    sm: 769,
    md: 1025,
    lg: 1201,
    xl: 1401,
  },
};

export const defaultTransition = `
  all .2s ease-in-out
`;

export default theme;
