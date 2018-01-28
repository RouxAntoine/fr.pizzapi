"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dominos_1 = require("dominos");
var App = /** @class */ (function () {
    function App(home) {
        this.home = home;
        this.myAddress = new dominos_1.Address(home);
    }
    App.prototype.searchNear = function () {
        return new Promise(function (resolve, reject) {
            dominos_1.Util.findNearbyStores('11 rue maryse bastié', 'Delivery', function (storeData) {
                console.log(storeData);
                resolve([""]);
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
app.searchNear().then(function (tab) {
    console.log("toto");
    console.log(tab);
});
// for test
App.run();
//# sourceMappingURL=index.js.map