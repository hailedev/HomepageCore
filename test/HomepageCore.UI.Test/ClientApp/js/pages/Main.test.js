var React = require("react");
var mount = require("enzyme").mount;
var StaticRouter = require("react-router-dom").StaticRouter;
var Route = require("react-router-dom").Route;

beforeEach(function(){
    jest.resetModules();
    jest.mock("pages/home/HomeLandingPage");
    jest.mock("pages/post/PostPage");
    jest.mock("pages/about/AboutPage");
    jest.mock("pages/resume/ResumePage");
    jest.mock("pages/feedback/FeedbackPage");
    jest.mock("pages/projects/ProjectsPage");
    jest.mock("pages/admin/AdminPage");
});

describe("<Main />", function(){
    it("should render content container", function(){
        var Main = require("pages/Main");
        var wrapper = mount(<StaticRouter location={"/"} context={{}}><Route path="/" component={Main}/></StaticRouter>);

        expect(wrapper.find(".content").length).toBe(1);
    });
    it("should render landing page by default", function(){
        var mockHomeLandingPage = require("pages/home/HomeLandingPage");

        var Main = require("pages/Main");
        var wrapper = mount(<StaticRouter location={"/"} context={{}}><Route path="/" component={Main}/></StaticRouter>);

        expect(mockHomeLandingPage.mock.calls.length).toBe(1);
    });
    it("should render post page", function(){
        var mockHomeLandingPage = require("pages/post/PostPage");

        var Main = require("pages/Main");
        var wrapper = mount(<StaticRouter location={"/post/1"} context={{}}><Route path="/" component={Main}/></StaticRouter>);

        expect(mockHomeLandingPage.mock.calls.length).toBe(1);
    });
    it("should render about page", function(){
        var mockHomeLandingPage = require("pages/about/AboutPage");

        var Main = require("pages/Main");
        var wrapper = mount(<StaticRouter location={"/about"} context={{}}><Route path="/" component={Main}/></StaticRouter>);

        expect(mockHomeLandingPage.mock.calls.length).toBe(1);
    });
    it("should render projects page", function(){
        var mockHomeLandingPage = require("pages/projects/ProjectsPage");

        var Main = require("pages/Main");
        var wrapper = mount(<StaticRouter location={"/projects"} context={{}}><Route path="/" component={Main}/></StaticRouter>);

        expect(mockHomeLandingPage.mock.calls.length).toBe(1);
    });
    it("should render menus", function(){
        var Main = require("pages/Main");
        var wrapper = mount(<StaticRouter location={"/"} context={{}}><Route path="/" component={Main}/></StaticRouter>);

        // desktop menu
        expect(wrapper.find(".navigation-section").length).toBe(2);

        // hamburger menu
        expect(wrapper.find(".side-menu").length).toBe(1);
        expect(wrapper.find(".side-social").length).toBe(1);

        // social links
        expect(wrapper.find(".social-links-logo").length).toBe(4);
    });
    it("should render footer", function(){
        var Main = require("pages/Main");
        var wrapper = mount(<StaticRouter location={"/"} context={{}}><Route path="/" component={Main}/></StaticRouter>);

        expect(wrapper.find(".footer").length).toBe(1);
    });
});