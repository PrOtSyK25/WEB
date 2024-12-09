const canvas = document.getElementById("animationCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Загрузка изображений
const sprite = new Image();
sprite.src = "https://img.pokemondb.net/sprites/black-white/normal/pikachu.png";

const cloud = new Image();
cloud.src = "5656406.jpg"; // Пример облаков с прозрачным фоном

// Начальные параметры
let spriteX = 0;
let spriteY = canvas.height / 2 - 100;
let spriteSpeed = 3;
let spriteScale = 2; // Увеличение в 2 раза

let cloudX = canvas.width; // Начальная позиция облака
let cloudSpeed = 2; // Скорость движения облаков

// Функция рисования фона
function drawBackground() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Очищаем холст

  // Настраиваем прозрачность для облаков
  ctx.globalAlpha = 0.5; // 50% прозрачности
  ctx.drawImage(cloud, cloudX, 100, 200, 150); // Рисуем облако
  ctx.globalAlpha = 1; // Возвращаем прозрачность для остальных элементов

  // Движение облаков
  cloudX -= cloudSpeed;
  if (cloudX + 200 < 0) cloudX = canvas.width;
}

// Функция анимации
function animate() {
  drawBackground();

  // Отрисовка спрайта покемона
  const spriteWidth = 96 * spriteScale; // Увеличенная ширина
  const spriteHeight = 96 * spriteScale; // Увеличенная высота
  ctx.drawImage(sprite, spriteX, spriteY, spriteWidth, spriteHeight);

  // Движение покемона
  spriteX += spriteSpeed;
  if (spriteX > canvas.width || spriteX < -spriteWidth) spriteSpeed *= -1;

  requestAnimationFrame(animate);
}

// Начинаем анимацию после загрузки изображений
sprite.onload = () => {
  cloud.onload = () => {
    animate();
  };
};
