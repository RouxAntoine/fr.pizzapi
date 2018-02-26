import {STATE_MAPPING} from "./StateMapping";
import { Http } from './tools/Http';
import * as json from './conf/urls.json';
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
    static fromJson(json: any): Address {
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
        public state?: string,
        public fullAddress: string = `${streetNum} ${streetName}, ${codePostal} ${department}, FRANCE`
    ) {}

    /**
     * @returns : true si OK, false si l'adresse n'est pas dans la zone de livraison
     * @param num
     * @param street
     * @param codePostal
     * @param department
     * @param state
     */
    public async canDeliver(cookie: Map<string, any>): Promise<boolean> {
        //TODO: Enregistre et vérifie l'adresse de l'utilisateur, indique si Dominos peut livrer ici
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
                    found = true;
                    break;
                }
            }
        }
        return found;
    };
}