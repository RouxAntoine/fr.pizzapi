export class Store {
    private id: number;
    private phone: string;
    private name: string;

    constructor(id, phone, name) {
        this.id = id;
        this.phone = phone;
        this.name = name;
    }

    /**
     * format utilisé dans le cookie 'preferredStore'
     * {"countryCode":"FR","storeNo":31740,"name":"LYON 8 - LUMIÈRE MONPLAISIR","state":"FR","onlineOrdering":true,"postalcode":69008}
     */
    public toCookieHeaders() {
        return {
            // countryCode: this.CountryCode,
            name: this.name,
            // onlineOrdering: this.OrderingMethods.Online,
            // postalcode: this.Address.PostalCode,
            // state: this.Address.State,
            // storeNo: this.StoreNo,
        };
    }
}
