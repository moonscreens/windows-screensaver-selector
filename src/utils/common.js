export function getListOfScreensavers() {
    return new Promise(function (resolve, reject) {
        fetch("https://raw.githubusercontent.com/moonscreens/whitelisted-intros/main/index.json", {
            method: 'GET',
        }).then(function (response) {
            resolve(response.json());
        }).catch(function (error) {
            reject(error);
        });
    });
}