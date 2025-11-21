import type { CheckIn, User } from "../generated/prisma/client.js";
import type { CheckinsRepository } from "../repositories/check-ins-repository.js";
import type GymsRepository from "../repositories/gyms-repository.js";
import { ResourceNotFoundError } from "./erros/resource-not-found-error.js";
import { getDistanceBetweenCoordinates } from "../utils/get-distance-between-coordinates.js";
import { MaxDistanceError } from "./erros/max-distance-error.js";
import { MaxNumberCheckInsError } from "./erros/max-number-of-check-ins-error.js";

interface CheckInUseCaseRequest {
  userId: string;
  gymId: string;
  userLatitude: number;
  userLongitude: number;
}

interface CheckInUseCaseResponse {
  checkin: CheckIn;
}

export class CheckInUseCase {
  constructor(
    private checkInsRepository: CheckinsRepository,
    private gymsRepository: GymsRepository,
  ) {}

  async execute({
    userId,
    gymId,
    userLatitude,
    userLongitude,
  }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const gym = await this.gymsRepository.findById(gymId);
    if (!gym) {
      throw new ResourceNotFoundError();
    }

    //calcular a distancia entre o usuário e a academia
    const distance = getDistanceBetweenCoordinates(
      {
        latitude: userLatitude,
        longitude: userLongitude,
      },
      { latitude: gym.latitude, longitude: gym.longitude },
    );

    const MAX_DISTANCE_IN_KM = 0.1;

    if (distance > MAX_DISTANCE_IN_KM) {
      throw new MaxDistanceError();
    }

    const checkInOnSameDate = await this.checkInsRepository.findByUserIdOnDate(
      userId,
      new Date(),
    );

    if (checkInOnSameDate) {
      throw new MaxNumberCheckInsError();
    }

    const checkIn = await this.checkInsRepository.create({
      gym_id: gymId,
      user_id: userId,
    });

    return {
      checkin: checkIn,
    };
  }
}
