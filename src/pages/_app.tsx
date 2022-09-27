import { useEffect, useState } from 'react';
import Layout from 'components/Layout';
import styled, { createGlobalStyle } from 'styled-components';
import { breakpoints, mqMin } from 'styles/mq';
import { reset } from 'styles/reset';
import { color } from 'styles/color';
import { fontFace, font } from 'styles/font';
import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <GlobalStyle />
      <Component {...pageProps} />
    </Layout>
  );
}
export default appWithTranslation(MyApp);

const GlobalStyle = createGlobalStyle`
  ${reset}
  ${fontFace}
  body {
    min-width: 960px;
    height: 100%;
    line-height: 2;
    letter-spacing: 0.04em;
    color: ${color.grayEclipse};
    font-size: 1.4em;
    ${font.notoSansJp};
    ${mqMin(breakpoints.md)} {
      font-size: 1.6em;
    }
  }
  a[href^="tel:"] {
    ${mqMin(breakpoints.sm)} {
      pointer-events: none;
    }
  }
  #__next {
    display: flex;
    justify-content: center;
    position: relative;
    z-index: 0;
    width: 100%;
    min-height: 100vh;
  }
`;
