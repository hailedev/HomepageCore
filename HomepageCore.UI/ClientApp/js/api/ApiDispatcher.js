export default new class ApiDispatcher {
    dispatch(promise, resolve, reject) {
        promise().then(response => response.json())
            .then((json) => {
                if (json.errors) {
                    reject(json.errors);
                } else {
                    resolve(json);
                }
            })
            .catch((error) => {
                let message = 'Unknown error';
                if (error.statusText) {
                    message = error.statusText;
                } else if (error.message) {
                    ({ message } = error);
                }
                reject([message]);
            });
    }
}();
