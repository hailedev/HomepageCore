describe("ContactActionCreators", function() {
    describe("when calling lodgefeedback", function() {
        it("should call contact API", function() {
            jest.resetModules();
            jest.mock("api/ContactApi");
            expect.hasAssertions();
            var mockContactApi = require("api/ContactApi");
            mockContactApi.lodgeFeedback.mockImplementation(function(model){
                return new Promise(function(resolve, reject){
                    resolve({});
                });
            });
            var testcontext = require("actions/ContactActionCreators");

            return testcontext.lodgeFeedback().then(function(json) {
                expect(mockContactApi.lodgeFeedback.mock.calls.length).toBeGreaterThan(0);
            });
        });
    });
});