import { Http } from './tools/Http';
import * as json from './conf/urls.json';
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
                                componentCode: "Sauce.CFRAI",
                                quantity: 1
                            }
                        ],
                        toppings: [
                            {
                                componentCode: "Topping.BACON",
                                quantity: 1
                            },
                            {
                                componentCode: "Topping.MOZZA",
                                quantity: 1
                            }
                        ]
                    }
                ],
                productCode:        "PBCG",
                productSizeCode:    "Pizza.Medium",
                quantity:           1
            },
            secondaryProduct: null
        };

        let url: string = json.order.addToCart;
        url = url.replace('${timestamp}', encodeURI(String(1522182412178)))
        let http: Http = new Http();
        let res: any = await http.post(url, item, cookie);
    }
}