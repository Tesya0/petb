import { Key, useEffect, useRef, useState } from 'react';
import Moment from 'react-moment';
import Link from 'next/link';
import type { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next';
import Image from 'next/image';
import { color } from 'styles/color';
import styled from 'styled-components';
import Head from 'components/Head';
import Aside from 'components/Aside';
import Footer from 'components/Footer';
import { client } from '../../../libs/client';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const pageTitle = 'おしらせ';

export const Home: NextPage<Props> = ({ news }) => {
  return (
    <>
      <Head title={pageTitle} description={pageTitle} />
      <Aside list={['ホーム', 'おしらせ']} />
      <Main>
        <section>
          <h2>{pageTitle}</h2>
          <NewsContainer>
            {news.map(
              (post: {
                id: Key | null | undefined;
                title: string;
                publishedAt: number;
              }) => {
                return (
                  <li key={post.id}>
                    <Link href={`news/${post.id}`}>
                      <a>
                        <time>
                          {/* <Moment format="YYYY/MM/DD"> */}
                          {post.publishedAt}
                          {/* </Moment> */}
                        </time>
                        <h3>{post.title}</h3>
                      </a>
                    </Link>
                  </li>
                );
              }
            )}
          </NewsContainer>
        </section>
      </Main>
      <Footer />
    </>
  );
};
export default Home;

export const getStaticProps = async () => {
  const data = await client.get({ endpoint: 'news' });
  return {
    props: {
      news: data.contents,
    },
  };
};

const Main = styled.main`
  width: 100%;
  min-height: calc(100vh - 100px);
  margin: 0 auto;
  background: ${color.graySmoke};
  section {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 80px 0;
  }
  section.-hero {
    justify-content: space-between;
    padding: 0;
  }
  section > h2 {
    flex: 1 1 100%;
    text-align: center;
    margin-bottom: 1em;
    font-weight: 300;
    font-size: 1.5em;
  }
`;
const HeroImage = styled.div`
  content: '';
  position: relative;
  flex: 0 1 50%;
  padding: 20px;
  overflow: hidden;
  &::before {
    content: '';
    display: block;
    width: 100%;
    padding-top: 100%;
    border-radius: 50%;
    background: url('/images/hero-dog-cat2.jpg') center center/ contain
      no-repeat;
  }
`;
const HeroContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1 1 50%;
  padding: 20px;
  h2 {
    margin-top: 1em;
    font-size: 1.5em;
    font-weight: 300;
    text-align: center;
    letter-spacing: 0.04em;
  }
  .hero-logo {
    width: 140px;
  }
`;
const NewsContainer = styled.ul`
  width: 100%;
  max-width: 960px;
  padding: 0 20px;
  box-sizing: content-box;
  li {
    width: 100%;
    margin-bottom: 20px;
  }
  a {
    display: block;
    padding: 0.65em 1em;
    border-radius: 4px;
    background: #fff;
    transition: all 0.25s;
    &:hover {
      color: ${color.bluePicton};
    }
  }
  time {
    margin-right: 1em;
    font-weight: 300;
  }
  h3 {
    display: inline;
    font-weight: 500;
  }
`;
