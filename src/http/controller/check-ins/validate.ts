import type { FastifyReply, FastifyRequest } from "fastify";
import { makeGetUserMetricsUseCase } from "../../../use-cases/factories/make-get-member-metrics-use-case.js";

export async function metrics(request: FastifyRequest, reply: FastifyReply) {
  const getUserMetricsUseCase = makeGetUserMetricsUseCase();

  const { checkinsCount } = await getUserMetricsUseCase.execute({
    userId: request.user.sub,
  });

  return reply.status(200).send({
    checkinsCount,
  });
}
