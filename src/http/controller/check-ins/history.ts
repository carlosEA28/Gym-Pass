import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeFetchMembersCheckInHistoryUseCase } from "../../../use-cases/factories/make-fetch-members-check-in-history-use-case.js";

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const checkInHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const { page } = checkInHistoryQuerySchema.parse(request.query);

  const fetchUserCheckInsHistoryUseCase =
    makeFetchMembersCheckInHistoryUseCase();

  const { checkin } = await fetchUserCheckInsHistoryUseCase.execute({
    page,
    userId: request.user.sub,
  });

  return reply.status(200).send({
    checkin,
  });
}
