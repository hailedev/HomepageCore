import DefaultUserManager from 'DefaultUserManager';

export default new class ApiDispatcher {
    dispatch(uri, options, resolve, reject) {
        let defaultOptions = options;
        DefaultUserManager.getUser()
            .then((token) => {
                if (token) {
                    const newOptions = options || {};
                    newOptions.headers = options.headers || {};
                    newOptions.headers.Authorization = `Bearer ${token.access_token}`;
                    defaultOptions = newOptions;
                }
            })
            .finally(() => {
                fetch(uri, defaultOptions).then(response => response.json())
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
            });
    }
}();
