function fitElementToParent(el) {
	var timeout = null;
	function resize() {
		if (timeout) clearTimeout(timeout);
		anime.set(el, { scale: 1 });
		var parentEl = el.parentNode;
		var elOffsetWidth = el.offsetWidth;
		var parentOffsetWidth = parentEl.offsetWidth;
		var ratio = parentOffsetWidth / elOffsetWidth;
		timeout = setTimeout(anime.set(el, { scale: ratio }), 10);
	}
	resize();
	window.addEventListener("resize", resize);
}

function getViewport() {
	var viewPortWidth;
	var viewPortHeight;

	// the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
	if (typeof window.innerWidth != "undefined") {
		(viewPortWidth = window.innerWidth), (viewPortHeight = window.innerHeight);
	}

	// IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
	else if (
		typeof document.documentElement != "undefined" &&
		typeof document.documentElement.clientWidth != "undefined" &&
		document.documentElement.clientWidth != 0
	) {
		(viewPortWidth = document.documentElement.clientWidth),
			(viewPortHeight = document.documentElement.clientHeight);
	}

	// older versions of IE
	else {
		(viewPortWidth = document.getElementsByTagName("body")[0].clientWidth),
			(viewPortHeight = document.getElementsByTagName("body")[0].clientHeight);
	}
	return [viewPortWidth, viewPortHeight];
}

var staggeringAnimation = (function() {
	var dotsWrapperEl = document.querySelector(".dots-wrapper");
	var dotsFragment = document.createDocumentFragment();
	var viewPortSize = getViewport();
	var grid = [parseInt(viewPortSize[0] / 47), parseInt(viewPortSize[1] / 47)];
	var numberOfElements = grid[0] * grid[1];

	for (var i = 0; i < numberOfElements; i++) {
		var dotEl = document.createElement("svg");
		dotEl.id = i;
		dotEl.classList.add("dot");
		dotEl.addEventListener("click", function play(e) {
			console.log(e);
			stagger = anime({
				targets: ".stagger-visualizer .dot",
				background: [
					{ value: "#C795AE", easing: "easeOutSine", duration: 500 },
					{ value: "#1f2427", easing: "easeInOutQuad", duration: 1200 }
				],
				delay: anime.stagger(40, { grid: grid, from: this.id })
			});
		});
		dotsFragment.appendChild(dotEl);
	}
	dotsWrapperEl.appendChild(dotsFragment);
})();
