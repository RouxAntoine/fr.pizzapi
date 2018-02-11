import * as json from '../conf/urls.json';
import http from "request";

export class Http {

    public get(url, callback): void {
        let requestBody = {
            headers: {
                'Referer': json.referer,
            },
            uri: url,
        };
        http.get(requestBody, function (error, res, body) {
            if (error) {  // If request errored out.
                console.log("Erreur ici");
                callback({
                    message: error,
                    success: false,
                });
                return;
            }
            if (res.statusCode !== 200){  // If request didn't error but response isn't status code 200.
                callback({
                    message: 'HTML Status Code Error ' + res.statusCode,
                    success: false,
                });
                return;
            }

            try {
                console.log(body);
                var parsed = JSON.parse(body);
            } catch (error) {
                console.log("Erreur la");
                console.log(error);
                return callback({
                    message: error,
                    success: false,
                });
            }

            return callback({
                success: true,
                result: parsed
            });
        });
    }
}