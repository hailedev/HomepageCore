var AboutPage = require("pages/about/AboutPage").default;
var React = require("react");
var mount = require("enzyme").mount;
var StaticRouter = require("react-router-dom").StaticRouter;
var Route = require("react-router-dom").Route;

describe("<AboutPage />", function(){
    it("should render the main contaner", function(){
        var wrapper = mount(<StaticRouter location={"/about"} context={{}}><Route path="/about" component={AboutPage}/></StaticRouter>);
        expect(wrapper.find(".about").length).toBe(1);
    });
});