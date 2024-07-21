import 'fastify';

declare module 'fastify' {
    interface FastifyRequest {
        user?: {
            id: string;
            name: string;
            email: string;
            password: string;
            session_id: string;
            created_at: Date;
            updated_at: Date;
        };
    }
}