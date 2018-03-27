import { get } from "https";
import {URL} from 'url';

export class Http {
    public async get(url: string, cookies?: Map<string, any>, ...headers: [string, number][]): Promise<any> {
        // console.log(JSON.stringify(cookies));
        // console.log(JSON.stringify(headers));
        const res = await this.toPromise(url, undefined, cookies, ...headers);
        return res;
    }

    public async post(url: string, data?: any, cookies?: Map<string, any>, ...headers: [string, number][]): Promise<any> {
        const res = await this.toPromise(url, data, cookies, ...headers);
        return res;
    }

    /**
     * convert callback function to Promise
     * // TODO: make this more generic by passing function and argument in parameter of this method
     *
     * @param {string} url
     * @param {object} cookies
     * @param {[string , number]} headers
     * @returns {Promise<any>}
     */
    private toPromise(url: string, data?: any, cookies?: Map<string, any>, ...headers: [string, number][]): Promise<any> {
        let meth: String = "GET";
        let form: any = {};
        if(data != undefined){
            meth = "POST";
            form = data;
        }
        
        let urlObj: URL = new URL(url);

        const options: { [key: string]: any} =
            {
                headers: { "Cookie": "" },
                hostname:   urlObj.hostname,
                method:     meth,
                path:       urlObj.pathname + urlObj.search,
                port:       urlObj.port,
                formData:   form
            };

        if(headers !== undefined) {
            headers.forEach((value, index) => {
                options.headers[index] = value;
            });
        }

        if (cookies !== undefined) {
            Object.keys(cookies).forEach(function(key, index) {
                let value:any = cookies[key];
                if(typeof value === "object") {
                    value = JSON.stringify(value);
                }
                else {
                    value = value.toString();
                }
                options.headers.Cookie += `${key}=${encodeURI(value)}`;

                if (index !== Object.keys(cookies).length) {
                    options.headers.Cookie += ";";
                }
            });
        }
        
        return new Promise((resolve, reject) => {
            get(options, (res) => {
                const { statusCode, headers } = res;

                // Domino's website return 302 to accept a POST request without any other return
                if(data != undefined && (statusCode === 302)){
                    if(statusCode === 302){
                        console.log("code 302");
                    }
                    return resolve(true);
                }
                
                // deal with error request
                if (statusCode !== 200) {
                    res.resume();
                    return reject(`Request error ` + statusCode + ` ${res}`);
                }

                res.setEncoding('utf8');
                let rawData = '';
                res.on('data', (chunk) => { rawData += chunk; });

                return resolve(new Promise<string>((resolve2, reject2) => {
                    res.on('end', () => {
                        let resContent:any = rawData;
                        let contentType:any = headers['content-type'] || [];

                        if (contentType.includes("application/json")) {
                            resContent = JSON.parse(rawData);
                        }
                        return resolve2(resContent);
                    });
                }));

            });

        });
    }


}