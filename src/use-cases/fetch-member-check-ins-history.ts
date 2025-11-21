import type { CheckIn } from "../generated/prisma/client.js";
import type { CheckinsRepository } from "../repositories/check-ins-repository.js";

interface FetchMemberCheckInsCaseRequest {
  userId: string;
  page: number;
}

interface FetchMemberCheckInsCaseResponse {
  checkin: CheckIn[];
}

export class FetchMemberCheckInsCase {
  constructor(private checkInsRepository: CheckinsRepository) {}

  async execute({
    userId,
    page,
  }: FetchMemberCheckInsCaseRequest): Promise<FetchMemberCheckInsCaseResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page,
    );

    return {
      checkin: checkIns,
    };
  }
}
