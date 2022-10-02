import { MouseEvent, useEffect, useRef, useState } from 'react';
import type {
  NextPage,
  GetStaticProps,
  GetStaticPaths,
  InferGetStaticPropsType,
} from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { color } from 'styles/color';
import styled from 'styled-components';
import gsap from 'gsap';
import 'semantic-ui-css/semantic.min.css';
import { Loader } from 'semantic-ui-react';
import Head from 'components/Head';
import Aside from 'components/Aside';
import Footer from 'components/Footer';
import AnswerList from 'components/AnswerList';
import { getRandomNum } from 'function/getRandom';
import SinglePage from 'components/SinglePage';
import SingleContainer from 'components/SingleContainer';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Kenken: NextPage<Props> = ({ data }) => {
  // 全ての問題数
  const [totalQuestions, setTotalQuestions] = useState<number>(5);
  const totalQuestionsList: number[] = [5, 10, 20, 50];
  // 現在の問題数
  const [nowQuestion, setNowQuestion] = useState<number>(1);
  // 現在の問題画像
  const [questionImage, setQuestionImage] = useState('');
  // 正解名
  const [correctName, setCorrectName] = useState('');
  // 選択肢
  const [answerList, setAnswerList] = useState([]);
  // ユーザーの選択肢
  const [userAnswer, setUserAnswer] = useState('');
  // 現在の問題の正誤
  const [singleResult, setSingleResult] = useState<boolean>();
  // 合計スコア
  const [totalScore, setTotalScore] = useState<number>(100);
  // 一問当たりのスコア
  const [singleScore, setSingleScore] = useState<number>(5);
  // ゲーム起動画面
  const [openingGame, setOpeningGame] = useState(true);
  // ゲーム進行中
  const [nowGame, setNowGame] = useState(false);
  // ゲーム待機中
  const [waitingGame, setWaitingGame] = useState(false);
  // リザルト画面
  const [resultGame, setResultGame] = useState(false);
  // 画像ローディング
  const [isLoading, setIsLoading] = useState(true);
  // Ref
  const correctRef = useRef(null);
  const missRef = useRef(null);
  // Router
  const router = useRouter();
  // i18n
  const { t } = useTranslation('common');

  const fetchDogList = async () => {
    const res = await fetch(
      `https://dog.ceo/api/breeds/image/random/${data.answers}`
    );
    const result = await res.json();
    return result.message;
  };

  const setQuestion = async () => {
    setIsLoading(true);
    const dogUrlList = await fetchDogList();
    const dogAllList = dogUrlList.map((value: string) => {
      return { url: value, name: value.split('/')[4] };
    });
    const correct = dogAllList[getRandomNum(3)];
    if (correctRef.current || missRef.current) {
      gsap.set([correctRef.current, missRef.current], {
        clearProps: 'all',
      });
    }
    setAnswerList(dogAllList);
    setQuestionImage(correct.url);
    setIsLoading(false);
    setCorrectName(correct.name);
  };

  const startQuestion = () => {
    setNowGame(true);
    setNowQuestion(1);
    setTotalScore(100);
    setSingleScore(100 / totalQuestions);
    setOpeningGame(false);
    setResultGame(false);
    setQuestionImage('');
    setQuestion();
  };

  const answerClick = async (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    const select = e.currentTarget;
    if (correctName === select.value) {
      setSingleResult(true);
    } else {
      setSingleResult(false);
      setTotalScore(totalScore - singleScore);
    }
    const newNowQuestion = nowQuestion + 1;
    setWaitingGame(true);
    setUserAnswer(select.value);
    gsap.to(correctRef.current, {
      background: color.greenCelery,
      duration: 0.3,
      repeat: 2,
      yoyo: true,
    });
    setTimeout(() => {
      if (newNowQuestion <= totalQuestions) {
        setNowQuestion(newNowQuestion);
        setQuestion();
      } else {
        setNowGame(false);
        setResultGame(true);
      }
      setWaitingGame(false);
    }, 1500);
  };

  const changeTotalQuestions = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setTotalQuestions(parseInt(event.target.value));
  };

  const asideQuestions = () => {
    if (nowGame) {
      return `残り${nowQuestion}/${totalQuestions}問`;
    }
  };

  useEffect(() => {
    const handleRouteChange = (url: string, { shallow }: any) => {
      setOpeningGame(true);
      setNowGame(false);
    };
    router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, []);

  return (
    <>
      <Head
        title={`犬種名検定${data.name}`}
        description="画像から犬種名を当てるクイズゲームです"
      />
      <Aside
        list={['ホーム', `犬種名検定${data.name}`]}
        text={asideQuestions()}
      />
      <SinglePage
        title={
          !nowGame
            ? `犬種名検定${data.name}`
            : !waitingGame
            ? '犬種名はなんでしょう？'
            : singleResult
            ? 'あたり！'
            : 'はずれ'
        }
      >
        {nowGame && (
          <QuestionImage>
            {isLoading ? (
              <Loader active size="huge" />
            ) : (
              <Image
                className="img"
                src={questionImage}
                alt="この画像の犬種名を選択肢から当ててみましょう"
                layout="fill"
                objectFit="contain"
              />
            )}
          </QuestionImage>
        )}
        <SingleContainer post={!nowGame}>
          {openingGame && (
            <>
              <h3>遊び方</h3>
              <p>
                初めに出題数を選択し、「スタート」ボタンを押してください。
                <br />
                順番に表示される犬の画像から犬種名を推測し、下部の
                {data.answers}択の選択肢の中からクリックしましょう。
              </p>
              <h3>注意</h3>
              <p>
                画像は世界中からランダムに選ばれるため、画質が低かったり、場合によっては2匹以上写っていることもあります。
                <br />
                その際はあまり深く考えず直感で答えてみましょう。
              </p>
              <h3>出題数</h3>
              <TotalQuestionsSelect>
                <select onChange={(e) => changeTotalQuestions(e)}>
                  {totalQuestionsList.map((value, key) => (
                    <option key={key} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </TotalQuestionsSelect>
              <StartButton onClick={startQuestion}>スタート</StartButton>
            </>
          )}
          {resultGame && (
            <>
              <ScoreResult>
                あなたの得点は<span>{totalScore}</span> / 100点です。
              </ScoreResult>
              <StartButton onClick={startQuestion}>リトライ</StartButton>
            </>
          )}
          {nowGame && (
            <AnswerList>
              {answerList.map((answer: any, key) => {
                return (
                  <li key={key}>
                    <button
                      ref={answer.name === correctName ? correctRef : null}
                      onClick={(e) => answerClick(e)}
                      value={answer.name}
                      disabled={waitingGame}
                    >
                      {t(answer.name)}
                    </button>
                  </li>
                );
              })}
            </AnswerList>
          )}
        </SingleContainer>
      </SinglePage>
      <Footer />
    </>
  );
};

export default Kenken;

export const getStaticProps: GetStaticProps = async ({
  params,
  locale = 'ja',
}) => {
  interface Kenken {
    [key: string]: object;
    elementary: object;
    intermediate: object;
    advanced: object;
  }
  const kenken: Kenken = {
    elementary: {
      name: '初級',
      answers: 4,
    },
    intermediate: {
      name: '中級',
      answers: 6,
    },
    advanced: {
      name: '上級',
      answers: 6,
    },
  };

  const idData: string = String(params && params.id);
  return {
    props: {
      data: kenken[idData],
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data = ['elementary', 'intermediate', 'advanced'];
  const paths = data.map((value) => {
    return {
      params: {
        id: value,
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

const QuestionImage = styled.div`
  position: relative !important;
  width: 100% !important;
  padding-top: 28.125% !important;
  margin-bottom: 40px;
  .img {
    position: absolute !important;
    width: unset !important;
    height: 100% !important;
  }
`;
const TotalQuestionsSelect = styled.div`
  position: relative;
  width: 240px;
  margin: 0 auto 40px;
  border: 4px solid ${color.grayEclipse};
  &::after {
    content: '';
    position: absolute;
    top: 30%;
    right: 15px;
    width: 10px;
    height: 10px;
    border-top: 4px solid ${color.grayEclipse};
    border-right: 4px solid ${color.grayEclipse};
    transform: rotate(135deg);
    pointer-events: none;
  }
  select {
    appearance: none;
    width: 100%;
    padding: 10px;
    font-size: 1.5em;
    cursor: pointer;
  }
  select:focus {
    outline: none;
  }
`;
const ScoreResult = styled.p`
  font-size: 1.5em;
  font-weight: 700 !important;
  text-align: center;
  span {
    padding-left: 0.2em;
    font-size: 2em;
    color: ${color.greenCelery};
  }
`;
const StartButton = styled.button`
  display: block;
  padding: 1em 3em;
  margin: 0 auto;
  border-radius: 5px;
  color: #fff;
  background: ${color.bluePicton};
  font-size: 1.5em;
  transition: all 0.25s;
  &:hover {
    opacity: 0.8;
  }
`;

// <a href="https://jp.freepik.com/free-vector/illustration-drawing-style-of-dog_3129700.htm#query=dogs%20illust&position=33&from_view=search&track=ais">著作者：rawpixel.com</a>／出典：Freepik
{
  /* <a href="https://jp.freepik.com/free-photo/beautiful-domestic-dogs-sitting-on-a-white-surface-and-looking-at-the-camera_13962506.htm#page=9&query=dogs&position=24&from_view=search">著作者：wirestock</a>／出典：Freepik */
}
{
  /* <a href="https://jp.freepik.com/free-photo/four-cute-golden-retriever-puppies-resting-on-a-grass-ground_11942082.htm#page=3&query=dogs&position=47&from_view=search">著作者：wirestock</a>／出典：Freepik */
}
{
  /* <a href="https://jp.freepik.com/free-photo/closeup-shot-of-the-snouts-of-a-cute-dog-and-a-cat-sitting-cheek-to-cheek_11061721.htm#page=5&query=dog%20cat&position=33&from_view=search">著作者：wirestock</a>／出典：Freepik */
}
{
  /* <a href="https://jp.freepik.com/free-photo/closeup-shot-of-a-cute-dog-playing-with-a-cat-and-isolated-on-white-background_13901428.htm#page=11&query=dog%20cat&position=13&from_view=search">著作者：wirestock</a>／出典：Freepik */
}
{
  /* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 323.13 283.42">
<path d="M81.64 83.87c4.28 4.71 9.72 7.68 14.74 9.22 5.06 1.58 9.8 1.98 14.18 1.99 6.38.02 12.47-1.95 17.35-5 7.39-4.61 12.42-11.21 15.81-18.46 3.37-7.3 5.11-15.46 5.13-24.07 0-4.07 0-8.19-.19-12.36-.16-3.14-.43-6.31-1.04-9.65-.96-4.92-2.48-10.67-7.35-16.43-2.42-2.8-5.77-5.35-9.49-6.91C127.04.61 123.15 0 119.59 0c-4.41.02-8.12 1.05-11.31 2.33-5.57 2.32-9.89 5.55-13.89 9.19-5.93 5.5-11.01 12.13-15.03 19.59-3.93 7.48-7 15.73-7.09 25.48 0 5.72.78 11.24 2.78 16.5 1.49 3.93 3.73 7.67 6.59 10.77Zm113.97 6.21c4.89 3.05 10.98 5.02 17.36 5 3.9-.01 8.07-.33 12.51-1.5 3.31-.89 6.81-2.27 10.15-4.42 5.04-3.19 9.49-8.31 12.04-14.11 2.61-5.81 3.58-12.02 3.59-18.45-.04-7.43-1.91-13.98-4.46-20-3.9-9-9.44-16.92-15.99-23.47-3.31-3.26-6.87-6.17-11.07-8.58-4.23-2.36-9.18-4.48-15.82-4.55-3.17 0-6.58.48-9.92 1.71-5.94 2.09-10.91 6.74-13.52 11.22-2.05 3.37-3.16 6.62-3.93 9.64-1.12 4.53-1.48 8.69-1.69 12.81-.19 4.1-.18 8.15-.18 12.17.04 11.48 3.06 22.17 9.09 31.06 3.04 4.41 6.91 8.43 11.84 11.47Zm123.59 43.56c-3.29-7.45-7.73-13.94-12.83-19.47-2.59-2.77-5.32-5.28-8.69-7.54-1.7-1.12-3.58-2.19-5.91-3.1-2.32-.9-5.16-1.71-8.8-1.72-3.07-.01-6.92.56-10.74 2.56-2.84 1.47-5.43 3.72-7.2 6.11-2.7 3.61-3.72 7.08-4.25 9.74-.52 2.7-.59 4.84-.6 6.78.01 3.03.23 5.56.4 7.99.17 2.41.31 4.67.31 6.77.04 8.95 2 17.28 6.37 24.72 2.22 3.7 5.12 7.25 9.22 10.17 4.03 2.91 9.57 5.08 15.53 5.06 2.11-.01 4.71-.01 8.03-.55 2.48-.42 5.44-1.17 8.6-2.8 2.35-1.22 4.78-2.97 6.82-5.15 3.1-3.28 5.13-7.32 6.22-11.12 1.11-3.83 1.45-7.51 1.46-11.28-.06-6.73-1.82-12.14-3.94-17.15Zm-117.57-19c-11.7-6.07-24.96-9.82-38.95-9.82s-27.47 3.78-39.36 9.87c-17.85 9.19-32.62 23.44-43.32 39.88-10.63 16.47-17.37 35.3-17.43 54.65 0 9.65 1.76 19.43 5.83 28.65 6.05 13.85 17.51 25.91 33.06 33.62 14.96 7.49 33.53 11.33 55.92 11.65.88.13 1.77.26 2.67.26 1.55-.01 2.34-.06 2.62-.06s1.07.05 2.61.06c.7 0 1.38-.14 2.06-.22 14.54-.16 27.45-1.92 38.79-5.32 17.8-5.29 32.01-14.9 41.24-27.5 9.28-12.58 13.24-27.48 13.2-41.92-.15-25.44-11.19-50.18-28.31-69.66-8.62-9.7-18.9-18.09-30.64-24.16ZM62.17 120.9c-.29-1.71-.75-3.67-1.71-5.9-1.36-3.29-4.3-7.36-8.49-9.88-4.15-2.58-8.61-3.33-11.99-3.31-4.92.05-8.3 1.41-11.03 2.72-4.71 2.4-7.9 5.21-11.02 8.34-4.57 4.69-8.55 10.16-11.84 16.3-1.63 3.09-3.07 6.33-4.18 9.86C.82 142.56.01 146.38 0 150.8c.02 4.43.47 8.77 2.12 13.33 1.23 3.38 3.29 6.89 6.11 9.68 2.1 2.11 4.53 3.75 6.88 4.88 3.54 1.71 6.73 2.34 9.33 2.67 2.62.32 4.73.33 6.49.34 6 .02 11.56-2.21 15.56-5.14 6.08-4.47 9.52-10.09 11.89-15.92 2.31-5.88 3.45-12.21 3.46-18.89 0-2.12.15-4.42.33-6.86.18-2.47.43-5.04.43-8.16 0-1.68-.07-3.55-.44-5.82Z" />
</svg> */
}
