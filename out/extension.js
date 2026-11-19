"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const hello_1 = require("./hello");
const lineCounter_1 = require("./lineCounter");
const colorChanger_1 = require("./colorChanger");
function activate(context) {
    console.log('CodeHelper is active!');
    (0, hello_1.registerHello)(context);
    (0, lineCounter_1.registerLineCounter)(context);
    (0, colorChanger_1.registerColorChanger)(context);
}
function deactivate() { }
//# sourceMappingURL=extension.js.map