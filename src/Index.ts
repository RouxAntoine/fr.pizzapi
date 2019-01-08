import { Http } from './tools/Http';
import {IStore, Store} from './models/Store';
import { Pizza } from './models/Pizza';
import { Address } from './models/Address';
import { Util } from './tools/Util';
import { Cart } from './models/Cart';
import { Customer } from './models/Customer';

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
        //console.log("hello world !!!")
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
    public async setDeliveryAddress(num: number, street: string, postalCode: number, suburb: string, store: Store, cookie: Map<string, any>): Promise<Map<string, any>> {
        let myAddress: Address = new Address(num, postalCode, street);
        return myAddress.canDeliver(cookie).then(result => {
            let newCookie: Map<string, any> = new Map<string, any>();
            if(result){
                let util: Util = new Util();
                let cookStore: Map<string, any> = store.toCookieHeadersFormat();
                let cookAddress: Map<string, any> = myAddress.toCookieHeadersFormat();
                let cookies : Map<string, any> = util.mergeCookies(cookie, cookStore, cookAddress);
                myAddress.setDeliveryAdress(cookies);
                newCookie = cookies;
            }
            return newCookie;
        })
    };

    public async fillCart(pizzas: Array<Pizza>, cookie: any): Promise<boolean> {
        let cart: Cart = new Cart();
        cart.addItem(cookie);
        cart.addItem(cookie);
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
     * @param : informations du client, cookie du client
     */
    public async order(customer: Customer, cookie: Map<string, any>, commentary: string) {
        let http: Http = new Http();
        let url: string = json.order.validate;

        //BUG: Il manque les données du magasin dans le cookie !
        let custObject: Object = customer.getObject();
        custObject["Customer.AcceptedTsAndCs"] = '{0: true, 1: false}';
        custObject["Customer.DeliveryInstructions"] = commentary;
        console.log("ORDER");
        console.log(await http.postGetCookie(url, custObject, cookie));
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
    app.searchNearestStore("69003 LYON").then(tabNearestStore => {
        
        //let lyon8 = tabNearestStore.filter((store: IStore) => { return store.storeNum === 31978})[0];
        let first = tabNearestStore[0];        

        app.setDeliveryAddress(38, "AVENUE GEORGES POMPIDOU", 69003, "LYON", first, cookie).then(transformedCookie => {
            
            app.getMenu(first).then(tabPizzas => {
                //console.log("tabPizzas : ", tabPizzas);
                //BUG: il arrive que la requête retourne 302 au lieu de 200
                //BUG: ne prend pas en compte les pizza en param pour ajouter un item au panier
                app.fillCart(tabPizzas, transformedCookie).then(tabNearestStore => {
                    //BUG: customer hardcodé
                    let customer: Customer = new Customer("jean@jeanjean.fr", "jean", "0665769865");
                    app.order(customer, transformedCookie, "NE PAS LIVRER SVP");
                }).catch((error) => {
                    console.log("error fillCart : ", error);
                });
            }).catch((error) => {
                console.log("error getMenu : ", error);
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