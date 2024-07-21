import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('diet', (table) => {
        table.uuid('id').primary();
        table.string('name').notNullable();
        table.string('description').notNullable();
        table.boolean('is_ok');
        table.date('date').notNullable()
        table.timestamps(true, true)
        table.uuid('user_id').unsigned().notNullable();

        table.foreign('user_id').references('id').inTable('users');
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('diet');
}

