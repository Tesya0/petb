import { MouseEvent, useRef, useState } from 'react';
import type { NextPage, GetStaticProps } from 'next';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { color } from 'styles/color';
import { vwRange } from 'styles/vw';
import { breakpoints, mqMin } from 'styles/mq';
import styled from 'styled-components';
import gsap from 'gsap';
import 'semantic-ui-css/semantic.min.css';
import { Loader } from 'semantic-ui-react';
import Aside from 'components/Aside';
import Footer from 'components/Footer';
import SectionTitle from 'components/SectionTitle';
import AnswerList from 'components/AnswerList';
import { getRandomNum } from 'function/getRandom';

export const Home: NextPage = () => {
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
  // i18n
  const { t } = useTranslation('common');

  const fetchDogList = async () => {
    const res = await fetch('https://dog.ceo/api/breeds/image/random/4');
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

  return (
    <>
      <Aside>{nowGame && `残り${nowQuestion}/${totalQuestions}問`}</Aside>
      <Main>
        <div className="back"></div>
        <h2>
          {!nowGame
            ? '犬種名検定初級'
            : !waitingGame
            ? '犬種名はなんでしょう？'
            : singleResult
            ? 'あたり！'
            : 'はずれ'}
        </h2>
        {nowGame && (
          <div className="image">
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
          </div>
        )}
        <div className={`container ${!nowGame && '-text'}`}>
          {openingGame && (
            <>
              <section>
                <SectionTitle>遊び方</SectionTitle>
                <p>
                  初めに出題数を選択し、「スタート」ボタンを押してください。
                  <br />
                  順番に表示される犬の画像から犬種名を推測し、下部の4択の選択肢の中からクリックしましょう。
                </p>
              </section>
              <section>
                <SectionTitle>注意</SectionTitle>
                <p>
                  画像は世界中からランダムに選ばれるため、画質が低かったり、場合によっては2匹以上写っていることもあります。
                  <br />
                  その際はあまり深く考えず直感で答えてみましょう。
                </p>
              </section>
              <section className="setting">
                <p className="label">出題数</p>
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
              </section>
            </>
          )}
          {resultGame && (
            <>
              <section>
                <ScoreResult>
                  あなたの得点は<span>{totalScore}</span> / 100点です。
                </ScoreResult>
              </section>
              <section>
                <StartButton onClick={startQuestion}>リトライ</StartButton>
              </section>
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
        </div>
      </Main>
      <Footer />
    </>
  );
};

export default Home;

export const getStaticPaths = async () => {
  // 外部APIエンドポイントを呼び出しデータ取得
  // const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  // const posts = await res.json();
  // 事前ビルドしたいパスを指定
  // const paths = posts.map((post) => ({
  //   params: {
  //     // ファイル名と合わせる ※文字列指定
  //     id: post.id.toString(),
  //   },
  // }));
  // paths：事前ビルドするパス対象を指定するパラメータ
  // fallback：事前ビルドしたパス以外にアクセスしたときのパラメータ true:カスタム404Pageを表示 false:404pageを表示
  // return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ locale = 'ja' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};

const Main = styled.main`
  position: relative;
  width: 100%;
  min-height: 90vh;
  padding: 14.0625% 0 120px;
  background: ${color.graySmoke};
  .back {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    width: 100%;
    padding-top: 28.125%;
    background: url('/images/hero-kenken.jpg') left top/ contain no-repeat;
    &::before,
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    &::before {
      z-index: 1;
      opacity: 0.7;
      background: linear-gradient(${color.yellowMoon}, ${color.greenSulu});
    }
    &::after {
      z-index: 2;
      opacity: 0.7;
      background-image: radial-gradient(
          ${color.greenFusen} 17%,
          transparent 17%
        ),
        radial-gradient(${color.greenFusen} 17%, transparent 17%);
      background-position: 0 0, 9px 9px;
      background-size: 18px 18px;
    }
  }
  h2 {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    padding-top: 0.8em;
    color: rgba(0, 0, 0, 0);
    text-align: center;
    text-shadow: 2px 3px 0 ${color.yellowCanary};
    -webkit-text-stroke: 1px ${color.black};
    font-weight: 700;
    ${mqMin(breakpoints.md)} {
      ${vwRange('font-size', 32, 64, breakpoints.md, breakpoints.xl)}
    }
  }
  section {
    margin-bottom: 40px;
  }
  .setting {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .label {
    font-weight: 500;
  }
  .image {
    position: relative !important;
    width: 100% !important;
    padding-top: 28.125% !important;
    margin-bottom: 40px;
  }
  .img {
    position: absolute !important;
    width: unset !important;
    height: 100% !important;
  }
  .container {
    position: relative;
    z-index: 1;
    width: 80%;
    max-width: 960px;
    margin: 0 auto;
  }
  .container.-text {
    padding: 80px;
    border-radius: 20px;
    background: #fff;
  }
`;
const TotalQuestionsSelect = styled.div`
  position: relative;
  width: 240px;
  margin-bottom: 40px;
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
const ScoreResult = styled.h3`
  font-size: 1.5em;
  font-weight: 700;
  text-align: center;
  span {
    padding-left: 0.2em;
    font-size: 2em;
    color: ${color.greenCelery};
  }
`;

// <a href="https://jp.freepik.com/free-vector/illustration-drawing-style-of-dog_3129700.htm#query=dogs%20illust&position=33&from_view=search&track=ais">著作者：rawpixel.com</a>／出典：Freepik
{
  /* <a href="https://jp.freepik.com/free-photo/beautiful-domestic-dogs-sitting-on-a-white-surface-and-looking-at-the-camera_13962506.htm#page=9&query=dogs&position=24&from_view=search">著作者：wirestock</a>／出典：Freepik */
}
{
  /* <a href="https://jp.freepik.com/free-photo/four-cute-golden-retriever-puppies-resting-on-a-grass-ground_11942082.htm#page=3&query=dogs&position=47&from_view=search">著作者：wirestock</a>／出典：Freepik */
}
