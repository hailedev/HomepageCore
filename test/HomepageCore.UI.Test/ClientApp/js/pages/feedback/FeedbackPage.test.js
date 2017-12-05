var FeedbackPage = require("pages/feedback/FeedbackPage");
var React = require("react");
var mount = require("enzyme").mount;

describe("<FeedbackPage />", function(){
    it("should render the main contaner", function(){
        var wrapper = mount(<FeedbackPage/>);
        expect(wrapper.find(".feedback").length).toBe(1);
    });
});