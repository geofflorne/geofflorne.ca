const staggeringAnimation = (() => {
	const resize = () => {
		document.querySelector(".dots-wrapper").innerHTML = "";
		let playing = false;
		const dotsWrapperEl = document.querySelector(".dots-wrapper");
		const dotsFragment = document.createDocumentFragment();
		const grid = [
			parseInt(window.innerWidth / 47),
			parseInt(window.innerHeight / 47)
		];

		// tfw ES6
		[...Array(grid.reduce((x, y) => x * y)).keys()].map(i => {
			const dotEl = document.createElement("svg");
			dotEl.id = i;
			dotEl.classList.add("dot");
			dotEl.addEventListener("click", function play(e) {
				if (!playing) {
					stagger = anime({
						targets: ".stagger-visualizer .dot",
						background: [
							{ value: "#C795AE", easing: "easeOutSine", duration: 500 },
							{ value: "#1f2427", easing: "easeInOutQuad", duration: 1200 }
						],
						delay: anime.stagger(40, { grid: grid, from: this.id }),
						begin: () => {
							playing = true;
						},
						complete: () => {
							playing = false;
						}
					});
				}
			});
			dotsFragment.appendChild(dotEl);
		});
		dotsWrapperEl.appendChild(dotsFragment);
	};
	resize();
	window.addEventListener("resize", resize);
})();
