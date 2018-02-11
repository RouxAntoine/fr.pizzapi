import { Order, Address, Customer, Store, Track, Item, Util, Payment } from "pizzapi";
import { Http } from './tools/Http';
import 'source-map-support/register';                    // permet le support dees source map avec node js

import * as json from './conf/urls.json'

// let json = jsonReaderClass("./conf/urls.json").data;

export class App {
    public static run(): void {
        // this.api
        console.log("hello world !!!")
    }

    private home: object;
    private myAddress: Address;

    constructor(home: object) {
        this.home = home;
        this.myAddress = new Address(home)
    }

    public searchNearestStore(): Promise<string[]> {
        return new Promise<string[]>((resolve, reject) => {
            let addressFind = json.store.find;
            let url = addressFind.replace(
                "${code}",
                encodeURI(
                    "LYON"
                )
            );
            console.log(url);
            let http = new Http();
            http.get(url, function(res){
                console.log(res);
            });
        });
    }
}

let app = new App({
    City: "Lyon",
    PostalCode: 69008,
    Region: "Rhône alpes",
    Street: "11 rue maryse bastie",
});

app.searchNearestStore().then((tab) => {
    console.log("totoa");
    console.log(json);
    console.log(typeof json);
    console.log(tab)
}).catch((res) => {
    console.log(res);
});

// for test
App.run();
