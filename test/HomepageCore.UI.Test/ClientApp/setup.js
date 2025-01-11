import raf from "raf";
import "babel-polyfill";
import "mock-local-storage";
import Enzyme from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";

// Setup enzyme's react adapter
Enzyme.configure({ adapter: new EnzymeAdapter() });

raf.polyfill();

global.XMLHttpRequest = class XMLHttpRequest {};

global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({ }),
    }),
);