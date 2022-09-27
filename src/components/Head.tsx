import Head from 'next/head';

interface Props {
  title: string;
  description: string;
}

export default ({ title, description }: Props): JSX.Element => {
  return (
    <Head>
      <title>{title} | Pet B</title>
      <meta name="description" content={description} />
    </Head>
  );
};
