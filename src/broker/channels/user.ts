import { broker } from "../broker.js";

export const users = await broker.createChannel();

await users.assertQueue("users");
