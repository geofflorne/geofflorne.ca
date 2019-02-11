function fitElementToParent(el, padding) {
	var timeout = null;
	function resize() {
		if (timeout) clearTimeout(timeout);
		anime.set(el, { scale: 1 });
		var pad = padding || 0;
		var parentEl = el.parentNode;
		var elOffsetWidth = el.offsetWidth - pad;
		var parentOffsetWidth = parentEl.offsetWidth;
		var ratio = parentOffsetWidth / elOffsetWidth;
		timeout = setTimeout(anime.set(el, { scale: ratio }), 10);
	}
	resize();
	window.addEventListener("resize", resize);
}

var advancedStaggeringAnimation = (function() {
	var staggerVisualizerEl = document.querySelector(".stagger-visualizer");
	var dotsWrapperEl = staggerVisualizerEl.querySelector(".dots-wrapper");
	var dotsFragment = document.createDocumentFragment();
	var grid = [22, 22];
	var numberOfElements = grid[0] * grid[1];
	var animation;
	var paused = true;

	fitElementToParent(staggerVisualizerEl, 9);

	for (var i = 0; i < numberOfElements; i++) {
		var dotEl = document.createElement("svg");
		dotEl.id = i;
		dotEl.classList.add("dot");
		dotEl.addEventListener("click", function play(e) {
			// console.log("play");
			// console.log(this.id);

			paused = false;
			if (animation) animation.pause();

			animation = anime
				.timeline({
					easing: "easeInOutQuad"
					// complete: play
				})
				.add(
					{
						targets: ".stagger-visualizer .dot",
						keyframes: [
							{
								scale: anime.stagger([1, 1], { grid: grid, from: this.id }),
								background: "#C795AE",
								duration: 100
							},
							{
								scale: 1,
								background: "#1f2427",
								duration: 1200
							}
						],
						delay: anime.stagger(40, { grid: grid, from: this.id })
					},
					0
				);
		});
		dotsFragment.appendChild(dotEl);
	}
	dotsWrapperEl.appendChild(dotsFragment);
})();
