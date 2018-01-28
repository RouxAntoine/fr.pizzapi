import { Order, Address, Customer, Store, Track, Item, Util, Payment } from "dominos"

export class App {
    private home: object;
    private myAddress: Address;

    constructor(home: object) {
        this.home = home;
        this.myAddress = new Address(home)
    }

    searchNear(): Promise<string[]> {
        return new Promise<string[]>((resolve, reject) => {
            Util.findNearbyStores(
                '11 rue maryse bastié',
                'Delivery',
                function(storeData){
                    console.log(storeData);
                    resolve([""])
                }
            )
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

app.searchNear().then((tab) => {
    console.log("toto");
    console.log(tab)
});

// for test
App.run();