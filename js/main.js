
const imageSources = [
  'img/001.jpg',
  'img/002.jpg',
  'img/003.jpg',
  'img/004.jpg',
  'img/005.jpg',
  'img/006.jpg',
  'img/007.jpg',
  'img/008.jpg',
  'img/009.jpg',
  'img/010.jpg',
];

const initializeMainImage = () => {
  // create the initial image: set to first image in the array
  const imageSlider = document.querySelector('.image-slider');
  const bigImage = document.createElement('img');
  bigImage.setAttribute('id', 'big-image');
  bigImage.setAttribute('data-id', 0);
  bigImage.setAttribute('src', imageSources[0]);
  imageSlider.appendChild(bigImage);
};

const createArrows = () => {
  const imageSlider = document.querySelector('.image-slider');

  const right = document.createElement('i');
  const left = document.createElement('i');

  right.classList.add('arrow', 'right');
  left.classList.add('arrow', 'left');

  imageSlider.appendChild(right);
  imageSlider.appendChild(left);
};

const highlightCurrent = (id) => {
  const allNavs = [...document.querySelectorAll('.dot')];
  allNavs.forEach((nav) => {
    if (Number(nav.dataset.id) === id) {
      nav.classList.add('active');
    } else {
      nav.classList.remove('active');
    }
  });
};

const createNavigators = () => {
  const mainContent = document.querySelector('#main');

  const navigator = document.createElement('div');
  navigator.classList.add('navigator');

  imageSources.forEach((src, id) => {
    const circleNav = document.createElement('i');
    circleNav.classList.add('dot');
    if (id === 0) circleNav.classList.toggle('active');
    circleNav.setAttribute('data-image-src', src);
    circleNav.setAttribute('data-id', id);
    circleNav.addEventListener('click', () => {
      const bigImage = document.querySelector('#big-image');
      const newSrc = circleNav.dataset.imageSrc;
      bigImage.setAttribute('src', newSrc);
      bigImage.setAttribute('data-id', id);
      circleNav.setAttribute('data-id', id);
      highlightCurrent(id);
    });
    navigator.appendChild(circleNav);
  });

  mainContent.appendChild(navigator);
};

const next = () => {
  const bigImage = document.querySelector('#big-image');
  const nextId = (Number(bigImage.dataset.id) + 1) % imageSources.length;
  const nextImg = imageSources[nextId];
  bigImage.setAttribute('src', nextImg);
  bigImage.setAttribute('data-id', nextId);
  highlightCurrent(nextId);
};

const previous = () => {
  const bigImage = document.querySelector('#big-image');
  let prevId = Number(bigImage.dataset.id) - 1;
  prevId = prevId < 0 ? imageSources.length + prevId : prevId;
  const prevImg = imageSources[prevId];
  bigImage.setAttribute('src', prevImg);
  bigImage.setAttribute('data-id', prevId);
  highlightCurrent(prevId);
};

// Start application

initializeMainImage();
createArrows();
createNavigators();

const nextImage = document.querySelector('.right');
const prevImage = document.querySelector('.left');

nextImage.addEventListener('click', () => {
  next();
});

prevImage.addEventListener('click', () => {
  previous();
});

setInterval(next, 2000);
