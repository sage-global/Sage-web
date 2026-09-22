import { createGlobalStyle } from 'styled-components';

// default breakpoints
// {
//   smallPhone: 320;
//   phone: 375;
//   tablet: 768;
//   desktop: 1024;
//   largeDesktop: 1440;
// }

export const GlobalStyle = createGlobalStyle`

.next-light-theme {
  --background: 255,255,255;
  --secondBackground: 248,251,255;
  --text: 15,23,42;
  --textSecondary: 255,255,255;
  --primary: 251,107,49; 
  --brandBlue: 0,106,173;
  --skyBlue: 53,169,239;
  --secondary: 0,106,173;
  --tertiary: 235,246,254;
  --cardBackground: 255,255,255;
  --inputBackground: 255,255,255;
  --navbarBackground: 255,255,255;
  --modalBackground: 255,255,255;
  --errorColor: 220,38,38;
  --logoColor: #006aad;
  --lineColor: 226,232,240;
  --mutedColor: 100,116,139;
}

.next-dark-theme {
  --background: 15,23,42;
  --secondBackground: 30,41,59;
  --text: 248,250,252;
  --textSecondary: 255,255,255;
  --primary: 251,107,49; 
  --brandBlue: 0,106,173;
  --skyBlue: 53,169,239;
  --secondary: 0,80,130;
  --tertiary: 30,58,95;
  --cardBackground: 30,41,59;
  --inputBackground: 30,41,59;
  --navbarBackground: 15,23,42;
  --modalBackground: 15,23,42;
  --errorColor: 220,38,38;
  --logoColor: #35a9ef;
  --lineColor: 51,65,85;
  --mutedColor: 148,163,184;
}
  --lineColor: 60,60,60;
  --mutedColor: 160,160,160;
}

:root {
  --font-heading: 'Sansation', 'Manrope', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-body: 'Sansation', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font: var(--font-body);
  
  --shadow-sm: 0 1px 3px 0 rgb(26 26 26 / 6%);
  --shadow-md: 0 4px 12px 0 rgb(26 26 26 / 8%);
  --shadow-lg: 0 10px 24px 0 rgb(26 26 26 / 12%);

  --z-sticky: 7777;
  --z-navbar: 8888;
  --z-drawer: 9999;
  --z-modal: 9999;
}

/* Box sizing rules */
*,
*::before,
*::after {
  box-sizing: border-box;
}

/* Remove default margin */
body,
h1,
h2,
h3,
h4,
p,
figure,
blockquote,
dl,
dd {
  margin: 0;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
  font-weight: 700;
  letter-spacing: -0.02em;
}

/* Remove list styles on ul, ol elements with a list role, which suggests default styling will be removed */
ul[role='list'],
ol[role='list'] {
  list-style: none;
}

/* Set core root defaults */
html:focus-within {
  scroll-behavior: smooth;
} 

html {
  -webkit-font-smoothing: antialiased;
  touch-action: manipulation;
  text-rendering: optimizelegibility;
  text-size-adjust: 100%;
  font-size: 62.5%;

  @media (max-width: 37.5em) {
    font-size: 50%;
  }

  @media (max-width: 48.0625em) {
    font-size: 55%;
  }

  @media (max-width: 56.25em) {
    font-size: 60%;
  }
}

/* Set core body defaults */
body {
  min-height: 100vh;
  text-rendering: optimizeSpeed;
  line-height: 1.6;
  font-family: var(--font-body);
  font-weight: 400;
  color: rgb(var(--text));
  background: rgb(var(--background));
  font-feature-settings: "kern";
}

svg {
  color: rgb(var(--text));
}

/* A elements that don't have a class get default styles */
a:not([class]) {
  text-decoration-skip-ink: auto;
}

/* Make images easier to work with */
img,
picture {
  max-width: 100%;
  display: block;
}

/* Inherit fonts for inputs and buttons */
input,
button,
textarea,
select {
  font: inherit;
}

/* Remove all animations, transitions and smooth scroll for people that prefer not to see them */
@media (prefers-reduced-motion: reduce) {
  html:focus-within {
   scroll-behavior: auto;
  }
  
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }

}`;
