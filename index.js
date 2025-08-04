const images = [
  'assets/Image1.png', 'assets/Image2.png', 'assets/Image3.png', 'assets/Image4.png', 'assets/Image5.png',
  'assets/Image6.png', 'assets/Image7.png', 'assets/Image8.png', 'assets/Image9.png', 'assets/Image10.png', 'assets/Image11.png'
];

const texts = [
  'Text1', 
  'Text2', 
  'Text3', 
  'Text4', 
  'Text5',
  'Text6', 
  'Text7', 
  'Text8', 
  'Text9', 
  'Text10'
];

const subTexts = [
  'Sub Text1', 
  'Sub Text2', 
  'Sub Text3', 
  'Sub Text4', 
  'Sub Text5',
  'Sub Text6', 
  'Sub Text7', 
  'Sub Text8', 
  'Sub Text9', 
  'Sub Text10'
];

let currentIndex = 0;

const imageElement = document.getElementById('main-image');
const mainTextElement = document.getElementById('main-text');
const subTextElement = document.getElementById('sub-text');
const imageWrapper = document.querySelector('.image-wrapper');
const finalButton = document.getElementById('final-button');
const loader = document.getElementById("loader-wrapper");
const mainContent = document.getElementById("main-content");

const background1 = document.getElementById('background1');
const background2 = document.getElementById('background2');
let useFirstBackground = true;

function updateBackgroundImage(index) {
  const activeBg = useFirstBackground ? background1 : background2;
  const nextBg = useFirstBackground ? background2 : background1;

  nextBg.style.backgroundImage = `url('${images[index]}')`;
  nextBg.style.transition = "opacity 1s ease-in-out";
  activeBg.style.transition = "opacity 1s ease-in-out";

  nextBg.style.opacity = 1;
  activeBg.style.opacity = 0;

  useFirstBackground = !useFirstBackground;
}

function updateContent(index, animate = true) {
  const elements = [imageElement, mainTextElement, subTextElement, imageWrapper];

  if (animate) {
    elements.forEach(el => {
      el.classList.remove('bounce-fade-in');
      void el.offsetWidth;
      el.classList.add('bounce-fade-out');
    });
  }

  setTimeout(() => {
    imageElement.src = images[index];
    mainTextElement.textContent = texts[index];
    subTextElement.textContent = subTexts[index];
    updateBackgroundImage(index);

    if (animate) {
      elements.forEach(el => {
        el.classList.remove('bounce-fade-out');
        void el.offsetWidth;
        el.classList.add('bounce-fade-in');
        el.addEventListener('animationend', () => {
          el.classList.remove('bounce-fade-in');
        }, { once: true });
      });
    }

    if (index === images.length - 1) {
    finalButton.style.display = 'inline-flex';

    finalButton.classList.remove('bounce-fade-in');
    void finalButton.offsetWidth;
    finalButton.classList.add('bounce-fade-in');
    }

  }, animate ? 1500 : 0);
}

function runSlideshow(index) {
  if (index < images.length) {
    const animate = index !== 0;
    updateContent(index, animate);
    if (index < images.length - 1) {
      setTimeout(() => runSlideshow(index + 1), 15000);
    }
  }
}

window.addEventListener("load", () => {
  imageElement.src = images[0];
  mainTextElement.textContent = texts[0];
  subTextElement.textContent = subTexts[0];
  background1.style.backgroundImage = `url('${images[0]}')`;
  background1.style.opacity = 1;
  background2.style.opacity = 0;

  setTimeout(() => {
    loader.classList.add('fade-out');

    setTimeout(() => {
      loader.style.display = "none";
      mainContent.style.display = "block";
      void mainContent.offsetWidth;
      mainContent.classList.add('visible');

      runSlideshow(1);
    }, 8000);
  }, 10000);
});

document.addEventListener('DOMContentLoaded', () => {
  // Set button click handler
  const finalButton = document.getElementById('final-button');
  if (finalButton) {
    finalButton.addEventListener('click', () => {
      window.location.href = 'message.html';
    });
  }
});
