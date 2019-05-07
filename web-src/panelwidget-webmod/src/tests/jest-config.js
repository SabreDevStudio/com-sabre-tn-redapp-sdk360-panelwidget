let config = {
    "globals"                     : {
        "ts-jest": {
            "tsConfigFile": "tsconfig.json"
        }
    },
    "transform"                   : {
        "^.+\\.tsx?$": "ts-jest"
    },
    "testMatch"                   : [
        "<rootDir>/src/tests/jest/**/*.(ts|tsx|js)"
    ],
    "snapshotSerializers"         : [
        "enzyme-to-json/serializer"
    ],
    "moduleFileExtensions"        : [
        "ts",
        "tsx",
        "js",
        "json"
    ],
    "setupFiles"                  : [
        "raf/polyfill"
    ],
    "testURL"                     : "https://localhost",
    "setupTestFrameworkScriptFile": "<rootDir>/core/jest/test-setup.js"
};

module.exports = config;
