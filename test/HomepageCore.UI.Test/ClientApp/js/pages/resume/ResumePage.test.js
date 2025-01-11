import ResumePage from "pages/resume/ResumePage";
import React from "react";
import { mount } from "enzyme";
import { StaticRouter, Route } from "react-router-dom";

describe("<ResumePage />", function(){
    it("should render the main contaner", function(){
        var wrapper = mount(<StaticRouter location={"/"} context={{}}><Route path="/" component={ResumePage}/></StaticRouter>);
        expect(wrapper.find(".hire-me").length).toBe(1);
    });
});