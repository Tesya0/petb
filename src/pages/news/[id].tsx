import type { GetStaticPaths } from 'next';
import Link from 'next/link';
import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import DOMPurify from 'isomorphic-dompurify';
import { color } from 'styles/color';
import styled from 'styled-components';
import { client } from '../../../libs/client';
import Head from 'components/Head';
import Aside from 'components/Aside';
import Footer from 'components/Footer';
import SinglePage from 'components/SinglePage';
import SingleContainer from 'components/SingleContainer';

export default function SinglePost({ news }: any) {
  return (
    <>
      <Head title={news.title} description={news.title} />
      <Aside list={['ホーム', 'おしらせ', news.title]} />
      <SinglePage title={news.title} news>
        <SingleContainer
          post
          date={format(
            utcToZonedTime(news.publishedAt, 'Asia/Tokyo'),
            'yyyy/M/d'
          )}
        >
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(news.body),
            }}
          ></div>
        </SingleContainer>
        <BackLink>
          <Link href="/news">もどる</Link>
        </BackLink>
      </SinglePage>
      <Footer />
    </>
  );
}

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

const BackLink = styled.span`
  position: relative;
  margin-top: 40px;
  font-size: 1.5em;
  font-weight: 500;
  transition: all 0.25s;
  a {
    display: inline-block;
    padding: 0 1em;
  }
  a::after {
    content: '';
    position: absolute;
    top: 35%;
    left: 0;
    width: 10px;
    height: 10px;
    border-top: 4px solid ${color.grayEclipse};
    border-right: 4px solid ${color.grayEclipse};
    transform: rotate(-135deg);
    pointer-events: none;
  }
  &:hover {
    opacity: 0.7;
  }
`;
