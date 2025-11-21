import type { CheckIn } from "../generated/prisma/client.js";
import type { CheckinsRepository } from "../repositories/check-ins-repository.js";

interface GetMemberMetricsCaseRequest {
  userId: string;
}

interface GetMemberMetricsCaseResponse {
  checkinsCount: number;
}

export class GetMemberMetricsCase {
  constructor(private checkInsRepository: CheckinsRepository) {}

  async execute({
    userId,
  }: GetMemberMetricsCaseRequest): Promise<GetMemberMetricsCaseResponse> {
    const checkIns = await this.checkInsRepository.countByUserId(userId);

    return {
      checkinsCount: checkIns,
    };
  }
}
