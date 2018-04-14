import { get, request } from "https";
import { Util } from "./Util";
import { URL } from 'url';
import { stringify } from 'querystring';
import { start } from 'repl';

export class Http {
    public async get(url: string, cookies?: Map<string, any>, ...headers: [string, number][]): Promise<any> {
        // console.log(JSON.stringify(cookies));
        // console.log(JSON.stringify(headers));
        const res = await this.toPromise(url, undefined, cookies, ...headers);
        return res;
    }

    public async postGetCookie(url: string, data?: any, cookies?: Map<string, any>, ...headers: [string, number][]): Promise<any> {
        let meth: String = "POST";
        let postData: string = stringify(data);
        //console.log(postData);

        let urlObj: URL = new URL(url);
        const options: { [key: string]: any} =
            {
                headers: { 
                    Cookie: "", 
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Length': Buffer.byteLength(postData)
                },
                hostname:   urlObj.hostname,
                method:     meth,
                path:       urlObj.pathname + urlObj.search,
                port:       urlObj.port
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
            let post_req: any = request(options, (res) => {
                res.setEncoding('utf8');
                const { statusCode, headers } = res;
                let util: Util = new Util();
                let cookie: Map<string, any> = util.parseCookies(res.headers['set-cookie']!);
                resolve(cookie);
            });
            post_req.write(postData);
            post_req.end();
        });
    }

    public async postJSON(url: string, json?: any, cookies?: Map<string, any>, ...headers: [string, number][]) {
        let meth: String = "POST";

        let urlObj: URL = new URL(url);
        json = JSON.stringify(json);
        console.log(JSON.stringify(json));

        const options: { [key: string]: any} =
            {
                headers: { 
                    Cookie: "", 
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Length': Buffer.byteLength(json)
                },
                hostname:   urlObj.hostname,
                method:     meth,
                path:       urlObj.pathname + urlObj.search,
                port:       urlObj.port
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
            let post_req: any = request(options, (res) => {
                res.setEncoding('utf8');
                const { statusCode, headers } = res;
                console.log("[HTTP][PostJSON] StatusCode : " + statusCode);
                let util: Util = new Util();
            });
            post_req.write(json);
            post_req.end();
        });
    }

    public async getSession(url: string, cookies?: Map<string, any>, ...headers: [string, number][]): Promise<any> {
        let urlObj: URL = new URL(url);
        const options: { [key: string]: any} =
            {
                headers: { 'Cookie': "" },
                hostname:   urlObj.hostname,
                path:       urlObj.pathname + urlObj.search,
                port:       urlObj.port,
            };
        return new Promise((resolve, reject) => {
            get(options, (res) => {
                const { statusCode, headers } = res;

                // deal with error request
                if (statusCode !== 200) {
                    res.resume();
                    return reject(`Request error ` + statusCode + ` ${res}`);
                }

                let util: Util = new Util();
                res.setEncoding('utf8');
                console.log(res.headers['set-cookie']!);
                let cookie: Map<string, any> = util.parseCookies(res.headers['set-cookie']!);
                resolve(cookie);
            });
        });
    }

    public async post(url: string, data?: any, cookies?: Map<string, any>, ...headers: [string, number][]): Promise<any> {
        //const res = await this.toPromise(url, data, cookies, ...headers);
        let meth: String = "POST";
        let form: any = {};
        if(data != undefined){
            form = data;
        }
        
        let urlObj: URL = new URL(url);
        const options: { [key: string]: any} =
            {
                headers: { Cookie: "" },
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
        
        let post_req: any = request(options, (response) => {});
        console.log(form);
        post_req.write(form);
        post_req.end();
        //return res;
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
        let urlObj: URL = new URL(url);

        const options: { [key: string]: any} =
            {
                headers: { 'Cookie': ""},
                hostname:   urlObj.hostname,
                path:       urlObj.pathname + urlObj.search,
                port:       urlObj.port
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