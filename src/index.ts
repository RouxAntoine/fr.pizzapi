import { Order, Address, Customer, Store, Track, Item, Util, Payment } from "pizzapi"
import * as json from './conf/urls.json'
import { Http } from './http.ts'

export class App {
    private home: object;
    private myAddress: Address;

    constructor(home: object) {
        this.home = home;
        this.myAddress = new Address(home)
    }

    searchNearestStore(): Promise<string[]> {
        return new Promise<string[]>((resolve, reject) => {
            let addressFind = json.store.find;
            let url = addressFind.replace(
                '${code}',
                encodeURI(
                    "LYON"
                )
            );
            console.log(url);
            let http = new Http();
            http.get(url, function(res){
                console.log(res);
            });
        })
    }

    static run(): void {
        // this.api
        console.log("hello world !!!")
    }
}

let app = new App({
    Street: '11 rue maryse bastie',
    City: 'Lyon',
    Region: 'Rhône alpes',
    PostalCode: 69008
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