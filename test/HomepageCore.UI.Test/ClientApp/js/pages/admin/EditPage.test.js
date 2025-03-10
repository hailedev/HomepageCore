import React from "react";
import { StaticRouter, Route, Routes } from "react-router-dom";
import { render, act } from '@testing-library/react'
import { Provider } from "react-redux";
import { combineReducers } from 'redux';
import categories from 'reducers/CategoryReducer';
import posts from 'reducers/PostReducer';
import postSummaries from 'reducers/PostSummaryReducer';
import { configureStore } from '@reduxjs/toolkit';

describe("<EditPage />", function(){
    jest.mock("api/CategoryApi");
    jest.mock("api/PostApi");

    var mockCategoryApi = require("api/CategoryApi").default;
    var mockPostApi = require("api/PostApi").default;

    mockPostApi.getPost.mockImplementation(function() {
        return new Promise(function(resolve, reject) {
            resolve([
                {
                    id:"1",
                    title:"test1",
                    blurb:"the quick brown fox",
                    categoryId:"cat1",
                    day: 1,
                    month: "Jan",
                    raw:'{"entityMap":{},"blocks":[{"key":"d39lt","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]}'
                }
            ]);
        });
    });

    mockCategoryApi.getCategories.mockImplementation(function() {
        return new Promise(function(resolve, reject) {
            resolve([{id:"1", title:"test1"}, {id:"2", title:"test2"}]);
        });
    });

    let reducer = combineReducers({
        categories,
        posts,
        postSummaries,
        user: () => ({ name: "foo" })
    });

    let store = configureStore({ reducer, middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }) });
    it("should render the main contaner", async function(){
        var EditPage = require("pages/admin/EditPage").default;
        const { container } = await act(() => render(<Provider store={store}><StaticRouter location={"/edit/1"} context={{}}><Routes><Route path="/edit/:id" element={<EditPage/>}/></Routes></StaticRouter></Provider>));
    
        expect(container.getElementsByClassName("admin").length).toBe(1);
    });
    it("should load post content", async function(){
        jest.clearAllMocks();
        expect.hasAssertions();

        var EditPage = require("pages/admin/EditPage").default;
        await act(() => render(<Provider store={store}><StaticRouter location={"/edit/1"} context={{}}><Routes><Route path="/edit/:id" element={<EditPage/>}/></Routes></StaticRouter></Provider>));
        expect(mockPostApi.getPost.mock.calls.length).toBe(1);
    });
    it("should show empty div when not logged in", async function(){
        jest.clearAllMocks();
        reducer = combineReducers({
            categories,
            posts,
            postSummaries,
            user: () => null
        });
    
        store = configureStore({ reducer, middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }) });

        var EditPage = require("pages/admin/EditPage").default;
        const { container } = await act(() => render(<Provider store={store}><StaticRouter location={"/edit/1"} context={{}}><Routes><Route path="/edit/:id" element={<EditPage/>}/></Routes></StaticRouter></Provider>));
        expect(container.getElementsByClassName("admin").length).toBe(0);
    });
});