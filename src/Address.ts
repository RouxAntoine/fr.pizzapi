export class Address {
    private code: number;
    private num: string;
    private street: string;

    constructor(num: string, code: number, street: string) {
        this.num = num;
        this.code = code;
        this.street = street;
    }

    /**
     * @param : numéro de rue, nom de la rue, code postal
     * @returns : true si OK, false si l'adresse n'est pas dans la zone de livraison
     */
    public async setDeliveryAddress(num: number, street: string, postalCode: number): Promise<boolean> {
        //TODO: Enregistre et vérifie l'adresse de l'utilisateur, indique si Dominos peut livrer ici
        return false;
    };
}