import HTMLHead from 'next/head';

interface Props {
  title: string;
  description: string;
}

const Head = ({ title, description }: Props): JSX.Element => {
  return (
    <HTMLHead>
      <title>{title ? `${title} | Pet B` : 'Pet B'}</title>
      <meta name="description" content={description} />
    </HTMLHead>
  );
};
export default Head;
