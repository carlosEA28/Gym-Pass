import type { Prisma, Gym } from "../generated/prisma/client.js";

export interface FindManyNearbyParams {
  latitude: number;
  longitude: number;
}

export default interface GymsRepository {
  create(data: Prisma.GymCreateInput): Promise<Gym>;
  findById(id: string): Promise<Gym | null>;
  searchMany(query: string, page: number): Promise<Gym[]>;
  findManyNearby(params: FindManyNearbyParams): Promise<Gym[]>;
}
