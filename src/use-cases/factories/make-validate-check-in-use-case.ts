import { PrismaCheckInsRepository } from "../../repositories/prisma/prisma-checkins-repostory.js";
import { FetchMemberCheckInsCase } from "../fetch-member-check-ins-history.js";
import { ValidateCheckInUseCase } from "../validate-check-in.js";

export function makeValidateCheckInUseCase() {
  const prismaCheckInsRepository = new PrismaCheckInsRepository();
  const useCase = new ValidateCheckInUseCase(prismaCheckInsRepository);

  return useCase;
}
