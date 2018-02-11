import { Http } from './tools/Http';
import { Address } from './Address';
import { Store } from './Store';
import cheerio from 'cheerio';
//import jsonReaderClass from './tools/JsonReader';
import 'source-map-support/register';                    // permet le support dees source map avec node js

//let json = jsonReaderClass("./conf/urls.json").data;
//console.log(json);

export class App {
    public static run(): void {
        // this.api
        console.log("hello world !!!")
    }

    private home: object;
    private myAddress: Address;

    constructor(home: object) {
        this.home = home;
        this.myAddress = new Address(home, 38, "Avenue Georges Pompidou")
    }

    public searchNearestStore(): Promise<string[]> {
        return new Promise<string[]>((resolve, reject) => {
            let addressFind = "https://www.dominos.fr/trouver-son-dominos?SearchCriteria=${code}";//json.store.find;
            let url = addressFind.replace(
                "${code}",
                encodeURI(
                    "LYON"
                )
            );
            console.log(url);
            let http = new Http();
            http.get(url, function(res){
                let stores: Array<Store> = [];
                let $ = cheerio.load(res);
                $('.store-search-results').find('.store-information').each(function(i, element) {
                    let name = $(this).find('h4').text();
                    let id = $(this).find('a').next()['2']['attribs']['id'].replace( /^\D+/g, '');
                    let store = new Store(id, "phone", "street", name);
                    stores.push(store);
                });
                console.log(stores);
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
    /*console.log(json);
    console.log(typeof json);*/
    console.log(tab)
}).catch((res) => {
    console.log(res);
});

// for test
App.run();
