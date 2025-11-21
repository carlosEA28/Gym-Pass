import { PrismaCheckInsRepository } from "../../repositories/prisma/prisma-checkins-repostory.js";
import { FetchMemberCheckInsCase } from "../fetch-member-check-ins-history.js";

export function makeFetchMembersCheckInHistoryUseCase() {
  const prismaCheckInsRepository = new PrismaCheckInsRepository();
  const fetchMemberCheckInsCase = new FetchMemberCheckInsCase(
    prismaCheckInsRepository,
  );

  return fetchMemberCheckInsCase;
}
