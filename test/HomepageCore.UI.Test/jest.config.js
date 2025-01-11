module.exports = {
    modulePaths: [
        "<rootDir>../../HomepageCore.UI/ClientApp/js",
        "<rootDir>../../HomepageCore.UI/ClientApp/js/dispatchers",
        "<rootDir>../../HomepageCore.UI/ClientApp/js/constants",
        "<rootDir>../../HomepageCore.UI/ClientApp/js/stores",
        "<rootDir>../../HomepageCore.UI/ClientApp/js/actions",
        "<rootDir>../../HomepageCore.UI/ClientApp/js/services",
        "<rootDir>/ClientApp/js"
    ],
    moduleFileExtensions: ["js", "jsx"],
    setupFilesAfterEnv: [
        "<rootDir>/ClientApp/setup.js"
    ],
    globals: {
        "AUTHORITY": "http://localhost:5000",
        "REDIRECT_URI": "http://localhost:5001",
        "PAGE_SIZE": 5
    },
    transformIgnorePatterns: ["/node_modules/(?!react-social-icons)"],
    testEnvironment: "jsdom"
}