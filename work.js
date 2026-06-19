(function () {
  const page = document.querySelector('.work-page');
  if (!page) return; // bail out if this isn't the work page

  const items = page.querySelectorAll('.work-page__item');
  const images = page.querySelectorAll('.work-page__image');
  const videos = page.querySelectorAll('.work-page__video');

  items.forEach(item => {
    item.addEventListener('mouseenter', () => {
      const id = item.dataset.imageId;
      images.forEach(img => {
        img.classList.toggle('is-active', img.dataset.imageId === id);
      });
      videos.forEach(video => {
        video.classList.toggle('is-active', video.dataset.imageId === id);
      });
    });
  });
})();