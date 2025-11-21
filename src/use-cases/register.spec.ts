import { expect, describe, it, beforeEach } from "vitest";
import { RegisterUseCase } from "./register.js";
import { compare } from "bcryptjs";
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users-repository.js";
import { UserAlreadyExistsError } from "./erros/user-already-exists.js";
import type { UsersRepository } from "../repositories/users-repository.js";

let usersRepository: UsersRepository;
let sut: RegisterUseCase;

describe("Register Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new RegisterUseCase(usersRepository);
  });

  it("should hash user password upon registration", async () => {
    const { user } = await sut.execute({
      name: "Fulando",
      email: "fulando@gmail.com",
      password: "123456",
    });

    const isPasswordCorrectlyHashed = await compare(
      "123456",
      user.password_hash
    );

    expect(isPasswordCorrectlyHashed).toBeTruthy();
  });

  it("should not be able to register with the same email twice", async () => {
    const email = "fulando@gmail.com";

    await sut.execute({
      name: "Fulando",
      email: "fulando@gmail.com",
      password: "123456",
    });

    await expect(
      async () =>
        await sut.execute({
          name: "Fulando",
          email,
          password: "123456",
        })
      //espera que a promisse rejeite, e que o erro seja uma instancia de UserAlreadyExistsError
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });

  it("should be able to register", async () => {
    const { user } = await sut.execute({
      name: "Fulando",
      email: "fulando@gmail.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });
});
