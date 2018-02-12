import { Http } from './tools/Http';
import { Address } from './Address';
import { Store } from './Store';
import { Pizza } from './Pizza';
import * as cheerio from 'cheerio';
import 'source-map-support/register';                    // permet le support dees source map avec node js
import * as compile from 'es6-template-strings/compile';
import * as resolveToString from 'es6-template-strings/resolve-to-string';
import * as template from 'es6-template-strings';
import * as json from './conf/urls.json';


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

    public async searchNearestStore(): Promise<Array<Store>> {
        let addressFind = json.store.find;
        let url = template(addressFind, {code: encodeURI("LYON")});
        console.log(url);

        let http = new Http();
        let htmlNotParsed = await http.get(url);

        // parse le html et récupère une liste de store proche qui est ensuite retourné
        let stores: Array<Store> = [];
        let $ = cheerio.load(htmlNotParsed);
        $('.store-search-results').find('.store-information').each(function(i, element) {
            let name = $(this).find('h4').text().replace( /\s/g, '');
            let id: number = $(this).find('a').next()['2']['attribs']['id'].replace( /^\D+/g, '');
            let phone = $(this).find('a')['2']['attribs']['href'].replace( /^\D+/g, '').replace( /\s/g, '');

            let store = new Store(id, phone, name);
            stores.push(store);
        });
        return stores;
    };

    public async getMenu(): Promise<Array<Pizza>> {
        let addressFind = json.store.menu;
        let url = template(addressFind, {code: encodeURI("LYON")});
        console.log(url);

        let http = new Http();
        let htmlNotParsed = await http.get(url);

        // parse le html et récupère une liste des pizzas commandables
        let pizzas: Array<Pizza> = [];
        let $ = cheerio.load(htmlNotParsed);
        $('.at-product-menu').find('.product-container').each(function(i, element) {
            console.log();
            let txt: string = $(this).find('.prod-info').text();
            let name: string = txt.replace( /\s\s/g, '').replace( /^\s/g, '').replace( /\s$/g, '');
            //Comment on récupère ce foutu prix ?!
            let price: number = 0;
            pizzas.push(new Pizza(name, price));
        });
        return pizzas;
    };
}

let app = new App({
    City: "Lyon",
    PostalCode: 69008,
    Region: "Rhône alpes",
    Street: "11 rue maryse bastie",
});

/*
app.searchNearestStore().then(tabNearestStore => {
    console.log("tabNearestStore : ", tabNearestStore);
}).catch((error) => {
    console.log("error searchNearestStore : ", error);
});
*/

app.getMenu().then(tabPizzas => {
    console.log("tabPizzas : ", tabPizzas);
}).catch((error) => {
    console.log("error getMenu : ", error);
});

// for test
App.run();
