import http from "request";
//import jsonReaderClass from './jsonReader';

//let json = jsonReaderClass('./conf/urls.json').data;

export class Http {

    public get(url, callback): void {
        let requestBody = {
            headers: {
                'Referer': "",
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

            return callback({
                success: true,
                result: body
            });
        });
    }
}