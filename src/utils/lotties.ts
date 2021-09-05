export const Animation_403_1 = require('@site/static/img/lotties/403.Error.lottie-1.json');
export const Animation_403_2 = require('@site/static/img/lotties/403.Error.lottie-2.json');
export const Animation_404_1 = require('@site/static/img/lotties/404.Error.lottie-1.json');
export const Animation_404_2 = require('@site/static/img/lotties/404.Error.lottie-2.json');
export const Animation_404_3 = require('@site/static/img/lotties/404.Error.lottie-3.json');
export const Animation_500 = require('@site/static/img/lotties/500.Error.lottie-1.json');
export const Animation_Dashboard = require('@site/static/img/lotties/Analyzing.Dashboard.lottie.json');
export const Animation_Networking = require('@site/static/img/lotties/Social.Networking.lottie.json');
export const Animation_WorkingDay = require('@site/static/img/lotties/Working.Day.lottie.json');

export const Animation_Cat_1 = require('@site/static/img/lotties/Cat.lottie-1.json');
export const Animation_Cat_2 = require('@site/static/img/lotties/Cat.lottie-2.json');
export const Animation_Dino_1 = require('@site/static/img/lotties/Dino.lottie-1.json');
export const Animation_Dino_2 = require('@site/static/img/lotties/Dino.lottie-2.json');
export const Animation_Dino_3 = require('@site/static/img/lotties/Dino.lottie-3.json');
export const Animation_Dino_4 = require('@site/static/img/lotties/Dino.lottie-4.json');
export const Animation_Dino_5 = require('@site/static/img/lotties/Dino.lottie-5.json');
export const Animation_Dino_6 = require('@site/static/img/lotties/Dino.lottie-6.json');
export const Animation_Dog_1 = require('@site/static/img/lotties/Dog.lottie-1.json');
export const Animation_Dog_2 = require('@site/static/img/lotties/Dog.lottie-2.json');
export const Animation_Dog_3 = require('@site/static/img/lotties/Dog.lottie-3.json');
export const Animation_Dog_4 = require('@site/static/img/lotties/Dog.lottie-4.json');
export const Animation_Plant_1 = require('@site/static/img/lotties/Plant.lottie-1.json');
export const Animation_Plant_2 = require('@site/static/img/lotties/Plant.lottie-2.json');
export const Animation_ManReading = require('@site/static/img/lotties/Man.Reading.Newspaper.lottie.json');
export const Animation_ManSittingLaptop = require('@site/static/img/lotties/Man.Sitting.Laptop.lottie.json');
export const Animation_ManSitting_1 = require('@site/static/img/lotties/Man.Sitting.lottie-1.json');
export const Animation_ManSitting_2 = require('@site/static/img/lotties/Man.Sitting.lottie-2.json');
export const Animation_ManWithGuitar = require('@site/static/img/lotties/Man.With.Guitar.lottie.json');
export const Animation_WomanStanding = require('@site/static/img/lotties/Woman.Standing.lottie.json');
export const Animation_WomanWithCoffee = require('@site/static/img/lotties/Woman.With.Coffee.lottie.json');

const lottieArr = [
  Animation_Cat_1,
  Animation_Dino_1,
  Animation_Dino_2,
  Animation_Dino_3,
  Animation_Dino_4,
  Animation_Dino_5,
  Animation_Dino_6,
  Animation_Dog_1,
  Animation_Dog_2,
  Animation_Dog_3,
  Animation_Dog_4,
  Animation_Plant_1,
  Animation_Plant_2,
  Animation_ManReading,
  Animation_ManSittingLaptop,
  Animation_ManSitting_1,
  Animation_ManSitting_2,
  Animation_ManWithGuitar,
  Animation_WomanStanding,
  Animation_WomanWithCoffee,
];

// 获取数组中的随机一项
export const randomLottieFun = () => {
  const len = lottieArr.length;
  return lottieArr[Math.floor(Math.random() * len)];
};
