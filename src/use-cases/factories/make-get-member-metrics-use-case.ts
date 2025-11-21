import { PrismaCheckInsRepository } from "../../repositories/prisma/prisma-checkins-repostory.js";
import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository.js";
import { GetMemberMetricsCase } from "../get-user-metrics.js";
import { GetUserProfileUseCase } from "../get-user-profile.js";

export function makeGetUserMetricsUseCase() {
  const prismaCheckInsRepository = new PrismaCheckInsRepository();
  const makeGetUserMetricsUseCase = new GetMemberMetricsCase(
    prismaCheckInsRepository,
  );

  return makeGetUserMetricsUseCase;
}
