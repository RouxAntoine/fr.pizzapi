export class Address {
    private code: number;
    private number: number;
    private street: string;

    constructor(code, number, street) {
        this.code = code;
        this.number = number;
        this.street = street;
    }

    getLine(): void {
        //TODO: return a well formated address
    }
}