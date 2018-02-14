import * as json from '../conf/urls.json';
import { get } from "https";


export class Http {
    public async get(url: string, cookies?: object): Promise<string> {
        const res = await this.getToPromise(url, cookies);
        return res;
    }

    private getToPromise(url: string, cookies?: object): Promise<any> {
        let urlObj: URL = new URL(url);

        const options: {[key: string]: any} = {
            headers: { Cookie: "" },
            hostname: urlObj.hostname,
            method: 'GET',
            path: urlObj.pathname,
            port: urlObj.port,
        };

        if (cookies !== undefined) {
            Object.keys(cookies).forEach(function(key, index) {
                options.headers.Cookie += encodeURI(cookies[key]);
                if (index !== Object.keys(cookies).length) {
                    options.headers.Cookie += ":";
                }
            });
        }

        return new Promise((resolve, reject) => {
            get(options, (res) => {
                const { statusCode } = res;

                if (statusCode !== 200) {
                    res.resume();
                    return reject(`Request error ${res}`);
                } else {
                    res.setEncoding('utf8');
                    let rawData = '';
                    res.on('data', (chunk) => { rawData += chunk; });

                    return resolve(new Promise<string>((resolve2, reject2) => {
                        res.on('end', () => {
                            return resolve2(rawData);
                        });
                    }));
                }
            });

        });
    }


}
