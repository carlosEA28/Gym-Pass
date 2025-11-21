import { expect, describe, it, beforeEach, vi, afterEach } from "vitest";
import { InMemoryCheckinsRepository } from "../repositories/in-memory/in-memory-check-ins-repostiory.js";
import { GetMemberMetricsCase } from "./get-user-metrics.js";

let checkInsRepository: InMemoryCheckinsRepository;
let sut: GetMemberMetricsCase;

describe("Get User Metric Use Case", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckinsRepository();
    sut = new GetMemberMetricsCase(checkInsRepository);
  });

  it("should be able to get the member check ins count from metric", async () => {
    await checkInsRepository.create({
      user_id: "user-01",
      gym_id: "gym-01",
    });

    await checkInsRepository.create({
      user_id: "user-01",
      gym_id: "gym-02",
    });

    const { checkinsCount } = await sut.execute({
      userId: "user-01",
    });

    expect(checkinsCount).toEqual(2);
  });
});
