var ProjectPage = require("pages/projects/ProjectsPage").default;
var React = require("react");
var mount = require("enzyme").mount;
var StaticRouter = require("react-router-dom").StaticRouter;
var Route = require("react-router-dom").Route;

describe("<ProjectPage />", function(){
    it("should render the main contaner", function(){
        var wrapper = mount(<StaticRouter location={"/"} context={{}}><Route path="/" component={ProjectPage}/></StaticRouter>);
        expect(wrapper.find(".projects").length).toBe(1);
    });
});