import type { Gym } from "../generated/prisma/client.js";
import type GymsRepository from "../repositories/gyms-repository.js";

interface SearchGymParams {
  query: string;
  page: number;
}

interface SearchGymResponse {
  gym: Gym[];
}

export class SearchGymUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({ query, page }: SearchGymParams): Promise<SearchGymResponse> {
    const gym = await this.gymsRepository.searchMany(query, page);

    return {
      gym,
    };
  }
}
