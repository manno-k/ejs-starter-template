hamburgerEl = '.c-hamburger';
hamburgerInnerEl = '.c-hamburger__inner';

$(hamburgerEl).click(function () {
	if ($(this).hasClass("active")) {
		$(this).removeClass("active");
		$(hamburgerInnerEl).removeClass("active");
	} else {
		$(this).addClass("active");
		$(hamburgerInnerEl).addClass("active");
	}
});

