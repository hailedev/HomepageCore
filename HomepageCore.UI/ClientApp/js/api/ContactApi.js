import ApiDispatcher from './ApiDispatcher';

export default new class ContactApi {
    lodgeFeedback(model) {
        return new Promise((resolve, reject) => {
            ApiDispatcher.dispatch(
                '/api/contact',
                {
                    credentials: 'include',
                    method: 'POST',
                    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
                    body: JSON.stringify(model)
                }, resolve, reject
            );
        });
    }
}();
