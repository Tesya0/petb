import { ReactNode } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';
import { color } from 'styles/color';

interface Props {
  list: string[];
  title?: string;
  text?: string;
}

const Aside = ({ list, title, text }: Props) => {
  const router = useRouter();
  const pathArray = router.asPath.split('/');
  const tmp: string[] = [];
  const newArray = pathArray.map((value) => {
    tmp.push(`${value}/`);
    return tmp.join('');
  });
  console.log(newArray);

  return (
    <AsideWrapper>
      <ol>
        {list.map((value, index) => {
          return (
            <li key={index}>
              {list.length - 1 !== index ? (
                <Link href={newArray[index]}>{value}</Link>
              ) : (
                <span>{value}</span>
              )}
            </li>
          );
        })}
      </ol>
      <h2>{title ? title : ''}</h2>
      <p>{text}</p>
    </AsideWrapper>
  );
};
export default Aside;

const BreadcrumbWrapper = styled.ol``;

const AsideWrapper = styled.aside`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
  padding: 10px 20px;
  color: #fff;
  background: ${color.blueOxford};
  ol {
    display: flex;
  }
  ol li {
    &:not(:last-child)::after {
      content: '/';
      padding: 0 0.5em;
      color: ${color.grayDim};
    }
  }
`;
