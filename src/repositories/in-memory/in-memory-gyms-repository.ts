import { Prisma, type Gym } from "../../generated/prisma/client.js";

import { randomUUID } from "crypto";
import type GymsRepository from "../gyms-repository.js";
import { getDistanceBetweenCoordinates } from "../../utils/get-distance-between-coordinates.js";
import type { FindManyNearbyParams } from "../gyms-repository.js";

export class InMemoryGymsRepository implements GymsRepository {
  async searchMany(query: string, page: number): Promise<Gym[]> {
    return this.items
      .filter((item) => item.title.includes(query))
      .slice((page - 1) * 20, page * 20);
  }

  async create(data: Prisma.GymCreateInput) {
    const gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description || null,
      phone: data.phone || null,
      latitude: data.latitude,
      longitude: data.longitude,
      created_at: new Date(),
    };

    this.items.push(gym);

    return gym;
  }
  public items: Gym[] = [];

  async findById(id: string) {
    const gym = this.items.find((item) => item.id === id);

    if (!gym) {
      return null;
    }

    return gym;
  }

  async findManyNearby(params: FindManyNearbyParams) {
    return this.items.filter((item) => {
      const distance = getDistanceBetweenCoordinates(
        { latitude: params.latitude, longitude: params.longitude },
        {
          latitude: item.latitude,
          longitude: item.longitude,
        },
      );

      return distance < 10;
    });
  }
}
