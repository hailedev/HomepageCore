import React from "react";
import { StaticRouter, Route, Routes } from "react-router-dom";
import { render, act } from '@testing-library/react'
import { Provider } from "react-redux";
import store from "store";

describe("<HomeLandingPage />", function(){
    it("should render all elements", async function(){
        jest.mock("api/CategoryApi");
        jest.mock("api/PostApi");

        var mockCategoryApi = require("api/CategoryApi").default;
        var mockPostApi = require("api/PostApi").default;

        mockPostApi.getPostSummaries.mockImplementation(function() {
            return new Promise(function(resolve, reject) {
                resolve([
                    {
                        id:"1",
                        title:"test1",
                        blurb:"the quick brown fox",
                        categoryId:"cat1",
                        day: 1,
                        month: "Jan"
                    },
                    {
                        id:"2",
                        title:"test2",
                        blurb:"the quick brown fox",
                        categoryId:"cat2",
                        day: 1,
                        month: "Feb"
                    }
                ]);
            });
        });

        mockCategoryApi.getCategories.mockImplementation(function() {
            return new Promise(function(resolve, reject) {
                resolve([{id:"1", title:"test1"}, {id:"2", title:"test2"}]);
            });
        });

        var HomeLandingPage = require("pages/home/HomeLandingPage").default;
        const { container } = await act(async () => render(<Provider store={store}><StaticRouter location={"/"} context={{}}><Routes><Route path="/" element={<HomeLandingPage/>}/></Routes></StaticRouter></Provider>));

        // renders the main container
        expect(container.getElementsByClassName("homepage").length).toBe(1);
    });
});