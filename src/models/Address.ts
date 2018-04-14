import {STATE_MAPPING} from "./StateMapping";
import { Http } from '../tools/Http';
import * as json from '../conf/urls.json';
import * as compile from 'es6-template-strings/compile';
import * as resolveToString from 'es6-template-strings/resolve-to-string';
import * as template from 'es6-template-strings';

export class Address {

    /**
     * construct Address object from json
     * private Address: {
     *      StreetNo: null,
     *      StreetName: '288 COURS EMILE ZOLA',
     *      PostalCode: '69100',
     *      State: 'FR',
     *      FullAddress: null
     *      Suburb: 'VILLEURBANNE',
     *
     *      UnitNo: null,
     * },
     * @param json
     * @returns {Address}
     */
    public static fromJson(json: any): Address {
        let created = new Address(json.StreetNo, json.PostalCode, json.StreetName, json.Suburb);
        created.state = STATE_MAPPING[json.State];
        return created;
    }


    /**
     * FullName default format : 27 RUE PASTEUR, 14390 CABOURG, FRANCE
     *
     */
    constructor(
        public streetNum: number,
        public codePostal: number,
        public streetName: string,
        public department?: string,
        public suburb?: string,
        public state?: string,
        public fullAddress: string = `${streetNum} ${streetName}, ${codePostal} ${department}, FRANCE`
    ) {}

    /**
     * used format in the cookie
     * {}
     */
    public toCookieHeadersFormat(): Map<string, any> {
        let r: Map<string, any> = new Map<string, any>();
        r["CV-URL"] = "/eStore/fr/CustomerDetails/SpecifyDeliveryAddress?streetNo=" + this.streetNum 
        + "&street=" + this.streetName + "&suburb=" + this.suburb + "&state=fr&postcode=" 
        + this.codePostal + "&addressSearchString=" + this.streetNum + " " + this.codePostal;
        return r;
    }

    /**
     * @returns : true if OK, false if the address is not in the delivery area
     * @param num
     * @param street
     * @param codePostal
     * @param department
     * @param state
     */
    public async canDeliver(cookie: Map<string, any>): Promise<boolean> {
        let http: Http = new Http();
        let url: string = json.order.addressConfirm;

        url = url.replace('${code}', encodeURI(String(this.codePostal)))
                .replace('${street}', encodeURI(this.streetName));

        let res: any = await http.get(url, cookie);
        let found: boolean = false;
        if(res.length > 0){
            for(let i of res){
                if(this.streetName.toUpperCase() == i["Name"] && this.codePostal == Number(i["PostCode"])){
                    this.streetName = i["Name"];
                    this.suburb = i["Suburb"];
                    found = true;
                    break;
                }
            }
        }
        return found;
    };

    public async setDeliveryAdress(cookie: Map<string, any>): Promise<Map<string, any>> {
        let http: Http = new Http();
        let url: string = json.order.setAddress;
        
        let j: any = {
            'Customer.PostCode' :              String(this.codePostal),
            'Customer.State' :         	       "FR",
            'Customer.Street' :                String(this.streetName),
            'Customer.StreetNo' :              String(this.streetNum),
            'Customer.StreetSearchString' :    String(this.streetName),
            'Customer.Suburb' :                this.suburb,
            'Customer.SuburbSearchString' :    String(this.codePostal) + " " + String(this.suburb)
        };
        let res: any = await http.postGetCookie(url, j, cookie);
        console.log("SET DELIVERY ADDRESS");
        console.log(res);
        return res;
    }
}
/*
//PARAM POST pour https://commande.dominos.fr/eStore/fr/Checkout/Submit
Customer.AcceptedTsAndCs	{…}
    0	true
    1	false
Customer.DeliveryInstructions	
Customer.DontWantToReciveOffers	true
Customer.Email	fake@mail.com
Customer.Name	BLABLA
Customer.Phone	0987654321
Customer.State	FR
*/