import { PrismaCheckInsRepository } from "../../repositories/prisma/prisma-checkins-repostory.js";
import { PrismaGymsRepository } from "../../repositories/prisma/prisma-gyms-repository.js";
import { CheckInUseCase } from "../checkins.js";

export function makeCheckIn() {
  const prismaCheckInsRepository = new PrismaCheckInsRepository();
  const prismaGymsRepository = new PrismaGymsRepository();
  const makeGetUserMetricsUseCase = new CheckInUseCase(
    prismaCheckInsRepository,
    prismaGymsRepository,
  );

  return makeGetUserMetricsUseCase;
}
