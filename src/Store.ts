export class Store {
    //TODO: remettre en private après le test
    public id: number;
    private phone: string;
    private street: string;
    private name: string;

    constructor(id, phone, street, name) {
        this.id = id;
        this.phone = phone;
        this.street = street;
        this.name = name;
    }
}