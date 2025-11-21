import type { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeCreateGymUseCase } from "../../../use-cases/factories/make-create-gym-use-case.js";
import { makeFetchNearbyGymsUseCase } from "../../../use-cases/factories/make-fetch-nearby-gyms-use-case.js";

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
  const nearbyGymQuerySchema = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180;
    }),
  });

  const { latitude, longitude } = nearbyGymQuerySchema.parse(request.body);

  const createGymUseCase = makeFetchNearbyGymsUseCase();

  const { gyms } = await createGymUseCase.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  });
  return reply.status(201).send({
    gyms,
  });
}
