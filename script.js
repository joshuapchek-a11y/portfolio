  $('.dropdown_trigger').on('click', function() {
    $('.dropdown-menu').toggle();
    $('body').toggleClass('dropdown-visible');
    const text = $(this).text();
    $(this).text(function (i, text) {
      return text === "WORK" ? "CLOSE" : "WORK";
    })
  })

  