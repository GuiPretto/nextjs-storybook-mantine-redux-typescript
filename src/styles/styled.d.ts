import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      [key: string]: string;
    };
    breakpoints: {
      [key: string]: string;
    };
    transition: string;
    fontSize: string;
    navWidth: string;
    navWidthFull: string;
  }
}