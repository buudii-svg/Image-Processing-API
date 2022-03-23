"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var ImageProcessingAPI_1 = __importDefault(require("../routes/api/ImageProcessingAPI"));
var app = (0, express_1.default)();
var port = 3000;
app.use('/api', ImageProcessingAPI_1.default);
app.use('/api', ImageProcessingAPI_1.default);
app.listen(port, function () {
    console.log("server started at localhost:".concat(port));
});
exports.default = app;
