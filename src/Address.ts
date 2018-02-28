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
        public suburb?: string,
        public state?: string,
        public fullAddress: string = `${streetNum} ${streetName}, ${codePostal} ${department}, FRANCE`
    ) {}

    /**
     * used format in the cookie
     * {}
     */
    public toCookieHeadersFormat(): any {
        // La où ça craint, c'est que quelque soit l'adresse donnée en streetName (existante ou non)
        // La requête retournera toujours 302.
        let url: String = "/eStore/fr/CustomerDetails/SpecifyDeliveryAddress?streetNo=" + this.streetNum 
                        + "&street=" + this.streetName + "&suburb=" + this.suburb + "&state=fr&postcode=" 
                        + this.codePostal + "&addressSearchString=" + this.streetNum + " " + this.codePostal;
        return url;
    }

    /**
     * @returns : true if OK, false if the address is not in the delivery area
     * @param num
     * @param street
     * @param codePostal
     * @param department
     * @param state
     */
    public async canDeliver(): Promise<boolean> {
        let http: Http = new Http();
        let url: string = json.order.addressConfirm;

        url = url.replace('${code}', encodeURI(String(this.codePostal)))
                .replace('${street}', encodeURI(this.streetName));

        let res: any = await http.get(url);
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

    public async setDeliveryAdress(cookie: Map<string, any>){
        let http: Http = new Http();
        let url: string = json.order.setAddress;
        console.log(url);
        
        let j: any = {Customer: {
            PostCode :              String(this.codePostal),
            State :         	    "FR",
            Street :                String(this.streetName),
            StreetNo :              String(this.streetNum),
            StreetSearchString :    String(this.streetName),
            Suburb :                String(this.suburb),
            SuburbSearchString :    String(this.codePostal) + " " + String(this.suburb)
        }};

        let res: any = await http.post(url, j, cookie);
        console.log(cookie);
    }
}

/*

//COOKIE AJOUTER PIZZA AU PANIER

_bps	Consideration
_ga	GA1.3.1974969109.1519669002
_gid	GA1.3.768203501.1519669002
_hjIncludedInSample	1
_vis_opt_exp_133_combi	3
_vis_opt_exp_178_exclude	1
_vis_opt_exp_188_exclude	1
_vis_opt_exp_189_combi	2
_vis_opt_exp_206_exclude	1
_vis_opt_exp_208_exclude	1
_vis_opt_exp_250_exclude	1
_vis_opt_exp_284_exclude	1
_vis_opt_exp_74_combi	3
_vis_opt_exp_96_combi	2
_vis_opt_exp_96_goal_1	1
_vis_opt_s	1|
_vis_opt_test_cookie	1
_vwo_ds	3:a_0,t_0$1519669000:67.80352332:::100_0,99_0,98_0
_vwo_uuid	D6AA30B998AD1768CE4A9CB1509AA829E
_vwo_uuid_v2	D6AA30B998AD1768CE4A9CB1509AA829E|94bb058361976301c1c474e88a30319b
_y1sp_id.638f	d5486a80-4626-4d92-ac9b-e70b262df89d.1519669007.9.1519838366.1519765655.d5d09909-8dc0-4f13-b52f-04f76381f5e0
_y1sp_ses.638f	*
ASP.NET_SessionId	cocx2k2pee2wbblgvmy5ezmp
CV-StorId	32025
CV-StorName	Valence
CV-URL	/eStore/fr/CustomerDetails/SpecifyDeliveryAddress?streetNo=39&street=AVENUE MACHIN&suburb=MYCITY&state=fr&postcode=MYPOSTCODE&addressSearchString=39 MYPOSTCODE
dl_ca	60:3/30:2
dl_cda	21:1/16:1
ry_ry-fx33aenn_realytics	eyJpZCI6InJ5Xzg4N0YyQjZGLUE0RkMtNERBQy04NjZELTFENUZCOTFDMTNFMCIsImNpZCI6bnVsbCwiZXhwIjoxNTUxMjA1MDAxNzU2fQ==
ry_ry-fx33aenn_so_realytics	eyJpZCI6InJ5Xzg4N0YyQjZGLUE0RkMtNERBQy04NjZELTFENUZCOTFDMTNFMCIsImNpZCI6bnVsbCwib3JpZ2luIjp0cnVlLCJyZWYiOm51bGwsImNvbnQiOm51bGx9
yieldify_delay	1
yieldify_fb	EUR16
yieldify_frequency_138620	1
yieldify_isale	138620.1519669339659
yieldify_iv	1
yieldify_location	%7B%22country%22%3A%22France%22%2C%22region%22%3A%22Auvergne-Rhone-Alpes%7CDr%C3%B4me%22%2C%22city%22%3A%22Valence%22%7D
yieldify_sale_ts	1519669007087
yieldify_sale_uuid	1519727271668-138620-487943065-4578263514552948
yieldify_st	1
yieldify_stc	1
yieldify_ujt	16166
yieldify_visit	1


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