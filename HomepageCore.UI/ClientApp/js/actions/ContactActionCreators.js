import ContactApi from '../api/ContactApi';

export default new class ContactActionCreators {
    lodgeFeedback(model) {
        return new Promise((resolve, reject) => {
            ContactApi.lodgeFeedback(model)
                .then(response => resolve(response))
                .catch(error => reject(error));
        });
    }
}();
