"use strict";
exports.__esModule = true;
exports.process = void 0;
var crypto = require("crypto");
var yaml = require("js-yaml");
var getCacheKey = function (fileData, filePath, configString, options) {
    return crypto
        .createHash("md5")
        .update(fileData)
        .update(typeof configString === "string"
        ? configString
        : JSON.stringify(configString))
        .digest("hex");
};
var process = function (sourceText, sourcePath, config, options) {
    var result = yaml.load(sourceText);
    var json = JSON.stringify(result, undefined, "\t");
    // process() and processAsync() methods of a custom transformer module cannot
    // return a string anymore. They must always return an object.
    //
    // https://jestjs.io/docs/28.x/upgrading-to-jest28#transformer
    return { code: "module.exports = ".concat(json) };
};
exports.process = process;
var transformer = {
    getCacheKey: getCacheKey,
    process: exports.process
};
exports["default"] = transformer;
