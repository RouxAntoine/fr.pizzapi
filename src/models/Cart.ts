import { Http } from '../tools/Http';
import * as json from '../conf/urls.json';
import * as compile from 'es6-template-strings/compile';
import * as resolveToString from 'es6-template-strings/resolve-to-string';
import * as template from 'es6-template-strings';

export class Cart {

    constructor(
    ) {}

    /**
     * @description add an item (pizza, dessert or drink) to the cart
     */
    public async addItem(cookie: any){
        let item: any = {
            primaryProduct: {
                crusts:     [
                    {
                        componentCode: "Crust.T", 
                        quantity: 1
                    }
                ],
                Portions:   [
                    {
                        options:        {},
                        productCode:    null,
                        Sauces: [
                            {
                                componentCode: "Sauce.TOMSC",
                                quantity: 1
                            }
                        ],
                        toppings: [
                            {
                                componentCode: "Topping.CHEVR",
                                quantity: 1
                            },
                            {
                                componentCode: "Topping.EMMEN",
                                quantity: 1
                            },
                            {
                                componentCode: "Topping.FOURM",
                                quantity: 1
                            },
                            {
                                componentCode: "Topping.MOZZA",
                                quantity: 1
                            }
                        ]
                    }
                ],
                productCode:        "PCAS",
                productSizeCode:    "Pizza.Medium",
                quantity:           1
            },
            secondaryProduct: null
        };

        let url: string = json.order.addToCart;
        //+7200 is used to compensate a 2 hours gap between the Date and the real hour (UTC+2)
        url = url.replace('${timestamp}', encodeURI(String(Math.round((new Date().getTime() / 1000) + 7200))));
        let http: Http = new Http();
        await http.postJSON(url, item, cookie);
    }
}
