import AboutPage from "pages/about/AboutPage";
import React from "react";
import { mount } from "enzyme";
import { StaticRouter, Route } from "react-router-dom";

describe("<AboutPage />", function(){
    it("should render the main contaner", function(){
        var wrapper = mount(<StaticRouter location={"/about"} context={{}}><Route path="/about" component={AboutPage}/></StaticRouter>);
        expect(wrapper.find(".about").length).toBe(1);
    });
});