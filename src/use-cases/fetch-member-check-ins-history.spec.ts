import { expect, describe, it, beforeEach, vi, afterEach } from "vitest";
import { InMemoryCheckinsRepository } from "../repositories/in-memory/in-memory-check-ins-repostiory.js";
import { FetchMemberCheckInsCase } from "./fetch-member-check-ins-history.js";

let checkInsRepository: InMemoryCheckinsRepository;
let sut: FetchMemberCheckInsCase;

describe("Fetch Member Check-ins History Use Case", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckinsRepository();
    sut = new FetchMemberCheckInsCase(checkInsRepository);
  });

  it("should be able to fetch the member check in history", async () => {
    await checkInsRepository.create({
      user_id: "user-01",
      gym_id: "gym-01",
    });

    await checkInsRepository.create({
      user_id: "user-01",
      gym_id: "gym-02",
    });

    const { checkin } = await sut.execute({
      userId: "user-01",
      page: 1,
    });

    expect(checkin).toHaveLength(2);
    expect(checkin).toEqual([
      expect.objectContaining({
        gym_id: "gym-01",
      }),
      expect.objectContaining({
        gym_id: "gym-02",
      }),
    ]);
  });
});
