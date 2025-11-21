import { PrismaGymsRepository } from "../../repositories/prisma/prisma-gyms-repository.js";
import { SearchGymUseCase } from "../search-gym.js";

export function makeSearchGymsUseCase() {
  const prismaGymRepository = new PrismaGymsRepository();
  const useCase = new SearchGymUseCase(prismaGymRepository);

  return useCase;
}
