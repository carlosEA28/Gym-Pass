import type { FastifyInstance } from "fastify";
import { register } from "./controller/register.js";
import { authenticate } from "./controller/authenticate.js";
import { profile } from "./controller/profile.js";
import { verifyJwt } from "./middlewares/verify-jwt.js";
import { nearby } from "./controller/gyms/nearby.js";
import { search } from "./controller/gyms/search.js";
import { create } from "./controller/gyms/register.js";
import { validate } from "./controller/check-ins/metrics.js";
import { metrics } from "./controller/check-ins/validate.js";
import { history } from "./controller/check-ins/history.js";
import { createCheckIn } from "./controller/check-ins/create.js";
import { refresh } from "./controller/refresh.js";

export async function appRoutes(app: FastifyInstance) {
  // user
  app.post("/users", register);
  app.post("/sessions", authenticate);

  // Rotas Autenticadas
  app.get("/me", { onRequest: [verifyJwt] }, profile);

  // academia
  app.get("/gyms", { onRequest: [verifyJwt] }, search);
  app.get("/gyms/nearby", { onRequest: [verifyJwt] }, nearby);
  app.post("/gyms", { onRequest: [verifyJwt] }, create);

  // check-in
  app.get("/check-ins/history", { onRequest: [verifyJwt] }, history);
  app.get("/check-ins/metrics", { onRequest: [verifyJwt] }, metrics);
  app.post("/gyms/:gymId/check-ins", { onRequest: [verifyJwt] }, createCheckIn);
  app.patch(
    "/check-ins/:checkInId/validate",
    { onRequest: [verifyJwt] },
    validate,
  );

  //refresh token
  app.patch("/token/refresh", refresh);
}
