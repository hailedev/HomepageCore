var AboutPage = require("pages/about/AboutPage");
var React = require("react");
var shallow = require("enzyme").shallow;

describe("<AboutPage />", function(){
    it("should render the main contaner", function(){
        var wrapper = shallow(<AboutPage />);
        expect(wrapper.find(".about").length).toBe(1);
    });
});