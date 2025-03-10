import "mock-local-storage";
import "@testing-library/jest-dom";
import { TextDecoder, TextEncoder } from 'util';

global.XMLHttpRequest = class XMLHttpRequest {};

global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({ }),
    }),
);

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;