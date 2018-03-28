import {Address} from "./Address";
import {GeoLocation} from "./GeoLocation";

export interface IStore {
    readonly storeNum: number;
    readonly phone: string;
    readonly name: string;
    countryCode: string;
    orderingType: string[];
    fullName: string;
    message: string;
    description: string;
    address: Address;
    location: GeoLocation;

    toCookieHeadersFormat(): any;
    onlineOrdering(): boolean;
}

export class Store implements IStore {

    public static fromJson(json: any): IStore {
        let created: Store = new Store(json.StoreNo, json.PhoneNo, json.Name);

        for(let key in json.OrderingMethods) {
            let value = json.OrderingMethods[key];
            if (value === true) {
                created.orderingType.push(key);
            }
        }

        created.countryCode = (json.CountryCode !== null)? json.CountryCode: "FR";
        created.fullName = json.FullName;
        created.message = json.StoreMessage;
        created.description = json.Description;
        created.address = Address.fromJson(json.Address);
        created.location = new GeoLocation(json.GeoCoordinates.Latitude, json.GeoCoordinates.Longitude);
        return created;
    }

    public countryCode: string;
    public orderingType: string[] = [];
    public fullName: string;
    public message: string;
    public description: string;
    public address: Address;
    public location: GeoLocation;

    // not implement for the moment

    // private ServiceMethods: { Pickup: true, Delivery: true, DineIn: false, Message: null };
    // private OpeningHours: null;
    // private Closures: null;
    // private OrderTracking: null;
    // private PickupLeadTime: 0;
    // private DeliveryLeadTime: 0;
    // private PriceInfo: null;
    // private RegionCode: null;
    // private PulseConfig: null;

    constructor(
        public readonly storeNum: number,
        public readonly phone: string,
        public readonly name: string) {}

    /**
     * format utilisé dans le cookie 'preferredStore'
     * {"countryCode":"FR","storeNo":31740,"name":"LYON 8 - LUMIÈRE MONPLAISIR","state":"FR","onlineOrdering":true,"postalcode":69008}
     */
    public toCookieHeadersFormat(): any {
        return {
            countryCode: this.countryCode,
            name: this.name,
            onlineOrdering: this.onlineOrdering(),
            postalcode: this.address.codePostal,
            state: this.address.state,
            storeNo: this.storeNum,
        };
    }

    public onlineOrdering(): boolean {
        if (this.orderingType.map((v) => v.toLowerCase()).includes("online")) {
            return true;
        }
        return false;
    }
}
