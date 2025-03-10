import React from "react";
import { render, act, fireEvent } from '@testing-library/react'
import { Provider } from "react-redux";
import store from "store";

describe("<FeedbackPage />", function(){
    it("should render the main contaner", async function(){
        var FeedbackPage = require("pages/feedback/FeedbackPage").default;
        const { container } = await act(async () => render(<Provider store={store}><FeedbackPage/></Provider>));
        expect(container.getElementsByClassName("feedback").length).toBe(1);
    });
    it("should renders all fields", async function(){
        var FeedbackPage = require("pages/feedback/FeedbackPage").default;
        const { container } = await act(async () => render(<Provider store={store}><FeedbackPage/></Provider>));
        expect(container.querySelector("#name")).toBeDefined();
        expect(container.querySelector("#email")).toBeDefined();
        expect(container.querySelector("#message")).toBeDefined();
    });
    it("should validate name", async function(){
        jest.mock("api/ContactApi");
        var mockContactApi = require("api/ContactApi").default;
        mockContactApi.lodgeFeedback.mockImplementation(function() {
            return new Promise(function(resolve, reject) {
                resolve();
            });
        });

        var FeedbackPage = require("pages/feedback/FeedbackPage").default;
        const { container } = await act(async () => render(<Provider store={store}><FeedbackPage/></Provider>));

        const textbox = container.querySelector("#email");
        textbox.value = "test@test.com";

        const button = container.getElementsByClassName("button")[0];

        fireEvent.click(button);
        expect(container.getElementsByClassName("error").length).toBe(1);
        expect(container.getElementsByClassName("error")[0].innerHTML).toBe("Please enter your name");
        expect(mockContactApi.lodgeFeedback.mock.calls.length).toBe(0);
    });
    it("should validate email", async function(){
        jest.mock("api/ContactApi");
        var mockContactApi = require("api/ContactApi").default;
        mockContactApi.lodgeFeedback.mockImplementation(function() {
            return new Promise(function(resolve, reject) {
                resolve();
            });
        });

        var FeedbackPage = require("pages/feedback/FeedbackPage").default;
        const { container } = await act(async () => render(<Provider store={store}><FeedbackPage/></Provider>));

        const button = container.getElementsByClassName("button")[0];
        const textbox = container.querySelector("#name");
        textbox.value = "blah blah";

        fireEvent.click(button);
        await 
        expect(container.getElementsByClassName("error").length).toBe(1);
        expect(container.getElementsByClassName("error")[0].innerHTML).toBe("The email is invalid");
        expect(mockContactApi.lodgeFeedback.mock.calls.length).toBe(0);

        const emailTextbox = container.querySelector("#email");
        emailTextbox.value = "test";
        fireEvent.click(button);

        expect(container.getElementsByClassName("error").length).toBe(1);
        expect(container.getElementsByClassName("error")[0].innerHTML).toBe("The email is invalid");
        expect(mockContactApi.lodgeFeedback.mock.calls.length).toBe(0);

        const msgTextbox = container.querySelector("#message");
        msgTextbox.value = "blah blah";
        emailTextbox.value = "test@test.com";
        fireEvent.click(button);

        expect(container.getElementsByClassName("error").length).toBe(0);
    });
});