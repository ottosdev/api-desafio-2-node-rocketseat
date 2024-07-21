import {FastifyInstance} from "fastify";
import {User} from "../entity/user";
import {knex} from "../database";


export async function userRouter(app: FastifyInstance) {
    app.post('/', async (request, response) => {
        const {nome, email, idade} = request.body as User;


        let session_id = request.cookies.session_id;

        if(!session_id) {
            session_id = crypto.randomUUID();
            response.setCookie('session_id', session_id, {
                path: '/',
                maxAge: 60 * 60 * 24 * 7 // 7 dias
            });
        }

        const user = new User(nome, email, idade, session_id);

        await knex('users').insert({
            id: crypto.randomUUID(),
            ...user
        });

        return response.status(201).send();
    });
}