export class Store {
    //TODO: remettre en private après le test
    public id: number;
    private phone: string;
    private name: string;

    constructor(id, phone, name) {
        this.id = id;
        this.phone = phone;
        this.name = name;
    }
}