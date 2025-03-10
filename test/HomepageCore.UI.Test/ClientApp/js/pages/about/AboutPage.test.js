import React from "react";
import { StaticRouter, Route, Routes } from "react-router-dom";
import { render, act } from '@testing-library/react'
import { Provider } from "react-redux";
import store from "store";

describe("<AboutPage />", function(){
    it("should render the main contaner", async function(){
        var AboutPage = require("pages/about/AboutPage").default;
        const { container } = await act(async () => render(<Provider store={store}><StaticRouter location={"/about"} context={{}}><Routes><Route path="/about" element={<AboutPage/>}/></Routes></StaticRouter></Provider>));
        expect(container.getElementsByClassName("about").length).toBe(1);
    });
});