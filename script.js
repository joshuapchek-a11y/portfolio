  $('.dropdown_trigger').on('click', function() {
    $('.dropdown-menu').toggle();
    $('body').toggleClass('dropdown-visible');
    const text = $(this).text();
    $(this).text(function (i, text) {
      return text === "Menu" ? "Close" : "Menu";
    })
  })

$(document).ready(function() {
  const images = $('.slideshow img');
  if (images.length > 0) {
    let current = 0;
    function showImage(index) {
      images.css('opacity', 0);
      const img = images.eq(index);
      img.css('opacity', 1);
      // Restart GIF by updating src with timestamp
      const src = img.attr('src').split('?')[0];
      img.attr('src', src + '?t=' + Date.now());
    }
    showImage(0);
    setInterval(() => {
      current = (current + 1) % images.length;
      showImage(current);
    }, 3000);
  }
});
