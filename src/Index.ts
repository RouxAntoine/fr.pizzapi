import { Http } from './tools/Http';
import {IStore, Store} from './models/Store';
import { Pizza } from './models/Pizza';
import { Address } from './models/Address';
import { Util } from './tools/Util';
import { Cart } from './models/Cart';

import * as cheerio from 'cheerio';
import 'source-map-support/register';                    // permet le support dees source map avec node js
import * as compile from 'es6-template-strings/compile';
import * as resolveToString from 'es6-template-strings/resolve-to-string';
import * as template from 'es6-template-strings';
import * as json from './conf/urls.json';
//import { Address } from 'cluster'; // je suspecte une erreur sur cette ligne


export class App {
    public static run(): void {
        // this.api
        console.log("hello world !!!")
    }

    private home: object;

    constructor(home: object) {
        this.home = home;
    }

    /**
     * @param : code postal / ville dans laquelle chercher des magasins
     * @returns : liste de magasins dans la commune / ville
     */
    public async searchNearestStore(postalCode: string): Promise<Array<IStore>> {
        let addressFind = json.store.find;
        let url = template(addressFind, {code: encodeURI(postalCode)});
        console.log(url);

        let http: Http = new Http();
        let storesAsJson: any = await http.get(url);

        // parse le html et récupère une liste de store proche qui est ensuite retourné
        let stores: Array<IStore> = [];
        storesAsJson.Data.forEach(storeAsJson => {
            let store = Store.fromJson(storeAsJson);
            stores.push(store);
        });
        return stores;
    };


    /**
     * @returns : liste de pizzas achetables en magasin
     * Le prix n'est récupéré que si un store est envoyé en cookie (paramètre)
     */
    public async getMenu(store?: Store): Promise<Array<Pizza>> {
        let cookies: Map<string, any> = new Map();
        if (store !== undefined) {
            cookies["preferredStore"] = store.toCookieHeadersFormat();
        }

        let http = new Http();
        let htmlNotParsed = await http.get(json.store.menu, cookies);

        // parse le html et récupère une liste des pizzas commandables
        let pizzas: Array<Pizza> = [];
        let $ = cheerio.load(htmlNotParsed);
        $('.at-product-menu').find('.product-container').each(function(i, element) {
            let $info: any = $(element).find('.prod-info');

            let name = $info.find('.menu-entry').text().trim();
            let productPrize: string = $info.find('.product-price').text().trim();

            let arrayPrice:string[] = (productPrize.match(/([0-9]*,[0-9]*)/g) || []).map(p => p.replace(',', '.'));

            pizzas.push(new Pizza(name, Number(arrayPrice[1]), Number(arrayPrice[0]) ) );
        });
        return pizzas;
    };

    /**
     * @param : numéro de rue, nom de la rue, code postal
     * @returns : true si OK, false si l'adresse n'est pas dans la zone de livraison
     */
    public async setDeliveryAddress(num: number, street: string, postalCode: number, suburb: string, store: Store, cookie: Map<string, any>): Promise<boolean> {
        let myAddress: Address = new Address(num, postalCode, street);
        return myAddress.canDeliver(cookie).then(result => {
            let b: boolean = false;
            if(result){
                myAddress.setDeliveryAdress(cookie);
                b = true;
            }
            return b;
        })
    };

    public async fillCart(cookie: any): Promise<boolean> {
        let cart: Cart = new Cart();
        cart.addItem(cookie);
        return true;
    }
    /**
     * @param : id du magasin
     * @returns : json des infos du magasin
     */
    public async getStoreInfo(id: number): Promise<string> {
        //TODO: Enregistre et vérifie l'adresse de l'utilisateur, indique si Dominos peut livrer ici
        return "";
    };

    /**
     * @description : valide la commande
     * @param : id du magasin
     * @returns : json des infos du magasin
     */
    public async order(pizzas: Array<Pizza>): Promise<string> {
        //TODO: Enregistre et vérifie l'adresse de l'utilisateur, indique si Dominos peut livrer ici
        return "";
    };
}

let app = new App({
    City: "Lyon",
    PostalCode: 69008,
    Region: "Rhône alpes",
    Street: "11 rue maryse bastie",
});


let util: Util = new Util();
util.initSession().then(cookie =>{
    app.searchNearestStore("LYON").then(tabNearestStore => {
        
        let lyon8 = tabNearestStore.filter((store: IStore) => { return store.storeNum === 31978})[0];
       
        /*
        app.getMenu(lyon8).then(tabPizzas => {
            console.log("tabPizzas : ", tabPizzas);
        }).catch((error) => {
            console.log("error getMenu : ", error);
        });
        */
        
        app.setDeliveryAddress(38, "AVENUE GEORGES POMPIDOU", 69003, "LYON", lyon8, cookie).then(result => {
            app.fillCart(cookie).then(tabNearestStore => {
                console.log("add pizza");
            }).catch((error) => {
                console.log("error fillCart : ", error);
            });
        }).catch((error) => {
            console.log("error setDelivery : ", error);
        });
    
    }).catch((error) => {
        console.log("error searchNearestStore : ", error);
    });
}).catch((error) =>{

});



// for test
App.run();

/*

POST - https://commande.dominos.fr/eStore/fr/Checkout/Submit

Customer.AcceptedTsAndCs	false
Customer.DeliveryInstructions	ATTENTION+:+Ceci+est+une+erreur+de+commande,+ne+pas+livrer+svp
Customer.DontWantToReciveOffers	true
Customer.Email	me@fakemail.fr
Customer.Name	AAAA
Customer.Phone	090876543
Customer.State	FR

*/