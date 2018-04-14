import { Http } from './Http';

export class Util {
    constructor() {}

    //Quel type est renvoyé ? any temporaire
    public async initSession(): Promise<Map<string, any>> {
        let http: Http = new Http();
        let url: any = "https://commande.dominos.fr/eStore/fr/CustomerDetails/Delivery";
        let res: Map<string, any> = await http.getSession(url);
        return res;
    }

    /**
     * @description Parse a cookie header table into an object.
     * Where key is the cookie name, and value is the cookie value.
     * @author Gilles Grousset
     */
    public parseCookies(cookie): Map<string, any> {
        var result = new Map<string, any>();
        cookie.forEach(function(item) {
            var keyAndValue = item.split(';')[0].split('=');
            result[keyAndValue[0]] = keyAndValue[1];
        });

        return result;
    };

    public mergeCookies(...cookiePieces: Map<string, any>[]): Map<string, any> {
        let mergedCookie: Map<string, any> = new Map<string, any>();
        cookiePieces.forEach((cookies) => {
            Object.keys(cookies).forEach(function(key, index) {
                let value: string = cookies[key];
                mergedCookie[key] = value;
            });
        });
        return mergedCookie;
    }
}