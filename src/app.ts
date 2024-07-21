import fastify from "fastify";
import {userRouter} from "./routes/user";
import fastifyCookie from "@fastify/cookie";
import {dietRouter} from "./routes/diet";

export const app = fastify();

app.register(fastifyCookie);
app.register(userRouter,{
    prefix: '/user'
});

app.register(dietRouter, {
    prefix: 'diet'
})