var React = require("react");
var mount = require("enzyme").mount;

describe("<FeedbackPage />", function(){
    beforeEach(function(){
        jest.resetModules();
        jest.mock("ContactActionCreators");
    });
    it("should render the main contaner", function(){
        var FeedbackPage = require("pages/feedback/FeedbackPage").default;
        var wrapper = mount(<FeedbackPage/>);
        expect(wrapper.find(".feedback").length).toBe(1);
    });
    it("should renders all fields", function(){
        var FeedbackPage = require("pages/feedback/FeedbackPage").default;
        var wrapper = mount(<FeedbackPage/>);
        expect(wrapper.find("#name").length).toBe(1);
        expect(wrapper.find("#email").length).toBe(1);
        expect(wrapper.find("#message").length).toBe(1);
    });
    it("should validate name", function(){
        var mockActionCreator = require("ContactActionCreators").default;
        var FeedbackPage = require("pages/feedback/FeedbackPage").default;
        var wrapper = mount(<FeedbackPage/>);
        wrapper.find("#email").get(0).ref({value:"test@test.com"});

        wrapper.find(".button").simulate("click");
        expect(wrapper.find(".error").length).toBe(1);
        expect(wrapper.find(".error").first().text()).toBe("Please enter your name");
        expect(mockActionCreator.lodgeFeedback.mock.calls.length).toBe(0);
    });
    it("should validate email", function(){
        var mockActionCreator = require("ContactActionCreators").default;
        mockActionCreator.lodgeFeedback.mockImplementation(function(){
            return new Promise(function(resolve, reject){
                resolve();
            });
        });
        var FeedbackPage = require("pages/feedback/FeedbackPage").default;
        var wrapper = mount(<FeedbackPage/>);

        wrapper.find("#name").get(0).ref({value:"blah blah"});
        wrapper.find(".button").simulate("click");
        expect(wrapper.find(".error").length).toBe(1);
        expect(wrapper.find(".error").first().text()).toBe("The email is invalid");
        expect(mockActionCreator.lodgeFeedback.mock.calls.length).toBe(0);

        wrapper.find("#name").get(0).ref({value:"blah blah"});
        var mockEmailInput = {value:"test", focus:function(){}};
        wrapper.find("#email").get(0).ref(mockEmailInput);
        wrapper.find(".button").simulate("click");
        expect(wrapper.find(".error").length).toBe(1);
        expect(wrapper.find(".error").first().text()).toBe("The email is invalid");
        expect(mockActionCreator.lodgeFeedback.mock.calls.length).toBe(0);

        wrapper.find("#name").get(0).ref({value:"blah blah"});
        wrapper.find("#message").get(0).ref({value:"blah blah"});
        mockEmailInput.value = "test@test.com";
        wrapper.find("#email").get(0).ref(mockEmailInput);
        wrapper.find(".button").simulate("click");
        expect(wrapper.find(".error").length).toBe(0);
    });
});