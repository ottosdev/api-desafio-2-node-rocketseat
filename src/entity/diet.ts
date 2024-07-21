export class Diet {
    id?: string;
    name: string;
    description: string;
    is_ok: boolean;
    date: number;
    user_id: string;

    constructor(name: string, description: string, is_ok: boolean, date: number, user_id: string) {
        this.name = name;
        this.description = description;
        this.is_ok = is_ok;
        this.date = date;
        this.user_id = user_id;
    }
}