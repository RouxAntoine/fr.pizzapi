import * as json from '../conf/urls.json';
import { get } from "https";

export class Http {
    public async get(url): Promise<string> {
        const res = await this.getToPromise(url);
        return res;
    }

    private getToPromise(url: string): Promise<any> {
        return new Promise((resolve, reject) => {

            get(url, (res) => {
                const { statusCode } = res;

                if (statusCode !== 200) {
                    res.resume();
                    return reject(`Request error ${res}`);
                } else {
                    res.setEncoding('utf8');
                    let rawData = '';
                    res.on('data', (chunk) => { rawData += chunk; });

                    return new Promise<string>((resolve2, reject2) => {
                        res.on('end', () => {
                            //console.log(rawData);

                            return resolve2(rawData);
                        });
                    });
                }
            });

        });
    }


}
