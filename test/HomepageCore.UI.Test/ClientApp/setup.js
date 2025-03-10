//import raf from "raf";
//import "babel-polyfill";
import "mock-local-storage";
import "@testing-library/jest-dom";
import { TextDecoder, TextEncoder } from 'util';
import Enzyme from "enzyme";
import EnzymeAdapter from "@cfaester/enzyme-adapter-react-18";

// Setup enzyme's react adapter
Enzyme.configure({ adapter: new EnzymeAdapter() });

//raf.polyfill();



global.XMLHttpRequest = class XMLHttpRequest {};

global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({ }),
    }),
);

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;