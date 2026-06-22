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

  // Mobile: first tap plays marquee, second tap follows the link
  let activeTapItem = null;
  const touchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.matchMedia('(hover: none)').matches;

  if (touchDevice) {
    items.forEach(item => {
      const link = item.querySelector('.work-page__link');
      if (!link) return;

      link.addEventListener('click', event => {
        const marquee = item.querySelector('.work-page__marquee');
        if (!marquee || !marquee.classList.contains('is-overflowing')) return;

        if (activeTapItem !== item) {
          event.preventDefault();
          if (activeTapItem) {
            activeTapItem.classList.remove('marquee-active');
          }
          activeTapItem = item;
          item.classList.add('marquee-active');
        }
      });
    });

    document.addEventListener('click', event => {
      if (!event.target.closest('.work-page__item')) {
        if (activeTapItem) {
          activeTapItem.classList.remove('marquee-active');
          activeTapItem = null;
        }
      }
    });
  }
})();

// Calculate marquee scroll distance based on text width
(function () {
  function updateMarqueeDistances() {
    const marquees = document.querySelectorAll('.work-page__marquee');
    
    marquees.forEach(marquee => {
      // Get the first span (original text)
      const textSpan = marquee.querySelector('span');
      if (!textSpan) return;
      
      // Get the title container for width reference
      const title = marquee.closest('.work-page__title');
      if (!title) return;
      
      // Measure text width
      const textWidth = textSpan.offsetWidth;
      const containerWidth = title.offsetWidth;
      
      // Only animate if text is wider than container
      if (textWidth > containerWidth) {
        // Calculate how far to scroll so all text fits in container
        const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
        const extraPadding = rootFontSize * 2; // 2rem
        const scrollDistance = -(textWidth - containerWidth + extraPadding);
        marquee.style.setProperty('--scroll-distance', scrollDistance + 'px');
        marquee.classList.add('is-overflowing');
      } else {
        // Text fits, don't animate
        marquee.classList.remove('is-overflowing');
      }
    });
  }
  
  // Initial setup after page loads
  setTimeout(updateMarqueeDistances, 100);
  
  // Recalculate on window resize
  window.addEventListener('resize', updateMarqueeDistances);
})();
