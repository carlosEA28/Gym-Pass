import type { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeSearchGymsUseCase } from "../../../use-cases/factories/make-search-gyms-use-case.js";

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchGymBodyQuerySchema = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1),
  });

  const { page, query } = searchGymBodyQuerySchema.parse(request.body);

  const createGymUseCase = makeSearchGymsUseCase();

  const { gym } = await createGymUseCase.execute({
    query,
    page,
  });
  return reply.status(201).send({
    gym,
  });
}
