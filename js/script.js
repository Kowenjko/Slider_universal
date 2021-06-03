const slidesToShow = 1; //Количество картинок на екрані
const slidesToScroll = 1; //Шаг слайда
const start = true; //Використовувати зміщення
const settime = 2000; // інтервал промотки слайдера

const quantity = start ? 2 : 0; //Вибираємо скільки добавляємо елементів при зміні
let slider = [];

const container = document.querySelector(".slider-container");
const track = document.querySelector(".slider-track");

const items = document.querySelectorAll(".slider-item");

const btnPrev = document.querySelector(".btn-prev");
const btnNext = document.querySelector(".btn-next");

const itemWidth = container.clientWidth / slidesToShow;

const movePosition = slidesToScroll * itemWidth;

//Копіруємо зсилки на картинки
items.forEach((item, index) => {
  slider[index] = item.src;
  item.remove();
});

let step = 0;

let startSlider = start ? itemWidth : 0; // зміщення картинки в блоці

function draw(count, position) {
  for (let i = 0; i < count; i++) {
    let img = document.createElement("IMG");
    img.src = slider[step];
    img.classList.add("slider-item");
    img.style.minWidth = `${itemWidth}px`;
    img.style.left = (i + position) * itemWidth - startSlider + "px";
    track.append(img);
    step + 1 == slider.length ? (step = 0) : step++;
  }
}
btnNext.addEventListener("click", nextSlide);

setInterval(nextSlide, 3000);

function nextSlide() {
  btnNext.removeEventListener("click", nextSlide);
  let slides2 = document.querySelectorAll(".slider-item");
  let offset2 = 0;
  slides2.forEach((item) => {
    item.style.left = offset2 * itemWidth - movePosition - startSlider + "px";
    offset2++;
  });
  setTimeout(() => {
    for (let i = 0; i < slidesToScroll; i++) {
      slides2[i].remove();
    }
    draw(slidesToScroll, slidesToShow + quantity); //all

    btnNext.addEventListener("click", nextSlide);
  }, 1000);
}
draw(slidesToShow + slidesToScroll + quantity, 0); // all
