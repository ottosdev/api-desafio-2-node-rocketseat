import {FastifyInstance} from "fastify";
import {authorization} from "../middleware/authentication";
import {knex} from "../database";
import {Diet} from "../entity/diet";

export async function dietRouter(app: FastifyInstance){
    app.post('/', {preHandler: [authorization]},async (request, response) => {
        const { name, description, is_ok } = request.body as Diet;

        const user = request.user;

        if (!user) {
            return response.status(404).send({ error: 'User does not exist' });
        }

        const diet = new Diet(name, description, is_ok , new Date().getTime(), user.id);

        await knex('diet').insert({
            id: crypto.randomUUID(),
            ...diet
        });

        return response.status(201).send();
    })

    app.get('/', {preHandler: [authorization]}, async (request, response) => {
        const user = request.user;

        if (!user) {
            return response.status(404).send({ error: 'User does not exist' });
        }

        const diets = await knex('diet').where('user_id', user.id).select('*');

        return response.status(200).send({diets});
    });

    app.get('/:id', {preHandler: [authorization]}, async (request, response) => {
        const user = request.user;

        if (!user) {
            return response.status(404).send({ error: 'User does not exist' });
        }

        const { id } = request.params as { id: string };

        const diet = await knex('diet').where('id', id).select('*').first();

        if(!diet) {
            return response.status(404).send({ error: 'Diet does not exist' });
        }

        return response.status(200).send({diet});
    });

    app.delete('/:id', {preHandler: [authorization]}, async (request, response) => {
        const user = request.user;

        if (!user) {
            return response.status(404).send({ error: 'User does not exist' });
        }

        const { id } = request.params as { id: string };

        const diet = await knex('diet').where('id', id).del();

        if(!diet) {
            return response.status(404).send({ error: 'Diet does not exist' });

        }

        return response.status(204).send();
    });

    app.put('/:id', {preHandler: [authorization]}, async (request, response) => {
        const user = request.user;

        if (!user) {
            return response.status(404).send({ error: 'User does not exist' });
        }

        const { id } = request.params as { id: string };

        const { name, description, is_ok, user_id } = request.body as Diet;

        const diet = await knex('diet').where('id', id).update({
            name,
            description,
            is_ok,
            date: new Date().getTime()
        });

        if(!diet) {
            return response.status(404).send({ error: 'Diet does not exist' });

        }

        return response.status(204).send();
    });

    app.get('/metrics', {preHandler: [authorization]}, async (request, response) => {
        const user = request.user;

        if (!user) {
            return response.status(404).send({ error: 'User does not exist' });
        }

        const totalOnDiets = await knex('diet')
            .where('user_id', user.id)
            .andWhere('is_ok', true)
            .count('id', { as: 'total' })
            .first()

      const totalOffDiets = await knex('diet')
          .where('user_id', user.id)
          .andWhere('is_ok', false)
          .count('id', { as: 'total' })
          .first()

      const totalDiets = await knex('diet')
          .where({ user_id: request.user?.id })
          .orderBy('date', 'desc')

        return response.status(200).send({
            totalOnDiets,
            totalOffDiets,
            totalDiets
        });
  })

}