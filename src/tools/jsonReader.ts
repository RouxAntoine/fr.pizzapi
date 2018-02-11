import * as fs from 'fs';
import * as path from 'path';
import { exists } from 'fs';

/**
 * default timeout value 5 sec
 */
export default (filePath: string, timeout:number = 5) => new jsonReader(filePath, timeout);

class jsonReader {
    private _data: string;
    private timeout: number;
    // in millisecond
    private start: number;

    /**
     * constructor take surrender timeout
     * @param timeout timeout value for read failure
     */
    constructor(filePath: string, timeout: number) {
        this.timeout = timeout;
        let absFileName: string = path.join(__dirname, filePath);
        this.read(absFileName);
    }

    /**
     * call this to read data again
     */
    public read(absFileName: string) {
        this.start = new Date().getTime();
        fs.readFile(absFileName,'utf8', (err, data) => this._data = data);
    }

    /**
     * call this to get data previously read
     * wait timeout or break
     */
    get data(): any {
        while(new Date().getTime() <= this.start + (this.timeout * 1000)) {
            if(this._data !== undefined) {
                break;
            }
        }

        return (this._data === undefined)? {"error": `timeout ${this.timeout} exceed`} : JSON.parse(this._data);
    }
}