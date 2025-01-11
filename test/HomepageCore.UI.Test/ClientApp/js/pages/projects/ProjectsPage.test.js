import ProjectPage from "pages/projects/ProjectsPage";
import React from "react";
import { mount } from "enzyme";
import { StaticRouter, Route } from "react-router-dom";

describe("<ProjectPage />", function(){
    it("should render the main contaner", function(){
        var wrapper = mount(<StaticRouter location={"/"} context={{}}><Route path="/" component={ProjectPage}/></StaticRouter>);
        expect(wrapper.find(".projects").length).toBe(1);
    });
});