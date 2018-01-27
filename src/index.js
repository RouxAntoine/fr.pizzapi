"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var pizzapi_1 = require("pizzapi");
var App = /** @class */ (function () {
    function App(home) {
        this.myAddress = new pizzapi_1.Address(home);
    }
    App.prototype.searchNear = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                pizzapi_1.Util.findNearbyStores(this.myAddress, 'Delivery', function (storeData) {
                    console.log(storeData);
                });
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        resolve([""]);
                    })];
            });
        });
    };
    App.run = function () {
        // this.api
        console.log("hello world !!!");
    };
    return App;
}());
exports.App = App;
var app = new App({
    Street: '11 rue maryse bastie',
    City: 'Lyon',
    Region: 'Rhône alpes',
    PostalCode: 69008
});
app.searchNear();
// for test
App.run();
//# sourceMappingURL=index.js.map