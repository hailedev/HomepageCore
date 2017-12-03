var AboutPage = require("pages/about/AboutPage");
var React = require("react");
var mount = require("enzyme").mount;
var StaticRouter = require("react-router-dom").StaticRouter;
var Route = require("react-router-dom").Route;

describe("<AboutPage />", function(){
    it("should render the main contaner", function(){
        var wrapper = mount(<StaticRouter location={"/"} context={{}}><Route path="/" component={AboutPage}/></StaticRouter>);
        expect(wrapper.find(".about").length).toBe(1);
    });
});