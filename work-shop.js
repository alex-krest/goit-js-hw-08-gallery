import galleryItems from "./gallery-items.js";
// console.log(galleryItems);

const galleryListContainer = document.querySelector(".js-gallery");
// console.log(galleryListContainer);

const templateGalleryItems = ({ preview, original, description }) => {
  return `
<li class="gallery__item">
  <a
    class="gallery__link"
    href=${original}
  >
    <img
      class="gallery__image"
      src=${preview}
      data-source=${original}
		alt=${description}
    />
  </a>
</li>`;
};
const markup = galleryItems.map(templateGalleryItems).join("");
// console.log(markup);
galleryListContainer.insertAdjacentHTML("beforeend", markup);

galleryListContainer.addEventListener("click", changeSizeImg);

function changeSizeImg(event) {
  event.preventDefault();
  const containerModal = document.querySelector(".lightbox");
  const bigSizeImg = document.querySelector(".lightbox__image");
  if (!event.target.dataset.sourse) {
    return;
  }
  containerModal.classList.add("is-open");
  bigSizeImg.src = event.target.dataset.sourse;
  //  bigSizeImg.alt=;
}
