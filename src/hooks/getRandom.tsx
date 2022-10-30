// 指定した最大値以下のランダムな数値を取得する
export const getRandomNum = (maxNum: number) => {
  let newMaxNum = maxNum + 1;
  let tmp = Math.floor(Math.random() * newMaxNum);
  return tmp;
};

// 指定した最大値以下の個数分ランダムな数値を取得し配列にする
export const getRandomNumList = (length: number, maxNum: number) => {
  const numList: number[] = [];
  for (let i = 0; i < length; i++) {
    while (true) {
      let tmp = Math.floor(Math.random() * maxNum);
      if (!numList.includes(tmp)) {
        numList.push(tmp);
        break;
      }
    }
  }
  return numList;
};

// 渡された配列の中身をランダムに並べ替える
export const shuffleArray = (array: any[]) => {
  const cloneArray = [...array];
  for (let i = cloneArray.length - 1; i >= 0; i--) {
    let rand = Math.floor(Math.random() * (i + 1));
    // 配列の要素の順番を入れ替える
    let tmpStorage = cloneArray[i];
    cloneArray[i] = cloneArray[rand];
    cloneArray[rand] = tmpStorage;
  }
  return cloneArray;
};
