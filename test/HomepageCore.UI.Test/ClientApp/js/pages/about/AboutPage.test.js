import AboutPage from "pages/about/AboutPage";
import React from "react";
import { mount } from "enzyme";
import { StaticRouter, Route, Routes } from "react-router-dom";

describe("<AboutPage />", function(){
    it("should render the main contaner", function(){
        var wrapper = mount(<StaticRouter location={"/about"} context={{}}><Routes><Route path="/about" component={AboutPage}/></Routes></StaticRouter>);
        expect(wrapper.find(".about").length).toBe(1);
    });
});