/*
 * Index section
 */

$(window).on("load", function () {
	// loader

	$('#js-loader').addClass('loaded');

	var indexTopOffset = anime.timeline();
	indexTopOffset
	.add({
		targets:'#js-loader.loaded',
		opacity: ['1', '0'],
		zIndex:['10','-1'],
		easing: 'easeInOutQuint'
	})
	.add({
		targets: '.js-index-hero',
		translateX: ['-1000', '0'],
		duration: 2000,
		easing: 'easeInOutQuint',
		offset: '-=600'
	})
	.add({
		targets: '.js-index-hero-bar',
		width: ['0', '100%'],
		easing: 'easeOutExpo',
		duration: 1000,
		offset: '-=600'
	})
	.add({
		targets: '.js-index-hero-p',
		translateX: ['2000', '0'],
		easing: 'easeOutExpo',
		duration: 1000,
		offset: '-=1000'
	})
	.add({
		targets: '.js-index-hero-h2-bg',
		height: ['0', '464'],
		easing: 'easeOutExpo',
		duration: 2000,
		offset: '-=1000'
	})
	.add({
		targets: '.js-index-hero-h2',
		opacity: ['0', '1'],
		easing: 'easeOutExpo',
		duration: 2000,
		offset: '-=1500'
	})
	.add({
		targets: ['.l-header','.js-icon-scroll'],
		opacity: ['0', '1'],
		easing: 'easeOutExpo',
		duration: 2000,
		offset: '-=1500'
	})

});

