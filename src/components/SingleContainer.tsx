import { ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { color } from 'styles/color';

type Props = {
  children: ReactNode;
  date?: string;
  post?: boolean | undefined;
};

export default function SingleContainer({ children, date, post }: Props) {
  return (
    <SingleContainerWrapper post={post}>
      {date && <time className="date">{date}</time>}
      {children}
    </SingleContainerWrapper>
  );
}

const SingleContainerWrapper = styled.div<Props>`
  position: relative;
  z-index: 1;
  width: 80%;
  max-width: 960px;
  margin: 0 auto;
  ${({ post }) =>
    post &&
    css`
      padding: 80px;
      border-radius: 20px;
      background: #fff;
    `}
  .date {
    position: relative;
    top: -40px;
    left: -100px;
    padding: 0.4em 0.8em 0.4em 2em;
    color: #fff;
    background: ${color.greenFusen};
  }
  h3 {
    padding: 0.2em 0.8em;
    margin-bottom: 1em;
    font-size: 1.25em;
    font-weight: 500;
    background: ${color.greenGossip};
  }
  p {
    padding: 0 0.5em;
    margin-bottom: 2em;
    font-weight: 300;
  }
  .setting {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .label {
    font-weight: 500;
  }
`;
