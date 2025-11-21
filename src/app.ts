import fastify from "fastify";
import { appRoutes } from "./http/routers.js";
import { ZodError } from "zod";
import { env } from "./env/index.js";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";

export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: "refresh_token",
    signed: false,
  },
  sign: {
    expiresIn: "10m",
  },
});

app.register(appRoutes);
app.register(fastifyCookie);

app.setErrorHandler((err, request, reply) => {
  if (err instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: "Validation error.", issues: err.issues });
  }

  if (env.NODE_ENV !== "production") {
    console.error(err);
  }

  return reply.status(500).send({ message: "Internal server error." });
});
