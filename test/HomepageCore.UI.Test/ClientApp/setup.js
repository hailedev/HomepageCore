require("raf").polyfill();
require("babel-polyfill");
var Enzyme = require("enzyme");
var EnzymeAdapter = require("enzyme-adapter-react-16");

// Setup enzyme's react adapter
Enzyme.configure({ adapter: new EnzymeAdapter() });