import {STATE_MAPPING} from "./StateMapping";

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
        public department: string,
        public state?: string,
        public fullAddress: string = `${streetNum} ${streetName}, ${codePostal} ${department}, FRANCE`
    ) {}

    /**
     * @returns : true si OK, false si l'adresse n'est pas dans la zone de livraison
     * @param num
     * @param street
     * @param postalCode
     * @param department
     * @param state
     */
    public async setDeliveryAddress(num: number, street: string, postalCode: number, department: string, state?: string): Promise<boolean> {
        //TODO: Enregistre et vérifie l'adresse de l'utilisateur, indique si Dominos peut livrer ici
        return false;
    };
}