  $('.dropdown_trigger').on('click', function(event) {
    event.preventDefault();
    $('.dropdown-menu').toggle();
    $('body').toggleClass('dropdown-visible');
    const text = $(this).text();
    $(this).text(function (i, text) {
      return text === "Menu" ? "Close" : "Menu";
    })
  })

$(document).ready(function() {
  const images = $('.slideshow img, .slideshow video');
  if (images.length > 0) {
    let current = 0;
    function showImage(index) {
      images.css('opacity', 0);
      const img = images.eq(index);
      img.css('opacity', 1);
      // Restart GIF or video
      if (img.is('img')) {
        const src = img.attr('src').split('?')[0];
        img.attr('src', src + '?t=' + Date.now());
      } else if (img.is('video')) {
        img[0].currentTime = 0;
        img[0].play();
      }
    }
    showImage(0);
    setInterval(() => {
      current = (current + 1) % images.length;
      showImage(current);
    }, 3000);
  }
});
