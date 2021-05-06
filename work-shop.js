import galleryItems from "./gallery-items.js";
// -СОЗДАЕМ ПЕРЕМЕННЫЕ ДЛЯ ЭЛЕМЕНТОВ
const galleryEl = document.querySelector(".js-gallery");
const lightboxEl = document.querySelector(".js-lightbox");
const lightboxImageEl = document.querySelector(" .lightbox__image");
const closeModalBtnEl = document.querySelector(".lightbox__button");
const lightboxOverlayEl = document.querySelector(" .lightbox__overlay");

//Создание и рендер разметки по массиву данных и предоставленному шаблону.
// СОЗДАЕМ РАЗМЕТКУ
function ImageMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
        <a
          class="gallery__link"
          href="${original}"
        >
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
      </li>`;
    })
    .join("");
}
// ПЕРЕНОСИМ РАЗМЕТКУ В HTML
const imageMarkupEl = ImageMarkup(galleryItems);
galleryEl.insertAdjacentHTML("beforeend", imageMarkupEl);

// Реализация делегирования на галерее `ul.js-gallery` и получение `url` большого  изображения.
// ДЕЛЕГИРОВАННЫЙ СЛУШАТЕЛЬ ДЛЯ ГАЛЛЕРЕИ
galleryEl.addEventListener("click", onClickOpenLightbox);

function onClickOpenLightbox(evt) {
  evt.preventDefault();
  if (evt.currentTarget === evt.target) {
    return;
  }
  // Открытие модального окна по клику на элементе галереи.
  lightboxEl.classList.add("is-open");
  //Подмена значения атрибута `src` элемента `img.lightbox__image`.
  lightboxImageEl.src = evt.target.dataset.source;
  lightboxImageEl.alt = evt.target.alt;
  getImageUrlAndAlt(evt);
}

// ФУНКЦИИ ЗАКРЫТИЯ МОДАЛКИ
function closeModal() {
  window.removeEventListener("keydown", onEscKeyPress);
  //Очистка значения атрибута `src` элемента `img.lightbox__image`
  lightboxImageEl.src = "";
  lightboxEl.classList.remove("is-open");
}
function onEscKeyPress(evt) {
  if (evt.code !== "Escape") {
    return;
  }
  closeModal();
}
// ФУНКЦИЯ ЗАКРЫТИЯ МОДАЛКИ ПРИ КЛИКЕ НЕ НА КАРТИНКУ
function onClickCloseModal(evt) {
  if (evt.target !== evt.currentTarget) {
    return;
  }
  closeModal();
}
//Закрытие модального окна по клику на кнопку
// СЛУШАТЕЛЬ НА КНОПКУ ЗАКРЫТИЯ
closeModalBtnEl.addEventListener("click", onClickCloseModal);

// СЛУШАТЕЛЬ НА ЗАКРЫТИЕ ПРИ КЛИКЕ НА ОВЕРЛЕЙ
lightboxOverlayEl.addEventListener("click", onClickCloseModal);
