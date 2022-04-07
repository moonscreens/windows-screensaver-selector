export function getListOfScreensavers() {
	return new Promise(function (resolve, reject) {
		fetch("https://intros.opl.io/index.json", {
			method: 'GET',
		}).then(function (response) {
			resolve(response.json());
		}).catch(function (error) {
			reject(error);
		});
	});
}