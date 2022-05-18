export const Lottie_403_Error = require('@site/static/json/lotties/itg-403.error.json');
export const Lottie_403_Error_2 = require('@site/static/json/lotties/itg-403.error-2.json');
export const Lottie_404_Error = require('@site/static/json/lotties/itg-404.error.json');
export const Lottie_404_Error_2 = require('@site/static/json/lotties/itg-404.error-2.json');
export const Lottie_404_Error_4 = require('@site/static/json/lotties/itg-404.error-4.json');
export const Lottie_404_Error_6 = require('@site/static/json/lotties/itg-404.error-6.json');
export const Lottie_404_Error_7 = require('@site/static/json/lotties/lottiefiles-404.error.json');
export const Lottie_500_Error = require('@site/static/json/lotties/itg-500.error.json');
export const Lottie_Dashboard = require('@site/static/json/lotties/itg-dashboard.json');
export const Lottie_Dashboard_2 = require('@site/static/json/lotties/itg-dashboard-2.json');

export const Lottie_Cat = require('@site/static/json/lotties/itg-cat.json');
export const Lottie_Cat_2 = require('@site/static/json/lotties/itg-cat-2.json');
export const Lottie_Cat_4 = require('@site/static/json/lotties/lottiefiles-cat-2.json');
export const Lottie_Dino = require('@site/static/json/lotties/itg-dino.json');
export const Lottie_Dino_2 = require('@site/static/json/lotties/itg-dino-2.json');
export const Lottie_Dino_3 = require('@site/static/json/lotties/itg-dino-3.json');
export const Lottie_Dino_4 = require('@site/static/json/lotties/itg-dino-4.json');
export const Lottie_Dino_5 = require('@site/static/json/lotties/itg-dino-5.json');
export const Lottie_Dino_6 = require('@site/static/json/lotties/itg-dino-6.json');
export const Lottie_Dog = require('@site/static/json/lotties/itg-dog.json');
export const Lottie_Dog_2 = require('@site/static/json/lotties/itg-dog-2.json');
export const Lottie_Dog_3 = require('@site/static/json/lotties/itg-dog-3.json');
export const Lottie_Dog_4 = require('@site/static/json/lotties/itg-dog-4.json');
export const Lottie_Plant = require('@site/static/json/lotties/itg-plant.json');
export const Lottie_Plant_2 = require('@site/static/json/lotties/itg-plant-2.json');
export const Lottie_Man_3 = require('@site/static/json/lotties/itg-man-3.json');
export const Lottie_Man_4 = require('@site/static/json/lotties/itg-man-4.json');
export const Lottie_Duck = require('@site/static/json/lotties/lottiefiles-duck.json');

const lottieArr = [
  Lottie_Cat,
  Lottie_Cat_2,
  Lottie_Cat_4,
  Lottie_Dino,
  Lottie_Dino_2,
  Lottie_Dino_3,
  Lottie_Dino_4,
  Lottie_Dino_5,
  Lottie_Dino_6,
  Lottie_Dog,
  Lottie_Dog_2,
  Lottie_Dog_3,
  Lottie_Dog_4,
  Lottie_Plant,
  Lottie_Plant_2,
  Lottie_Man_3,
  Lottie_Man_4,
  Lottie_Duck,
];

const lottie404ErrorArr = [
  Lottie_404_Error,
  Lottie_404_Error_2,
  Lottie_404_Error_4,
  Lottie_404_Error_6,
  Lottie_404_Error_7,
];

// // 获取数组中的随机一项
export const random404ErrorFun = () => {
  const len = lottie404ErrorArr.length;
  return lottie404ErrorArr[Math.floor(Math.random() * len)];
};

export const randomLottieFun = () => {
  const len = lottieArr.length;
  return lottieArr[Math.floor(Math.random() * len)];
};
