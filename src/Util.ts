import { Http } from './tools/Http';

export class Util {
    constructor() {}

    //Quel type est renvoyé ? any temporaire
    public static async initSession(): Promise<any> {
        let http: Http = new Http();
        let url: string = "https://commande.dominos.fr/eStore/fr/CustomerDetails/Delivery";
        let res: any = await http.getSession(url);
        return res;
    }
}