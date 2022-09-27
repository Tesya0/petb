import { ReactNode } from 'react';
import styled from 'styled-components';
import { color } from 'styles/color';

interface Props {
  children: ReactNode;
}

const AnswerList = ({ children }: Props) => {
  return <Wrapper>{children}</Wrapper>;
};

export default AnswerList;

const Wrapper = styled.ul`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  width: 100%;
  li {
    flex: 0 1 calc(50% - 5px);
    margin-bottom: 10px;
    border-radius: 4px;
    background: ${color.grayNero};
    overflow: hidden;
    transition: all 0.2s;
    &:hover {
      opacity: 0.8;
    }
  }
  button {
    width: 100%;
    height: 100%;
    padding: 1em;
    color: #fff;
  }
`;
