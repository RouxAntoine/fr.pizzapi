import { Order, Address, Customer, Store, Track, Item, Util, Payment } from "pizzapi"

export class App {
    private myAddress: Address

    constructor(home: object) {
        this.myAddress = new Address(home)
    }

    async searchNear(): Promise<string[]> {
        Util.findNearbyStores(
            this.myAddress,
            'Delivery',
            function(storeData){
                console.log(storeData);

            }
        );
        return new Promise<string[]>((resolve, reject) => {
            resolve([""])
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

app.searchNear();

// for test
App.run();