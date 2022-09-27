import Moment from 'react-moment';
import type {
  NextPage,
  GetStaticProps,
  GetStaticPaths,
  InferGetStaticPropsType,
} from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { color } from 'styles/color';
import { vwRange } from 'styles/vw';
import { breakpoints, mqMin } from 'styles/mq';
import styled from 'styled-components';
import { client } from '../../../libs/client';
import Head from 'components/Head';
import Aside from 'components/Aside';
import Footer from 'components/Footer';
import SectionTitle from 'components/SectionTitle';
import { userAgent } from 'next/server';

const SinglePost = ({ news }: any) => {
  const router = useRouter();
  return (
    <>
      <Head title={news.title} description={news.title} />
      <Aside list={['ホーム', 'おしらせ', news.title]} />
      <Main>
        <div className="background"></div>
        <h2>{news.title}</h2>
        <Moment format="YYYY/MM/DD">{news.publishedAt}</Moment>
        <article
          className="container -text"
          dangerouslySetInnerHTML={{ __html: news.body }}
        />
        <Link href="/news">
          <a className="backbutton">もどる</a>
        </Link>
      </Main>
      <Footer />
    </>
  );
};
export default SinglePost;

export const getStaticProps = async (context: any) => {
  const id = context.params.id;
  const data = await client.get({ endpoint: 'news', contentId: id });

  return {
    props: {
      news: data,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await client.get({ endpoint: 'news' });
  const paths = data.contents.map(
    (content: { id: any }) => `/news/${content.id}`
  );
  return {
    paths,
    fallback: false,
  };
};

const Main = styled.main`
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
    background: ${color.greenAtlantis};
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    &::after {
      z-index: 2;
      opacity: 0.7;
      background-image: radial-gradient(
          ${color.greenLimerick} 20%,
          transparent 20%
        ),
        radial-gradient(${color.greenLimerick} 20%, transparent 20%);
      background-position: 0 0, 13px 13px;
      background-size: 26px 26px;
    }
  }
  h2 {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    padding-top: 0.8em;
    font-weight: 300;
    color: #fff;
    text-align: center;
    ${mqMin(breakpoints.md)} {
      ${vwRange('font-size', 32, 64, breakpoints.md, breakpoints.xl)}
    }
  }
  p {
    font-weight: 300;
  }
  time {
    position: absolute;
    top: 15px;
    left: 50%;
    padding: 0.15em 1.2em;
    font-weight: 500;
    color: #fff;
    background: ${color.greenLimerick};
    transform: translateX(-50%);
  }
  .container {
    position: relative;
    z-index: 1;
    width: 80%;
    max-width: 960px;
    margin-bottom: 40px;
  }
  .container.-text {
    padding: 80px;
    border-radius: 20px;
    background: #fff;
  }
  .container h3 {
    padding: 0.2em 0.8em;
    margin-bottom: 1em;
    font-size: 1.25em;
    font-weight: 500;
    background: ${color.greenGossip};
  }
  .container p {
    margin-bottom: 2em;
  }
  .backbutton {
    position: relative;
    font-size: 1.5em;
    font-weight: 700;
    transition: all 0.25s;
    &::after {
      content: '';
      position: absolute;
      top: 35%;
      left: -1.2em;
      width: 10px;
      height: 10px;
      border-top: 4px solid ${color.grayEclipse};
      border-right: 4px solid ${color.grayEclipse};
      transform: rotate(-135deg);
      pointer-events: none;
    }
    &:hover,
    &:hover::after {
      opacity: 0.8;
    }
  }
`;
