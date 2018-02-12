export class Store {
    private id: number;
    private phone: string;
    private name: string;

    constructor(id, phone, name) {
        this.id = id;
        this.phone = phone;
        this.name = name;
    }
}