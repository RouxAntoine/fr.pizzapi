import {STATE_MAPPING} from "./StateMapping";
import { Http } from '../tools/Http';
import * as json from '../conf/urls.json';
import * as compile from 'es6-template-strings/compile';
import * as resolveToString from 'es6-template-strings/resolve-to-string';
import * as template from 'es6-template-strings';

export class Customer { 

    constructor(
        public email: string,
        public name: string,
        public phone: string,
        public state?: string
    ) {}

    public getObject(): Object {        
        return {
            'Customer.Email' : this.email,
            'Customer.Name'  : this.name,
            'Customer.Phone' : this.phone,
            'Customer.State' : "FR"
        };
    }
}