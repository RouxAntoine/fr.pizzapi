import { get } from "https";
import {URL} from 'url';


export class Http {
    public async get(url: string, cookies?: Map<string, any>, ...headers: [string, number][]): Promise<any> {
        // console.log(JSON.stringify(cookies));
        // console.log(JSON.stringify(headers));

        const res = await this.getToPromise(url, cookies, ...headers);
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
    private getToPromise(url: string, cookies?: Map<string, any>, ...headers: [string, number][]): Promise<any> {
        let urlObj: URL = new URL(url);

        const options: { [key: string]: any} =
            {
                headers: { Cookie: "" },
                hostname: urlObj.hostname,
                method: 'GET',
                path: urlObj.pathname,
                port: urlObj.port,
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

                // deal with error request
                if (statusCode !== 200) {
                    res.resume();
                    return reject(`Request error ${res}`);
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
