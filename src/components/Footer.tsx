import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { color } from 'styles/color';

const Footer = () => {
  const [date, setDate] = useState<number>();
  const getYear = () => setDate(new Date().getFullYear());
  useEffect(() => {
    getYear();
  }, []);
  return (
    <Wrapper>
      <small>
        Copyright © -{date}{' '}
        <a href="https://alacode.jp" target="_blank" rel="noopener noreferrer">
          alacode
        </a>{' '}
        All Rights Reserved.
      </small>
    </Wrapper>
  );
};

export default Footer;

const Wrapper = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1 1 100%;
  height: 40px;
  padding: 0.2em;
  text-align: center;
  font-size: 0.8em;
  letter-spacing: 0.08em;
  a {
    font-weight: 500;
    color: ${color.bluePicton};
  }
`;
