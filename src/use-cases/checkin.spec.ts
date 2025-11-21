import { expect, describe, it, beforeEach, vi, afterEach } from "vitest";
import { InMemoryCheckinsRepository } from "../repositories/in-memory/in-memory-check-ins-repostiory.js";
import { CheckInUseCase } from "./checkins.js";
import { InMemoryGymsRepository } from "../repositories/in-memory/in-memory-gyms-repository.js";
import { MaxDistanceError } from "./erros/max-distance-error.js";

let checkInsRepository: InMemoryCheckinsRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: CheckInUseCase;

describe("Check-in Use Case", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckinsRepository();
    gymsRepository = new InMemoryGymsRepository();
    sut = new CheckInUseCase(checkInsRepository, gymsRepository);

    await gymsRepository.create({
      id: "gym-1",
      title: "Gym 2",
      description: "",
      phone: "",
      latitude: -27.2092052,
      longitude: -49.6401091,
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to check in", async () => {
    const { checkin } = await sut.execute({
      userId: "user-1",
      gymId: "gym-1",
      userLatitude: -27.2092052,
      userLongitude: -49.6401091,
    });

    expect(checkin.id).toEqual(expect.any(String));
  });

  it("should not be able to check in twice in the same day", async () => {
    await sut.execute({
      userId: "user-1",
      gymId: "gym-1",
      userLatitude: -27.2092052,
      userLongitude: -49.6401091,
    });

    await expect(() =>
      sut.execute({
        userId: "user-1",
        gymId: "gym-1",
        userLatitude: -27.2092052,
        userLongitude: -49.6401091,
      }),
    ).rejects.toBeInstanceOf(Error);
  });

  it("should be able to check in twice but in different days", async () => {
    vi.setSystemTime(new Date(2025, 10, 19));

    await sut.execute({
      userId: "user-1",
      gymId: "gym-1",
      userLatitude: -27.2092052,
      userLongitude: -49.6401091,
    });

    vi.setSystemTime(new Date(2025, 10, 20));

    const { checkin } = await sut.execute({
      userId: "user-1",
      gymId: "gym-1",
      userLatitude: -27.2092052,
      userLongitude: -49.6401091,
    });

    expect(checkin.id).toEqual(expect.any(String));
  });

  it("should not be able to check in on distant gym", async () => {
    gymsRepository.items.push({
      id: "gym-2",
      title: "Gym 1",
      description: "",
      phone: "",
      latitude: -27.0610928,
      longitude: -49.5229501,
    });

    await expect(() =>
      sut.execute({
        userId: "user-1",
        gymId: "gym-2",
        userLatitude: -27.2092052,
        userLongitude: -49.6401091,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError);
  });
});
