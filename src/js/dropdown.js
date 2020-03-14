
class Dropdown {
	constructor(element) {
		this.container = element;
		this.selection = this.container.dataset.url;

		this.options = this.container.getElementsByClassName('dropdown__option');
		this.label = this.container.querySelector('.dropdown__selected');

		this.addListeners();

		this.onChange = (e) => {};
	}

	addListeners () {
		this.container.addEventListener('click', (e)=>{
			this.container.classList.toggle('active');
		});

		for (let index = 0; index < this.options.length; index++) {
			this.options[index].addEventListener('click', (e)=>{
				this.label.textContent = e.target.textContent;
				this.selection = e.target.dataset.url;
				
				this.onChange(this.selection);
			});
		}
	}
}


module.exports = () => {
	const containers = document.body.getElementsByClassName('dropdown__container');
	for (let index = 0; index < containers.length; index++) {
		const element = new Dropdown(containers[index]);
		return element;
	}
}