import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users-repository.js";
import { GetUserProfileUseCase } from "./get-user-profile.js";
import { hash } from "bcryptjs";
import { ResourceNotFoundError } from "./erros/resource-not-found-error.js";

let usersRepository: InMemoryUsersRepository;
let sut: GetUserProfileUseCase;

describe("Get User Profile Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new GetUserProfileUseCase(usersRepository);
  });

  it("should be albe to get user profile", async () => {
    const createdUser = await usersRepository.create({
      name: "Fulando",
      email: "fulando@gmail.com",
      password_hash: await hash("123456", 6),
    });

    const { user } = await sut.execute({
      userId: createdUser.id,
    });

    expect(user.id).toEqual(expect.any(String));
    expect(user.email).toEqual("fulando@gmail.com");
  });

  it("should not be albe to get user profile with wrong user id", async () => {
    await expect(() =>
      sut.execute({
        userId: "not existing user id",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
