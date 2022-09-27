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
import { client } from '../../libs/client';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const Home: NextPage<Props> = ({ news }) => {
  return (
    <>
      <Head
        title=""
        description="Pet Bはペット愛好家のためのWebサービスサイトです"
      />
      <Aside list={['ホーム']} />
      <Main>
        <section className="-hero">
          <HeroContent>
            <svg
              id="hero-logo"
              className="hero-logo"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 112.5 112.5"
            >
              <g id="_レイヤー_1-2">
                <g>
                  <path d="M56.25,112.5C25.23,112.5,0,87.27,0,56.25S25.23,0,56.25,0s56.25,25.23,56.25,56.25-25.23,56.25-56.25,56.25Zm0-110C26.61,2.5,2.5,26.61,2.5,56.25s24.11,53.75,53.75,53.75,53.75-24.11,53.75-53.75S85.89,2.5,56.25,2.5Z" />
                  <g>
                    <path d="M38.16,86.42c0-1.18,.3-1.77,.89-1.77h4.14c.75,0,1.36,.19,1.86,.56,.49,.38,.85,1.15,1.08,2.33,.23,1.18,.23,2.32,0,3.44-.23,1.12-.59,1.82-1.08,2.12-.49,.29-1.11,.44-1.86,.44h-2.76v5.72h-2.27v-12.85Zm4.85,4.87c.39,.02,.7-.22,.94-.73,.26-.87,.26-1.84,0-2.89-.23-.47-.54-.7-.94-.7h-2.58v4.32h2.58Z" />
                    <path d="M52.84,88.7c1.01,.87,1.52,2.2,1.53,3.99,.02,1.22-.33,1.83-1.04,1.83h-4c0,2.03,.49,3.05,1.48,3.05,.89,0,1.33-.73,1.33-2.19h2.27c0,1.08-.29,2.06-.87,2.95-.58,.89-1.51,1.34-2.79,1.34s-2.14-.35-2.58-1.04c-.72-1.1-1.07-2.57-1.07-4.42,0-2.54,.51-4.29,1.53-5.27,.68-.57,1.39-.85,2.11-.85s1.43,.2,2.11,.61Zm-2.04,1.8c-.69,0-1.13,.62-1.34,1.86h2.54c-.2-1.24-.6-1.86-1.19-1.86Z" />
                    <path d="M61.19,99.27h-1.83c-.81,0-1.45-.29-1.93-.88-.65-.81-.98-2.2-.98-4.17v-3.5h-1.31v-2.13h1.31v-2.95h2.24v2.95h3.01c0,1.42-.29,2.13-.88,2.13h-2.13v3.47c-.04,2.01,.58,2.98,1.86,2.92h1.48c.06,1.42-.22,2.14-.83,2.16Z" />
                    <path d="M67.3,99.27c-.61,0-.92-.61-.92-1.83v-11.02c0-1.18,.3-1.77,.89-1.77h3.79c1.1,0,1.82,.31,2.18,.94,.59,.77,.91,1.74,.96,2.89,.05,1.16-.23,2.18-.82,3.08-.04,.06-.09,.12-.14,.18,.04,.04,.08,.07,.11,.09,.69,.83,1.03,1.93,1,3.29-.03,1.36-.35,2.43-.99,3.2-.72,.71-1.54,1.03-2.48,.94h-3.58Zm3.46-8.53c.84-.1,1.22-.72,1.16-1.86-.07-1.28-.47-1.92-1.21-1.92h-2.07v3.78h2.11Zm-.05,6.27c.86-.22,1.32-.91,1.39-2.07,.06-1.32-.39-2-1.34-2.04h-2.11v4.11h2.07Z" />
                  </g>
                  <path d="M79.17,47.28c-.12-.08-.25-.21-.41-.39,.19-.26,.37-.52,.53-.77,2.3-3.78,3.37-8.13,3.19-13.03-.18-4.9-1.41-8.98-3.72-12.25-1.37-2.66-4.18-4-8.43-4h-28.86c-2.89,0-5.29,.8-7.2,2.39-1.91,1.59-3.31,4.88-4.18,9.87-.88,4.99-.88,9.85,0,14.57,.88,4.73,2.27,7.72,4.18,8.96,1.91,1.25,4.31,1.87,7.2,1.87h10.71v24.25h17.44c3.63,.34,6.83-.99,9.6-4,2.46-3.27,3.74-7.78,3.83-13.54,.1-5.76-1.2-10.4-3.89-13.93Zm-26.98-2.32h-10.01c-1.52,.09-2.73-.95-3.63-3.1-1.01-3.7-1.01-7.78,0-12.25,.9-1.98,2.11-2.97,3.63-2.97h10.01v18.32Zm21.48-10.19c.23,4.82-1.27,7.44-4.51,7.87h-8.19v-15.99h8.02c2.85,0,4.41,2.71,4.68,8.13Zm.7,25.67c-.27,4.9-2.07,7.83-5.39,8.77h-8.02v-17.41h8.19c3.71,.17,5.44,3.05,5.21,8.64Z" />
                </g>
              </g>
            </svg>
            <h2>あなたのペット愛を試してみませんか？</h2>
          </HeroContent>
          <HeroImage></HeroImage>
        </section>
        <section>
          <h2>おしらせ</h2>
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
                          <Moment format="YYYY/MM/DD">
                            {post.publishedAt}
                          </Moment>
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
