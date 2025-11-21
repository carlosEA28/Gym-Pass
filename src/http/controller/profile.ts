import type { FastifyRequest, FastifyReply } from "fastify";
import { makeGetUser } from "../../use-cases/factories/make-get-use-profile-use-case.js";

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const getUserProfile = makeGetUser();

  const profile = await getUserProfile.execute({
    userId: request.user.sub,
  });
  return reply.status(200).send({
    profile,
  });
}
