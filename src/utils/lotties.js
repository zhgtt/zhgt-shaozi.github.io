export const animationCat = require('@site/static/img/Cat.lottie.json');
export const animationDog = require('@site/static/img/Dog.lottie.json');
export const animationPlant = require('@site/static/img/Plant.lottie.json');
export const animationDinoJump = require('@site/static/img/Dino.lottie.json');
export const animationDinoPlay = require('@site/static/img/Dino.lottie2.json');
export const animationDinoFly = require('@site/static/img/Dino.lottie3.json');

const lottieArr = [
  animationCat,
  animationDog,
  animationPlant,
  animationDinoJump,
  animationDinoPlay,
  animationDinoFly,
];

// 获取数组中的随机一项
export const randomLottieFun = () => {
  const len = lottieArr.length;
  return lottieArr[Math.floor(Math.random() * len)];
};
