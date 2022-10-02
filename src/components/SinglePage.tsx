import { ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { color } from 'styles/color';
import { breakpoints, mqMin } from 'styles/mq';
import { vwRange } from 'styles/vw';

type Props = {
  children: ReactNode;
  title: string;
  news?: boolean | undefined;
};

export default function SinglePage({ children, title, news }: Props) {
  return (
    <SinglePageWrapper news={news}>
      <div className="background">
        <h2 className="title">{title}</h2>
      </div>
      {children}
    </SinglePageWrapper>
  );
}

const SinglePageWrapper = styled.main<{ news: boolean | undefined }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 100%;
  min-height: 90vh;
  padding: 14.0625% 0 120px;
  background: ${color.graySmoke};
  .background {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    width: 100%;
    padding-top: 28.125%;
    background: ${({ news }) =>
      news
        ? color.greenAtlantis
        : css`url('/images/hero-kenken.jpg') left top/ contain no-repeat`};
    &::before,
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0.7;
    }
    ${({ news }) =>
      !news &&
      css`
        &::before {
          z-index: 1;
          background: linear-gradient(${color.yellowMoon}, ${color.greenSulu});
        }
      `}
    &::after {
      z-index: 2;
      background-image: radial-gradient(
          ${color.greenFusen} 17%,
          transparent 17%
        ),
        radial-gradient(${color.greenFusen} 17%, transparent 17%);
      background-position: 0 0, 9px 9px;
      background-size: 18px 18px;
    }
  }
  .title {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 3;
    width: 100%;
    padding-top: 0.8em;
    color: #fff;
    text-align: center;
    ${mqMin(breakpoints.md)} {
      ${vwRange('font-size', 32, 64, breakpoints.md, breakpoints.xl)}
    }
    ${({ news }) =>
      !news &&
      css`
        font-weight: 700;
        color: rgba(0, 0, 0, 0);
        text-shadow: 2px 3px 0 ${color.yellowCanary};
        -webkit-text-stroke: 1px ${color.black};
      `}
  }
`;
