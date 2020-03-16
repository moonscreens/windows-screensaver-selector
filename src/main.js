const initDropdown = require('/js/dropdown.js');

window.addEventListener('DOMContentLoaded', ()=>{
	const dropdown = initDropdown();

	document.body.addEventListener('click', (e) => {
		console.log(e.target);
	})

	const iframe = document.body.querySelector('.screensaver');
	const tinyframe = document.body.querySelector('.monitor > iframe');
	iframe.src = dropdown.selection;
	tinyframe.src = iframe.src;
	dropdown.onChange = (url) => {
		iframe.src = (url) ? url : 'https://opl.io';
		tinyframe.src = (url) ? url : 'https://opl.io';
		if (url === undefined) {
			iframe.setAttribute('style', 'display: none;');
		} else {
			iframe.setAttribute('style', 'display: block;');
		}
	}
})