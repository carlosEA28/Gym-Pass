import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users-repository.js";
import { AuthenticateUseCase } from "./authenticate.js";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "./erros/invalid-credentials-error.js";

let usersRepository: InMemoryUsersRepository;
let sut: AuthenticateUseCase;

describe("Authencticate Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new AuthenticateUseCase(usersRepository);
  });

  it("should be albe to authencticate", async () => {
    await usersRepository.create({
      name: "Fulando",
      email: "fulando@gmail.com",
      password_hash: await hash("123456", 6),
    });

    const { user } = await sut.execute({
      email: "fulando@gmail.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should not be albe to authencticate with wrong email", async () => {
    await expect(() =>
      sut.execute({
        email: "fulando@gmail.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be albe to authencticate with wrong password", async () => {
    await usersRepository.create({
      name: "Fulando",
      email: "fulando@gmail.com",
      password_hash: await hash("123456", 6),
    });

    await expect(() =>
      sut.execute({
        email: "fulando@gmail.com",
        password: "12345",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
