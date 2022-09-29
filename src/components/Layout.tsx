import { ReactNode } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styled from 'styled-components';
import { color } from 'styles/color';

type Props = {
  children?: ReactNode;
};

const Layout = ({ children }: Props) => {
  const router = useRouter();
  const kenkenMenu = [
    {
      id: 'elementary',
      jp: '初級',
    },
    {
      id: 'intermediate',
      jp: '中級',
    },
    // {
    //   id: 'advanced',
    //   jp: '上級',
    // },
  ];
  return (
    <>
      <Head>
        <title>Pet B</title>
      </Head>
      <Header>
        <h1>
          <Link href="/">
            <a>
              <Image
                className="img"
                src="/images/logo-img2.svg"
                alt="Pet B"
                width="120"
                height="40"
              />
            </a>
          </Link>
        </h1>
        <nav>
          <ul>
            <li className="row">
              <Link href="/">
                <a>
                  <span className="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                    >
                      <path d="M280.37 148.26 96 300.11V464a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05L464 480a16 16 0 0 0 16-16V300L295.67 148.26a12.19 12.19 0 0 0-15.3 0zM571.6 251.47 488 182.56V44.05a12 12 0 0 0-12-12h-56a12 12 0 0 0-12 12v72.61L318.47 43a48 48 0 0 0-61 0L4.34 251.47a12 12 0 0 0-1.6 16.9l25.5 31A12 12 0 0 0 45.15 301l235.22-193.74a12.19 12.19 0 0 1 15.3 0L530.9 301a12 12 0 0 0 16.9-1.6l25.5-31a12 12 0 0 0-1.7-16.93z" />
                    </svg>
                  </span>
                  ホーム
                </a>
              </Link>
            </li>
            <li className="row">
              <Link href="/news">
                <a>
                  <span className="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                    >
                      <path d="M552 64H112c-20.858 0-38.643 13.377-45.248 32H24c-13.255 0-24 10.745-24 24v272c0 30.928 25.072 56 56 56h496c13.255 0 24-10.745 24-24V88c0-13.255-10.745-24-24-24zM48 392V144h16v248c0 4.411-3.589 8-8 8s-8-3.589-8-8zm480 8H111.422c.374-2.614.578-5.283.578-8V112h416v288zM172 280h136c6.627 0 12-5.373 12-12v-96c0-6.627-5.373-12-12-12H172c-6.627 0-12 5.373-12 12v96c0 6.627 5.373 12 12 12zm28-80h80v40h-80v-40zm-40 140v-24c0-6.627 5.373-12 12-12h136c6.627 0 12 5.373 12 12v24c0 6.627-5.373 12-12 12H172c-6.627 0-12-5.373-12-12zm192 0v-24c0-6.627 5.373-12 12-12h104c6.627 0 12 5.373 12 12v24c0 6.627-5.373 12-12 12H364c-6.627 0-12-5.373-12-12zm0-144v-24c0-6.627 5.373-12 12-12h104c6.627 0 12 5.373 12 12v24c0 6.627-5.373 12-12 12H364c-6.627 0-12-5.373-12-12zm0 72v-24c0-6.627 5.373-12 12-12h104c6.627 0 12 5.373 12 12v24c0 6.627-5.373 12-12 12H364c-6.627 0-12-5.373-12-12z" />
                    </svg>
                  </span>
                  おしらせ
                </a>
              </Link>
            </li>
            <li className="row">
              <Link href="/kenken/elementary">
                <a>
                  <span className="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 457.16 222.54"
                    >
                      <path d="M135.34 157.06h186.48c1.2 36.36 30.97 65.48 67.61 65.48s67.73-30.32 67.73-67.73c0-16.59-5.98-31.76-15.88-43.54 9.9-11.77 15.88-26.95 15.88-43.54C457.16 30.32 426.84 0 389.43 0s-66.42 29.12-67.61 65.48H135.34C134.15 29.12 104.37 0 67.73 0S0 30.32 0 67.73c0 16.59 5.98 31.76 15.88 43.54C5.98 123.04 0 138.22 0 154.81c0 37.41 30.32 67.73 67.73 67.73s66.42-29.12 67.61-65.48Z" />
                    </svg>
                  </span>
                  犬種名検定
                </a>
              </Link>

              <ul className="group">
                {kenkenMenu.map((value, key) => {
                  return (
                    <li
                      className={`tree${
                        value.id === router.query.id ? ' -active' : ''
                      }`}
                      key={key}
                    >
                      <Link href={`/kenken/${value.id}`}>{value.jp}</Link>
                    </li>
                  );
                })}
              </ul>
            </li>
          </ul>
        </nav>
      </Header>
      <Container>{children}</Container>
    </>
  );
};
export default Layout;

const Header = styled.header`
  flex: 0 1 260px;
  color: #fff;
  background: ${color.blueOxford};
  h1 {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
  }
  h1 > a {
    height: 40px;
  }
  nav {
    padding: 10px;
    font-weight: 500;
  }
  .row {
    padding: 10px 0;
    border-bottom: 1px solid ${color.grayDim};
  }
  .row a {
    display: block;
    padding: 0.5em 0;
    transition: all 0.25s;
    &:hover {
      color: ${color.bluePicton};
      svg {
        fill: ${color.bluePicton};
      }
      .icon {
        border-color: ${color.bluePicton};
      }
    }
  }
  .row svg {
    width: 1.1em;
    fill: #fff;
    transition: all 0.25s;
  }
  .icon {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 2em;
    height: 2em;
    margin-right: 0.5em;
    border: 1px solid #fff;
    border-radius: 50%;
    transition: all 0.25s;
  }
  .group {
    padding-left: 1em;
  }
  .tree {
    position: relative;
    padding-left: 1.5em;
    &::before,
    &::after {
      content: '';
      position: absolute;
      width: 1em;
    }
    &::before {
      top: 0;
      left: 0;
      height: 100%;
      border-left: 1px solid ${color.grayDim};
    }
    &::after {
      top: 50%;
      left: 0;
      height: 1em;
      border-top: 1px solid ${color.grayDim};
    }
    &:last-child::before {
      height: 50%;
    }
    &.-active a {
      color: ${color.bluePicton};
    }
  }
`;
const Container = styled.div`
  flex: 0 1 calc(100% - 260px);
`;
