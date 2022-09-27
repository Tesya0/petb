import { css } from 'styled-components';

export const reset = css`
  * {
    box-sizing: border-box;
    min-width : 0;
    min-height: 0;
  }
  html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, caption, tbody, tfoot, thead, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font: inherit;
    vertical-align: baseline;
    text-decoration: none;
  }
  article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section {
    display: block;
  }
  ol, ul, li {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after, q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  html, body {
    width: 100%;
    height: 100%;
    line-height: 1;
  }
  html {
    font-size: 62.5%;
  }
  img {
    vertical-align: bottom;
  }
  input {
    padding: 0;
    border: none;
    border-radius: 0;
    outline: none;
    background: none;
  }
  select {
    border: none;
    outline: none;
    background: transparent;
    appearance: none;
    -webkit-appearance: none;
  }
  textarea {
    padding: 0;
    border: 0;
    outline: none;
    resize: none;
    background: transparent;
    appearance: none;
    -webkit-appearance: none;
  }
  button {
    padding: 0;
    border: none;
    cursor: pointer;
    outline: none;
    background: transparent;
    appearance: none;
  }
  a {
    color: inherit;
  }
`;