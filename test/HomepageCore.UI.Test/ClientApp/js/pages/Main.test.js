import React from "react";
import { Route, Routes, StaticRouter } from "react-router-dom";
import { render, act } from '@testing-library/react'
import { Provider } from 'react-redux';
import store from 'store';

beforeAll(function(){
    jest.mock("pages/home/HomeLandingPage", () => () => <div data-testid="HomeLandingPage" />);
    jest.mock("pages/post/PostPage", () => () => <div data-testid="PostPage" />);
    jest.mock("pages/about/AboutPage", () => () => <div data-testid="AboutPage" />);
    jest.mock("pages/resume/ResumePage", () => () => <div data-testid="ResumePage" />);
    jest.mock("pages/feedback/FeedbackPage", () => () => <div data-testid="FeedbackPage" />);
    jest.mock("pages/projects/ProjectsPage", () => () => <div data-testid="ProjectsPage" />);
    jest.mock("pages/admin/EditPage", () => () => <div data-testid="EditPage" />);
});

describe("<Main />", function(){
    it("should render content container", async function(){
        const Main = require("pages/Main").default;

        const { container } = await act(() => render(<Provider store={store}><StaticRouter location={"/"} context={{}}><Routes><Route path="*" element={<Main/>}/></Routes></StaticRouter></Provider>));
    
        expect(container.getElementsByClassName("content").length).toBe(1);
    });
    it("should render landing page by default", async function(){
        const Main = require("pages/Main").default;

        const { getByTestId } = await act(() => render(<Provider store={store}><StaticRouter location={"/"} context={{}}><Routes><Route path="*" element={<Main/>}/></Routes></StaticRouter></Provider>));

        expect(getByTestId("HomeLandingPage")).toBeInTheDocument();
    });
    it("should render post page", async function(){
        const Main = require("pages/Main").default;

        const { getByTestId } = await act(() => render(<Provider store={store}><StaticRouter location={"/post/1"} context={{}}><Routes><Route path="*" element={<Main/>}/></Routes></StaticRouter></Provider>));

        expect(getByTestId("PostPage")).toBeInTheDocument();
    });
    it("should render about page", async function(){
        const Main = require("pages/Main").default;

        const { getByTestId } = await act(() => render(<Provider store={store}><StaticRouter location={"/about"} context={{}}><Routes><Route path="*" element={<Main/>}/></Routes></StaticRouter></Provider>));

        expect(getByTestId("AboutPage")).toBeInTheDocument();
    });
    it("should render projects page", async function(){
        const Main = require("pages/Main").default;

        const { getByTestId } = await act(() => render(<Provider store={store}><StaticRouter location={"/projects"} context={{}}><Routes><Route path="*" element={<Main/>}/></Routes></StaticRouter></Provider>));

        expect(getByTestId("ProjectsPage")).toBeInTheDocument();
    });
    it("should render menus", async function(){
        const Main = require("pages/Main").default;
        const { container } = await act(() => render(<Provider store={store}><StaticRouter location={"/"} context={{}}><Routes><Route path="*" element={<Main/>}/></Routes></StaticRouter></Provider>));

        // desktop menu
        expect(container.getElementsByClassName("navigation-section").length).toBe(2);

        // hamburger menu
        expect(container.getElementsByClassName("side-menu").length).toBe(1);
        expect(container.getElementsByClassName("side-social").length).toBe(1);

        // social links
        expect(container.getElementsByClassName("social-links-logo").length).toBe(4);
    });
    it("should render footer", async function(){
        const Main = require("pages/Main").default;
        const { container } = await act(() => render(<Provider store={store}><StaticRouter location={"/"} context={{}}><Routes><Route path="*" element={<Main/>}/></Routes></StaticRouter></Provider>));

        expect(container.getElementsByClassName("footer").length).toBe(1);
    });
});