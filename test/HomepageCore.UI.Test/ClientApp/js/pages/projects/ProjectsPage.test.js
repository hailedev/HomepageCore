import ProjectPage from "pages/projects/ProjectsPage";
import React from "react";
import { StaticRouter, Route, Routes } from "react-router-dom";
import { render, act } from '@testing-library/react'
import { Provider } from "react-redux";
import store from "store";

describe("<ProjectPage />", function(){
    it("should render the main contaner", async function(){
        const { container } = await act(async () => render(<Provider store={store}><StaticRouter location={"/"} context={{}}><Routes><Route path="*" element={<ProjectPage/>}/></Routes></StaticRouter></Provider>));
        expect(container.getElementsByClassName("projects").length).toBe(1);
    });
});