// Barba.Prefetch.init();
//
// var PageTransition = Barba.BaseTransition.extend({
// 	start: function() {
//
// 		Promise
// 		.all([this.newContainerLoading, this.loadOut()])
// 		.then(this.loadIn.bind(this));
// 	},
// 	loadOut: function(resolve) {
// 		new Promise(function(resolve, reject) {
// 			anime({
// 				targets: this.oldContainer,
// 				translateY: '-50vw'
// 			});
// 			resolve();
// 		})
// 	},
// 	loadIn: function() {
// 		var _this = this;
// 		anime({
// 			targets: this.newContainer,
// 			translateY: ['80vh', 0],
// 			easing: 'easeInOutQuart'
// 		});
// 		$(this.oldContainer).hide();
// 		// 完了
// 		_this.done();
// 	},
// });
//
// Barba.Pjax.getTransition = function() {
// 	return PageTransition;
// };
//
// Barba.Pjax.start();