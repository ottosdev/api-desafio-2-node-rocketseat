import type {Knex} from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('users', (table) => {
        table.uuid('id').primary();
        table.string('nome').notNullable();
        table.string('email').notNullable().unique();
        table.integer('idade').notNullable();
        table.uuid('session_id').after('id').index()
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());

    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('users');
}

