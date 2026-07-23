/** props: https://inclusive-components.design/cards/ **/

(function() {

	const overlays = document.querySelectorAll('.flair-overlay');
	Array.prototype.forEach.call(overlays, overlay => {
		let down, up, link = overlay.querySelector('.title a');
		if (!link) return;
		overlay.style.cursor = 'pointer';
		overlay.onmousedown = () => down = +new Date();
		overlay.onmouseup = () => {
			up = +new Date();
			if ((up - down) < 200) {
				link.click();
			}
		}
	});

})();
