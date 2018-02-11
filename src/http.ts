import http from "request"
import jsonReaderClass from './tools/jsonReader';

let json = jsonReaderClass('./conf/urls.json').data;

export class Http {

    get(url, callback): void {
        var requestBody = {
            uri: url,
            headers: {
                'Referer': json.referer
            }
        };
        http.get(requestBody, function (error, res, body) {
            if (error){  //If request errored out.
                console.log("Erreur ici");
                callback({
                    success: false,
                    message: error
                });
                return;
            }
            if (res.statusCode !== 200){  //If request didn't error but response isn't status code 200.
                callback({
                    success: false,
                    message: 'HTML Status Code Error ' + res.statusCode
                });
                return;
            }

            try {
                console.log(body);
                var parsed = JSON.parse(body);
            }
            catch(error){
                console.log("Erreur la");
                console.log(error);
                return callback({
                    success: false,
                    message: error
                });
            }

            return callback({
                success: true,
                result: parsed
            });
        });
    }
}