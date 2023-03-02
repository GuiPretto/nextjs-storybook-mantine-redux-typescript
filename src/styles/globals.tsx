import { Global, MantineThemeOverride } from '@mantine/core';

import { defaultTransition } from './theme';

const GlobalStyles = () => {
  return (
    <>
      <Global
        styles={(theme: MantineThemeOverride) => [
          // import custom fonts like this ->
          // {
          //   '@font-face': {
          //     fontFamily: 'Soleto',
          //     src: `url(${getScope()}/fonts/Soleto_Blk.ttf) format("truetype")`,
          //     fontWeight: 'bold',
          //   },
          // },
          {
            'html, body': {
              padding: 0,
              margin: 0,
              fontFamily: `-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
                Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif`,
              backgroundColor: '#FFF',
              fontSize: theme.fontSizes.md,
              color: theme.colors.dark[4],
            },
            a: {
              color: 'inherit',
              textDecoration: 'none',
            },
            '*': {
              boxSizing: 'border-box',
            },
            'figure, ul': {
              margin: 0,
              padding: 0,
            },
            'img, svg': {
              transition: defaultTransition,
            },
          },
        ]}
      />
    </>
  );
};

export default GlobalStyles;
