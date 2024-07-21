import {FastifyReply, FastifyRequest} from "fastify";
import {knex} from "../database";

export async function authorization(request: FastifyRequest, response: FastifyReply) {
    const session_id = request.cookies.session_id;

    if (!session_id) {
        return response.status(401).send({ error: 'Unauthorized' });
    }

    const user = await knex('users').where('session_id', session_id).first();

    if (!user) {
        return response.status(401).send({ error: 'User does not exists' });
    }

    request.user = user;
}