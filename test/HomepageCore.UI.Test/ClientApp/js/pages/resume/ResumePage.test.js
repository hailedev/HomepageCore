var ResumePage = require("pages/resume/ResumePage");
var React = require("react");
var mount = require("enzyme").mount;
var StaticRouter = require("react-router-dom").StaticRouter;
var Route = require("react-router-dom").Route;

describe("<ResumePage />", function(){
    it("should render the main contaner", function(){
        var wrapper = mount(<StaticRouter location={"/"} context={{}}><Route path="/" component={ResumePage}/></StaticRouter>);
        expect(wrapper.find(".hire-me").length).toBe(1);
    });
});