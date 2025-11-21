import { PrismaGymsRepository } from "../../repositories/prisma/prisma-gyms-repository.js";
import { FetchNearbyGymsUseCase } from "../fetch-nearby-gyms.js";
import { SearchGymUseCase } from "../search-gym.js";

export function makeFetchNearbyGymsUseCase() {
  const prismaGymRepository = new PrismaGymsRepository();
  const useCase = new FetchNearbyGymsUseCase(prismaGymRepository);

  return useCase;
}
