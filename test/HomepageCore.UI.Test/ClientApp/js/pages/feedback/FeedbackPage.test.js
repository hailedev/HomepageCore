import React from "react";
import { render, act } from '@testing-library/react'
import { Provider } from "react-redux";
import store from "store";

describe("<FeedbackPage />", function(){
    it("should render the main contaner", async function(){
        var FeedbackPage = require("pages/feedback/FeedbackPage").default;
        const { container } = await act(() => render(<Provider store={store}><FeedbackPage/></Provider>));
        expect(container.getElementsByClassName("feedback").length).toBe(1);
    });
    it("should renders all fields", async function(){
        var FeedbackPage = require("pages/feedback/FeedbackPage").default;
        const { container } = await act(() => render(<Provider store={store}><FeedbackPage/></Provider>));
        expect(container.querySelector("#name")).toBeDefined();
        expect(container.querySelector("#email")).toBeDefined();
        expect(container.querySelector("#message")).toBeDefined();
    });
    /*it("should validate name", function(){
        var mockActionCreator = require("ContactActionCreators").default;
        var FeedbackPage = require("pages/feedback/FeedbackPage").default;
        var wrapper = mount(<FeedbackPage/>);
        wrapper.find("#email").get(0).ref({value:"test@test.com"});

        wrapper.find(".button").simulate("click");
        expect(wrapper.find(".error").length).toBe(1);
        expect(wrapper.find(".error").first().text()).toBe("Please enter your name");
        expect(mockActionCreator.lodgeFeedback.mock.calls.length).toBe(0);
    });
    it("should validate email", function(){
        var mockActionCreator = require("ContactActionCreators").default;
        mockActionCreator.lodgeFeedback.mockImplementation(function(){
            return new Promise(function(resolve, reject){
                resolve();
            });
        });
        var FeedbackPage = require("pages/feedback/FeedbackPage").default;
        var wrapper = mount(<FeedbackPage/>);

        wrapper.find("#name").get(0).ref({value:"blah blah"});
        wrapper.find(".button").simulate("click");
        expect(wrapper.find(".error").length).toBe(1);
        expect(wrapper.find(".error").first().text()).toBe("The email is invalid");
        expect(mockActionCreator.lodgeFeedback.mock.calls.length).toBe(0);

        wrapper.find("#name").get(0).ref({value:"blah blah"});
        var mockEmailInput = {value:"test", focus:function(){}};
        wrapper.find("#email").get(0).ref(mockEmailInput);
        wrapper.find(".button").simulate("click");
        expect(wrapper.find(".error").length).toBe(1);
        expect(wrapper.find(".error").first().text()).toBe("The email is invalid");
        expect(mockActionCreator.lodgeFeedback.mock.calls.length).toBe(0);

        wrapper.find("#name").get(0).ref({value:"blah blah"});
        wrapper.find("#message").get(0).ref({value:"blah blah"});
        mockEmailInput.value = "test@test.com";
        wrapper.find("#email").get(0).ref(mockEmailInput);
        wrapper.find(".button").simulate("click");
        expect(wrapper.find(".error").length).toBe(0);
    });*/
});