export class User {
    id?: string;
    nome: string;
    email: string;
    idade: number;
    session_id: string;

    constructor(nome: string, email: string, idade: number, session_id: string) {
        this.nome = nome;
        this.email = email;
        this.idade = idade;
        this.session_id = session_id
    }
}